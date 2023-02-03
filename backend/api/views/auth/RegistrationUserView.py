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
        if 'departmentId' not in request.data:
            return Response({"departmentId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if 'cityId' not in request.data:
            return Response({"cityId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not Department.all_objects.filter(id=request.data['departmentId']).exists():
            return Response({"Errors": 'This department does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if not City.all_objects.filter(id=request.data['cityId']).exists():
            return Response({"Errors": 'This city does not exist'}, status=status.HTTP_404_NOT_FOUND)

        if not City.all_objects.filter(department=request.data['departmentId'], id=request.data['cityId']).exists():
            return Response({"Errors": 'This city does not belong to the selected department'},
                            status=status.HTTP_400_BAD_REQUEST)

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
