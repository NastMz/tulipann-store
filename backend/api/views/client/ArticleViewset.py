from rest_framework import viewsets
from rest_framework.response import Response
from api.models import Article
from api.serializers import ArticleSerializer
from rest_framework.permissions import AllowAny


class ArticleViewset(viewsets.GenericViewSet):
    queryset = Article.all_objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        articles_serialized = []
        articles = self.queryset
        for article in articles:
            articles_serialized.append(ArticleSerializer.serialize_front(article=article))
        return Response({'articles': articles_serialized})
