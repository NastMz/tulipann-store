import datetime
import environ
import sendgrid
from django.template.loader import render_to_string
from sendgrid.helpers.mail import *

from rest_framework import views
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

from api.models import User

# Initialise environment variables
env = environ.Env()
environ.Env.read_env()


class PasswordResetView(views.APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data['email']
        if not User.objects.filter(email=email).exists():
            return Response({"error": "The email does not exist in our database."},
                            status=status.HTTP_404_NOT_FOUND)

        user = User.objects.get(email=email)

        # Generate a reset token and send it to the user via email
        reset_token = some_token_generation_function(user)
        send_password_reset_email(user, reset_token)

        return Response({"message": "Se ha enviado un correo para restablecer su contraseña."},
                        status=status.HTTP_200_OK)


def some_token_generation_function(user):
    """
    This function should generate a unique token for the user to reset their password.
    """
    expires = datetime.datetime.utcnow() + datetime.timedelta(minutes=20)
    payload = {
        'user_id': str(user.user_id),
        'type': 'password_reset'
    }
    refresh = RefreshToken.for_user(user=user)
    refresh.payload = payload
    refresh.exp = expires
    return str(refresh)


def send_password_reset_email(user, reset_token):
    """
        This function should email the user with a link to reset their password.
        """
    sg = sendgrid.SendGridAPIClient(api_key=env('SENDGRID_API_KEY'))
    from_email = Email(env('FROM_EMAIL'))
    to_email = Email(user.email)
    subject = "Restablecimiento de contraseña"
    reset_link = f"https://tulipannstore.com/restore/{reset_token}"
    message = render_to_string('password_reset_email.html', {
        'username': " ".join([user.first_name, user.last_name]),
        'reset_link': reset_link
    })
    content = Content("text/html", message)
    mail = Mail(from_email, subject, to_email, content)
    response = sg.client.mail.send.post(request_body=mail.get())
