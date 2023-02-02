from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from api.models import Role
from api.serializers import RoleSerializer


class RoleViewset(viewsets.GenericViewSet):
    queryset = Role.all_objects.all()
    serializer_class = RoleSerializer
    permission_classes = (AllowAny,)
