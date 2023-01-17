from rest_framework import serializers
from ..models import Subcategory


class SubcategoryCrudSerializer(serializers.ModelSerializer):
    subcategory_name = serializers.CharField(max_length=50)

    class Meta:
        model = Subcategory
        fields = ('subcategory_name', 'category')
    
    def validate(self, args):
        subcategory_name = args.get('subcategory_name', None)
        if Subcategory.all_objects.filter(subcategory_name=subcategory_name).exists():
            raise serializers.ValidationError({'subcategory_name': ('name already exists')})
        return super().validate(args)

    def create(self, validated_data):
        return Subcategory.objects.create_subcategory(**validated_data)