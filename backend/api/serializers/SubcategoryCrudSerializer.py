from rest_framework import serializers
from ..models import Subcategory


class SubcategoryCrudSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50)

    class Meta:
        model = Subcategory
        fields = ('name', 'category')
    
    def validate(self, args):
        name = args.get('name', None)
        messages = []
        if Subcategory.all_objects.filter(name=name).exists():
            messages.append('Este nombre ya se encuentra registrado')
            raise serializers.ValidationError(messages)
        return super().validate(args)

    def create(self, validated_data):
        return Subcategory.objects.create_subcategory(**validated_data)