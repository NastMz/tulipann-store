from rest_framework import serializers
from ..models import Role


class RoleCrudSerializer(serializers.ModelSerializer):
    role_name = serializers.CharField(max_length=20)

    class Meta:
        model = Role
        fields = ('role_name',)
    
    def validate(self, args):
        role_name = args.get('role_name', None)
        if Role.all_objects.filter(role_name=role_name).exists():
            raise serializers.ValidationError({'role_name': ('role already exists')})
        return super().validate(args)

    def create(self, validated_data):
        return Role.objects.create_role(**validated_data)