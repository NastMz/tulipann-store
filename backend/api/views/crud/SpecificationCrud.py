from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import Specification, Product
from api.serializers import SpecificationSerializer, SpecificationCrudSerializer
from api.utils.authorization_crud import authorization


class SpecificationList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        specifications = Specification.all_objects.all()
        specifications_serialized = []
        for specification in specifications:
            specifications_serialized.append(SpecificationSerializer.serialize_get_crud(specification=specification))
        return Response(specifications_serialized)


class SpecificationRegister(generics.GenericAPIView):
    serializer_class = SpecificationCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Product.all_objects.filter(product_id=request.data['product']).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Specification created succesfully",

                "Specification": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class SpecificationPut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Specification.all_objects.filter(specification_id=id).exists():
            return Response({"Errors": 'This specification does not exist'}, status=status.HTTP_404_NOT_FOUND)
        specification = Specification.all_objects.get(specification_id=id)
        serializer = SpecificationSerializer(specification)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not Specification.all_objects.filter(specification_id=id).exists():
            return Response({"Errors": 'This specification does not exist'}, status=status.HTTP_404_NOT_FOUND)
        if not Product.all_objects.filter(product_id=request.data['product']).exists():
            return Response({"Errors": 'This product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        specification = Specification.all_objects.get(specification_id=id)
        serializer = SpecificationSerializer(specification, data=request.data)

        if Specification.all_objects.filter(summary=request.data['summary']).exclude(specification_id=id).exists():
            return Response({'Errors': 'This specification is already assigned to another product'})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
