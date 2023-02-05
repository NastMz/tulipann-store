from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import ShippingAddress, Product, Department, City
from api.serializers import ShippingAddressSerializer, ShippingAddressCrudSerializer
from api.utils.authorization_crud import authorization


class ShippingAddressList(APIView):
    """
    List all addresses with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all addresses with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all addresses.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        addresses = ShippingAddress.all_objects.all()
        addresses_serialized = []
        for address in addresses:
            addresses_serialized.append(ShippingAddressSerializer.serialize_front(shipping_address=address))
        return Response({'addresses': addresses_serialized})


class ShippingAddressCreate(generics.GenericAPIView):
    """
    Create a new address.
    """
    serializer_class = ShippingAddressCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new address.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the address created or errors.
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
                "Message": "ShippingAddress created successfully",

                "ShippingAddress": {
                    "address": serializer.data['address'],
                    "zipCode": serializer.data['zipCode'],
                    "neighborhood": serializer.data['neighborhood'],
                    "departmentId": serializer.data['department'],
                    "cityId": serializer.data['city']
                }}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ShippingAddressDetail(APIView):
    """
    Retrieve an address by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get an address by id.
        Args:
            request: Request from client.
            id (str): Id of the address.

        Returns:
            (Response): Response with the address.
        """
        messages = []

        if not ShippingAddress.all_objects.filter(id=id).exists():
            messages.append('Esta dirección de envío no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        address = ShippingAddress.all_objects.get(id=id)
        serializer = ShippingAddressSerializer.serialize_front(address)
        return Response(serializer)


class ShippingAddressUpdate(APIView):
    """
    Update an address by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update an address by id.
        Args:
            request: Request from client.
            id (str): Id of the address.

        Returns:
            (Response): Response with the address updated or errors.
        """
        messages = []

        if not ShippingAddress.all_objects.filter(id=id).exists():
            messages.append('Esta dirección de envío no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

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

        address = ShippingAddress.all_objects.get(id=id)
        serializer = ShippingAddressSerializer(address, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "ShippingAddress updated": {
                    "address": serializer.data['address'],
                    "zipCode": serializer.data['zipCode'],
                    "neighborhood": serializer.data['neighborhood'],
                    "departmentId": serializer.data['department'],
                    "cityId": serializer.data['city']
                }
            })

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ShippingAddressDelete(APIView):
    """
    Class to delete an address by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete an address by id.
        Args:
            request: Request from client.
            id: Id of the address.

        Returns:
            (Response): Response with a message of success or error.
        """
        messages = []

        if not ShippingAddress.all_objects.filter(id=id).exists():
            messages.append('Esta dirección de envío no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        address = ShippingAddress.all_objects.get(id=id)
        address.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
