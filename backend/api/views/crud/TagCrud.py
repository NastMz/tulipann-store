from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Tag, ArticleTag
from api.serializers import TagSerializer, TagCrudSerializer
from api.utils.authorization_crud import authorization


class TagList(APIView):
    """
    List all tags with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all tags with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all tags.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        tags = Tag.all_objects.all()
        tags_serialized = []
        for tag in tags:
            tags_serialized.append(TagSerializer.serialize_get_crud(tag=tag))
        return Response(tags_serialized)


class TagCreate(generics.GenericAPIView):
    """
    Create a new tag.
    """
    serializer_class = TagCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new tag.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the tag created or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Tag created successfully",

                "Tag": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class TagDetail(APIView):
    """
    Retrieve a tag by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a tag by id.
        Args:
            request: Request from client.
            id (str): Id of the tag.

        Returns:
            (Response): Response with the tag.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Tag.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This tag does not exist'}, status=status.HTTP_404_NOT_FOUND)
        tag = Tag.all_objects.get(id=id)
        serializer = TagSerializer.serialize_get_crud(tag)
        return Response(serializer)


class TagUpdate(APIView):
    """
    Update a tag by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update a tag by id.
        Args:
            request: Request from client.
            id (str): Id of the tag.

        Returns:
            (Response): Response with the tag updated or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Tag.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This tag does not exist'}, status=status.HTTP_404_NOT_FOUND)
        tag = Tag.all_objects.get(id=id)
        serializer = TagCrudSerializer(tag, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "Tag updated": serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagDelete(APIView):
    """
    Class to delete a tag by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete a tag by id.
        Args:
            request: Request from client.
            id: Id of the tag.

        Returns:
            (Response): Response with a message of success or error.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Tag.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This tag does not exist'}, status=status.HTTP_404_NOT_FOUND)
        tag = Tag.all_objects.get(id=id)
        tag.soft_delete()

        db_article_tag = list(ArticleTag.all_objects.filter(tag=id))
        for article_tag in db_article_tag:
            article_tag.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
