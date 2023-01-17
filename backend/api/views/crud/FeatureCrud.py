import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from api.models import Feature, Specification
from api.serializers import FeatureSerializer, FeatureCrudSerializer
from api.utils.authorization_crud import authorization
from api.utils.image_utils import optimize_and_save_image, update_images


class FeatureList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        features = Feature.all_objects.all()
        features_serialized = []
        for feature in features:
            features_serialized.append(FeatureSerializer.serialize_get_crud(feature=feature))
        return Response(features_serialized)


class FeatureRegister(generics.GenericAPIView):
    serializer_class = FeatureCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(data=request.data)

        image_name = optimize_and_save_image(request.data['image'], 'feature', 'feature')
        request.data['image'] = image_name

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Feature created succesfully",

                "Feature": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class FeaturePut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Feature.all_objects.filter(feature_id=id).exists():
            return Response({"Errors": 'This feature does not exist'}, status=status.HTTP_404_NOT_FOUND)
        feature = Feature.all_objects.get(feature_id=id)
        serializer = FeatureSerializer(feature)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Feature.all_objects.filter(feature_id=id).exists():
            return Response({"Errors": 'This feature does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if not Specification.all_objects.filter(specification_id=request.data['specification']).exists():
            return Response({"Errors": 'This Specification does not exist'}, status=status.HTTP_404_NOT_FOUND)
        feature = Feature.all_objects.get(feature_id=id)
        serializer = FeatureSerializer(feature, data=request.data)

        if Feature.all_objects.filter(feature_name=request.data['feature_name'], specification=request.data['specification']).exclude(feature_id=id).exists():
            return Response({'feature_name': 'This name is already assigned in this specification'})

        image_name = update_images(request.data['image'], id, 'feature')
        request.data['image'] = image_name

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FeatureDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = FeaturePut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Feature.all_objects.filter(feature_id=id).exists():
            return Response({"Errors": 'This feature does not exist'}, status=status.HTTP_404_NOT_FOUND)
        feature = Feature.all_objects.get(feature_id=id)
        feature.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
