from rest_framework import generics, serializers

from .models import Article


class ArticleSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "title", "slug", "summary", "tags", "published_on"]


class ArticleSerializer(ArticleSummarySerializer):
    paragraphs = serializers.SerializerMethodField()

    class Meta(ArticleSummarySerializer.Meta):
        fields = ArticleSummarySerializer.Meta.fields + ["paragraphs"]

    def get_paragraphs(self, article: Article) -> list[str]:
        return [part.strip() for part in article.body.split("\n\n") if part.strip()]


class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleSummarySerializer
    queryset = Article.objects.all()
    pagination_class = None


class ArticleDetailView(generics.RetrieveAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    lookup_field = "slug"
