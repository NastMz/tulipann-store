from rest_framework import status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from api.serializers import UserSerializer
from api.models import User
from api.utils.authorization_crud import authorization


class UserList(APIView):
    """
    List all users.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all users.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all users.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        users = User.objects.all()
        users_serialized = []
        for user in users:
            users_serialized.append(UserSerializer.serialize_get_crud(user=user))
        return Response({'users': users_serialized})


class UserDetail(APIView):
    """
    Retrieve a user by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a user by id.
        Args:
            request: Request from client.
            id (str): Id of the user.

        Returns:
            (Response): Response with the user.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not User.objects.filter(id=id).exists():
            messages.append('Este usuario no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        user = User.objects.get(id=id)
        serializer = UserSerializer.serialize_get_crud(user)
        return Response(serializer)
