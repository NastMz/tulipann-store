from rest_framework import serializers
from ..models import Category


class CategorySerializer(serializers.ModelSerializer):

    def serialize_front(category):
        return {
            'id': category.category_id,
            'name': category.category_name,
            'image': category.image,
            'hash': category.hash
        }

    def serialize_get_crud(category):
        return {
            'category_id': category.category_id,
            'category_name': category.category_name,
            'image': category.image,
            'hash': category.hash
        }

    class Meta:
        model = Category
        fields = (
            'category_name',
            'image',
            'hash'
        )
