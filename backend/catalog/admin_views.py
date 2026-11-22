"""Workshop (staff-only) management of the catalogue."""
from django.db.models import ProtectedError
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Product, Review
from .serializers import ProductAdminRowSerializer, ProductWriteSerializer, ReviewSerializer
from .views import annotated_products


class StaffOnly(permissions.IsAdminUser):
    message = "Esta sección es solo para el taller."


class ProductAdminListView(generics.ListCreateAPIView):
    permission_classes = [StaffOnly]
    pagination_class = None

    def get_queryset(self):
        return annotated_products().order_by("plate")

    def get_serializer_class(self):
        return ProductWriteSerializer if self.request.method == "POST" else ProductAdminRowSerializer


class ProductAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [StaffOnly]
    serializer_class = ProductWriteSerializer
    queryset = Product.objects.all()
    http_method_names = ["get", "patch", "delete"]

    def destroy(self, request, *args, **kwargs):
        product = self.get_object()
        try:
            product.delete()
        except ProtectedError:
            # Plates already sold stay in the ledger: they are retired instead.
            product.is_active = False
            product.save(update_fields=["is_active", "updated_at"])
            return Response({"detail": "La lámina tiene pedidos: se retiró del catálogo."})
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReviewAdminListView(generics.ListAPIView):
    permission_classes = [StaffOnly]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        reviews = Review.objects.select_related("user", "product")[:100]
        rows = []
        for review in reviews:
            row = ReviewSerializer(review).data
            row["product"] = {"name": review.product.name, "slug": review.product.slug}
            rows.append(row)
        return Response(rows)


class ReviewAdminDeleteView(generics.DestroyAPIView):
    permission_classes = [StaffOnly]

    def delete(self, request, pk):
        get_object_or_404(Review, pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
