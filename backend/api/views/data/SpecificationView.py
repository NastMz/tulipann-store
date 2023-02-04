from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Product
from api.serializers import SpecificationSerializer


class SpecificationView(APIView):
    """
    List all specifications with soft delete filter for frontend home page related to your product.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all specifications with soft delete filter for frontend home page related to your product.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all specifications.
        """
        products = Product.all_objects.all()
        specifications_serialized = []
        for product in products:
            specifications_serialized.append(SpecificationSerializer.serialize_front(product=product))
        return Response({'specifications': specifications_serialized})
