import logging

from django.conf import settings
from django.core.mail import EmailMessage
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from rest_framework import permissions, serializers, status
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from .models import ContactMessage

logger = logging.getLogger(__name__)


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message"]


@method_decorator(csrf_protect, name="dispatch")
class ContactView(APIView):
    """Stores the letter and forwards it to the workshop inbox (Mailpit locally)."""

    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth"

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        letter = serializer.save()
        message = EmailMessage(
            subject=f"Carta al gabinete: {letter.subject}",
            body=f"De: {letter.name} <{letter.email}>\n\n{letter.message}",
            to=[settings.STAFF_INBOX],
            reply_to=[letter.email],
        )
        try:
            message.send()
        except Exception:  # the letter is stored even if the mail catcher is down
            logger.exception("Could not forward contact message %s", letter.pk)
        return Response({"detail": "Recibimos tu carta. Te responderemos pronto."}, status=status.HTTP_201_CREATED)
