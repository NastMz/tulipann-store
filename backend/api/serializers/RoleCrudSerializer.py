from rest_framework import serializers
from ..models import Role


class RoleCrudSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=20)

    class Meta:
        model = Role
        fields = ('name',)
    
    def validate(self, args):
        name = args.get('name', None)
        if Role.all_objects.filter(name=name).exists():
            raise serializers.ValidationError({'name': 'role already exists'})
        return super().validate(args)

    def create(self, validated_data):
        return Role.objects.create_role(**validated_data)