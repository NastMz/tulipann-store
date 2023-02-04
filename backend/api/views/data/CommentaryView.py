from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Product
from api.serializers import CommentarySerializer


class CommentaryView(APIView):
    """
    List all commentaries with soft delete filter for frontend home page related to your product.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all commentaries with soft delete filter for frontend home page related to your product.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all commentaries.
        """
        products = Product.all_objects.all()
        commentaries_serialized = []
        for product in products:
            commentaries_serialized.append(CommentarySerializer.serialize_front(product=product))
        return Response({'commentaries': commentaries_serialized})
