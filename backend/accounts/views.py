"""Session-based authentication endpoints.

The API never hands a token to the browser. Logging in creates a Django session
(HttpOnly cookie) and every state-changing request must carry the CSRF token,
which the SPA reads from the ``csrftoken`` cookie set by ``GET /api/auth/csrf``.
"""
from django.conf import settings
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.decorators import method_decorator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from .models import User
from .serializers import (
    LoginSerializer,
    PasswordChangeSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
    RegisterSerializer,
    UserSerializer,
)


@method_decorator(csrf_protect, name="dispatch")
class AnonymousFormView(APIView):
    """Public POST endpoints: CSRF is enforced and the rate is throttled."""

    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "auth"


@method_decorator(ensure_csrf_cookie, name="dispatch")
class CsrfView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({"detail": "ok"})


class MeView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"user": None})
        return Response({"user": UserSerializer(request.user).data})

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"user": serializer.data})


class RegisterView(AnonymousFormView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user, backend="django.contrib.auth.backends.ModelBackend")
        return Response({"user": UserSerializer(user).data}, status=status.HTTP_201_CREATED)


class LoginView(AnonymousFormView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            request,
            username=serializer.validated_data["email"].lower(),
            password=serializer.validated_data["password"],
        )
        if user is None:
            return Response({"detail": "Correo o contraseña incorrectos."}, status=status.HTTP_400_BAD_REQUEST)
        login(request, user)
        return Response({"user": UserSerializer(user).data})


@method_decorator(csrf_protect, name="dispatch")
class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class PasswordChangeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data["new_password"])
        request.user.save(update_fields=["password"])
        update_session_auth_hash(request, request.user)
        return Response({"detail": "Contraseña actualizada."})


class PasswordResetRequestView(AnonymousFormView):
    """Answers the same way whether or not the account exists."""

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"].lower()
        user = User.objects.filter(email=email, is_active=True).first()
        if user is not None:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            link = f"{settings.SITE_URL}/recuperar/{uid}/{token}"
            body = render_to_string("emails/password_reset.txt", {"user": user, "link": link})
            send_mail("Restablece tu contraseña · Tulipann", body, None, [user.email])
        return Response({"detail": "Si el correo está registrado, enviamos un enlace para restablecer la contraseña."})


class PasswordResetConfirmView(AnonymousFormView):
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        try:
            user = User.objects.get(pk=force_str(urlsafe_base64_decode(data["uid"])), is_active=True)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            user = None
        if user is None or not default_token_generator.check_token(user, data["token"]):
            return Response({"detail": "El enlace no es válido o ya expiró."}, status=status.HTTP_400_BAD_REQUEST)
        serializer.validate_with_user(user)
        user.set_password(data["new_password"])
        user.save(update_fields=["password"])
        return Response({"detail": "Contraseña restablecida. Ya puedes ingresar."})
