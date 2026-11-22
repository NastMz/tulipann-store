"""Order lifecycle. Every state change goes through this module.

Lifecycle::

    awaiting_payment --(customer, simulated payment approved)--> paid
    paid --(staff)--> preparing --(staff)--> shipped --(staff)--> delivered
    awaiting_payment --(customer or staff)--> cancelled
    paid / preparing --(staff)--> cancelled

Prices and totals are always computed here from the database, never taken
from the client. Stock is reserved when the order is placed and returned when
it is cancelled.
"""
import logging
from dataclasses import dataclass

from django.conf import settings
from django.core.mail import send_mail
from django.db import IntegrityError, transaction
from django.db.models import F, Max
from django.template.loader import render_to_string
from django.utils import timezone

from catalog.models import Product

from .models import City, Order, OrderEvent, OrderItem

logger = logging.getLogger(__name__)
Status = Order.Status
MAX_QUANTITY_PER_LINE = 20

STAFF_TRANSITIONS: dict[str, set[str]] = {
    Status.AWAITING_PAYMENT: {Status.CANCELLED},
    Status.PAID: {Status.PREPARING, Status.CANCELLED},
    Status.PREPARING: {Status.SHIPPED, Status.CANCELLED},
    Status.SHIPPED: {Status.DELIVERED},
    Status.DELIVERED: set(),
    Status.CANCELLED: set(),
}
PURCHASED_STATES = {Status.PAID, Status.PREPARING, Status.SHIPPED, Status.DELIVERED}


class OrderError(Exception):
    """A business rule refused the operation; ``message`` is shown to the user."""

    def __init__(self, message: str, field: str | None = None):
        super().__init__(message)
        self.message = message
        self.field = field


@dataclass
class QuoteLine:
    product: Product
    quantity: int

    @property
    def line_total(self) -> int:
        return self.product.price * self.quantity


@dataclass
class Quote:
    lines: list[QuoteLine]
    subtotal: int
    shipping_cost: int | None

    @property
    def total(self) -> int | None:
        return None if self.shipping_cost is None else self.subtotal + self.shipping_cost


def _normalise_items(items) -> dict[int, int]:
    if not isinstance(items, list) or not items:
        raise OrderError("El encargo está vacío.", "items")
    merged: dict[int, int] = {}
    for item in items:
        try:
            product_id = int(item["product"])
            quantity = int(item["quantity"])
        except (KeyError, TypeError, ValueError):
            raise OrderError("Cada línea necesita «product» y «quantity».", "items") from None
        if quantity < 1:
            raise OrderError("Las cantidades deben ser positivas.", "items")
        merged[product_id] = merged.get(product_id, 0) + quantity
    if any(quantity > MAX_QUANTITY_PER_LINE for quantity in merged.values()):
        raise OrderError(f"Máximo {MAX_QUANTITY_PER_LINE} unidades por lámina.", "items")
    return merged


def quote(items, city: City | None = None, *, lock: bool = False) -> Quote:
    """Validates a cart against the catalogue and prices it."""
    wanted = _normalise_items(items)
    queryset = Product.objects.filter(pk__in=wanted, is_active=True)
    if lock:
        queryset = queryset.select_for_update()
    products = {product.pk: product for product in queryset}
    missing = set(wanted) - set(products)
    if missing:
        raise OrderError("Alguna lámina ya no está en el catálogo.", "items")
    lines = []
    for product_id, quantity in wanted.items():
        product = products[product_id]
        if quantity > product.stock:
            raise OrderError(f"Solo quedan {product.stock} de «{product.name}».", "items")
        lines.append(QuoteLine(product, quantity))
    lines.sort(key=lambda line: line.product.plate)
    subtotal = sum(line.line_total for line in lines)
    shipping = city.department.shipping_cost if city is not None else None
    return Quote(lines, subtotal, shipping)


def _next_number() -> int:
    return (Order.objects.aggregate(top=Max("number"))["top"] or 1000) + 1


@transaction.atomic
def place_order(user, *, items, city: City, recipient: str, phone: str, address: str, notes: str = "") -> Order:
    priced = quote(items, city, lock=True)
    for attempt in range(5):
        try:
            with transaction.atomic():
                order = Order.objects.create(
                    number=_next_number(),
                    user=user,
                    recipient=recipient,
                    phone=phone,
                    address=address,
                    city=city,
                    notes=notes,
                    subtotal=priced.subtotal,
                    shipping_cost=priced.shipping_cost,
                    total=priced.total,
                )
            break
        except IntegrityError:
            if attempt == 4:
                raise
    for line in priced.lines:
        OrderItem.objects.create(
            order=order,
            product=line.product,
            product_name=line.product.name,
            unit_price=line.product.price,
            quantity=line.quantity,
        )
        Product.objects.filter(pk=line.product.pk).update(stock=F("stock") - line.quantity)
    OrderEvent.objects.create(order=order, status=order.status, actor=user, note="Encargo registrado")
    return order


def _locked(order: Order) -> Order:
    return Order.objects.select_for_update().get(pk=order.pk)


def _restock(order: Order) -> None:
    for item in order.items.all():
        Product.objects.filter(pk=item.product_id).update(stock=F("stock") + item.quantity)


@transaction.atomic
def simulate_payment(order: Order, user, approved: bool) -> Order:
    """The simulated checkout. Only the order's owner can pay, and only once."""
    order = _locked(order)
    if order.user_id != user.pk:
        raise OrderError("Este encargo no es tuyo.")
    if order.status != Status.AWAITING_PAYMENT:
        raise OrderError("Este encargo ya no espera pago.")
    if not approved:
        OrderEvent.objects.create(
            order=order, status=order.status, actor=user, note="Pago simulado rechazado; puedes intentarlo de nuevo"
        )
        return order
    order.status = Status.PAID
    order.paid_at = timezone.now()
    order.save(update_fields=["status", "paid_at", "updated_at"])
    OrderEvent.objects.create(order=order, status=order.status, actor=user, note="Pago simulado aprobado")
    transaction.on_commit(lambda: notify_customer(order, "emails/order_paid.txt", "Recibimos tu pago"))
    return order


@transaction.atomic
def cancel_by_customer(order: Order, user) -> Order:
    order = _locked(order)
    if order.user_id != user.pk:
        raise OrderError("Este encargo no es tuyo.")
    if order.status != Status.AWAITING_PAYMENT:
        raise OrderError("Solo puedes cancelar un encargo que aún no se ha pagado.")
    order.status = Status.CANCELLED
    order.save(update_fields=["status", "updated_at"])
    _restock(order)
    OrderEvent.objects.create(order=order, status=order.status, actor=user, note="Cancelado por el cliente")
    return order


@transaction.atomic
def transition_by_staff(order: Order, staff_user, new_status: str, note: str = "") -> Order:
    if not staff_user.is_staff:
        raise OrderError("Solo el taller puede cambiar el estado de un encargo.")
    order = _locked(order)
    if new_status not in STAFF_TRANSITIONS.get(order.status, set()):
        raise OrderError(
            f"No se puede pasar de «{Status(order.status).label}» a «{Status(new_status).label if new_status in Status.values else new_status}».",
            "status",
        )
    order.status = new_status
    order.save(update_fields=["status", "updated_at"])
    if new_status == Status.CANCELLED:
        _restock(order)
    OrderEvent.objects.create(order=order, status=new_status, actor=staff_user, note=note[:200])
    if new_status == Status.SHIPPED:
        transaction.on_commit(lambda: notify_customer(order, "emails/order_shipped.txt", "Tu encargo va en camino"))
    return order


def has_purchased(user, product) -> bool:
    return OrderItem.objects.filter(
        product=product, order__user=user, order__status__in=PURCHASED_STATES
    ).exists()


def notify_customer(order: Order, template: str, subject: str) -> None:
    body = render_to_string(template, {"order": order, "site_url": settings.SITE_URL})
    try:
        send_mail(f"{subject} · {order.code}", body, None, [order.user.email])
    except Exception:  # a mail outage must never undo a paid order
        logger.exception("Could not send %s for order %s", template, order.code)
