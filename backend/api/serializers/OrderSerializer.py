from rest_framework import serializers

from . import ShippingAddressSerializer
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

        address = ShippingAddressSerializer.ShippingAddressSerializer.serialize_front(order.address)

        return {
            'id': order.id,
            'userId': order.user.id,
            'stateId': order.state.id,
            'shippingAddress': address,
            'products': products,
            'shippingValue': order.shippingValue,
            'online': order.online,
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

        address = ShippingAddressSerializer.ShippingAddressSerializer.serialize_front(order.address)

        return {
            'id': order.id,
            'userId': order.user.id,
            'stateId': order.state.id,
            'shippingAddress': address,
            'products': products,
            'shippingValue': order.shippingValue,
            'online': order.online,
            'details': order.details
        }


    class Meta:
        model = Order
        fields = (
            'state',
            'shippingValue',
            'details'
        )
