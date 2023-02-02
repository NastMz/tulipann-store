from rest_framework import serializers
from ..models import Order


class OrderCrudSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Order
        fields = (
            'id',
            'user',
            'state'
        )

    def create(self, validated_data):
        return Order.objects.create_order(**validated_data)
