from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from api.utils.email_utils import send_mail
from django.template.loader import render_to_string


class Contact(APIView):
    """
    Create and sending email so that they can contact the staff to solve
    doubts or provide help.
    """
    permission_classes = (AllowAny,)

    @action(methods=['post'], detail=True)
    def post(self, request):
        """
        Function of sending email so that they can contact the staff to solve
        doubts or provide help.

        Args:
            request: Request from client.

        Returns:
            (Response): Response with the email send or error.
        """
        messages = []

        if 'name' not in request.data:
            messages.append('El nombre es requerido')

        if 'lastName' not in request.data:
            messages.append('El apellido es requerido')

        if 'email' not in request.data:
            messages.append('El correo es requerido')

        if 'phone' not in request.data:
            messages.append('El teléfono es requerido')

        if 'subject' not in request.data:
            messages.append('El asunto es requerido')

        if 'message' not in request.data:
            messages.append('El mensaje es requerido')

        if messages:
            return Response({"Errors": messages}, status=status.HTTP_400_BAD_REQUEST)

        subject = f"Solicitud de contacto en TulipannStore - {request.data['subject']}"
        to_email = 'tulipannstore@gmail.com'

        message = render_to_string('contact_email.html', {
            'name': request.data['name'],
            'lastName': request.data['lastName'],
            'email': request.data['email'],
            'phone': request.data['phone'],
            'message': request.data['message'],
        })

        try:
            send_mail(to_emails=[to_email], subject=subject, html_content=message)
            return Response({"Message": "Correo enviado correctamente"}, status=status.HTTP_200_OK)
        except Exception  as e:
            print(str(e))
            messages.append('Error al enviar el correo')
            return Response({"Errors": messages}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
