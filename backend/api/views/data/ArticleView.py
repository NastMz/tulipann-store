from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Article
from api.serializers import ArticleSerializer
from rest_framework.permissions import AllowAny


class ArticleView(APIView):
    """
    List all articles with soft delete filter for the initial page in frontend.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all articles with soft delete filter for the initial page in frontend.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all articles.
        """
        articles = Article.all_objects.all()
        articles_serialized = []
        for article in articles:
            articles_serialized.append(ArticleSerializer.serialize_front(article=article))
        return Response({'articles': articles_serialized})
