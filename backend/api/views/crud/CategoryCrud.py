import uuid

from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from api.models import Category
from api.serializers import CategorySerializer, CategoryCrudSerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image, update_images


class CategoryList(APIView):
    """
    List all categories with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all categories with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all categories.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        categories = Category.all_objects.all()
        categories_serialized = []
        for category in categories:
            categories_serialized.append(CategorySerializer.serialize_get_crud(category=category))
        return Response(categories_serialized)


class CategoryCreate(generics.GenericAPIView):
    """
    Create a new category.
    """
    serializer_class = CategoryCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new category.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the category created or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(data=request.data)

        image_name = optimize_and_save_image(image_data=request.data['image']['src'],
                                             object_name='category')

        request.data['hash'] = request.data['image']['hash']
        request.data['image'] = image_name

        if serializer.is_valid():
            serializer.save()
            category = Category.all_objects.get(name=request.data['name'])
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Category created successfully",
                "Category": {
                    'id': category.id,
                    'name': category.name,
                    'image': {
                        'src': category.image,
                        'hash': category.hash
                    }
                }
            }, status=status.HTTP_201_CREATED
            )
        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):
    """
    Retrieve a category by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a category by id.
        Args:
            request: Request from client.
            id (str): Id of the category.

        Returns:
            (Response): Response with the category.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Category.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        category = Category.all_objects.get(id=id)
        serializer = CategorySerializer.serialize_get_crud(category)
        return Response(serializer)


class CategoryUpdate(APIView):
    """
    Update a category by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update a category by id.
        Args:
            request: Request from client.
            id (str): Id of the category.

        Returns:
            (Response): Response with the category updated or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Category.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)

        category = Category.all_objects.get(id=id)
        serializer = CategorySerializer(category, data=request.data)

        if Category.all_objects.filter(name=request.data['name']).exclude(id=id).exists():
            return Response({'Errors': 'This name is already assigned to another category'})

        image_name = update_images(request.data['image']['src'], id, 'category')
        request.data['hash'] = request.data['image']['hash']
        request.data['image'] = image_name

        if serializer.is_valid():
            serializer.save()
            return Response({
                "Category updated": {
                    'id': category.id,
                    'name': category.name,
                    'image': {
                        'src': category.image,
                        'hash': category.hash
                    }
                }
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDelete(APIView):
    """
    Class to delete a category by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete a category by id.
        Args:
            request: Request from client.
            id: Id of the category.

        Returns:
            (Response): Response with a message of success or error.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Category.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        category = Category.all_objects.get(id=id)
        category.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
