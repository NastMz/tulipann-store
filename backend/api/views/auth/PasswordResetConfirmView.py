from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import User


class PasswordResetConfirmView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        token = request.data.get('token')

        try:
            # check if the token is valid
            user_id = check_token(token)
            if user_id is None:
                raise Exception("Invalid or expired token")

            # check if the user exists
            user = User.objects.get(user_id=user_id)

            # allow the user to reset their password
            new_password = request.data.get('new_password')
            user.set_password(new_password)
            user.save()

            return Response({'status': 'success', 'message': 'Password reset successful'})

        except Exception as e:
            return Response({'status': 'error', 'message': str(e)})


def check_token(token):
    user_id = cache.get(token)
    if user_id is None:
        return None
    return user_id
