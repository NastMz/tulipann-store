from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Subcategory, ProductSubcategory, Category
from api.serializers import SubcategorySerializer, SubcategoryCrudSerializer
from api.utils.authorization_crud import authorization


class SubcategoryList(APIView):
    """
    List all subcategories with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all subcategories with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all subcategories.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        subcategories = Subcategory.all_objects.all()
        subcategories_serialized = []
        for subcategory in subcategories:
            subcategories_serialized.append(SubcategorySerializer.serialize_get_crud(subcategory=subcategory))
        return Response(subcategories_serialized)


class SubcategoryCreate(generics.GenericAPIView):
    """
    Create a new subcategory.
    """
    serializer_class = SubcategoryCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new subcategory.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the subcategory created or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if 'categoryId' not in request.data:
            return Response({"categoryId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not Category.all_objects.filter(id=request.data['categoryId']).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)

        request.data['category'] = request.data['categoryId']
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Subcategory created successfully",

                "Subcategory": {
                    "name": serializer.data['name'],
                    "categoryId": serializer.data['category']
                }}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class SubcategoryDetail(APIView):
    """
    Retrieve a subcategory by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a subcategory by id.
        Args:
            request: Request from client.
            id (str): Id of the subcategory.

        Returns:
            (Response): Response with the subcategory.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Subcategory.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This subcategory does not exist'}, status=status.HTTP_404_NOT_FOUND)
        subcategory = Subcategory.all_objects.get(id=id)
        serializer = SubcategorySerializer.serialize_get_crud(subcategory)
        return Response(serializer)


class SubcategoryUpdate(APIView):
    """
    Update a subcategory by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update a subcategory by id.
        Args:
            request: Request from client.
            id (str): Id of the subcategory.

        Returns:
            (Response): Response with the subcategory updated or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Subcategory.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This subcategory does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if 'categoryId' not in request.data:
            return Response({"categoryId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not Category.all_objects.filter(id=request.data['categoryId']).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)

        subcategory = Subcategory.all_objects.get(id=id)
        request.data['category'] = request.data['categoryId']
        serializer = SubcategorySerializer(subcategory, data=request.data)

        if Subcategory.all_objects.filter(name=request.data['name']).exclude(id=id).exists():
            return Response({'name': 'This name is already assigned to another subcategory'})

        if serializer.is_valid():
            serializer.save()
            return Response({
                "Subcategory updated": {
                    "name": serializer.data['name'],
                    "categoryId": serializer.data['category']
                }
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubcategoryDelete(APIView):
    """
    Class to delete a subcategory by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete a subcategory by id.
        Args:
            request: Request from client.
            id: Id of the subcategory.

        Returns:
            (Response): Response with a message of success or error.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Subcategory.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This subcategory does not exist'}, status=status.HTTP_404_NOT_FOUND)

        subcategory = Subcategory.all_objects.get(id=id)
        subcategory.soft_delete()

        db_product_subcat = list(ProductSubcategory.all_objects.filter(subcategory=id))
        for product_subcat in db_product_subcat:
            product_subcat.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
