from rest_framework import serializers
from ..models import Tag


class TagSerializer(serializers.ModelSerializer):
    def serialize_get_crud(tag):
        return {
            'id': tag.id,
            'name': tag.name
        }
    
    class Meta: 
        model = Tag
        fields = (
            'name',
            )
