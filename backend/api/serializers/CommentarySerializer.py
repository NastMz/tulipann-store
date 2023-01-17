from rest_framework import serializers
from ..models import Commentary, User


class CommentarySerializer(serializers.ModelSerializer):
    def serialize_front(product):
        db_commentaries = list(Commentary.all_objects.prefetch_related('product').filter(product=product))

        feedback = []
        for commentary in db_commentaries:
            user = User.objects.get(user_id=commentary.user.user_id)
            feedback.append({
                'id': commentary.commentary_id,
                'rate': commentary.rate,
                'commentary': commentary.text,
                'userName': user.first_name,
                'userId': user.user_id,
            })
        return feedback

    def serialize_get_crud(commentary):
        return {
            'commentary_id': commentary.commentary_id,
            'rate': commentary.rate,
            'text': commentary.text,
            'product': commentary.product.product_id,
            'user': commentary.user.user_id
        }

    class Meta:
        model = Commentary
        fields = (
            'rate',
            'text'
        )

    def validate(self, args):
        rate = args.get('rate', None)
        if rate > 5 or rate < 1:
            raise serializers.ValidationError({'rate': ('It cannot be greater than 5 or less than 1')})
        return super().validate(args)
