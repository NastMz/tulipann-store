from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Order
from api.serializers import OrderProductSerializer


class OrderProductView(APIView):
    """
    List all orders with related products with soft delete filter for the initial page in frontend.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all orders with related products with soft delete filter for the initial page in frontend.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all orders with related products.
        """
        orders = Order.all_objects.all()
        order_products_serialized = []
        for order in orders:
            order_products_serialized.append(OrderProductSerializer.serialize_front(order=order))
        return Response({'order_products': order_products_serialized})
