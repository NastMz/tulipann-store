import pytest
from django.core.cache import cache
from django.core.management import call_command
from rest_framework.test import APIClient

from catalog.models import Category, Product, Subcategory
from orders.models import City, Department


@pytest.fixture(scope="session")
def django_db_setup(django_db_setup, django_db_blocker):
    # Throttle counters live in the database cache, as in production.
    with django_db_blocker.unblock():
        call_command("createcachetable", verbosity=0)


@pytest.fixture(autouse=True)
def _clear_throttle_cache(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        cache.clear()
    yield
    with django_db_blocker.unblock():
        cache.clear()


@pytest.fixture
def api():
    return APIClient()


@pytest.fixture
def make_user(django_user_model):
    def make(email="clara@example.test", password="Cliente.2026", **extra):
        extra.setdefault("first_name", "Clara")
        extra.setdefault("last_name", "Ospina")
        return django_user_model.objects.create_user(email=email, password=password, **extra)

    return make


@pytest.fixture
def customer(make_user):
    return make_user()


@pytest.fixture
def other_customer(make_user):
    return make_user(email="tomas@example.test", first_name="Tomás", last_name="Rendón")


@pytest.fixture
def staff(make_user):
    return make_user(email="taller@example.test", first_name="Taller", last_name="Tulipann", is_staff=True)


@pytest.fixture
def as_customer(customer):
    client = APIClient()
    client.force_authenticate(customer)
    return client


@pytest.fixture
def as_other(other_customer):
    client = APIClient()
    client.force_authenticate(other_customer)
    return client


@pytest.fixture
def as_staff(staff):
    client = APIClient()
    client.force_authenticate(staff)
    return client


@pytest.fixture
def city(db):
    department = Department.objects.create(name="Boyacá", shipping_cost=16000)
    return City.objects.create(department=department, name="Tunja")


@pytest.fixture
def catalogue(db):
    bulbs = Category.objects.create(name="Bulbos", slug="bulbos", kind="specimen", position=1)
    vases = Category.objects.create(name="Tulipaneras", slug="tulipaneras", kind="vase", position=2)
    flamed = Subcategory.objects.create(category=bulbs, name="Flameados", slug="flameados")

    def product(plate, name, category, price, stock, **extra):
        return Product.objects.create(
            plate=plate, name=name, slug=name.lower().replace(" ", "-"), category=category,
            summary=f"{name} summary", price=price, stock=stock,
            art={"petal": "#f29a6b", "shape": "cup", "seed": plate}, **extra,
        )

    return {
        "bulbs": bulbs,
        "vases": vases,
        "flamed": flamed,
        "aurora": product(1, "Aurora", bulbs, 38000, 10),
        "llama": product(2, "Llama", bulbs, 64000, 3, subcategory=flamed, epithet="Tulipa flammea"),
        "pagoda": product(3, "Pagoda", vases, 340000, 2),
        "retired": product(4, "Retirada", bulbs, 1000, 5, is_active=False),
    }


@pytest.fixture
def place(city):
    """Places an order through the service, as the API would."""
    from orders import services

    def place(user, lines):
        return services.place_order(
            user,
            items=[{"product": product.pk, "quantity": qty} for product, qty in lines],
            city=city, recipient=user.full_name, phone="3005550101", address="Calle 1 # 2-3",
        )

    return place
