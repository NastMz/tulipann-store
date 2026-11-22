from django.db.models import Avg, Count, Q
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from orders.services import has_purchased

from .models import Category, Product, Review
from .serializers import (
    CategorySerializer,
    ProductDetailSerializer,
    ProductListSerializer,
    ReviewSerializer,
)

SORTS = {
    "plate": ["plate"],
    "price": ["price", "plate"],
    "-price": ["-price", "plate"],
    "name": ["name"],
    "new": ["-created_at", "plate"],
}


def annotated_products():
    return (
        Product.objects.select_related("category", "subcategory")
        .annotate(rating=Avg("reviews__rating"), review_count=Count("reviews", distinct=True))
    )


class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    pagination_class = None

    def get_queryset(self):
        return Category.objects.prefetch_related("subcategories").annotate(
            product_count=Count("products", filter=Q(products__is_active=True))
        ).order_by("position", "name")


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    pagination_class = None

    def get_queryset(self):
        params = self.request.query_params
        queryset = annotated_products().filter(is_active=True)
        if params.get("category"):
            queryset = queryset.filter(category__slug=params["category"])
        if params.get("subcategory"):
            queryset = queryset.filter(subcategory__slug=params["subcategory"])
        if params.get("q"):
            term = params["q"].strip()
            queryset = queryset.filter(
                Q(name__icontains=term) | Q(epithet__icontains=term) | Q(summary__icontains=term)
            )
        return queryset.order_by(*SORTS.get(params.get("sort", "plate"), SORTS["plate"]))


class ProductDetailView(APIView):
    def get(self, request, slug):
        product = get_object_or_404(annotated_products(), slug=slug, is_active=True)
        related = (
            annotated_products()
            .filter(category=product.category, is_active=True)
            .exclude(pk=product.pk)
            .order_by("plate")[:3]
        )
        user = request.user
        can_review = (
            user.is_authenticated
            and has_purchased(user, product)
            and not product.reviews.filter(user=user).exists()
        )
        return Response(
            {
                "product": ProductDetailSerializer(product).data,
                "related": ProductListSerializer(related, many=True).data,
                "reviews": ReviewSerializer(product.reviews.select_related("user")[:20], many=True).data,
                "can_review": can_review,
            }
        )


class ReviewCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, slug):
        product = get_object_or_404(Product, slug=slug, is_active=True)
        if not has_purchased(request.user, product):
            raise PermissionDenied("Solo quien ha recibido esta lámina puede reseñarla.")
        if product.reviews.filter(user=request.user).exists():
            raise ValidationError({"detail": "Ya dejaste una nota para esta lámina."})
        serializer = ReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(product=product, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
