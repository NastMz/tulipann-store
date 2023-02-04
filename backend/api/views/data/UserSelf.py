from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.serializers import UserUpdateSerializer
from api.models import User, City, Department


class UserSelfView(APIView):
    """
    View your own account information.
    """
    permission_classes = (IsAuthenticated,)

    @action(methods=['get'], detail=True)
    def get(self, request):
        """
        Get your own account information.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with account information.
        """
        user = User.objects.get(id=self.request.user.id)
        serializer = UserUpdateSerializer.serialize_get_self(user)
        return Response(serializer)


class UserSelfUpdateView(APIView):
    """
    Update your own account information.
    """
    permission_classes = (IsAuthenticated,)

    @action(methods=['put'], detail=True)
    def put(self, request):
        """
        Update your own account information.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with a message of success or error.
        """
        messages = []

        user = User.objects.get(id=self.request.user.id)

        if 'departmentId' not in request.data:
            messages.append('El departamento es requerido')

        if 'cityId' not in request.data:
            messages.append('La ciudad es requerida')

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if not Department.all_objects.filter(id=request.data['departmentId']).exists():
            messages.append('Este departamento no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if not City.all_objects.filter(id=request.data['cityId']).exists():
            messages.append('Esta ciudad no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if not City.all_objects.filter(department=request.data['departmentId'], id=request.data['cityId']).exists():
            messages.append('Esta ciudad no pertenece al departamento seleccionado')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        request.data['department'] = request.data['departmentId']
        request.data['city'] = request.data['cityId']

        if 'password' not in request.data:
            serializer = UserUpdateSerializer(user, data=request.data, partial=True)
            if not serializer.is_valid():
                return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response({'Update': 'Successfully'}, status=status.HTTP_200_OK)

        data_user = {
            "firstName": request.data['firstName'],
            "lastName": request.data['lastName'],
            "email": request.data['email'],
            "phone": request.data['phone'],
            "department": request.data['departmentId'],
            "city": request.data['cityId'],
            "address": request.data['address']
        }
        user.set_password(request.data['password'])
        serializer = UserUpdateSerializer(user, data=data_user, partial=True)
        if not serializer.is_valid():
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()

        return Response({'Update': 'Successfully'}, status=status.HTTP_200_OK)
