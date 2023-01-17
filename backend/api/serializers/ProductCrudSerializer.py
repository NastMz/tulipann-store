from rest_framework import serializers
from ..models import Product


class ProductCrudSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=255)
    stock = serializers.IntegerField()
    price = serializers.IntegerField()

    class Meta:
        model = Product
        fields = (
            'product_name',
            'description',
            'stock',
            'price',
            'category'
        )

    def validate(self, args):
        product_name = args.get('product_name', None)
        stock = args.get('stock', None)
        price = args.get('price', None)
        if Product.all_objects.filter(product_name=product_name).exists():
            raise serializers.ValidationError({'product_name': ('name already exists')})
        if stock < 0 or price < 0:
            raise serializers.ValidationError({'stock and price': ('Must be greater than zero')})
        return super().validate(args)

    def create(self, validated_data):
        return Product.objects.create_product(**validated_data)
