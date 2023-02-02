import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework.decorators import action

from api.models import Order, State


@csrf_exempt
@action(detail=False, methods=['post'])
def confirm_payment(request):
    """
        Confirm payment function that receives the POST data from a payment gateway
        and updates the order's state accordingly.

        Args:
            request (HttpRequest): The request object.

        Returns:
            HttpResponse: The HTTP response object.
        """
    form_dict = dict(request.POST)

    if form_dict['state_pol'][0] == '4':
        # Update the order state to success
        order = Order.all_objects.get(id=form_dict['extra1'][0])
        order.state = State.all_objects.get(name='Aprobado')
        order.details = json.dumps(form_dict)
        order.save()
    else:
        # Update the order state to fail
        order = Order.all_objects.get(id=form_dict['extra1'][0])
        order.state = State.all_objects.get(name='Rechazado')
        order.details = json.dumps(form_dict)
        order.save()
    return HttpResponse("ok")
