import uuid

from django.conf import settings
from django.db import models


class Department(models.Model):
    """A Colombian department; it sets the shipping cost."""

    name = models.CharField(max_length=60, unique=True)
    shipping_cost = models.PositiveIntegerField()

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


class City(models.Model):
    department = models.ForeignKey(Department, related_name="cities", on_delete=models.CASCADE)
    name = models.CharField(max_length=60)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "cities"
        constraints = [models.UniqueConstraint(fields=["department", "name"], name="unique_city_per_department")]

    def __str__(self) -> str:
        return f"{self.name}, {self.department.name}"


class Order(models.Model):
    class Status(models.TextChoices):
        AWAITING_PAYMENT = "awaiting_payment", "Esperando pago"
        PAID = "paid", "Pagado"
        PREPARING = "preparing", "En preparación"
        SHIPPED = "shipped", "Despachado"
        DELIVERED = "delivered", "Entregado"
        CANCELLED = "cancelled", "Cancelado"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    number = models.PositiveIntegerField(unique=True, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="orders", on_delete=models.PROTECT)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.AWAITING_PAYMENT)
    recipient = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    address = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.PROTECT)
    notes = models.CharField(max_length=300, blank=True)
    subtotal = models.PositiveIntegerField()
    shipping_cost = models.PositiveIntegerField()
    total = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.code

    @property
    def code(self) -> str:
        return f"TLP-{self.number:05d}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey("catalog.Product", related_name="order_items", on_delete=models.PROTECT)
    product_name = models.CharField(max_length=80)
    unit_price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()

    class Meta:
        ordering = ["id"]
        constraints = [models.UniqueConstraint(fields=["order", "product"], name="one_line_per_product")]

    @property
    def line_total(self) -> int:
        return self.unit_price * self.quantity


class OrderEvent(models.Model):
    """The order's history: each status change, simulated payment attempt, etc."""

    order = models.ForeignKey(Order, related_name="events", on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=Order.Status.choices)
    note = models.CharField(max_length=200, blank=True)
    actor = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at", "id"]
