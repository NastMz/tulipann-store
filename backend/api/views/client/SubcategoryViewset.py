from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Subcategory
from api.serializers import SubcategorySerializer


class SubcategoryViewset(viewsets.GenericViewSet):
    queryset = Subcategory.all_objects.all()
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        subcategories_serialized = []
        subcategories = self.queryset
        for subcategory in subcategories:
            subcategories_serialized.append(SubcategorySerializer.serialize_front(subcategory=subcategory))
        return Response({'subcategories': subcategories_serialized})
