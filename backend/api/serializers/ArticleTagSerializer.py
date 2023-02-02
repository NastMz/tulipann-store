from rest_framework import serializers
from ..models import ArticleTag


class ArticleTagSerializer(serializers.ModelSerializer):
    """
    Serializer for ArticleTag model
    """
    class Meta:
        model = ArticleTag
        fields = (
            'article',
            'tag'
        )

    def create(self, validated_data):
        """
        Create method is used to create an ArticleTag instance.

        Args:
            validated_data (dict): A dictionary containing the data to create an ArticleTag instance.

        Returns:
            ArticleTag: A newly created ArticleTag instance
        """
        return ArticleTag.objects.create_article_tag(**validated_data)
