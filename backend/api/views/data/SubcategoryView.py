from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Subcategory
from api.serializers import SubcategorySerializer


class SubcategoryView(APIView):
    """
    List all subcategories with soft delete filter for the initial page in frontend.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all subcategories with soft delete filter for the initial page in frontend.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all subcategories.
        """
        subcategories = Subcategory.all_objects.all()
        subcategories_serialized = []
        for subcategory in subcategories:
            subcategories_serialized.append(SubcategorySerializer.serialize_front(subcategory=subcategory))
        return Response({'subcategories': subcategories_serialized})
