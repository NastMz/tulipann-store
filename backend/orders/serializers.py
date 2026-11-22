from rest_framework import serializers

from .models import City, Department, Order, OrderEvent, OrderItem


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["id", "name"]


class DepartmentSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = ["id", "name", "shipping_cost", "cities"]


class OrderItemSerializer(serializers.ModelSerializer):
    product_slug = serializers.CharField(source="product.slug", read_only=True)
    plate = serializers.IntegerField(source="product.plate", read_only=True)
    art = serializers.JSONField(source="product.art", read_only=True)
    kind = serializers.CharField(source="product.category.kind", read_only=True)
    line_total = serializers.IntegerField(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_slug", "product_name", "plate", "kind", "art",
                  "unit_price", "quantity", "line_total"]


class OrderEventSerializer(serializers.ModelSerializer):
    status_label = serializers.CharField(source="get_status_display", read_only=True)
    actor_is_staff = serializers.SerializerMethodField()

    class Meta:
        model = OrderEvent
        fields = ["id", "status", "status_label", "note", "actor_is_staff", "created_at"]

    def get_actor_is_staff(self, event: OrderEvent) -> bool:
        return bool(event.actor and event.actor.is_staff)


class OrderSummarySerializer(serializers.ModelSerializer):
    code = serializers.CharField(read_only=True)
    status_label = serializers.CharField(source="get_status_display", read_only=True)
    item_count = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ["id", "code", "status", "status_label", "total", "item_count", "created_at"]

    def get_item_count(self, order: Order) -> int:
        return sum(item.quantity for item in order.items.all())


class OrderDetailSerializer(OrderSummarySerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    events = OrderEventSerializer(many=True, read_only=True)
    city = serializers.CharField(source="city.name", read_only=True)
    department = serializers.CharField(source="city.department.name", read_only=True)

    class Meta(OrderSummarySerializer.Meta):
        fields = OrderSummarySerializer.Meta.fields + [
            "recipient", "phone", "address", "city", "department", "notes",
            "subtotal", "shipping_cost", "paid_at", "items", "events",
        ]


class StaffOrderSerializer(OrderDetailSerializer):
    customer = serializers.SerializerMethodField()
    allowed_transitions = serializers.SerializerMethodField()

    class Meta(OrderDetailSerializer.Meta):
        fields = OrderDetailSerializer.Meta.fields + ["customer", "allowed_transitions"]

    def get_customer(self, order: Order) -> dict:
        return {"id": order.user_id, "name": order.user.full_name, "email": order.user.email}

    def get_allowed_transitions(self, order: Order) -> list[dict]:
        from .services import STAFF_TRANSITIONS

        return [
            {"status": status, "label": Order.Status(status).label}
            for status in Order.Status.values
            if status in STAFF_TRANSITIONS[order.status]
        ]


class CartItemSerializer(serializers.Serializer):
    product = serializers.IntegerField(min_value=1)
    quantity = serializers.IntegerField(min_value=1)


class QuoteRequestSerializer(serializers.Serializer):
    items = CartItemSerializer(many=True, allow_empty=False)
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.select_related("department"), required=False)


class PlaceOrderSerializer(QuoteRequestSerializer):
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.select_related("department"))
    recipient = serializers.CharField(max_length=120)
    phone = serializers.RegexField(r"^[0-9 +()-]{7,20}$", error_messages={"invalid": "Teléfono no válido."})
    address = serializers.CharField(max_length=200)
    notes = serializers.CharField(max_length=300, required=False, allow_blank=True)


class PaymentSerializer(serializers.Serializer):
    outcome = serializers.ChoiceField(choices=["approve", "decline"])


class TransitionSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Order.Status.choices)
    note = serializers.CharField(max_length=200, required=False, allow_blank=True)
