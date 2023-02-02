from rest_framework import serializers
from ..models import Tag


class TagCrudSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=20)

    class Meta:
        model = Tag
        fields = ('name',)
    
    def validate(self, args):
        name = args.get('name', None)
        if Tag.all_objects.filter(name=name).exists():
            raise serializers.ValidationError({'name': 'tag already exists'})
        return super().validate(args)

    def create(self, validated_data):
        return Tag.objects.create_tag(**validated_data)