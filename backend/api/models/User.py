from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
import uuid

from .City import City
from .Role import Role
from .Department import Department


def uuid_hex():
    """
    Generates a unique hexadecimal identifier using uuid.uuid4()
    Returns:
        string of the hexadecimal identifier
    """
    return str(uuid.uuid4().hex)


class CustomBaseUserManager(BaseUserManager):
    """
    Custom manager class for the User model.
    """
    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        """
        This function creates a new user by providing the necessary fields.
        Args:
            email: Email of the user (str)
            password: Password of the user (str)
            is_staff: Boolean value indicating whether the user is a staff member or not (bool)
            is_superuser: Boolean value indicating whether the user is a superuser or not (bool)
            extra_fields: Additional fields for the user (**kwargs)
        Returns:
            New user (User)
        """
        now = timezone.now()

        # Get the default role of 'Cliente'
        db_role = Role.objects.get(name='Cliente')

        # Check if email is provided
        if not email:
            raise ValueError('users must have an email address')
        email = self.normalize_email(email)

        id = uuid_hex()

        # Create the user
        user = self.model(id=id,
                          email=email,
                          is_staff=is_staff,
                          is_superuser=is_superuser,
                          last_login=now,
                          role=db_role,
                          **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """
       This function creates a new user.
       Args:
           email: Email of the user (str)
           password: Password of the user (str)
           extra_fields: Additional fields for the user (**kwargs)
       Returns:
           New user (User)
       """
        user = self._create_user(email, password, False, False, **extra_fields)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
       This function creates a new superuser.
       Args:
           email: Email of the user (str)
           password: Password of the user (str)
           extra_fields: Additional fields for the user (**kwargs)
       Returns:
           New superuser (User)
       """
        user = self._create_user(email, password, True, True, **extra_fields)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model that extends the Django AbstractBaseUser and PermissionsMixin classes.
    """
    id = models.CharField(primary_key=True, editable=False, max_length=255, db_column='user_id')
    firstName = models.CharField(max_length=255, db_column='first_name')
    lastName = models.CharField(max_length=255, db_column='last_name')
    email = models.EmailField(unique=True, max_length=255)
    phone = models.CharField(max_length=30)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['firstName', 'lastName', 'phone', 'department', 'city', 'address', 'role']

    objects = CustomBaseUserManager()

    class Meta:
        managed = False

    def __str__(self):
        return f'{self.firstName} {self.lastName}'
