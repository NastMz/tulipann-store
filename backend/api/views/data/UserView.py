from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from api.models import User
from api.serializers import UserSerializer


class UserView(APIView):
    """
    List all users with soft delete filter for the initial page in frontend.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all users with soft delete filter for the initial page in frontend.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all users.
        """
        users = User.objects.filter(role='role2')
        users_serialized = []
        for user in users:
            users_serialized.append(UserSerializer.serialize_front(user=user))
        return Response({'users': users_serialized})
