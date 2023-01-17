from rest_framework import serializers
from ..models import Department


class DepartmentCrudSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(max_length=30)

    class Meta:
        model = Department
        fields = ('department_name',)
    
    def validate(self, args):
        department_name = args.get('department_name', None)
        if Department.all_objects.filter(department_name=department_name).exists():
            raise serializers.ValidationError({'department_name': ('department already exists')})
        return super().validate(args)

    def create(self, validated_data):
        return Department.objects.create_department(**validated_data)
