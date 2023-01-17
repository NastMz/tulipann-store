from rest_framework import serializers
from ..models import PaymentMethod


class PaymentCrudSerializer(serializers.ModelSerializer):
    payment_name = serializers.CharField(max_length=30)

    class Meta:
        model = PaymentMethod
        fields = ('payment_name',)
    
    def validate(self, args):
        payment_name = args.get('payment_name', None)
        if PaymentMethod.all_objects.filter(payment_name=payment_name).exists():
            raise serializers.ValidationError({'payment_name': ('payment already exists')})
        return super().validate(args)

    def create(self, validated_data):
        return PaymentMethod.objects.create_payment(**validated_data)