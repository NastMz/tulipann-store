from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Order, State, Product, OrderProduct
from api.serializers import OrderSerializer, OrderCrudSerializer, OrderProductSerializer
from api.utils.authorization_crud import authorization
from api.checkout.Payment import PayUPayment


class OrderList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        orders = Order.all_objects.all()
        orders_serialized = []
        for order in orders:
            orders_serialized.append(OrderSerializer.serialize_get_crud(order=order))
        return Response(orders_serialized)


class OrderRegister(generics.GenericAPIView):
    serializer_class = OrderCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        # pay = PayUPayment()
        #
        # pay.create(request.user.user_id, request.data['products'])
        #
        # if pay.verified:
            data_order = {
                'user': request.user.user_id,
                'payment': request.data['payment'],
                'state': State.all_objects.get(state_name='Iniciado').state_id
            }

            serializer = self.get_serializer(data=data_order)

            if not serializer.is_valid():
                return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

            messages = {}

            if 'products' not in request.data:
                messages['products'] = 'This field is required'

            products = request.data['products']

            for product in products:
                if not Product.all_objects.filter(product_id=product['product_id']).exists():
                    messages['product'] = 'A product does not exist'

            if messages:
                return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()

            new_order = Order.all_objects.get(user=data_order['user'], payment=data_order['payment'], state=data_order['state'])
            order_product_serializer = OrderProductSerializer()

            for product in products:
                data_order_product = {
                    'quantity': product['quantity'],
                    'order': new_order,
                    'product': Product.all_objects.get(product_id=product['product_id'])
                }

                if not OrderProduct.all_objects.filter(order=data_order_product['order'], product=data_order_product['product']).exists():
                    if order_product_serializer.validate(data_order_product):
                        order_product_serializer.create(data_order_product)

            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Order created succesfully",

                "Order": serializer.data}, status=status.HTTP_201_CREATED
            )


class OrderPut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Order.all_objects.filter(order_id=id).exists():
            return Response({"Errors": 'This order does not exist'}, status=status.HTTP_404_NOT_FOUND)
        order = Order.all_objects.get(order_id=id)
        serializer = OrderSerializer.serialize_get_put(order)
        return Response(serializer)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Order.all_objects.filter(order_id=id).exists():
            return Response({"Errors": 'This order does not exist'}, status=status.HTTP_404_NOT_FOUND)
        order = Order.all_objects.get(order_id=id)
        serializer = OrderSerializer(order, data=request.data, partial=True)

        if request.data['state'] == State.all_objects.get(state_name='Cancelado').state_id:
            products = OrderProduct.all_objects.filter(order=order)
            for product in products:
                new_stock = Product.all_objects.get(product_id=product.product_id)
                new_stock.stock += product.quantity
                new_stock.save()

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
