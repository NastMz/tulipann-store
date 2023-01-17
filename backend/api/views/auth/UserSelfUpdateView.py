from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.serializers import UserUpdateSerializer
from api.models import User


class UserSelfUpdateView(APIView):
    serializer_class = UserUpdateSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = User.objects.get(user_id=self.request.user.user_id)
        serializer = UserUpdateSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = User.objects.get(user_id=self.request.user.user_id)
        data_user = {
          "first_name": request.data['first_name'],
          "last_name": request.data['last_name'],
          "email": request.data['email'],
          "phone": request.data['phone'],
          "city": request.data['city'],
          "address": request.data['address']
        }
        user.set_password(request.data['password'])
        serializer = UserUpdateSerializer(user, data=data_user, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors)
        serializer.save()

        return Response({'Update': 'Successfully'}, status=status.HTTP_200_OK)
