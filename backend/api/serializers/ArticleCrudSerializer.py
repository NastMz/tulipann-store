from rest_framework import serializers
from ..models import Article


class ArticleCrudSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=255) 
    summary = serializers.CharField(max_length=255)
    hash = serializers.CharField()
    content = serializers.CharField()

    class Meta:
        model = Article
        fields = (
            'title',
            'summary',
            'banner',
            'hash',
            'content',
            'user'
        )

    def validate(self, args):
        messages = {}

        if Article.all_objects.filter(title=args['title']).exists():
            messages['title'] = 'Title already exist'

        if messages:
            raise serializers.ValidationError(messages)

        return super().validate(args)

    def create(self, validated_data):
        return Article.objects.create_article(**validated_data)
