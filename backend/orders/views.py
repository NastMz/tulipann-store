from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from catalog.serializers import ProductListSerializer

from . import services
from .models import Department, Order
from .serializers import (
    DepartmentSerializer,
    OrderDetailSerializer,
    OrderSummarySerializer,
    PaymentSerializer,
    PlaceOrderSerializer,
    QuoteRequestSerializer,
)


def order_queryset():
    return Order.objects.select_related("city__department", "user").prefetch_related(
        "items__product__category", "events__actor"
    )


def raise_business_error(error: services.OrderError):
    raise ValidationError({error.field or "detail": error.message})


class DepartmentListView(generics.ListAPIView):
    serializer_class = DepartmentSerializer
    pagination_class = None
    queryset = Department.objects.prefetch_related("cities")


class QuoteView(APIView):
    """Prices a cart. The SPA keeps the cart; the server is the source of truth for prices."""

    def post(self, request):
        serializer = QuoteRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            quote = services.quote(serializer.validated_data["items"], serializer.validated_data.get("city"))
        except services.OrderError as error:
            raise_business_error(error)
        return Response(
            {
                "lines": [
                    {
                        "product": ProductListSerializer(line.product).data,
                        "quantity": line.quantity,
                        "line_total": line.line_total,
                    }
                    for line in quote.lines
                ],
                "subtotal": quote.subtotal,
                "shipping_cost": quote.shipping_cost,
                "total": quote.total,
            }
        )


class OrderListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        orders = order_queryset().filter(user=request.user)
        return Response(OrderSummarySerializer(orders, many=True).data)

    def post(self, request):
        serializer = PlaceOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        try:
            order = services.place_order(
                request.user,
                items=data["items"],
                city=data["city"],
                recipient=data["recipient"],
                phone=data["phone"],
                address=data["address"],
                notes=data.get("notes", ""),
            )
        except services.OrderError as error:
            raise_business_error(error)
        return Response(OrderDetailSerializer(order_queryset().get(pk=order.pk)).data, status=status.HTTP_201_CREATED)


class OwnOrderMixin:
    permission_classes = [permissions.IsAuthenticated]

    def own_order(self, request, pk) -> Order:
        # Someone else's order answers 404, so order ids cannot be probed.
        return get_object_or_404(order_queryset(), pk=pk, user=request.user)


class OrderDetailView(OwnOrderMixin, APIView):
    def get(self, request, pk):
        return Response(OrderDetailSerializer(self.own_order(request, pk)).data)


class OrderPaymentView(OwnOrderMixin, APIView):
    """Simulated checkout: no gateway, no card data. The owner chooses the outcome."""

    def post(self, request, pk):
        order = self.own_order(request, pk)
        serializer = PaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            services.simulate_payment(order, request.user, serializer.validated_data["outcome"] == "approve")
        except services.OrderError as error:
            raise_business_error(error)
        return Response(OrderDetailSerializer(order_queryset().get(pk=order.pk)).data)


class OrderCancelView(OwnOrderMixin, APIView):
    def post(self, request, pk):
        order = self.own_order(request, pk)
        try:
            services.cancel_by_customer(order, request.user)
        except services.OrderError as error:
            raise_business_error(error)
        return Response(OrderDetailSerializer(order_queryset().get(pk=order.pk)).data)
