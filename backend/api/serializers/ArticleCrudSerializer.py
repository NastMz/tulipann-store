from rest_framework import serializers
from ..models import Article


class ArticleCrudSerializer(serializers.ModelSerializer):
    """
    Serializer class for CRUD operations on the Article model.
    """
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
        """
        Check that the title of the article does not already exist.

        Args:
            args (dict): The attributes of the article to be validated.

        Returns:
            dict: The attributes of the article if they are valid.

        Raises:
            serializers.ValidationError: If the title already exists.
        """
        messages = {}

        if Article.all_objects.filter(title=args['title']).exists():
            messages['title'] = 'Title already exist'

        if messages:
            raise serializers.ValidationError(messages)

        return super().validate(args)

    def create(self, validated_data):
        """
        Create a new article.

        Args:
            validated_data (dict): The attributes of the article to be created.

        Returns:
            Article: The created article.
        """
        return Article.objects.create_article(**validated_data)
