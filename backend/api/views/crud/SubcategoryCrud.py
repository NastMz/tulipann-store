from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Subcategory, ProductSubcategory, Category
from api.serializers import SubcategorySerializer, SubcategoryCrudSerializer
from api.utils.authorization_crud import authorization


class SubcategoryList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        subcategories = Subcategory.all_objects.all()
        subcategories_serialized = []
        for subcategory in subcategories:
            subcategories_serialized.append(SubcategorySerializer.serialize_get_crud(subcategory=subcategory))
        return Response(subcategories_serialized)


class SubcategoryRegister(generics.GenericAPIView):
    serializer_class = SubcategoryCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Category.all_objects.filter(category_id=request.data['category']).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Subcategory created succesfully",

                "Subcategory": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class SubcategoryPut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Subcategory.all_objects.filter(subcategory_id=id).exists():
            return Response({"Errors": 'This subcategory does not exist'}, status=status.HTTP_404_NOT_FOUND)
        subcategory = Subcategory.all_objects.get(subcategory_id=id)
        serializer = SubcategorySerializer(subcategory)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Subcategory.all_objects.filter(subcategory_id=id).exists():
            return Response({"Errors": 'This subcategory does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if not Category.all_objects.filter(category_id=request.data['category']).exists():
            return Response({"Errors": 'This category does not exist'}, status=status.HTTP_404_NOT_FOUND)
        subcategory = Subcategory.all_objects.get(subcategory_id=id)
        serializer = SubcategorySerializer(subcategory, data=request.data, partial=True)

        if Subcategory.all_objects.filter(subcategory_name=request.data['subcategory_name']).exclude(subcategory_id=id).exists():
            return Response({'subcategory_name': 'This name is already assigned to another subcategory'})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubcategoryDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = SubcategoryPut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Subcategory.all_objects.filter(subcategory_id=id).exists():
            return Response({"Errors": 'This subcategory does not exist'}, status=status.HTTP_404_NOT_FOUND)

        subcategory = Subcategory.all_objects.get(subcategory_id=id)
        subcategory.soft_delete()

        db_product_subcat = list(ProductSubcategory.all_objects.filter(subcategory=id))
        for product_subcat in db_product_subcat:
            product_subcat.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)


