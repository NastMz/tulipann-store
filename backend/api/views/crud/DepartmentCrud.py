from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from api.models import Department
from api.serializers import DepartmentSerializer
from api.utils.authorization_crud import authorization


class DepartmentList(APIView):
    """
    List all departments with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all departments with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all departments.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        departments = Department.all_objects.all()
        departments_serialized = []
        for department in departments:
            departments_serialized.append(DepartmentSerializer.serialize_get_crud(department=department))
        return Response({'departments': departments_serialized})


class DepartmentDetail(APIView):
    """
    Retrieve a department by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a department by id.
        Args:
            request: Request from client.
            id (str): Id of the department.

        Returns:
            (Response): Response with the department.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Department.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This department does not exist'}, status=status.HTTP_404_NOT_FOUND)
        department = Department.all_objects.get(id=id)
        serializer = DepartmentSerializer.serialize_get_crud(department)
        return Response(serializer)
