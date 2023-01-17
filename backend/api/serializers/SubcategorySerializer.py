from rest_framework import serializers
from ..models import Category, Subcategory


class SubcategorySerializer(serializers.ModelSerializer):
    def serialize_front(subcategory):
        category = Category.all_objects.get(category_id=subcategory.category.category_id)
        return {
            'id': subcategory.subcategory_id,
            'name': subcategory.subcategory_name,
            'category': category.category_id,
        }

    def serialize_get_crud(subcategory):
        return {
            'subcategory_id': subcategory.subcategory_id,
            'subcategory_name': subcategory.subcategory_name,
            'category': subcategory.category.category_id
        }

    class Meta: 
        model = Subcategory
        fields = (
            'subcategory_name',
            'category'
            )

