from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from api.models import User
from api.serializers import UserSerializer


class UserViewset(viewsets.GenericViewSet):
    queryset = User.objects.filter(role='role2')
    permission_classes = (AllowAny,)

    def list(self, *args, **kwargs):
        users_serialized = []
        users = self.queryset
        for user in users:
            users_serialized.append(UserSerializer.serialize_front(user=user))
        return Response({'users': users_serialized})
