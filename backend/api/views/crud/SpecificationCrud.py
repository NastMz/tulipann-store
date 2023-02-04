from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Specification, Product
from api.serializers import SpecificationSerializer, SpecificationCrudSerializer
from api.utils.authorization_crud import authorization


class SpecificationList(APIView):
    """
    List all specifications with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all specifications with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all specifications.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        
        specifications = Specification.all_objects.all()
        specifications_serialized = []
        for specification in specifications:
            specifications_serialized.append(SpecificationSerializer.serialize_get_crud(specification=specification))
        return Response({'specifications': specifications_serialized})


class SpecificationCreate(generics.GenericAPIView):
    """
    Create a new specification.
    """
    serializer_class = SpecificationCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new specification.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the specification created or errors.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        
        if 'productId' not in request.data:
            messages.append('El producto es requerido')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)
        
        if not Product.all_objects.filter(id=request.data['productId']).exists():
            messages.append('Este producto no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        request.data['product'] = request.data['productId']

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Specification created successfully",

                "Specification": {
                    "summary": serializer.data['summary'],
                    "productId": serializer.data['product']
                }}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class SpecificationDetail(APIView):
    """
    Retrieve a specification by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a specification by id.
        Args:
            request: Request from client.
            id (str): Id of the specification.

        Returns:
            (Response): Response with the specification.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not Specification.all_objects.filter(id=id).exists():
            messages.append('Esta especificación no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        specification = Specification.all_objects.get(id=id)
        serializer = SpecificationSerializer.serialize_get_crud(specification)
        return Response(serializer)


class SpecificationUpdate(APIView):
    """
    Update a specification by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update a specification by id.
        Args:
            request: Request from client.
            id (str): Id of the specification.

        Returns:
            (Response): Response with the specification updated or errors.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        
        if not Specification.all_objects.filter(id=id).exists():
            messages.append('Esta especificación no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)
        
        if 'productId' not in request.data:
            messages.append('El producto es requerido')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)
        
        if not Product.all_objects.filter(id=request.data['productId']).exists():
            messages.append('Este producto no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        specification = Specification.all_objects.get(id=id)
        request.data['product'] = request.data['productId']
        serializer = SpecificationSerializer(specification, data=request.data)

        if Specification.all_objects.filter(summary=request.data['summary']).exclude(id=id).exists():
            messages.append('Esta especificación ya está asignada a otro producto')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "Specification updated": {
                    "summary": serializer.data['summary'],
                    "productId": serializer.data['product']
                }
            })
        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
