"""Workshop (staff-only) ledger: orders, customers and the summary page."""
from datetime import timedelta

from django.contrib.auth import get_user_model
from django.db.models import Count, Q, Sum
from django.db.models.functions import TruncDate
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from catalog.models import Product

from . import services
from .models import Order
from .serializers import OrderSummarySerializer, StaffOrderSerializer, TransitionSerializer
from .views import order_queryset, raise_business_error

REVENUE_STATES = services.PURCHASED_STATES


class StaffOnly(permissions.IsAdminUser):
    message = "Esta sección es solo para el taller."


class StaffOrderListView(APIView):
    permission_classes = [StaffOnly]

    def get(self, request):
        orders = order_queryset()
        if request.query_params.get("status") in Order.Status.values:
            orders = orders.filter(status=request.query_params["status"])
        rows = []
        for order in orders[:200]:
            row = OrderSummarySerializer(order).data
            row["customer"] = order.user.full_name
            row["city"] = order.city.name
            rows.append(row)
        return Response(rows)


class StaffOrderDetailView(APIView):
    permission_classes = [StaffOnly]

    def get(self, request, pk):
        return Response(StaffOrderSerializer(get_object_or_404(order_queryset(), pk=pk)).data)


class StaffOrderTransitionView(APIView):
    """The only way an order moves after payment. Server-side rules decide what is allowed."""

    permission_classes = [StaffOnly]

    def post(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        serializer = TransitionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            services.transition_by_staff(
                order, request.user, serializer.validated_data["status"], serializer.validated_data.get("note", "")
            )
        except services.OrderError as error:
            raise_business_error(error)
        return Response(StaffOrderSerializer(order_queryset().get(pk=pk)).data)


class CustomerListView(APIView):
    permission_classes = [StaffOnly]

    def get(self, request):
        customers = (
            get_user_model()
            .objects.filter(is_staff=False)
            .annotate(
                order_count=Count("orders", filter=Q(orders__status__in=REVENUE_STATES)),
                spent=Sum("orders__total", filter=Q(orders__status__in=REVENUE_STATES)),
            )
            .order_by("-date_joined")
        )
        return Response(
            [
                {
                    "id": user.id,
                    "name": user.full_name,
                    "email": user.email,
                    "date_joined": user.date_joined,
                    "order_count": user.order_count,
                    "spent": user.spent or 0,
                }
                for user in customers
            ]
        )


class SummaryView(APIView):
    permission_classes = [StaffOnly]

    def get(self, request):
        sold = Order.objects.filter(status__in=REVENUE_STATES)
        since = timezone.now() - timedelta(days=13)
        daily = {
            row["day"]: row["revenue"]
            for row in sold.filter(paid_at__gte=since)
            .annotate(day=TruncDate("paid_at"))
            .values("day")
            .annotate(revenue=Sum("total"))
        }
        today = timezone.localdate()
        by_status = dict(Order.objects.values_list("status").annotate(n=Count("id")))
        return Response(
            {
                "revenue": sold.aggregate(total=Sum("total"))["total"] or 0,
                "orders_to_prepare": by_status.get(Order.Status.PAID, 0) + by_status.get(Order.Status.PREPARING, 0),
                "customers": get_user_model().objects.filter(is_staff=False).count(),
                "status_counts": [
                    {"status": status, "label": label, "count": by_status.get(status, 0)}
                    for status, label in Order.Status.choices
                ],
                "daily_revenue": [
                    {"day": day.isoformat(), "revenue": daily.get(day, 0)}
                    for day in (today - timedelta(days=offset) for offset in range(13, -1, -1))
                ],
                "low_stock": [
                    {"id": p.id, "name": p.name, "plate": p.plate, "stock": p.stock, "slug": p.slug}
                    for p in Product.objects.filter(is_active=True, stock__lte=5).order_by("stock", "plate")[:6]
                ],
                "recent_orders": OrderSummarySerializer(order_queryset()[:5], many=True).data,
            }
        )
