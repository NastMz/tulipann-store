import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from api.models import Category
from api.serializers import CategorySerializer, CategoryCrudSerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image, update_images


class CategoryList(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        categories = Category.all_objects.all()
        categories_serialized = []
        for category in categories:
            categories_serialized.append(CategorySerializer.serialize_get_crud(category=category))
        return Response(categories_serialized)


class CategoryRegister(generics.GenericAPIView):
    serializer_class = CategoryCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(data=request.data)
        image_name = optimize_and_save_image(image_data=request.data['image'], subfolder='category',
                                             object_name='category')
        request.data['image'] = image_name

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Category created succesfully",
                "Category": serializer.data}, status=status.HTTP_201_CREATED
            )
        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class CategoryPut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Category.all_objects.filter(category_id=id).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        category = Category.all_objects.get(category_id=id)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Category.all_objects.filter(category_id=id).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        category = Category.all_objects.get(category_id=id)
        serializer = CategorySerializer(category, data=request.data)

        if Category.all_objects.filter(category_name=request.data['category_name']).exclude(category_id=id).exists():
            return Response({'Errors': 'This name is already assigned to another category'})

        image_name = update_images(request.data['image'], id, 'category')
        request.data['image'] = image_name

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = CategoryPut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Category.all_objects.filter(category_id=id).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        category = Category.all_objects.get(category_id=id)
        category.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
