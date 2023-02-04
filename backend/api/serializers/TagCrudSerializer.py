from rest_framework import serializers
from ..models import Tag


class TagCrudSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=20)

    class Meta:
        model = Tag
        fields = ('name',)
    
    def validate(self, args):
        name = args.get('name', None)
        messages = []
        if Tag.all_objects.filter(name=name).exists():
            messages.append('Esta etiqueta ya se encuentra registrada')
            raise serializers.ValidationError(messages)
        return super().validate(args)

    def create(self, validated_data):
        return Tag.objects.create_tag(**validated_data)