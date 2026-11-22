import pytest
from django.core.management import call_command

from catalog.models import Category, Product, Review
from orders.models import Order

pytestmark = pytest.mark.django_db

ADMIN_ENDPOINTS = ["/api/admin/summary", "/api/admin/orders", "/api/admin/customers", "/api/admin/products",
                   "/api/admin/reviews"]


@pytest.mark.parametrize("url", ADMIN_ENDPOINTS)
def test_admin_area_is_closed_to_anonymous_and_customers(api, as_customer, url):
    assert api.get(url).status_code == 403
    assert as_customer.get(url).status_code == 403


@pytest.mark.parametrize("url", ADMIN_ENDPOINTS)
def test_admin_area_is_open_to_staff(as_staff, catalogue, url):
    assert as_staff.get(url).status_code == 200


def test_customers_cannot_write_the_catalogue(as_customer, catalogue):
    product = catalogue["aurora"]
    assert as_customer.patch(f"/api/admin/products/{product.pk}", {"price": 1}, format="json").status_code == 403
    assert Product.objects.get(pk=product.pk).price == 38000


def new_plate(category, **extra):
    payload = {
        "name": "Nieve de Paipa", "plate": 40, "summary": "Blanca", "price": 41000, "stock": 12,
        "category": category.pk, "art": {"petal": "#f5f1e6", "shape": "lily", "seed": 9},
        "details": [{"label": "Altura", "value": "40 cm"}],
    }
    payload.update(extra)
    return payload


def test_staff_composes_a_new_plate(as_staff, api, catalogue):
    response = as_staff.post("/api/admin/products", new_plate(catalogue["bulbs"]), format="json")
    assert response.status_code == 201, response.json()
    assert response.json()["slug"] == "nieve-de-paipa"
    assert api.get("/api/products/nieve-de-paipa").json()["product"]["details"] == [{"label": "Altura", "value": "40 cm"}]


def test_plate_validation(as_staff, catalogue):
    bad_art = as_staff.post(
        "/api/admin/products", new_plate(catalogue["bulbs"], art={"petal": "javascript:"}), format="json"
    )
    assert "art" in bad_art.json()
    duplicate = as_staff.post("/api/admin/products", new_plate(catalogue["bulbs"], plate=1), format="json")
    assert "plate" in duplicate.json()
    wrong_sub = as_staff.post(
        "/api/admin/products", new_plate(catalogue["vases"], subcategory=catalogue["flamed"].pk), format="json"
    )
    assert "subcategory" in wrong_sub.json()


def test_deleting_a_sold_plate_retires_it(as_staff, place, customer, catalogue):
    place(customer, [(catalogue["aurora"], 1)])
    response = as_staff.delete(f"/api/admin/products/{catalogue['aurora'].pk}")
    assert response.status_code == 200
    assert Product.objects.get(pk=catalogue["aurora"].pk).is_active is False
    assert as_staff.delete(f"/api/admin/products/{catalogue['pagoda'].pk}").status_code == 204


def test_only_buyers_can_review_and_only_once(as_customer, as_other, place, customer, catalogue):
    url = "/api/products/aurora/reviews"
    note = {"rating": 5, "text": "Preciosa"}
    assert as_customer.post(url, note, format="json").status_code == 403
    order = place(customer, [(catalogue["aurora"], 1)])
    assert as_customer.post(url, note, format="json").status_code == 403  # not paid yet
    as_customer.post(f"/api/orders/{order.pk}/pay", {"outcome": "approve"}, format="json")
    assert as_customer.get("/api/products/aurora").json()["can_review"] is True
    assert as_customer.post(url, {"rating": 6, "text": "x"}, format="json").status_code == 400
    assert as_customer.post(url, note, format="json").status_code == 201
    assert as_customer.post(url, note, format="json").status_code == 400
    assert as_other.post(url, note, format="json").status_code == 403
    assert Review.objects.count() == 1


def test_staff_summary_counts_revenue_only_from_paid_orders(as_staff, as_customer, place, customer, catalogue):
    paid = place(customer, [(catalogue["aurora"], 1)])
    place(customer, [(catalogue["aurora"], 1)])
    as_customer.post(f"/api/orders/{paid.pk}/pay", {"outcome": "approve"}, format="json")
    body = as_staff.get("/api/admin/summary").json()
    assert body["revenue"] == Order.objects.get(pk=paid.pk).total
    assert body["orders_to_prepare"] == 1
    assert {row["status"]: row["count"] for row in body["status_counts"]}["awaiting_payment"] == 1
    assert len(body["daily_revenue"]) == 14


def test_seed_demo_loads_once():
    call_command("seed_demo", quiet_mail=True)
    products = Product.objects.count()
    assert products == 17
    assert Order.objects.filter(status="delivered").count() == 3
    call_command("seed_demo", quiet_mail=True)
    assert Product.objects.count() == products
    assert Category.objects.count() == 4
