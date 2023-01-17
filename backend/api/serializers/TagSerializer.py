from rest_framework import serializers
from ..models import Tag


class TagSerializer(serializers.ModelSerializer):
    def serialize_get_crud(tag):
        return {
            'tag_id': tag.tag_id,
            'tag_name': tag.tag_name
        }
    
    class Meta: 
        model = Tag
        fields = (
            'tag_name',
            )
