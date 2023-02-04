from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Product
from api.serializers import ProductSerializer


class ProductView(APIView):
    """
    List all products with soft delete filter for the initial page in frontend.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all products with soft delete filter for the initial page in frontend.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all products.
        """
        products = Product.all_objects.all()
        products_serialized = []
        for product in products:
            products_serialized.append(ProductSerializer.serialize_front(product=product))
        return Response({'products': products_serialized})
