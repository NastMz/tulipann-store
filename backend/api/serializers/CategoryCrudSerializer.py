from rest_framework import serializers
from ..models import Category


class CategoryCrudSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(max_length=50) 
    image = serializers.CharField(max_length=255)
    hash = serializers.CharField(max_length=255)

    class Meta:
        model = Category
        fields = (
            'category_name',
            'image',
            'hash')
    
    def validate(self, args):
        category_name = args.get('category_name', None)
        if Category.all_objects.filter(category_name=category_name).exists():
            raise serializers.ValidationError({'category_name': ('name already exists')})
        return super().validate(args)

    def create(self, validated_data):
        return Category.objects.create_category(**validated_data)