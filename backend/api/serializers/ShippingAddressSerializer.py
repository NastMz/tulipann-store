from rest_framework import serializers
from ..models import ShippingAddress


class ShippingAddressSerializer(serializers.ModelSerializer):
    """
    Serializer for ShippingAddress model
    """

    def serialize_front(shipping_address):
        """
        Returns serialized representation of a shipping_address for frontend usage
        Args:
            shipping_address (ShippingAddress): Instance of ShippingAddress model
        Returns:
            dict: serialized representation of a shipping_address
        """
        return {
            'id': shipping_address.id,
            'address': shipping_address.address,
            'zipCode': shipping_address.zipCode,
            'neighborhood': shipping_address.neighborhood,
            'departmentId': shipping_address.department.id,
            'cityId': shipping_address.city.id
        }

    class Meta:
        model = ShippingAddress
        fields = (
            'address',
            'zipCode',
            'neighborhood',
            'department',
            'city'
        )
