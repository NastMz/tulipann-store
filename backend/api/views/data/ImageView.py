from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models import Product
from api.serializers import ImageSerializer


class ImageView(APIView):
    """
    List all images with soft delete filter for frontend home page related to your product.
    """
    permission_classes = (AllowAny,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all images with soft delete filter for frontend home page related to your product.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all images.
        """
        products = Product.all_objects.all()
        images_serialized = []
        for product in products:
            images_serialized.append(ImageSerializer.serialize_front(product=product))
        return Response({'images': images_serialized})
