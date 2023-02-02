from rest_framework import serializers
from ..models import User, State, Order, OrderProduct


class OrderSerializer(serializers.ModelSerializer):
    def serialize_front(order):
        db_products = list(OrderProduct.all_objects.filter(order=order))

        products = []
        for product in db_products:
            products.append({
                'productId': product.product.id,
                'quantity': product.quantity,
            })

        return {
            'id': order.id,
            'id': order.user.id,
            'stateId': order.state.id,
            'products': products,
            'shipping': order.shipping,
            'details': order.details
        }

    def serialize_get_crud(order):
        db_products = list(OrderProduct.all_objects.filter(order=order))

        products = []
        for product in db_products:
            products.append({
                'productId': product.product.id,
                'quantity': product.quantity,
            })

        return {
            'id': order.id,
            'id': order.user.id,
            'stateId': order.state.id,
            'products': products,
            'shipping': order.shipping,
            'details': order.details
        }

    class Meta:
        model = Order
        fields = (
            'state',
            'shipping'
        )
