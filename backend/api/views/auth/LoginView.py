from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken


def create_id_token(user):
    """
    Create an id token for Login.
    Args:
        user: user object to be given the token.

    Returns:
        A token of type str for the access token.
    """
    return str(AccessToken.for_user(user))


class LoginView(APIView):
    """
    Login for users registered
    """
    permission_classes = (AllowAny,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Login for users registered.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with token for access token or error.
        """
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user is not None:
            id_token = create_id_token(user)
            return Response({"id_token": id_token}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
