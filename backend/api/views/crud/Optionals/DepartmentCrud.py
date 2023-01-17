from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status, generics
import uuid
from api.models import Department
from api.serializers import DepartmentSerializer, DepartmentCrudSerializer


class DepartmentList(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        departments = Department.all_objects.all()
        departments_serialized = []
        for department in departments:
            departments_serialized.append(DepartmentSerializer.serialize_get_crud(department=department))
        return Response(departments_serialized)


class DepartmentRegister(generics.GenericAPIView):
    serializer_class = DepartmentCrudSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Department created succesfully",

                "Department": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class DepartmentPut(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, id=None):
        department = Department.objects.filter(department_id=id)
        serializer = DepartmentSerializer(department, many=True)
        return Response(serializer.data)

    def put(self, request, id=None):
        department = Department.objects.get(department_id=id)
        serializer = DepartmentSerializer(department, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
