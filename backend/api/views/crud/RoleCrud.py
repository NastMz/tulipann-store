from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Role
from api.serializers import RoleSerializer, RoleCrudSerializer
from api.utils.authorization_crud import authorization


class RoleList(APIView):
    """
    List all roles with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
            Get all roles with soft delete filter.
            Args:
                request: Request from client.

            Returns:
                (Response): Response with all roles.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        roles = Role.all_objects.all()
        roles_serialized = []
        for role in roles:
            roles_serialized.append(RoleSerializer.serialize_get_crud(role=role))
        return Response({'roles': roles_serialized})


class RoleCreate(generics.GenericAPIView):
    """
    Create a new role.
    """
    serializer_class = RoleCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new role.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the role created or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Role created successfully",

                "Role": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class RoleDetail(APIView):
    """
    Retrieve a role by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a role by id.
        Args:
            request: Request from client.
            id (str): Id of the role.

        Returns:
            (Response): Response with the role.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Role.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This role does not exist'}, status=status.HTTP_404_NOT_FOUND)

        role = Role.all_objects.get(id=id)
        serializer = RoleSerializer.serialize_get_crud(role)

        return Response(serializer)


class RoleUpdate(APIView):
    """
    Update a role by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update a role by id.
        Args:
            request: Request from client.
            id (str): Id of the role.

        Returns:
            (Response): Response with the role updated or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Role.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This role does not exist'}, status=status.HTTP_404_NOT_FOUND)
        name = Role.all_objects.get(id=id).name
        if name == 'Admin' or name == 'Cliente':
            return Response({"Errors": 'Cannot update this role'}, status=status.HTTP_400_BAD_REQUEST)

        role = Role.all_objects.get(id=id)
        serializer = RoleSerializer(role, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "Role updated": serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RoleDelete(APIView):
    """
    Class to delete a role by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete a role by id.
        Args:
            request: Request from client.
            id: Id of the role.

        Returns:
            (Response): Response with a message of success or error.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Role.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This role does not exist'}, status=status.HTTP_404_NOT_FOUND)
        name = Role.all_objects.get(id=id).name
        if name == 'Admin' or name == 'Cliente':
            return Response({"Errors": 'Cannot delete this role'}, status=status.HTTP_400_BAD_REQUEST)

        role = Role.all_objects.get(id=id)
        role.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
