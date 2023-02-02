from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Product
from api.serializers import ProductSerializer


class ProductViewset(viewsets.GenericViewSet):
    queryset = Product.all_objects.all()
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        products_serialized = []
        products = self.queryset
        for product in products:
            products_serialized.append(ProductSerializer.serialize_front(product=product))
        return Response({'products': products_serialized})
