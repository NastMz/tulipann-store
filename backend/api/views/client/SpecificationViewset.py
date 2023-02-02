from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Product
from api.serializers import SpecificationSerializer


class SpecificationViewset(viewsets.GenericViewSet):
    queryset = Product.all_objects.all()
    serializer_class = SpecificationSerializer
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        specs_serialized = []
        products = self.queryset
        for product in products:
            specs_serialized.append(SpecificationSerializer.serialize_front(product=product))
        return Response({'specs': specs_serialized})
