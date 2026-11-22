from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from .art import validate_art


class Category(models.Model):
    """A room of the cabinet. ``kind`` decides how product plates are drawn."""

    class Kind(models.TextChoices):
        SPECIMEN = "specimen", "Bulbo (lámina de espécimen)"
        BOUQUET = "bouquet", "Ramo"
        VASE = "vase", "Tulipanera"
        PRINT = "print", "Grabado enmarcado"

    name = models.CharField(max_length=60)
    slug = models.SlugField(unique=True)
    kind = models.CharField(max_length=10, choices=Kind.choices)
    description = models.CharField(max_length=240, blank=True)
    position = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["position", "name"]
        verbose_name_plural = "categories"

    def __str__(self) -> str:
        return self.name


class Subcategory(models.Model):
    category = models.ForeignKey(Category, related_name="subcategories", on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    slug = models.SlugField()

    class Meta:
        ordering = ["name"]
        constraints = [models.UniqueConstraint(fields=["category", "slug"], name="unique_subcategory_slug")]
        verbose_name_plural = "subcategories"

    def __str__(self) -> str:
        return f"{self.category.name} / {self.name}"


class Product(models.Model):
    """One plate of the catalogue. Its picture is generated from ``art``."""

    name = models.CharField(max_length=80)
    slug = models.SlugField(unique=True)
    epithet = models.CharField(max_length=120, blank=True)
    plate = models.PositiveIntegerField(unique=True, help_text="Plate number shown as a roman numeral.")
    summary = models.CharField(max_length=240)
    story = models.TextField(blank=True)
    price = models.PositiveIntegerField(help_text="Price in Colombian pesos.")
    stock = models.PositiveIntegerField(default=0)
    category = models.ForeignKey(Category, related_name="products", on_delete=models.PROTECT)
    subcategory = models.ForeignKey(
        Subcategory, related_name="products", on_delete=models.SET_NULL, null=True, blank=True
    )
    details = models.JSONField(default=list, blank=True)
    art = models.JSONField(default=dict, validators=[validate_art])
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["plate"]

    def __str__(self) -> str:
        return f"{self.plate}. {self.name}"


class Review(models.Model):
    """A garden note: only customers who bought the plate may leave one."""

    product = models.ForeignKey(Product, related_name="reviews", on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="reviews", on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    text = models.CharField(max_length=600)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        constraints = [models.UniqueConstraint(fields=["product", "user"], name="one_review_per_customer")]

    def __str__(self) -> str:
        return f"{self.product.name} · {self.rating}/5"
