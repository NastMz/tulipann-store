from rest_framework import serializers
from ..models import Commentary, User


class CommentarySerializer(serializers.ModelSerializer):
    """
    Serializer for Commentary model
    """
    def serialize_front(product):
        """
        Returns serialized representation of a commentary for frontend usage
        Args:
            product (Product): Instance of Product model
        Returns:
            dict: serialized representation of a commentary
        """
        db_commentaries = list(Commentary.all_objects.prefetch_related('product').filter(product=product))

        feedback = []
        for commentary in db_commentaries:
            user = User.objects.get(id=commentary.user.id)
            feedback.append({
                'id': commentary.id,
                'rate': commentary.rate,
                'commentary': commentary.text,
                'userName': user.firstName,
                'id': user.id,
            })
        return feedback

    def serialize_get_crud(commentary):
        """
        Returns serialized representation of a commentary for frontend usage
        Args:
            commentary (Commentary): Instance of Commentary model
        Returns:
            dict: serialized representation of a commentary
        """
        return {
            'id': commentary.id,
            'rate': commentary.rate,
            'text': commentary.text,
            'productId': commentary.product.id,
            'id': commentary.user.id
        }

    class Meta:
        model = Commentary
        fields = (
            'rate',
            'text'
        )

    def validate(self, args):
        """
        Method to validate the input data before creating a new commentary
        Args:
            args: Data received from the request
        Returns:
             Validated data
        """
        rate = args.get('rate', None)
        if rate > 5 or rate < 1:
            raise serializers.ValidationError({'rate': 'It cannot be greater than 5 or less than 1'})
        return super().validate(args)
