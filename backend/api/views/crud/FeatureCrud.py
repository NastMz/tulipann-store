import uuid

from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from api.models import Feature, Specification
from api.serializers import FeatureSerializer, FeatureCrudSerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image, update_images, delete_images


class FeatureList(APIView):
    """
    List all features with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all features with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all features.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        features = Feature.all_objects.all()
        features_serialized = []
        for feature in features:
            features_serialized.append(FeatureSerializer.serialize_get_crud(feature=feature))
        return Response({'features': features_serialized})


class FeatureCreate(generics.GenericAPIView):
    """
    Create a new feature.
    """
    serializer_class = FeatureCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new feature.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the feature created or errors.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if 'specificationId' not in request.data:
            messages.append('La especificación es requerida')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if not Specification.all_objects.filter(id=request.data['specificationId']).exists():
            messages.append('Esta especificación no existe')
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

        request.data['specification'] = request.data['specificationId']
        serializer = self.get_serializer(data=request.data)

        image_name = optimize_and_save_image(image_data=request.data['image']['src'], object_name='feature')
        request.data['hash'] = request.data['image']['hash']
        request.data['image'] = image_name

        if serializer.is_valid():
            serializer.save()
            feature = Feature.all_objects.get(name=request.data['name'])
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Feature created successfully",

                "Feature": {
                    'id': feature.id,
                    'name': feature.name,
                    'title': feature.title,
                    'description': feature.description.replace("\\n", "\n"),
                    'image': {
                        'src': feature.image,
                        'hash': feature.hash
                    },
                    'specificationId': feature.specification.id
                }
            }, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class FeatureDetail(APIView):
    """
    Retrieve a feature by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a feature by id.
        Args:
            request: Request from client.
            id (str): Id of the feature.

        Returns:
            (Response): Response with the feature.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not Feature.all_objects.filter(id=id).exists():
            messages.append('Esta característica no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        feature = Feature.all_objects.get(id=id)
        serializer = FeatureSerializer.serialize_get_crud(feature)
        return Response(serializer)


class FeatureUpdate(APIView):
    """
    Update a feature by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update a feature by id.
        Args:
            request: Request from client.
            id (str): Id of the feature.

        Returns:
            (Response): Response with the feature updated or errors.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not Feature.all_objects.filter(id=id).exists():
            messages.append('Esta característica no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if 'specificationId' not in request.data:
            messages.append('La especificación es requerida')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        if not Specification.all_objects.filter(id=request.data['specificationId']).exists():
            messages.append('Esta especificación no existe')
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

        feature = Feature.all_objects.get(id=id)
        request.data['specification'] = request.data['specificationId']
        serializer = FeatureSerializer(feature, data=request.data)

        if Feature.all_objects.filter(name=request.data['name'], specification=request.data['specification']).exclude(
                id=id).exists():
            messages.append('Este nombre ya está asignado en esta especificación')
            return Response({"Errors": messages})

        image_name = update_images(request.data['image']['src'], id, 'feature')
        request.data['hash'] = request.data['image']['hash']
        request.data['image'] = image_name

        if serializer.is_valid():
            serializer.save()
            return Response({"Feature updated": {
                'id': feature.id,
                'name': feature.name,
                'title': feature.title,
                'description': feature.description.replace("\\n", "\n"),
                'image': {
                    'src': feature.image,
                    'hash': feature.hash
                },
                'specificationId': feature.specification.id
            }
            })

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class FeatureDelete(APIView):
    """
    Class to delete a feature by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete a feature by id.
        Args:
            request: Request from client.
            id: Id of the feature.

        Returns:
            (Response): Response with a message of success or error.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not Feature.all_objects.filter(id=id).exists():
            messages.append('Esta característica no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        spec = Feature.all_objects.get(id=id).specification

        if Feature.all_objects.filter(specification=spec).__len__() == 1:
            messages.append('Solo existe esta característica, prueba en editarla')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        feature = Feature.all_objects.get(id=id)
        delete_images(feature, 'image')
        feature.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
