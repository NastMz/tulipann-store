from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status, generics
import uuid
from api.models import ProductSubcategory
from api.serializers import ProductSubcategorySerializer


class ProductSubcategoryList(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        prod_subcat = ProductSubcategory.all_objects.all()
        serializer = ProductSubcategorySerializer(prod_subcat, many=True)
        return Response(serializer.data)


class ProductSubcategoryRegister(generics.GenericAPIView):
    serializer_class = ProductSubcategorySerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "ProductSubcategory created succesfully",

                "ProductSubcategory": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProductSubcategoryPut(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, id=None):
        prod_subcat = ProductSubcategory.objects.filter(product=id)
        serializer = ProductSubcategorySerializer(prod_subcat, many=True)
        return Response(serializer.data)

    def put(self, request, id=None):
        prod_subcat = ProductSubcategory.objects.get(product=id)
        serializer = ProductSubcategorySerializer(prod_subcat, data=request.data)
        if serializer.is_valid():
            serializer.save()
            if serializer.data['is_deleted']:
                prod_subcat.soft_delete()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
