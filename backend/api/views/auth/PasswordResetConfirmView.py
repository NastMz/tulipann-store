import base64

from django.core.cache import cache
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import User
from api.utils.encrypt_utils import decrypt_token
from api.views.auth.AccessToken import validate_id_token


class PasswordResetConfirmView(APIView):
    """
    Confirm the reset password to user with token.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['post'], detail=True)
    def post(request, encoded_token):
        """
        Reset password to user with token valid.
        Args:
            request: Request from client.
            encoded_token: encrypted token that goes in the email link.

        Returns:
            (Response): Response with message of success or error.
        """
        # Se decodifica el token que llega en el link del correo
        decoded_token = base64.b64decode(encoded_token)

        # desencripta el token
        text_plain = decrypt_token(decoded_token)

        # Transforma los bytes a string
        token = text_plain.decode()

        messages = []

        if 'newPassword' not in request.data:
            messages.append('La nueva contraseña es requerida')

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # check if the token is valid
            payload = validate_id_token(token)
            if payload is None:
                messages.append('Link de recuperación inválido o expirado')
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            # check if the user exists
            user = User.objects.get(id=payload['id'])

            # allow the user to reset their password
            new_password = request.data.get('newPassword')
            user.set_password(new_password)
            user.save()

            return Response({'status': 'success', 'message': 'Password reset successful'},
                            status=status.HTTP_200_OK)

        except Exception as e:
            messages.append('Ocurrió un error al intentar cambiar la contraseña')
            return Response({"Errors": messages})


class CheckToken(APIView):
    """
    Validate token.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, encoded_token):
        """
        Validate token
        Args:
            request: Request from client.
            encoded_token: encrypted token that goes in the email link.

        Returns:
            (Response): Response with message of success or error.
        """
        # Se decodifica el token que llega en el link del correo
        decoded_token = base64.b64decode(encoded_token)

        # desencripta el token
        text_plain = decrypt_token(decoded_token)

        # Transforma los bytes a string
        token = text_plain.decode()

        payload = validate_id_token(token)

        messages = []
        if payload is None:
            messages.append('Link de recuperación inválido o expirado')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"status": 'OK'}, status=status.HTTP_200_OK)
