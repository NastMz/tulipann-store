from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views.auth.RegistrationAPIView import RegistrationAPIView
from api.views.auth import UserSelfUpdateView, PasswordResetView, PasswordResetConfirmView

urlpatterns = [
    path('register/', RegistrationAPIView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh-token/', TokenRefreshView.as_view(), name='refreshtoken'),
    path('update-user/', UserSelfUpdateView.as_view(), name='update_user'),
    path('password/restore/', PasswordResetView.as_view(), name='restore_password'),
    path('password/change/', PasswordResetConfirmView.as_view(), name='change_password'),
]
