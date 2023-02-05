import base64
import datetime
import time

import environ
from django.template.loader import render_to_string

from rest_framework import views
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

from api.models import User
from api.utils.encrypt_utils import encrypt_token
from api.utils.email_utils import send_mail

# Initialise environment variables
env = environ.Env()
environ.Env.read_env('../../../tulipann_store/.env')


class PasswordResetView(views.APIView):
    """
    Reset password to user with email.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['post'], detail=True)
    def post(request):
        """
        Reset password to user with email.
        Args:
            request: Request from client with email.

        Returns:
            (Response): Response with message of steps to follow or error.
        """
        messages = []

        if 'email' not in request.data:
            messages.append('El correo es requerido')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        email = request.data['email']
        if not User.objects.filter(email=email).exists():
            messages.append('Este correo no existe en nuestra base de datos')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(email=email)

        # Generate a reset token and send it to the user via email
        reset_token = token_generation(user)

        # Encrypted token for more security
        encrypted_token = encrypt_token(reset_token)

        # Encode for base64 to send in email
        encrypted_token_b64 = base64.b64encode(encrypted_token).decode()

        send_password_reset_email(user, encrypted_token_b64)

        return Response({"Message": "Se ha enviado un correo para restablecer su contraseña."},
                        status=status.HTTP_200_OK)


def token_generation(user):
    """
    This function should generate a unique token for the user to reset their password.
    Args:
        user (User): The user to generate the token for.
    Returns:
        str: The token to be sent to the user.
    """
    exp = int(time.time()) + 20 * 60
    payload = {
        'id': str(user.id),
        'type': 'password_reset',
        'exp': exp
    }
    refresh = RefreshToken.for_user(user=user)
    refresh.payload = payload
    return str(refresh)


def send_password_reset_email(user, encrypted_token_b64):
    """
    This function should email the user with a link to reset their password.
    A link should be generated using the reset_token.
    Args:
        user (User): The user to send the email to.
        encrypted_token_b64 (str): The base64-encoded encrypted token to use to generate the reset link.
    """
    to_email = user.email
    subject = "Restablecer contraseña - Tulipann Store"
    reset_link = f"{env('RESTORE_PASSWORD_URL')}/{encrypted_token_b64}"
    message = render_to_string('password_reset_email.html', {
        'username': " ".join([user.firstName, user.lastName]),
        'reset_link': reset_link
    })
    send_mail(to_emails=[to_email], subject=subject, html_content=message)
