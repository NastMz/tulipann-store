from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from api.models import State
from api.serializers import StateSerializer
from api.utils.authorization_crud import authorization


class StateList(APIView):
    """
    List all states with soft delete filter.
    """
    permission_classes = (AllowAny,)

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

        states = State.all_objects.all()
        states_serialized = []
        for state in states:
            states_serialized.append(StateSerializer.serialize_get_crud(state=state))
        return Response({'states': states_serialized})


class StateDetail(APIView):
    """
    Retrieve a state by id.
    """
    permission_classes = (AllowAny,)

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

        if not State.all_objects.filter(id=id).exists():
            messages.append('Este estado no existe')
            return Response({"Errors": messages}, status=status.HTTP_404_NOT_FOUND)

        state = State.all_objects.get(id=id)
        serializer = StateSerializer.serialize_get_crud(state)
        return Response(serializer)
