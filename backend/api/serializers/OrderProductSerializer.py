from rest_framework import serializers
from ..models import OrderProduct, Product
from ..serializers import OrderSerializer


class OrderProductSerializer(serializers.ModelSerializer):
    def serialize_front(order):
        orders = OrderSerializer.serialize_front(order=order)
        db_products = list(OrderProduct.all_objects.prefetch_related('order').filter(order=order))
        
        products = []
        for product in db_products:
            products.append({
                'id': product.product.product_id,
                'name': product.product.product_name,
                'quantity': product.quantity
            })

        return {
            'order': orders,
            'products': products,
        }

    class Meta:
        model = OrderProduct
        fields = (
            'quantity',
            'order',
            'product'
        )

    def validate(self, args):
        quantity = args.get('quantity', None)
        stock = args['product'].stock
        product = args['product']
        if quantity > stock:
            raise serializers.ValidationError({'quantity': ('The quantity must not be greater than the stock'),
                                               'stock': stock})
        new_stock = Product.all_objects.get(product_id=product.product_id)
        new_stock.stock = stock-quantity
        new_stock.save()
        return super().validate(args)

    def create(self, validated_data):
        return OrderProduct.objects.create_order_product(**validated_data)
