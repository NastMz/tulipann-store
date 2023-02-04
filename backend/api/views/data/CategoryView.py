from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Category
from api.serializers import CategorySerializer


class CategoryView(APIView):
    """
    List all categories with soft delete filter for the initial page in frontend.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all categories with soft delete filter for the initial page in frontend.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all categories.
        """
        categories = Category.all_objects.all()
        categories_serialized = []
        for category in categories:
            categories_serialized.append(CategorySerializer.serialize_front(category=category))
        return Response({'categories': categories_serialized})

