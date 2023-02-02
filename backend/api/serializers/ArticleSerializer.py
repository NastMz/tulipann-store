import base64
from rest_framework import serializers
from ..models import ArticleTag, Article


class ArticleSerializer(serializers.ModelSerializer):
    """
    Serializer for Article model
    """
    def serialize_front(article):
        """
        Returns serialized representation of an article for frontend usage
        Args:
            article (Article): Instance of Article model
        Returns:
            dict: serialized representation of an article
        """
        db_tag = list(ArticleTag.all_objects.filter(article=article))

        tags = []
        for tag in db_tag:
            tags.append({
                'name': tag.tag.name
            })

        return {
            'id': article.id,
            'title': article.title,
            'summary': article.summary,
            'content': base64.b64encode(article.content),
            'banner': {
                'src': article.banner,
                'hash': article.hash
            },
            'date': article.date,
            'author': article.user.id,
            'tags': tags
        }

    def serialize_get_crud(article):
        """
        Returns serialized representation of an article for CRUD operations
        Args:
            article (Article): Instance of Article model
        Returns:
            dict: serialized representation of an article
        """
        db_tag = list(ArticleTag.all_objects.filter(article=article))

        tags = []
        for tag in db_tag:
            tags.append({
                'tagId': tag.tag.id,
            })

        return {
            'id': article.id,
            'title': article.title,
            'summary': article.summary,
            'banner': {
                'src': article.banner,
                'hash': article.hash
            },
            'date': article.date,
            'content': base64.b64encode(article.content),
            'id': article.user.id,
            'tags': tags
        }

    class Meta:
        model = Article
        fields = (
            'title',
            'summary',
            'banner',
            'hash',
            'content'
        )
