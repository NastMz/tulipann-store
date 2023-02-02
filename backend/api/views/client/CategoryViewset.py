from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Category
from api.serializers import CategorySerializer


class CategoryViewset(viewsets.GenericViewSet):
    queryset = Category.all_objects.all()
    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        categories_serialized = []
        categories = self.queryset
        for category in categories:
            categories_serialized.append(CategorySerializer.serialize_front(category=category))
        return Response({'categories': categories_serialized})
