import pytest
from django.core.exceptions import ValidationError

from catalog.art import validate_art
from catalog.models import Review

pytestmark = pytest.mark.django_db


def slugs(response):
    return [row["slug"] for row in response.json()]


def test_categories_list_counts_only_active_products(api, catalogue):
    body = api.get("/api/categories").json()
    assert [row["slug"] for row in body] == ["bulbos", "tulipaneras"]
    rows = {row["slug"]: row for row in body}
    assert rows["bulbos"]["product_count"] == 2
    assert rows["bulbos"]["subcategories"] == [{"id": catalogue["flamed"].id, "name": "Flameados", "slug": "flameados"}]
    assert rows["tulipaneras"]["kind"] == "vase"


def test_product_list_hides_retired_plates(api, catalogue):
    assert slugs(api.get("/api/products")) == ["aurora", "llama", "pagoda"]


@pytest.mark.parametrize(
    ("query", "expected"),
    [
        ("category=tulipaneras", ["pagoda"]),
        ("subcategory=flameados", ["llama"]),
        ("q=flammea", ["llama"]),
        ("q=PAGO", ["pagoda"]),
        ("sort=-price", ["pagoda", "llama", "aurora"]),
        ("sort=price", ["aurora", "llama", "pagoda"]),
        ("sort=unknown", ["aurora", "llama", "pagoda"]),
    ],
)
def test_product_list_filters_and_sorts(api, catalogue, query, expected):
    assert slugs(api.get(f"/api/products?{query}")) == expected


def test_product_detail_includes_story_related_and_rating(api, catalogue, customer):
    Review.objects.create(product=catalogue["aurora"], user=customer, rating=4, text="Bonita")
    body = api.get("/api/products/aurora").json()
    assert body["product"]["plate"] == 1
    assert body["product"]["rating"] == 4.0
    assert body["product"]["review_count"] == 1
    assert [row["slug"] for row in body["related"]] == ["llama"]
    assert body["reviews"][0]["author"] == "Clara O."
    assert body["can_review"] is False


def test_retired_product_detail_is_404(api, catalogue):
    assert api.get("/api/products/retirada").status_code == 404


@pytest.mark.parametrize(
    "recipe",
    [
        {"petal": "#ffffff", "shape": "cup", "seed": 3},
        {"petal": "#123456", "glaze": "#1f3f7a", "tiers": 4},
        {"petal": "#123456", "stems": 9, "paper": "#cfae7f", "flame": None},
    ],
)
def test_art_recipe_accepts_valid_plates(recipe):
    validate_art(recipe)


@pytest.mark.parametrize(
    "recipe",
    [
        "red",
        {"shape": "cup"},
        {"petal": "red"},
        {"petal": "#ffffff", "shape": "star"},
        {"petal": "#ffffff", "tiers": 9},
        {"petal": "#ffffff", "seed": True},
        {"petal": "#ffffff", "onclick": "alert(1)"},
    ],
)
def test_art_recipe_rejects_invalid_plates(recipe):
    with pytest.raises(ValidationError):
        validate_art(recipe)
