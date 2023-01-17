from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import PaymentMethod
from api.serializers import PaymentSerializer, PaymentCrudSerializer
from api.utils.authorization_crud import authorization


class PaymentList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        payments = PaymentMethod.all_objects.all()
        payments_serialized = []
        for payment in payments:
            payments_serialized.append(PaymentSerializer.serialize_get_crud(payment=payment))
        return Response(payments_serialized)


class PaymentRegister(generics.GenericAPIView):
    serializer_class = PaymentCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "Payment created succesfully",

                "Payment": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class PaymentPut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not PaymentMethod.all_objects.filter(payment_id=id).exists():
            return Response({"Errors": 'This payment method does not exist'}, status=status.HTTP_404_NOT_FOUND)
        payment = PaymentMethod.all_objects.get(payment_id=id)
        serializer = PaymentSerializer(payment)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not PaymentMethod.all_objects.filter(payment_id=id).exists():
            return Response({"Errors": 'This payment method does not exist'}, status=status.HTTP_404_NOT_FOUND)
        name = PaymentMethod.all_objects.get(payment_id=id).payment_name
        if name == 'Contra entrega' or name == 'Transferencia':
            return Response({"Errors": 'Cannot update this payment method'}, status=status.HTTP_400_BAD_REQUEST)
        payment = PaymentMethod.all_objects.get(payment_id=id)
        serializer = PaymentCrudSerializer(payment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = PaymentPut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not PaymentMethod.all_objects.filter(payment_id=id).exists():
            return Response({"Errors": 'This payment method does not exist'}, status=status.HTTP_404_NOT_FOUND)
        name = PaymentMethod.all_objects.get(payment_id=id).payment_name
        if name == 'Contra entrega' or name == 'Transferencia':
            return Response({"Errors": 'Cannot delete this payment method'}, status=status.HTTP_400_BAD_REQUEST)
        payment = PaymentMethod.all_objects.get(payment_id=id)
        payment.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
