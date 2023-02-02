from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status, generics
import uuid
from api.models import ArticleTag
from api.serializers import ArticleTagSerializer


class ArticleTagList(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        articletags = ArticleTag.all_objects.all()
        serializer = ArticleTagSerializer(articletags, many=True)
        return Response(serializer.data)


class ArticleTagRegister(generics.GenericAPIView):
    serializer_class = ArticleTagSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "ArticleTag created successfully",

                "ArticleTag": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ArticleTagPut(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, id=None):
        articletag = ArticleTag.objects.filter(article=id)
        serializer = ArticleTagSerializer(articletag, many=True)
        return Response(serializer.data)

    def put(self, request, id=None):
        articletag = ArticleTag.objects.get(article=id)
        serializer = ArticleTagSerializer(articletag, data=request.data)
        if serializer.is_valid():
            serializer.save()
            if serializer.data['is_deleted']:
                articletag.soft_delete()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
