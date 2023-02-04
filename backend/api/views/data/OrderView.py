from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.models import Order
from api.serializers import OrderSerializer


class OrderView(APIView):
    """
    List all orders with soft delete filter for the initial page in frontend.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all orders with soft delete filter for the initial page in frontend.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all orders.
        """
        orders = Order.all_objects.filter(user=request.user.id)
        orders_serialized = []
        for order in orders:
            orders_serialized.append(OrderSerializer.serialize_front(order=order))
        return Response({'orders': orders_serialized})
