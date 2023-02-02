from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Order
from api.serializers import OrderProductSerializer


class OrderProductViewset(viewsets.GenericViewSet):
    queryset = Order.all_objects.all()
    serializer_class = OrderProductSerializer
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        orderproducts_serialized = []
        orders = self.queryset
        for order in orders:
            orderproducts_serialized.append(OrderProductSerializer.serialize_front(order=order))
        return Response({'orderproducts': orderproducts_serialized})
