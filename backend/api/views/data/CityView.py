from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from api.models import City
from api.serializers import CitySerializer


class CityList(APIView):
    """
    List all cities with soft delete filter.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all cities with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all cities.
        """
        cities = City.all_objects.all()
        cities_serialized = []
        for city in cities:
            cities_serialized.append(CitySerializer.serialize_get_crud(city=city))
        return Response(cities_serialized)


class CityDetail(APIView):
    """
    Retrieve a city by id.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a city by id.
        Args:
            request: Request from client.
            id (str): Id of the city.

        Returns:
            (Response): Response with the city.
        """
        messages = []
        if not City.all_objects.filter(id=id).exists():
            messages.append('Esta ciudad no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        city = City.all_objects.get(id=id)
        serializer = CitySerializer.serialize_get_crud(city)
        return Response({'cities': serializer})


class CityDepartment(APIView):
    """
    Retrieve a city by id.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get cities by department id.
        Args:
            request: Request from client.
            id (str): Id of the department.

        Returns:
            (Response): Response with the list of cities that belong to the department.
        """
        messages = []
        if not City.all_objects.filter(department=id).exists():
            messages.append('Este departamento no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        cities = City.all_objects.filter(department=id)
        cities_serialized = []
        for city in cities:
            cities_serialized.append(CitySerializer.serialize_get_crud(city=city))
        return Response(cities_serialized)
