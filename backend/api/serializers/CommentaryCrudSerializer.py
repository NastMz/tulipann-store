from rest_framework import serializers
from ..models import Commentary


class CommentaryCrudSerializer(serializers.ModelSerializer):
    """
    Serializer class for CRUD operations on the Commentary model.
    """
    rate = serializers.IntegerField()
    text = serializers.CharField(max_length=255)

    class Meta:
        model = Commentary
        fields = (
            'rate',
            'text',
            'product',
            'user'
        )

    def validate(self, args):
        """
        Method to validate the input data before creating a new commentary
        Args:
            args: Data received from the request
        Returns:
             Validated data
        """
        user = args.get('user', None)
        product = args.get('product', None)
        rate = args.get('rate', None)
        if Commentary.all_objects.filter(user=user, product=product).exists():
            raise serializers.ValidationError({'user': 'The user has already commented on this product'})
        if rate > 5 or rate < 1:
            raise serializers.ValidationError({'rate': 'It cannot be greater than 5 or less than 1'})
        return super().validate(args)

    def create(self, validated_data):
        """
        Method to create a new commentary
        Args:
            validated_data: Data that has passed the validation
        Returns:
            A new commentary object
        """
        return Commentary.objects.create_commentary(**validated_data)
