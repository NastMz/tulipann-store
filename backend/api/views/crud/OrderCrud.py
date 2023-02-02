from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Order, State, Product, OrderProduct, User
from api.serializers import OrderSerializer, OrderCrudSerializer, OrderProductSerializer
from api.utils.authorization_crud import authorization


class OrderList(APIView):
    """
    List all orders with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all orders with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all orders.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        orders = Order.all_objects.all()
        orders_serialized = []
        for order in orders:
            orders_serialized.append(OrderSerializer.serialize_get_crud(order=order))
        return Response(orders_serialized)


class OrderCreate(generics.GenericAPIView):
    """
    Create a new order.
    """
    serializer_class = OrderCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new order.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the order created or errors.
        """
        data_order = {
            'user': request.user.id,
            'state': State.all_objects.get(name='Pendiente').id
        }

        serializer = self.get_serializer(data=data_order, partial=True)

        if not serializer.is_valid():
            return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        messages = {}

        if 'products' not in request.data:
            messages['products'] = 'This field is required'

        products = request.data['products']

        for product in products:
            if not Product.all_objects.filter(id=product['productId']).exists():
                messages['product'] = 'A product does not exist'

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        new_order = Order.all_objects.get(id=serializer.data['id'])
        order_product_serializer = OrderProductSerializer()

        for product in products:
            data_order_product = {
                'quantity': product['quantity'],
                'order': new_order,
                'product': Product.all_objects.get(id=product['productId'])
            }

            if not OrderProduct.all_objects.filter(order=data_order_product['order'],
                                                   product=data_order_product['product']).exists():
                if order_product_serializer.validate(data_order_product):
                    order_product_serializer.create(data_order_product)

        return Response({
            "RequestId": str(uuid.uuid4()),
            "Message": "Order created successfully",

            "Order": {
                "id": serializer.data['id'],
                "id": serializer.data['user'],
                "stateId": serializer.data['state']
            }
        }, status=status.HTTP_201_CREATED
        )


class OrderDetail(APIView):
    """
    Retrieve a order by id.
    """

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get an order by id.
        Args:
            request: Request from client.
            id (str): Id of the order.

        Returns:
            (Response): Response with the order.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Order.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This order does not exist'}, status=status.HTTP_404_NOT_FOUND)
        order = Order.all_objects.get(id=id)
        serializer = OrderSerializer.serialize_get_crud(order)
        return Response(serializer)


class OrderUpdate(APIView):
    """
    Update an order by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update an order by id.
        Args:
            request: Request from client.
            id (str): Id of the order.

        Returns:
            (Response): Response with the order updated or errors.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Order.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This order does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if 'stateId' not in request.data:
            return Response({"stateId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not State.all_objects.filter(id=request.data['stateId']).exists():
            return Response({"Errors": 'This state does not exist'}, status=status.HTTP_404_NOT_FOUND)

        order = Order.all_objects.get(id=id)
        request.data['state'] = request.data['stateId']
        serializer = OrderSerializer(order, data=request.data)

        if request.data['state'] == State.all_objects.get(name='Cancelado').id or request.data['state'] == State.all_objects.get(name='Rechazado').id:
            products = OrderProduct.all_objects.filter(order=order)
            for product in products:
                new_stock = Product.all_objects.get(id=product.product.id)
                new_stock.stock += product.quantity
                new_stock.save()

        if serializer.is_valid():
            serializer.save()
            return Response({"Order updated":
                {
                    "id": order.id,
                    "id": order.user.id,
                    "stateId": order.state.id,
                    "shipping": order.shipping
                }
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)