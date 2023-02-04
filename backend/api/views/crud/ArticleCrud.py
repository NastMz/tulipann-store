import base64

from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Article, Tag, ArticleTag
from api.serializers import ArticleSerializer, ArticleCrudSerializer, ArticleTagSerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image, update_images


class ArticleList(APIView):
    """
    List all articles with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all articles with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all articles.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        articles = Article.all_objects.all()
        articles_serialized = []
        for article in articles:
            articles_serialized.append(ArticleSerializer.serialize_get_crud(article=article))
        return Response({'articles': articles_serialized})


class ArticleCreate(generics.GenericAPIView):
    """
    Create a new article.
    """
    serializer_class = ArticleCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new article.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the article created or errors.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        image_name = optimize_and_save_image(image_data=request.data['banner']['src'], object_name='article')

        data_article = {
            "title": request.data['title'],
            "summary": request.data['summary'],
            "banner": image_name,
            "hash": request.data['banner']['hash'],
            "content": request.data['content'],
            "user": request.user.id
        }

        serializer = self.get_serializer(data=data_article)

        if not serializer.is_valid():
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        if 'tags' not in request.data:
            messages.append('Las etiquetas son requeridas')

        tags = request.data['tags']

        for tag in tags:
            if not Tag.all_objects.filter(id=tag['tagId']).exists():
                messages.append('La etiqueta '+tag['tagId']+' no existe')

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        new_article = Article.all_objects.get(title=request.data['title'])
        article_tag_serializer = ArticleTagSerializer()

        for tag in tags:
            data = {
                'article': new_article,
                'tag': Tag.all_objects.get(id=tag['tagId'])
            }
            if not ArticleTag.all_objects.filter(tag=data['tag'], article=data['article']).exists():
                article_tag_serializer.create(data)

        return Response({
            "RequestId": str(uuid.uuid4()),
            "Message": "Article created successfully",
            "Article": {
                "title": new_article.title,
                "summary": new_article.summary,
                "banner":  {
                    'src': new_article.banner,
                    'hash': new_article.hash
                },
                "content": base64.b64encode(new_article.content),
                "id": new_article.user.id
            }
        }, status=status.HTTP_201_CREATED
        )


class ArticleDetail(APIView):
    """
    Retrieve an article by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get an article by id.
        Args:
            request: Request from client.
            id (str): Id of the article.

        Returns:
            (Response): Response with the article.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        if not Article.all_objects.filter(id=id):
            messages.append('Este artículo no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        article = Article.all_objects.get(id=id)
        serializer = ArticleSerializer.serialize_get_crud(article)
        return Response(serializer)


class ArticleUpdate(APIView):
    """
    Update an article by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update an article by id.
        Args:
            request: Request from client.
            id (str): Id of the article.

        Returns:
            (Response): Response with the article updated or errors.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        if not Article.all_objects.filter(id=id):
            messages.append('Este artículo no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        article = Article.all_objects.get(id=id)
        image_name = update_images(request.data['banner']['src'], id, 'article')

        data_article = {
            "title": request.data['title'],
            "summary": request.data['summary'],
            "banner": image_name,
            "hash": request.data['banner']['hash'],
            "content": request.data['content']
        }

        serializer = ArticleSerializer(article, data=data_article, partial=True)

        if not serializer.is_valid():
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        if Article.all_objects.filter(title=request.data['title']).exclude(id=id).exists():
            messages.append('Este título ya está asignado en otro artículo')

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response({
            "RequestId": str(uuid.uuid4()),
            "Message": "Article updated successfully",
            "Article updated": {
                "title": article.title,
                "summary": article.summary,
                "banner":  {
                    'src': article.banner,
                    'hash': article.hash
                },
                "content": base64.b64encode(article.content),
                "id": article.user.id
            }
        }, status=status.HTTP_200_OK
        )


class ArticleDelete(APIView):
    """
    Class to delete an article and everything related to it by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete an article and everything related to it by id.
        Args:
            request: Request from client.
            id: Id of the article.

        Returns:
            (Response): Response with a message of success or error.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        if not Article.all_objects.filter(id=id):
            messages.append('Este artículo no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        article = Article.all_objects.get(id=id)
        article.soft_delete()

        db_article_tag = list(ArticleTag.all_objects.filter(article=id))
        for article_tag in db_article_tag:
            article_tag.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
