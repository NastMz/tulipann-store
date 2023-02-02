from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Product
from api.serializers import CommentarySerializer


class CommentaryViewset(viewsets.GenericViewSet):
    queryset = Product.all_objects.all()
    serializer_class = CommentarySerializer
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        commentaries_serialized = []
        products = self.queryset
        for product in products:
            commentaries_serialized.append(CommentarySerializer.serialize_front(product=product))
        return Response({'commentaries': commentaries_serialized})
