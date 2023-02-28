from rest_framework import serializers
from ..models import ProductShipping


class ProductShippingSerializer(serializers.ModelSerializer):
    """
    Serializer for ProductShipping model
    """
    class Meta:
        model = ProductShipping
        fields = (
            'product',
            'department'
        )

    def create(self, validated_data):
        """
        Create method is used to create an ProductShipping instance.

        Args:
            validated_data (dict): A dictionary containing the data to create an ProductShipping instance.

        Returns:
            ProductShipping: A newly created ProductShipping instance
        """
        return ProductShipping.objects.create_product_shipping(**validated_data)
