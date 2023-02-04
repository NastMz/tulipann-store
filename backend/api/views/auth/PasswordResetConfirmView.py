from django.core.cache import cache
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import User


class PasswordResetConfirmView(APIView):
    """
    Confirm the reset password to user with token.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['post'], detail=True)
    def post(request):
        """
        Reset password to user with token valid.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with message of success or error.
        """
        messages = []

        if 'new_password' not in request.data:
            messages.append('La nueva contraseña es requerida')
        if 'token' not in request.data:
            messages.append('El token enviado en el correo es requerido')

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        token = request.data.get('token')

        try:
            # check if the token is valid
            userId = check_token(token)
            if userId is None:
                raise Exception("Invalid or expired token")

            # check if the user exists
            user = User.objects.get(id=userId)

            # allow the user to reset their password
            new_password = request.data.get('new_password')
            user.set_password(new_password)
            user.save()

            return Response({'status': 'success', 'message': 'Password reset successful'})

        except Exception as e:
            return Response({'status': 'error', 'message': str(e)})


def check_token(token):
    userId = cache.get(token)
    if userId is None:
        return None
    return userId
