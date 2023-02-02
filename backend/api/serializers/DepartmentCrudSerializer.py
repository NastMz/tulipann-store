from rest_framework import serializers
from ..models import Department


class DepartmentCrudSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=30)

    class Meta:
        model = Department
        fields = ('name',)
    
    def validate(self, args):
        name = args.get('name', None)
        if Department.all_objects.filter(name=name).exists():
            raise serializers.ValidationError({'name': 'department already exists'})
        return super().validate(args)

    def create(self, validated_data):
        return Department.objects.create_department(**validated_data)
