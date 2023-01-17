from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Product
from api.serializers import ProductSubcategorySerializer


class ProductSubcategoryViewset(viewsets.GenericViewSet):
    queryset = Product.all_objects.all()
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        subcategories_serialized = []
        products = self.queryset
        for product in products:
            subcategories_serialized.append(ProductSubcategorySerializer.serialize_front(product=product))
        return Response({'subcategories': subcategories_serialized})
