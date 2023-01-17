from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import State
from api.serializers import StateSerializer, StateCrudSerializer
from api.utils.authorization_crud import authorization


class StateList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        states = State.all_objects.all()
        states_serialized = []
        for state in states:
            states_serialized.append(StateSerializer.serialize_get_crud(state=state))
        return Response(states_serialized)


class StateRegister(generics.GenericAPIView):
    serializer_class = StateCrudSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "State created succesfully",

                "State": serializer.data}, status=status.HTTP_201_CREATED
            )

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class StatePut(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not State.all_objects.filter(state_id=id).exists():
            return Response({"Errors": 'This state does not exist'}, status=status.HTTP_404_NOT_FOUND)
        state = State.all_objects.get(state_id=id)
        serializer = StateSerializer(state)
        return Response(serializer.data)

    def put(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not State.all_objects.filter(state_id=id).exists():
            return Response({"Errors": 'This state does not exist'}, status=status.HTTP_404_NOT_FOUND)
        name = State.all_objects.get(state_id=id).state_name
        if name == 'Iniciado' or name == 'Enviado' or name == 'Finalizado' or name == 'Cancelado':
            return Response({"Errors": 'Cannot update this state'}, status=status.HTTP_400_BAD_REQUEST)
        state = State.all_objects.get(state_id=id)
        serializer = StateCrudSerializer(state, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StateDel(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        put_class = StatePut()
        return put_class.get(request, id)

    def delete(self, request, id=None):
        if not authorization(request)['success']:
            return Response(authorization(request), status=status.HTTP_401_UNAUTHORIZED)
        if not State.all_objects.filter(state_id=id).exists():
            return Response({"Errors": 'This state does not exist'}, status=status.HTTP_404_NOT_FOUND)
        name = State.all_objects.get(state_id=id).state_name
        if name == 'Iniciado' or name == 'Enviado' or name == 'Finalizado' or name == 'Cancelado':
            return Response({"Errors": 'Cannot delete this state'}, status=status.HTTP_400_BAD_REQUEST)
        payment = State.all_objects.get(state_id=id)
        payment.soft_delete()
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)


