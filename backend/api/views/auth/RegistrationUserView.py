import uuid
from rest_framework import generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.models import Department, City
from api.serializers import UserRegistrationSerializer


class RegistrationUserView(generics.GenericAPIView):
    """
    Register a new user in the DB
    """
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Register a new user.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the user registered or errors.
        """
        messages = []

        if 'departmentId' not in request.data:
            messages.append('El departamento es requerido')
        if 'cityId' not in request.data:
            messages.append('La ciudad es requerida')

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if not Department.all_objects.filter(id=request.data['departmentId']).exists():
            messages.append('Este departamento no existe')
        if not City.all_objects.filter(id=request.data['cityId']).exists():
            messages.append('Esta ciudad no existe')

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if not City.all_objects.filter(department=request.data['departmentId'], id=request.data['cityId']).exists():
            messages.append('Esta ciudad no pertenece al departamento seleccionado')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        request.data['department'] = request.data['departmentId']
        request.data['city'] = request.data['cityId']
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "User created successfully",

                "User": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
