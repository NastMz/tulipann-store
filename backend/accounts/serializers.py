from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "phone", "is_staff", "date_joined"]
        read_only_fields = ["id", "email", "is_staff", "date_joined"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, trim_whitespace=False)

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "phone", "password"]

    # The e-mail field must not run the model's unique check: telling a
    # visitor that an address is taken would reveal who has an account.
    email = serializers.EmailField(max_length=254)

    def validate_email(self, value: str) -> str:
        return value.lower()

    def validate(self, attrs):
        candidate = User(**{key: val for key, val in attrs.items() if key != "password"})
        try:
            password_validation.validate_password(attrs["password"], candidate)
        except DjangoValidationError as error:
            raise serializers.ValidationError({"password": list(error.messages)})
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class ActivationSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(trim_whitespace=False)


def _validated_password(value: str, user) -> str:
    try:
        password_validation.validate_password(value, user)
    except DjangoValidationError as error:
        raise serializers.ValidationError(list(error.messages))
    return value


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(trim_whitespace=False)
    new_password = serializers.CharField(trim_whitespace=False)

    def validate_current_password(self, value: str) -> str:
        if not self.context["request"].user.check_password(value):
            raise serializers.ValidationError("La contraseña actual no es correcta.")
        return value

    def validate_new_password(self, value: str) -> str:
        return _validated_password(value, self.context["request"].user)


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(trim_whitespace=False)

    def validate_with_user(self, user) -> None:
        try:
            _validated_password(self.validated_data["new_password"], user)
        except serializers.ValidationError as error:
            raise serializers.ValidationError({"new_password": error.detail})
