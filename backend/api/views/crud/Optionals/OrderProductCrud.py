from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status, generics
import uuid
from api.models import OrderProduct
from api.serializers import OrderProductSerializer


class OrderProductList(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        order_products = OrderProduct.all_objects.all()
        serializer = OrderProductSerializer(order_products, many=True)
        return Response(serializer.data)


class OrderProductRegister(generics.GenericAPIView):
    serializer_class = OrderProductSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "OrderProduct created successfully",

                "OrderProduct": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class OrderProductPut(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, id=None):
        ordersprd = OrderProduct.objects.filter(order=id)
        serializer = OrderProductSerializer(ordersprd, many=True)
        return Response(serializer.data)

    def put(self, request, id=None):
        ordersprd = OrderProduct.objects.get(order=id)
        serializer = OrderProductSerializer(ordersprd, data=request.data)
        if serializer.is_valid():
            serializer.save()
            if serializer.data['is_deleted']:
                ordersprd.soft_delete()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
