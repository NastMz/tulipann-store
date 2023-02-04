from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
import uuid
from api.models import State
from api.serializers import StateSerializer, StateCrudSerializer
from api.utils.authorization_crud import authorization


class StateList(APIView):
    """
    List all states with soft delete filter.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=False)
    def get(request):
        """
        Get all states with soft delete filter.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with all states.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        
        states = State.all_objects.all()
        states_serialized = []
        for state in states:
            states_serialized.append(StateSerializer.serialize_get_crud(state=state))
        return Response({'states': states_serialized})


class StateCreate(generics.GenericAPIView):
    """
    Create a new state.
    """
    serializer_class = StateCrudSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Create a new state.
        Args:
            request: Request from client.

        Returns:
            (Response): Response with the state created or errors.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "State created successfully",

                "State": serializer.data}, status=status.HTTP_201_CREATED
            )
        
        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class StateDetail(APIView):
    """
    Retrieve a state by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['get'], detail=True)
    def get(request, id):
        """
        Get a state by id.
        Args:
            request: Request from client.
            id (str): Id of the state.

        Returns:
            (Response): Response with the state.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        
        if not State.all_objects.filter(id=id).exists():
            messages.append('Este estado no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)
        
        state = State.all_objects.get(id=id)
        serializer = StateSerializer.serialize_get_crud(state)
        return Response(serializer)


class StateUpdate(APIView):
    """
    Update a state by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['put'], detail=True)
    def put(request, id=None):
        """
        Update a state by id.
        Args:
            request: Request from client.
            id (str): Id of the state.

        Returns:
            (Response): Response with the state updated or errors.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)

        if not State.all_objects.filter(id=id).exists():
            messages.append('Este estado no existe')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        name = State.all_objects.get(id=id).name
        if name == 'Pendiente' or name == 'Enviado' or name == 'Finalizado' or name == 'Cancelado':
            messages.append('No se puede actualizar este estado')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        state = State.all_objects.get(id=id)
        serializer = StateCrudSerializer(state, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "State updated": serializer.data
            })
        
        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class StateDelete(APIView):
    """
    Class to delete a state by id.
    """
    permission_classes = (IsAuthenticated,)

    @staticmethod
    @action(methods=['delete'], detail=True)
    def delete(request, id):
        """
        Delete a state by id.
        Args:
            request: Request from client.
            id: Id of the state.

        Returns:
            (Response): Response with a message of success or error.
        """
        messages = []

        if not authorization(request)['success']:
            messages.append('No está autorizado para realizar esta acción')
            return Response({"Errors": messages}, status=status.HTTP_401_UNAUTHORIZED)
        
        if not State.all_objects.filter(id=id).exists():
            messages.append('Este estado no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)
        
        name = State.all_objects.get(id=id).name
        if name == 'Pendiente' or name == 'Enviado' or name == 'Finalizado' or name == 'Cancelado':
            messages.append('No se puede eliminar este estado')
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)
        
        state = State.all_objects.get(id=id)
        state.soft_delete()
        
        return Response({'Delete': 'Successfully'}, status=status.HTTP_200_OK)
