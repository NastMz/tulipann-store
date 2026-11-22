from django.utils.text import slugify
from rest_framework import serializers

from .art import validate_art
from .models import Category, Product, Review, Subcategory


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ["id", "name", "slug"]


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(many=True, read_only=True)
    product_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "kind", "description", "subcategories", "product_count"]


class CategoryRefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "kind"]


class ProductListSerializer(serializers.ModelSerializer):
    category = CategoryRefSerializer(read_only=True)
    subcategory = SubcategorySerializer(read_only=True)
    rating = serializers.FloatField(read_only=True, allow_null=True)
    review_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "slug", "name", "epithet", "plate", "summary", "price", "stock",
            "category", "subcategory", "art", "rating", "review_count",
        ]


class ProductDetailSerializer(ProductListSerializer):
    class Meta(ProductListSerializer.Meta):
        fields = ProductListSerializer.Meta.fields + ["story", "details"]


class ProductAdminRowSerializer(ProductListSerializer):
    class Meta(ProductListSerializer.Meta):
        fields = ProductListSerializer.Meta.fields + ["is_active"]


class ReviewSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ["id", "rating", "text", "author", "created_at"]
        read_only_fields = ["id", "author", "created_at"]

    def get_author(self, review: Review) -> str:
        # Only the first name and the initial of the last name are public.
        initial = f" {review.user.last_name[:1]}." if review.user.last_name else ""
        return f"{review.user.first_name}{initial}"


class DetailRowSerializer(serializers.Serializer):
    label = serializers.CharField(max_length=40)
    value = serializers.CharField(max_length=120)


class ProductWriteSerializer(serializers.ModelSerializer):
    """Used by the workshop (staff) to compose or edit a plate."""

    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    subcategory = serializers.PrimaryKeyRelatedField(
        queryset=Subcategory.objects.all(), allow_null=True, required=False
    )
    slug = serializers.SlugField(required=False)
    details = DetailRowSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = [
            "id", "slug", "name", "epithet", "plate", "summary", "story", "price", "stock",
            "category", "subcategory", "details", "art", "is_active",
        ]

    def validate_art(self, value):
        from django.core.exceptions import ValidationError as DjangoValidationError

        try:
            validate_art(value)
        except DjangoValidationError as error:
            raise serializers.ValidationError(list(error.messages))
        return value

    def validate(self, attrs):
        category = attrs.get("category", getattr(self.instance, "category", None))
        subcategory = attrs.get("subcategory", getattr(self.instance, "subcategory", None))
        if subcategory is not None and subcategory.category_id != category.id:
            raise serializers.ValidationError({"subcategory": "La subcategoría no pertenece a la categoría."})
        if not attrs.get("slug") and self.instance is None:
            attrs["slug"] = self._unique_slug(attrs["name"])
        return attrs

    @staticmethod
    def _unique_slug(name: str) -> str:
        base = slugify(name)[:40] or "lamina"
        slug, counter = base, 2
        while Product.objects.filter(slug=slug).exists():
            slug, counter = f"{base}-{counter}", counter + 1
        return slug
