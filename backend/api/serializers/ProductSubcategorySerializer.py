from rest_framework import serializers
from ..models import ProductSubcategory


class ProductSubcategorySerializer(serializers.ModelSerializer):
    def serialize_front(product):
        db_subcategories = list(ProductSubcategory.all_objects.prefetch_related('product').filter(product=product))

        subcategories = []
        for subcategory in db_subcategories:
            subcategories.append(subcategory.subcategory.id)

        return subcategories

    class Meta:
        model = ProductSubcategory
        fields = (
            'product',
            'subcategory'
        )

    def validate(self, args):
        return super().validate(args)

    def create(self, validated_data):
        return ProductSubcategory.objects.create_product_subcategory(**validated_data)
