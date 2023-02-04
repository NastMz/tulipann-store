from rest_framework import serializers
from ..models import Product


class ProductCrudSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=255)
    stock = serializers.IntegerField()
    price = serializers.IntegerField()

    class Meta:
        model = Product
        fields = (
            'name',
            'description',
            'stock',
            'price',
            'category'
        )

    def validate(self, args):
        name = args.get('name', None)
        stock = args.get('stock', None)
        price = args.get('price', None)
        messages = []

        if Product.all_objects.filter(name=name).exists():
            messages.append('Este nombre ya se encuentra registrado')

        if stock < 0 or price < 0:
            messages.append('El precio y el stock deben ser mayores que cero')

        if messages:
            raise serializers.ValidationError(messages)

        return super().validate(args)

    def create(self, validated_data):
        return Product.objects.create_product(**validated_data)
