from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Tag, ArticleTag
from api.serializers import TagSerializer, TagCrudSerializer
from api.utils.authorization_crud import authorization


class TagList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        tags = Tag.all_objects.all()
        tags_serialized = []
        for tag in tags:
            tags_serialized.append(TagSerializer.serialize_get_crud(tag=tag))
        return Response(tags_serialized)


class TagRegister(generics.GenericAPIView):
    serializer_class = TagCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Tag created succesfully",

                "Tag": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class TagPut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Tag.all_objects.filter(tag_id=id).exists():
            return Response({"Errors": 'This tag does not exist'}, status=status.HTTP_404_NOT_FOUND)
        tag = Tag.all_objects.get(tag_id=id)
        serializer = TagSerializer(tag)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Tag.all_objects.filter(tag_id=id).exists():
            return Response({"Errors": 'This tag does not exist'}, status=status.HTTP_404_NOT_FOUND)
        tag = Tag.all_objects.get(tag_id=id)
        serializer = TagCrudSerializer(tag, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TagDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = TagPut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Tag.all_objects.filter(tag_id=id).exists():
            return Response({"Errors": 'This tag does not exist'}, status=status.HTTP_404_NOT_FOUND)
        tag = Tag.all_objects.get(tag_id=id)
        tag.soft_delete()

        db_article_tag = list(ArticleTag.all_objects.filter(tag=id))
        for article_tag in db_article_tag:
            article_tag.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
