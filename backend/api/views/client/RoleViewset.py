from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from api.models import Role


class RoleViewset(viewsets.GenericViewSet):
    queryset = Role.all_objects.all()
    permission_classes = (AllowAny,)
