from rest_framework import serializers
from ..models import Order, State


class OrderCrudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'user',
            'payment',
            'state'
        )

    def validate(self, args):
        user = args.get('user', None)
        state_default = State.all_objects.get(state_name='Iniciado')
        if Order.all_objects.filter(user=user, state=state_default).exists():
            raise serializers.ValidationError({'user': ('This user has an order started')})
        return super().validate(args)

    def create(self, validated_data):
        return Order.objects.create_order(**validated_data)
