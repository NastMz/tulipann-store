from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Specification
from api.serializers import FeatureSerializer


class FeatureViewset(viewsets.GenericViewSet):
    queryset = Specification.all_objects.all()
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        features_serialized = []
        specs = self.queryset
        for specification in specs:
            features_serialized.append(FeatureSerializer.serialize_front(specification=specification))
        return Response({'features': features_serialized})
