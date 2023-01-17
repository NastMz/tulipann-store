from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Role
from api.serializers import RoleSerializer, RoleCrudSerializer
from api.utils.authorization_crud import authorization


class RoleList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        roles = Role.all_objects.all()
        roles_serialized = []
        for role in roles:
            roles_serialized.append(RoleSerializer.serialize_get_crud(role=role))
        return Response(roles_serialized)


class RoleRegister(generics.GenericAPIView):
    serializer_class = RoleCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Role created succesfully",

                "Role": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class RolePut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Role.all_objects.filter(role_id=id).exists():
            return Response({"Errors": 'This role does not exist'}, status=status.HTTP_404_NOT_FOUND)
        role = Role.all_objects.get(role_id=id)
        serializer = RoleSerializer(role)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Role.all_objects.filter(role_id=id).exists():
            return Response({"Errors": 'This role does not exist'}, status=status.HTTP_404_NOT_FOUND)
        name = Role.all_objects.get(role_id=id).role_name
        if name == 'Admin' or name == 'Cliente':
            return Response({"Errors": 'Cannot update this role'}, status=status.HTTP_400_BAD_REQUEST)
        role = Role.all_objects.get(role_id=id)
        serializer = RoleSerializer(role, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoleDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = RolePut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Role.all_objects.filter(role_id=id).exists():
            return Response({"Errors": 'This role does not exist'}, status=status.HTTP_404_NOT_FOUND)
        name = Role.all_objects.get(role_id=id).role_name
        if name == 'Admin' or name == 'Cliente':
            return Response({"Errors": 'Cannot delete this role'}, status=status.HTTP_400_BAD_REQUEST)
        role = Role.all_objects.get(role_id=id)
        role.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
