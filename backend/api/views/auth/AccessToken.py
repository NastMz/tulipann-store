import jwt
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

import environ

from api.models import User

# Initialise environment variables
env = environ.Env()
environ.Env.read_env()


def validate_id_token(id_token):
    """
    Check if the token entered is valid and corresponds to the one generated when logging in..
    Args:
        id_token: token generated when logging in.

    Returns:
        payload or None.
    """
    try:
        payload = jwt.decode(id_token, env('TOKEN_SECRET_KEY'), algorithms=["HS256"])
        return payload
    except:
        return None


def create_access_token(user):
    """
    Create an access token for the user.
    Args:
        user: user object to be given the token.

    Returns:
        A token of type str for the access token.
    """
    access_token = AccessToken.for_user(user)
    return str(access_token)


def create_refresh_token(user):
    """
    Create a refresh token for the user.
    Args:
        user: user object to be given the token.

    Returns:
        A token of type str for the refresh token.
    """
    refresh_token = RefreshToken.for_user(user)
    return str(refresh_token)


class TokenGenerateView(APIView):
    """
    Generate a token and a refresh token
    """
    permission_classes = (AllowAny,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Generate a token and a refresh token.
        Args:
            request: Request from client with token id.

        Returns:
            (Response): Response with token for access and token for refresh or error.
        """
        messages = []
        id_token = request.data.get("id_token")
        payload = validate_id_token(id_token)
        if payload:
            user = User.objects.get(id=payload['id'])
            access_token = create_access_token(user)
            refresh_token = create_refresh_token(user)
            return Response({
                "access_token": access_token,
                "refresh_token": refresh_token
            }, status=status.HTTP_200_OK)
        else:
            messages.append('Token inválido')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
