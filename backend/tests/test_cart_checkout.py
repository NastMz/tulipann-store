import pytest

from catalog.models import Product
from orders.models import Order

pytestmark = pytest.mark.django_db


def test_quote_prices_come_from_the_catalogue(api, catalogue, city):
    response = api.post(
        "/api/cart/quote",
        {"items": [{"product": catalogue["aurora"].pk, "quantity": 2, "price": 1}], "city": city.pk},
        format="json",
    )
    body = response.json()
    assert response.status_code == 200
    assert body["subtotal"] == 76000
    assert body["shipping_cost"] == 16000
    assert body["total"] == 92000
    assert body["lines"][0]["line_total"] == 76000


def test_quote_merges_repeated_lines_and_omits_shipping_without_city(api, catalogue):
    pk = catalogue["aurora"].pk
    body = api.post(
        "/api/cart/quote",
        {"items": [{"product": pk, "quantity": 1}, {"product": pk, "quantity": 2}]},
        format="json",
    ).json()
    assert body["lines"][0]["quantity"] == 3
    assert body["shipping_cost"] is None
    assert body["total"] is None


@pytest.mark.parametrize(
    ("items", "message"),
    [
        ([{"product": "PAGODA", "quantity": 3}], "Solo quedan 2"),
        ([{"product": "RETIRED", "quantity": 1}], "ya no está en el catálogo"),
        ([{"product": "AURORA", "quantity": 21}], "Máximo 20"),
    ],
)
def test_quote_rejects_unavailable_items(api, catalogue, items, message):
    lookup = {"PAGODA": catalogue["pagoda"].pk, "RETIRED": catalogue["retired"].pk, "AURORA": catalogue["aurora"].pk}
    payload = [{"product": lookup[item["product"]], "quantity": item["quantity"]} for item in items]
    response = api.post("/api/cart/quote", {"items": payload}, format="json")
    assert response.status_code == 400
    assert message in str(response.json())


def test_quote_rejects_empty_cart(api, db):
    assert api.post("/api/cart/quote", {"items": []}, format="json").status_code == 400


def order_payload(catalogue, city_obj, **extra):
    payload = {
        "items": [{"product": catalogue["aurora"].pk, "quantity": 2}, {"product": catalogue["pagoda"].pk, "quantity": 1}],
        "city": city_obj.pk,
        "recipient": "Clara Ospina",
        "phone": "300 555 0101",
        "address": "Calle 12 # 3-45",
    }
    payload.update(extra)
    return payload


def test_placing_an_order_requires_login(api, catalogue, city):
    assert api.post("/api/orders", order_payload(catalogue, city), format="json").status_code == 403


def test_place_order_snapshots_prices_reserves_stock_and_waits_for_payment(as_customer, catalogue, city, customer):
    response = as_customer.post("/api/orders", order_payload(catalogue, city, total=1), format="json")
    body = response.json()
    assert response.status_code == 201
    assert body["status"] == "awaiting_payment"
    assert body["code"].startswith("TLP-")
    assert body["subtotal"] == 2 * 38000 + 340000
    assert body["shipping_cost"] == 16000
    assert body["total"] == body["subtotal"] + 16000
    assert [item["product_name"] for item in body["items"]] == ["Aurora", "Pagoda"]
    assert Product.objects.get(pk=catalogue["aurora"].pk).stock == 8
    assert Product.objects.get(pk=catalogue["pagoda"].pk).stock == 1
    order = Order.objects.get(pk=body["id"])
    assert order.user == customer
    assert [event.note for event in order.events.all()] == ["Encargo registrado"]


def test_place_order_validates_shipping_fields(as_customer, catalogue, city):
    response = as_customer.post("/api/orders", order_payload(catalogue, city, phone="abc", city=999), format="json")
    assert response.status_code == 400
    assert set(response.json()) >= {"phone", "city"}


def test_place_order_does_not_reserve_anything_when_stock_is_short(as_customer, catalogue, city):
    payload = order_payload(catalogue, city)
    payload["items"][1]["quantity"] = 5
    assert as_customer.post("/api/orders", payload, format="json").status_code == 400
    assert Product.objects.get(pk=catalogue["aurora"].pk).stock == 10
    assert not Order.objects.exists()


def test_order_numbers_are_sequential(place, customer, catalogue):
    first = place(customer, [(catalogue["aurora"], 1)])
    second = place(customer, [(catalogue["aurora"], 1)])
    assert second.number == first.number + 1
