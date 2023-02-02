from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Product
from api.serializers import ImageSerializer


class ImageViewset(viewsets.GenericViewSet):
    queryset = Product.all_objects.all()
    serializer_class = ImageSerializer
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        images_serialized = []
        products = self.queryset
        for product in products:
            images_serialized.append(ImageSerializer.serialize_front(product=product))
        return Response({'images': images_serialized})
