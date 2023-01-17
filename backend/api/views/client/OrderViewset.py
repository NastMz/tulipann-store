from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Order
from api.serializers import OrderSerializer


class OrderViewset(viewsets.GenericViewSet):
    queryset = Order.all_objects.all()
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        orders_serialized = []
        orders = self.queryset
        for order in orders:
            orders_serialized.append(OrderSerializer.serialize_front(order=order))
        return Response({'orders': orders_serialized})
