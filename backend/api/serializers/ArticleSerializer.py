import base64
from rest_framework import serializers
from ..models import ArticleTag, Article


class ArticleSerializer(serializers.ModelSerializer):
    def serialize_front(article):
        db_tag = list(ArticleTag.all_objects.filter(article=article))

        tags = []
        for tag in db_tag:
            tags.append({
                'name': tag.tag.tag_name
            })

        return {
            'id': article.article_id,
            'title': article.title,
            'summary': article.summary,
            'content': base64.b64encode(article.content),
            'banner': article.banner,
            'hash': article.hash,
            'date': article.date,
            'author': article.user.user_id,
            'tags': tags
        }

    def serialize_get_crud(article):
        db_tag = list(ArticleTag.all_objects.filter(article=article))

        tags = []
        for tag in db_tag:
            tags.append({
                'tag_id': tag.tag.tag_id,
            })

        return {
            'article_id': article.article_id,
            'title': article.title,
            'summary': article.summary,
            'banner': article.banner,
            'hash': article.hash,
            'date': article.date,
            'content': base64.b64encode(article.content),
            'user': article.user.user_id,
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
