import uuid

from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from api.models import Feature, Specification
from api.serializers import FeatureSerializer, FeatureCrudSerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image, update_images


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
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
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
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if 'specificationId' not in request.data:
            return Response({"specificationId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not Specification.all_objects.filter(id=request.data['specificationId']).exists():
            return Response({"Errors": 'This specification does not exist'}, status=status.HTTP_404_NOT_FOUND)

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
        Retrieve a subcategory by id.
        """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a subcategory by id.
        Args:
            request: Request from client.
            id (str): Id of the subcategory.

        Returns:
            (Response): Response with the subcategory.
        """
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Feature.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This feature does not exist'}, status=status.HTTP_404_NOT_FOUND)
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
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Feature.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This feature does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if 'specificationId' not in request.data:
            return Response({"specificationId": 'This field is required.'}, status=status.HTTP_400_BAD_REQUEST)
        if not Specification.all_objects.filter(id=request.data['specificationId']).exists():
            return Response({"Errors": 'This Specification does not exist'}, status=status.HTTP_404_NOT_FOUND)

        feature = Feature.all_objects.get(id=id)
        request.data['specification'] = request.data['specificationId']
        serializer = FeatureSerializer(feature, data=request.data)

        if Feature.all_objects.filter(name=request.data['name'], specification=request.data['specification']).exclude(
                id=id).exists():
            return Response({'name': 'This name is already assigned in this specification'})

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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Feature.all_objects.filter(id=id).exists():
            return Response({"Errors": 'This feature does not exist'}, status=status.HTTP_404_NOT_FOUND)
        feature = Feature.all_objects.get(id=id)
        feature.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
