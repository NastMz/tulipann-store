from rest_framework import serializers
from ..models import Category


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model
    """

    def serialize_front(category):
        """
        Returns serialized representation of a category for frontend usage
        Args:
            category (Category): Instance of Category model
        Returns:
            dict: serialized representation of a category
        """
        return {
            'id': category.id,
            'name': category.name,
            'image': {
                'src': category.image,
                'hash': category.hash
            }
        }

    def serialize_get_crud(category):
        """
        Returns serialized representation of a category for CRUD operations
        Args:
            category (Category): Instance of Category model
        Returns:
            dict: serialized representation of a category
        """
        return {
            'id': category.id,
            'name': category.name,
            'image': {
                'src': category.image,
                'hash': category.hash
            }
        }

    class Meta:
        model = Category
        fields = (
            'name',
            'image',
            'hash'
        )
