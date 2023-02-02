from rest_framework import serializers
from ..models import Category, Subcategory


class SubcategorySerializer(serializers.ModelSerializer):
    def serialize_front(subcategory):
        category = Category.all_objects.get(id=subcategory.category.id)
        return {
            'id': subcategory.id,
            'name': subcategory.name,
            'category': category.id,
        }

    def serialize_get_crud(subcategory):
        return {
            'id': subcategory.id,
            'name': subcategory.name,
            'categoryId': subcategory.category.id
        }

    class Meta: 
        model = Subcategory
        fields = (
            'name',
            'category'
            )

