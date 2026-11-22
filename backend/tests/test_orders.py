import pytest
from django.core import mail

from catalog.models import Product
from orders.models import Order

pytestmark = pytest.mark.django_db(transaction=True)


def pay(client, order, outcome="approve"):
    return client.post(f"/api/orders/{order.pk}/pay", {"outcome": outcome}, format="json")


def stock(product):
    return Product.objects.get(pk=product.pk).stock


def test_customer_sees_only_their_own_orders(as_customer, as_other, place, customer, other_customer, catalogue):
    mine = place(customer, [(catalogue["aurora"], 1)])
    theirs = place(other_customer, [(catalogue["aurora"], 1)])
    assert [row["id"] for row in as_customer.get("/api/orders").json()] == [str(mine.pk)]
    assert as_customer.get(f"/api/orders/{theirs.pk}").status_code == 404


def test_simulated_payment_approval_marks_order_paid_and_mails_receipt(as_customer, place, customer, catalogue):
    order = place(customer, [(catalogue["llama"], 2)])
    response = pay(as_customer, order)
    assert response.status_code == 200
    assert response.json()["status"] == "paid"
    assert response.json()["paid_at"] is not None
    assert len(mail.outbox) == 1
    assert order.code in mail.outbox[0].subject
    assert "no se hizo ningún cobro real" in mail.outbox[0].body
    assert "$ 144.000" in mail.outbox[0].body


def test_declined_simulated_payment_keeps_order_waiting(as_customer, place, customer, catalogue):
    order = place(customer, [(catalogue["aurora"], 1)])
    body = pay(as_customer, order, "decline").json()
    assert body["status"] == "awaiting_payment"
    assert "rechazado" in body["events"][-1]["note"]
    assert pay(as_customer, order).json()["status"] == "paid"


def test_nobody_else_can_pay_an_order(as_other, place, customer, catalogue):
    order = place(customer, [(catalogue["aurora"], 1)])
    assert pay(as_other, order).status_code == 404
    assert Order.objects.get(pk=order.pk).status == "awaiting_payment"


def test_anonymous_cannot_pay(api, place, customer, catalogue):
    order = place(customer, [(catalogue["aurora"], 1)])
    assert pay(api, order).status_code == 403


def test_an_order_cannot_be_paid_twice(as_customer, place, customer, catalogue):
    order = place(customer, [(catalogue["aurora"], 1)])
    pay(as_customer, order)
    response = pay(as_customer, order)
    assert response.status_code == 400
    assert "ya no espera pago" in str(response.json())


def test_payment_outcome_must_be_known(as_customer, place, customer, catalogue):
    order = place(customer, [(catalogue["aurora"], 1)])
    assert pay(as_customer, order, "approved-by-gateway").status_code == 400


def test_customer_cancel_returns_stock(as_customer, place, customer, catalogue):
    order = place(customer, [(catalogue["aurora"], 4)])
    assert stock(catalogue["aurora"]) == 6
    response = as_customer.post(f"/api/orders/{order.pk}/cancel")
    assert response.json()["status"] == "cancelled"
    assert stock(catalogue["aurora"]) == 10


def test_customer_cannot_cancel_after_paying(as_customer, place, customer, catalogue):
    order = place(customer, [(catalogue["aurora"], 1)])
    pay(as_customer, order)
    assert as_customer.post(f"/api/orders/{order.pk}/cancel").status_code == 400


def transition(client, order, status):
    return client.post(f"/api/admin/orders/{order.pk}/transition", {"status": status}, format="json")


def test_staff_moves_a_paid_order_through_the_lifecycle(as_customer, as_staff, place, customer, catalogue):
    order = place(customer, [(catalogue["aurora"], 1)])
    pay(as_customer, order)
    mail.outbox.clear()
    for status in ["preparing", "shipped", "delivered"]:
        response = transition(as_staff, order, status)
        assert response.status_code == 200, response.json()
        assert response.json()["status"] == status
    assert [message.subject.split(" · ")[0] for message in mail.outbox] == ["Tu encargo va en camino"]
    detail = as_staff.get(f"/api/admin/orders/{order.pk}").json()
    assert [event["status"] for event in detail["events"]] == ["awaiting_payment", "paid", "preparing", "shipped", "delivered"]
    assert detail["allowed_transitions"] == []


@pytest.mark.parametrize(
    ("start", "target"),
    [("awaiting_payment", "paid"), ("awaiting_payment", "shipped"), ("paid", "delivered"), ("cancelled", "paid")],
)
def test_staff_cannot_skip_or_fake_states(as_customer, as_staff, place, customer, catalogue, start, target):
    order = place(customer, [(catalogue["aurora"], 1)])
    if start == "paid":
        pay(as_customer, order)
    if start == "cancelled":
        as_customer.post(f"/api/orders/{order.pk}/cancel")
    response = transition(as_staff, order, target)
    assert response.status_code == 400
    assert Order.objects.get(pk=order.pk).status == start


def test_staff_cancellation_after_payment_restocks(as_customer, as_staff, place, customer, catalogue):
    order = place(customer, [(catalogue["pagoda"], 2)])
    pay(as_customer, order)
    assert stock(catalogue["pagoda"]) == 0
    assert transition(as_staff, order, "cancelled").json()["status"] == "cancelled"
    assert stock(catalogue["pagoda"]) == 2


def test_customers_cannot_use_the_staff_transition(as_customer, place, customer, catalogue):
    order = place(customer, [(catalogue["aurora"], 1)])
    pay(as_customer, order)
    assert transition(as_customer, order, "shipped").status_code == 403
    assert Order.objects.get(pk=order.pk).status == "paid"
