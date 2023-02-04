from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Specification
from api.serializers import FeatureSerializer


class FeatureView(APIView):
    """
    List all comments with soft delete filter for frontend home page related to your specification.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all features with soft delete filter for frontend home page related to your specification.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all features.
        """
        specifications = Specification.all_objects.all()
        features_serialized = []
        for specification in specifications:
            features_serialized.append(FeatureSerializer.serialize_front(specification=specification))
        return Response({'features': features_serialized})
