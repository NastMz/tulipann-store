from rest_framework import serializers
from ..models import ArticleTag


class ArticleTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleTag
        fields = (
            'article',
            'tag'
        )

    def create(self, validated_data):
        return ArticleTag.objects.create_article_tag(**validated_data)
