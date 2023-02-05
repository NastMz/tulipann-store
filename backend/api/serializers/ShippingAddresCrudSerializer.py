from rest_framework import serializers
from ..models import ShippingAddress


class ShippingAddressCrudSerializer(serializers.ModelSerializer):
    """
    Serializer class for CRUD operations on the ShippingAddress model.
    """

    class Meta:
        model = ShippingAddress
        fields = (
            'address',
            'zipCode',
            'neighborhood',
            'department',
            'city')

    def create(self, validated_data):
        """
        Method to create a new Shipping address
        Args:
            validated_data: Data that has passed the validation
        Returns:
            A new shipping address object
        """
        return ShippingAddress.objects.create_shipping_address(**validated_data)
