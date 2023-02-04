from rest_framework import serializers
from ..models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = User
        fields = (
            'firstName',
            'lastName',
            'email',
            'phone',
            'address',
            'password',
            'department',
            'city')

    def validate(self, args):
        email = args.get('email', None)
        messages = []
        if User.objects.filter(email=email).exists():
            messages.append('El correo ya se encuentra registrado')
            raise serializers.ValidationError(messages)
        return super().validate(args)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
