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
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
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
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if 'productId' not in request.data:
            return Response({"productId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not Product.all_objects.filter(id=request.data['productId']).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)

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
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Specification.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This specification does not exist'}, status=status.HTTP_404_NOT_FOUND)
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
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Specification.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This specification does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if 'productId' not in request.data:
            return Response({"productId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not Product.all_objects.filter(id=request.data['productId']).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)

        specification = Specification.all_objects.get(id=id)
        request.data['product'] = request.data['productId']
        serializer = SpecificationSerializer(specification, data=request.data)

        if Specification.all_objects.filter(summary=request.data['summary']).exclude(id=id).exists():
            return Response({'Errors': 'This specification is already assigned to another product'})

        if serializer.is_valid():
            serializer.save()
            return Response({
                "Specification updated": {
                    "summary": serializer.data['summary'],
                    "productId": serializer.data['product']
                }
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
