"""Loads the demo cabinet: catalogue, customers, orders, reviews and gazette.

Idempotent: if the catalogue already has categories, nothing is touched.
"""
from datetime import timedelta

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db import transaction
from django.test.utils import override_settings
from django.utils import timezone

from catalog.models import Category, Product, Review, Subcategory
from journal.models import Article
from orders import services
from orders.models import City, Department, Order

from . import seed_data as data

STAFF_PATH = {
    "paid": [],
    "preparing": ["preparing"],
    "shipped": ["preparing", "shipped"],
    "delivered": ["preparing", "shipped", "delivered"],
}


class Command(BaseCommand):
    help = "Loads demo data (only when the catalogue is empty)."

    def add_arguments(self, parser):
        parser.add_argument("--quiet-mail", action="store_true", help="Do not send the demo e-mails.")

    def handle(self, *args, **options):
        if Category.objects.exists():
            self.stdout.write("Demo data already present; nothing to do.")
            return
        mailers = settings.MAILERS
        if options["quiet_mail"]:
            mailers = {"default": {"BACKEND": "django.core.mail.backends.dummy.EmailBackend"}}
        with override_settings(MAILERS=mailers), transaction.atomic():
            self._geography()
            self._catalogue()
            users = self._users()
            self._orders(users)
            self._reviews(users)
            self._articles()
        self.stdout.write(self.style.SUCCESS("Demo cabinet loaded."))

    def _geography(self):
        for name, cost, cities in data.DEPARTMENTS:
            department = Department.objects.create(name=name, shipping_cost=cost)
            City.objects.bulk_create(City(department=department, name=city) for city in cities)

    def _catalogue(self):
        subcategories = {}
        for spec in data.CATEGORIES:
            category = Category.objects.create(
                name=spec["name"], slug=spec["slug"], kind=spec["kind"],
                description=spec["description"], position=spec["position"],
            )
            for slug, name in spec["subcategories"]:
                subcategories[slug] = Subcategory.objects.create(category=category, name=name, slug=slug)
        for spec in data.PRODUCTS:
            fields = dict(spec)
            fields["category"] = Category.objects.get(slug=fields["category"])
            fields["subcategory"] = subcategories[fields["subcategory"]]
            fields["details"] = [{"label": label, "value": value} for label, value in fields["details"]]
            Product(**fields).full_clean()
            Product.objects.create(**fields)

    def _users(self):
        users = {}
        for spec in data.USERS:
            fields = dict(spec)
            password = fields.pop("password")
            users[fields["email"]] = get_user_model().objects.create_user(password=password, **fields)
        return users

    def _orders(self, users):
        staff = next(user for user in users.values() if user.is_staff)
        now = timezone.now()
        for email, city_name, lines, final, days_ago in data.ORDERS:
            user = users[email]
            products = {p.plate: p for p in Product.objects.filter(plate__in=[plate for plate, _ in lines])}
            order = services.place_order(
                user,
                items=[{"product": products[plate].pk, "quantity": qty} for plate, qty in lines],
                city=City.objects.get(name=city_name),
                recipient=user.full_name,
                phone=user.phone,
                address="Calle 12 # 3-45",
            )
            if final != "awaiting_payment":
                services.simulate_payment(order, user, approved=True)
                for status in STAFF_PATH[final]:
                    services.transition_by_staff(order, staff, status)
            when = now - timedelta(days=days_ago, hours=3)
            Order.objects.filter(pk=order.pk).update(
                created_at=when, paid_at=when if final != "awaiting_payment" else None
            )
            for offset, event in enumerate(order.events.all()):
                type(event).objects.filter(pk=event.pk).update(created_at=when + timedelta(hours=offset * 18))

    def _reviews(self, users):
        for email, plate, rating, text in data.REVIEWS:
            Review.objects.create(user=users[email], product=Product.objects.get(plate=plate), rating=rating, text=text)

    def _articles(self):
        today = timezone.localdate()
        for spec in data.ARTICLES:
            fields = dict(spec)
            fields["published_on"] = today - timedelta(days=fields.pop("days_ago"))
            Article.objects.create(**fields)
