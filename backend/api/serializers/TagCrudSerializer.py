from rest_framework import serializers
from ..models import Tag


class TagCrudSerializer(serializers.ModelSerializer):
    tag_name = serializers.CharField(max_length=20)

    class Meta:
        model = Tag
        fields = ('tag_name',)
    
    def validate(self, args):
        tag_name = args.get('tag_name', None)
        if Tag.all_objects.filter(tag_name=tag_name).exists():
            raise serializers.ValidationError({'tag_name': 'tag already exists'})
        return super().validate(args)

    def create(self, validated_data):
        return Tag.objects.create_tag(**validated_data)