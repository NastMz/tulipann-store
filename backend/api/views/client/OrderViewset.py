from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.models import Order
from api.serializers import OrderSerializer


class OrderViewset(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer

    def list(self, request):
        orders = Order.all_objects.filter(user=self.request.user.id)
        orders_serialized = []
        for order in orders:
            orders_serialized.append(OrderSerializer.serialize_front(order=order))
        return Response({'orders': orders_serialized})
