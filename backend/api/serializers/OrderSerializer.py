from rest_framework import serializers
from ..models import User, State, Order, OrderProduct


class OrderSerializer(serializers.ModelSerializer):
    def serialize_front(order):
        user = User.objects.get(user_id=order.user.user_id)
        state = State.all_objects.get(state_id=order.state.state_id)
        return {
            'id': order.order_id,
            'user': user.user_id,
            'state': state.state_name,
        }

    def serialize_get_crud(order):
        db_products = list(OrderProduct.all_objects.filter(order=order))

        products = []
        for product in db_products:
            products.append({
                'product_id': product.product_id,
                'quantity': product.quantity,
            })

        return {
            'order_id': order.order_id,
            'user': order.user.user_id,
            'payment': order.payment.payment_id,
            'state': order.state.state_id,
            'products': products
        }

    def serialize_get_put(order):
        db_products = list(OrderProduct.all_objects.filter(order=order))

        products = []
        for product in db_products:
            products.append({
                'product_id': product.product_id,
                'quantity': product.quantity
            })

        return {
            'user': order.user.user_id,
            'payment': order.payment.payment_id,
            'state': order.state.state_id
        }

    class Meta:
        model = Order
        fields = (
            'state',
        )
