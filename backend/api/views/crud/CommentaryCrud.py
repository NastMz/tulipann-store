from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Commentary, Product
from api.serializers import CommentarySerializer, CommentaryCrudSerializer
from api.utils.authorization_crud import authorization


class CommentaryList(APIView):
    """
    List all commentaries with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all commentaries with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all commentaries.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        commentaries = Commentary.all_objects.all()
        commentaries_serialized = []
        for commentary in commentaries:
            commentaries_serialized.append(CommentarySerializer.serialize_get_crud(commentary=commentary))
        return Response(commentaries_serialized)


class CommentaryCreate(generics.GenericAPIView):
    """
    Create a new commentary.
    """
    serializer_class = CommentaryCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new commentary.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the commentary created or errors.
        """
        if 'productId' not in request.data:
            return Response({"productId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not Product.all_objects.filter(id=request.data['productId']).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        data_commentary = {
            "rate": request.data['rate'],
            "text": request.data['text'],
            "product": request.data['productId'],
            "user": request.user.id
        }
        serializer = self.get_serializer(data=data_commentary)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Commentary created successfully",

                "Commentary": {
                    "rate": serializer.data['rate'],
                    "text": serializer.data['text'],
                    "productId": serializer.data['product'],
                    "id": request.user.id
                }}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CommentaryDetail(APIView):
    """
    Retrieve a commentary by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a commentary by id.
        Args:
            request: Request from client.
            id (str): Id of the commentary.

        Returns:
            (Response): Response with the commentary.
        """
        if not Commentary.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This commentary does not exist'}, status=status.HTTP_404_NOT_FOUND)
        commentary = Commentary.all_objects.get(id=id)
        serializer = CommentarySerializer.serialize_get_crud(commentary)
        return Response(serializer)


class CommentaryUpdate(APIView):
    """
    Update a commentary by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update a commentary by id.
        Args:
            request: Request from client.
            id (str): Id of the commentary.

        Returns:
            (Response): Response with the commentary updated or errors.
        """
        if not Commentary.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This commentary does not exist'}, status=status.HTTP_404_NOT_FOUND)

        commentary = Commentary.all_objects.get(id=id)
        serializer = CommentarySerializer(commentary, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "Commentary updated": serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentaryDelete(APIView):
    """
    Class to delete a commentary by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete a commentary by id.
        Args:
            request: Request from client.
            id: Id of the commentary.

        Returns:
            (Response): Response with a message of success or error.
        """
        if not Commentary.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This commentary does not exist'}, status=status.HTTP_404_NOT_FOUND)
        commentary = Commentary.all_objects.get(id=id)
        commentary.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
