from rest_framework import serializers
from ..models import Category


class CategoryCrudSerializer(serializers.ModelSerializer):
    """
    Serializer class for CRUD operations on the Category model.
    """
    name = serializers.CharField(max_length=50)
    image = serializers.CharField(max_length=255)
    hash = serializers.CharField(max_length=255)

    class Meta:
        model = Category
        fields = (
            'name',
            'image',
            'hash')
    
    def validate(self, args):
        """
        This function validate the data passed in the serializer, it checks if the name already exists in the
        database.
        Args:
            args: A dictionary containing the data passed to the serializer
        Returns:
            The data if the validation pass, it raises a ValidationError if the name already exists
        """
        messages = []

        name = args.get('name', None)
        if Category.all_objects.filter(name=name).exists():
            messages.append('Este nombre ya se encuentra registrado')

        if messages:
            raise serializers.ValidationError(messages)

        return super().validate(args)

    def create(self, validated_data):
        """
        This function creates a new category in the database.
        Args:
            validated_data: The data passed to the serializer after pass the validation
        Returns:
             The new category created
        """
        return Category.objects.create_category(**validated_data)
