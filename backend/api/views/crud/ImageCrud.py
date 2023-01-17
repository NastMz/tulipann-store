from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Image, Product
from api.serializers import ImageSerializer, ImageCrudSerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image, update_images


class ImageList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        images = Image.all_objects.all()
        images_serialized = []
        for image in images:
            images_serialized.append(ImageSerializer.serialize_get_crud(image=image))
        return Response(images_serialized)


class ImageRegister(generics.GenericAPIView):
    serializer_class = ImageCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Product.all_objects.filter(product_id=request.data['product']).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(data=request.data)

        image_name = optimize_and_save_image(image_data=request.data['image'], subfolder='product',
                                             object_name='product')
        request.data['image'] = image_name

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Image created succesfully",

                "Image": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ImagePut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Image.all_objects.filter(image_id=id):
            return Response({"Errors": 'This image does not exist'}, status=status.HTTP_404_NOT_FOUND)
        image = Image.all_objects.get(image_id=id)
        serializer = ImageSerializer(image)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Image.all_objects.filter(image_id=id):
            return Response({"Errors": 'This image does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if not Product.all_objects.filter(product_id=request.data['product']).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        image = Image.all_objects.get(image_id=id)
        serializer = ImageSerializer(image, data=request.data)

        image_name = update_images(request.data['image_name'], id, 'product')
        request.data['image_name'] = image_name

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImageDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = ImagePut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Image.all_objects.filter(image_id=id):
            return Response({"Errors": 'This image does not exist'}, status=status.HTTP_404_NOT_FOUND)
        image = Image.all_objects.get(image_id=id)
        image.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)