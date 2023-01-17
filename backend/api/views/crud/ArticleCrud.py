
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Article, Tag, ArticleTag
from api.serializers import ArticleSerializer, ArticleCrudSerializer, TagCrudSerializer, ArticleTagSerializer, \
    TagSerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image, update_images


class ArticleList(APIView):
    """
    Class for handling the retrieval of a list of all articles.

    Accepts only GET requests.

    Returns:
        A list of serialized articles.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """
        Handle the GET request.

        Args:
            request: The request object.

        Returns:
            A response object containing the serialized list of articles.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        articles = Article.all_objects.all()
        articles_serialized = []
        for article in articles:
            articles_serialized.append(ArticleSerializer.serialize_get_crud(article=article))
        return Response(articles_serialized)


class ArticleRegister(generics.GenericAPIView):
    """
    Class for handling the registration of a new article and its associated tags.

    Accepts only POST requests.

    Returns:
        A message indicating success or failure of the registration, along with the serialized article data.
    """
    serializer_class = ArticleCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """
        Handle the POST request.

        Args:
            request: The request object.

        Returns:
            A response object indicating the success or failure of the registration, along with the serialized article data.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        image_name = optimize_and_save_image(image_data=request.data['banner'], subfolder='article',
                                             object_name='article')
        request.data['banner'] = image_name

        data_article = {
            "title": request.data['title'],
            "summary": request.data['summary'],
            "banner": image_name,
            "hash": request.data['hash'],
            "content": request.data['content'],
            "user": request.user.user_id
        }

        serializer = self.get_serializer(data=data_article)

        if not serializer.is_valid():
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        messages = {}

        if 'tags' not in request.data:
            messages['tags'] = 'This field is required'

        tags = request.data['tags']

        for tag in tags:
            if not Tag.all_objects.filter(tag_id=tag['tag_id']).exists():
                messages['tags'] = 'This tag does not exist'

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        new_article = Article.all_objects.get(title=request.data['title'])
        article_tag_serializer = ArticleTagSerializer()

        for tag in tags:
            data = {
                'article': new_article,
                'tag': Tag.all_objects.get(tag_id=tag['tag_id'])
            }
            if not ArticleTag.all_objects.filter(tag=data['tag'], article=data['article']).exists():
                article_tag_serializer.create(data)

        return Response({
            "RequestId": str(uuid.uuid4()),
            "Message": "Article created succesfully",

            "Article": serializer.data}, status=status.HTTP_201_CREATED
        )


class ArticlePut(APIView):
    """
    Class for handling the retrieval or update of an article.

    Accepts GET and PUT requests.

    Returns:
        A serialized article for GET requests, or a response object indicating success or failure for PUT requests.
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        """
        Handle the GET request.

        Args:
            request: The request object.
            id: The article id.

        Returns:
            A response object containing the serialized article.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Article.all_objects.filter(article_id=id):
            return Response({"Errors": 'This article does not exist'}, status=status.HTTP_404_NOT_FOUND)
        article = Article.all_objects.get(article_id=id)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    def put(self, request, id=None):
        """
        Handle the PUT request.

        Args:
            request: The request object.
            id: The article id.

        Returns:
            A response object indicating the success or failure of the update.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Article.all_objects.filter(article_id=id):
            return Response({"Errors": 'This article does not exist'}, status=status.HTTP_404_NOT_FOUND)

        article = Article.all_objects.get(article_id=id)
        serializer = ArticleSerializer(article, data=request.data, partial=True)

        image_name = update_images(request.data['banner'], id, 'article')
        request.data['banner'] = image_name

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        messages = {}

        if Article.all_objects.filter(title=request.data['title']).exclude(article_id=id).exists():
            messages['title'] = 'This title is already assigned to another article'

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data)


class ArticleDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = ArticlePut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Article.all_objects.filter(article_id=id):
            return Response({"Errors": 'This article does not exist'}, status=status.HTTP_404_NOT_FOUND)
        article = Article.all_objects.get(article_id=id)
        article.soft_delete()

        db_article_tag = list(ArticleTag.all_objects.filter(article=id))
        for article_tag in db_article_tag:
            article_tag.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)