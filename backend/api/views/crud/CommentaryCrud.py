from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Commentary, Product
from api.serializers import CommentarySerializer, CommentaryCrudSerializer
from api.utils.authorization_crud import authorization


class CommentaryList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        commentaries = Commentary.all_objects.all()
        commentaries_serialized = []
        for commentary in commentaries:
            commentaries_serialized.append(CommentarySerializer.serialize_get_crud(commentary=commentary))
        return Response(commentaries_serialized)


class CommentaryRegister(generics.GenericAPIView):
    serializer_class = CommentaryCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not Product.all_objects.filter(product_id=request.data['product']).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        data_commentary = {
            "rate": request.data['rate'],
            "text": request.data['text'],
            "product": request.data['product'],
            "user": request.user.user_id
        }
        serializer = self.get_serializer(data=data_commentary)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Commentary created succesfully",

                "Commentary": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CommentaryPut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not Commentary.all_objects.filter(commentary_id=id).exists():
            return Response({"Errors": 'This commentary does not exist'}, status=status.HTTP_404_NOT_FOUND)
        commentary = Commentary.all_objects.get(commentary_id=id)
        serializer = CommentarySerializer(commentary)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not Commentary.all_objects.filter(commentary_id=id).exists():
            return Response({"Errors": 'This commentary does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if not Product.all_objects.filter(product_id=request.data['product']).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        commentary = Commentary.all_objects.get(commentary_id=id)
        serializer = CommentarySerializer(commentary, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentaryDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = CommentaryPut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not Commentary.all_objects.filter(commentary_id=id).exists():
            return Response({"Errors": 'This commentary does not exist'}, status=status.HTTP_404_NOT_FOUND)
        commentary = Commentary.all_objects.get(commentary_id=id)
        commentary.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
