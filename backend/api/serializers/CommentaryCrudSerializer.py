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
        messages = []

        if Commentary.all_objects.filter(user=user, product=product).exists():
            messages.append('El usuario ya ha comentado este producto')

        if rate > 5 or rate < 1:
            messages.append('La puntuación no puede ser mayor a 5 ni menor a 1')

        if messages:
            raise serializers.ValidationError(messages)

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
