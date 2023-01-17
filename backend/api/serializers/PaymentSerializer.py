from rest_framework import serializers
from ..models import PaymentMethod


class PaymentSerializer(serializers.ModelSerializer):
    def serialize_get_crud(payment):
        return {
            'payment_id': payment.payment_id,
            'payment_name': payment.payment_name
        }

    class Meta:
        model = PaymentMethod
        fields = (
            'payment_name',
        )
