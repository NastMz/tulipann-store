from rest_framework.decorators import action
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
    """
    List all images with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all images with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all images.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        images = Image.all_objects.all()
        images_serialized = []
        for image in images:
            images_serialized.append(ImageSerializer.serialize_get_crud(image=image))
        return Response({'images': images_serialized})


class ImageCreate(generics.GenericAPIView):
    """
    Create a new image.
    """
    serializer_class = ImageCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new image.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the image created or errors.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if 'productId' not in request.data:
            messages.append('El producto es requerido')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if not Product.all_objects.filter(id=request.data['productId']).exists():
            messages.append('Este producto no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'image' not in request.data:
            messages.append('La información de la imagen es requerida')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'src' not in request.data['image']:
            messages.append('La imagen es requerida')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'hash' not in request.data['image']:
            messages.append('El hash de la imagen es requerido')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        request.data['product'] = request.data['productId']

        serializer = self.get_serializer(data=request.data)

        image_name = optimize_and_save_image(image_data=request.data['image']['src'], object_name='product')
        request.data['src'] = image_name
        request.data['hash'] = request.data['image']['hash']

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Image created successfully",

                "Image": {
                    "image": {
                        "src": serializer.data['src'],
                        "hash": serializer.data['hash']
                    },
                    "productId": serializer.data['product']
                }}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ImageDetail(APIView):
    """
    Retrieve an image by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get an image by id.
        Args:
            request: Request from client.
            id (str): Id of the image.

        Returns:
            (Response): Response with the image.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not Image.all_objects.filter(id=id):
            messages.append('Esta imagen no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        image = Image.all_objects.get(id=id)
        serializer = ImageSerializer.serialize_get_crud(image)
        return Response(serializer)


class ImageUpdate(APIView):
    """
    Update an image by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update an image by id.
        Args:
            request: Request from client.
            id (str): Id of the image.

        Returns:
            (Response): Response with the image updated or errors.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not Image.all_objects.filter(id=id):
            messages.append('Esta imagen no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if not Product.all_objects.filter(id=request.data['productId']).exists():
            messages.append('Este producto no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'image' not in request.data:
            messages.append('La información de la imagen es requerida')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'src' not in request.data['image']:
            messages.append('La imagen es requerida')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'hash' not in request.data['image']:
            messages.append('El hash de la imagen es requerido')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        image = Image.all_objects.get(id=id)

        request.data['product'] = request.data['productId']

        serializer = ImageSerializer(image, data=request.data)

        image_name = update_images(request.data['image']['src'], id, 'product')
        request.data['src'] = image_name
        request.data['hash'] = request.data['image']['hash']

        if serializer.is_valid():
            serializer.save()
            return Response({
                "Image updated": {
                    "image": {
                        "src": serializer.data['src'],
                        "hash": serializer.data['hash']
                    },
                    "productId": serializer.data['product']
                }
            })

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ImageDelete(APIView):
    """
    Class to delete an image by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete an image by id.
        Args:
            request: Request from client.
            id: Id of the image.

        Returns:
            (Response): Response with a message of success or error.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not Image.all_objects.filter(id=id):
            messages.append('Esta imagen no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        image = Image.all_objects.get(id=id)
        image.soft_delete()

        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
