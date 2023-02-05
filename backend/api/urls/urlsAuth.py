from django.urls import path
from api.views.auth.PasswordResetConfirmView import CheckToken
from rest_framework_simplejwt.views import TokenRefreshView
from api.views.auth.AccessToken import TokenGenerateView
from api.views.auth.LoginView import LoginView
from api.views.auth.RegistrationUserView import RegistrationUserView
from api.views.auth import PasswordResetView, PasswordResetConfirmView

"""
This file configures all the routes to which a user has access to authenticate within the page.
"""

urlpatterns = [
    path('register/', RegistrationUserView.as_view(), name='register_user'),
    path('login/', LoginView.as_view(), name='login_user'),
    path('token/get/', TokenGenerateView.as_view(), name='token_generate'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password/restore/', PasswordResetView.as_view(), name='restore_password'),
    path('password/change/<str:encoded_token>', PasswordResetConfirmView.as_view(), name='change_password'),
    path('token/verify/<str:encoded_token>', CheckToken.as_view(), name='check_token')
]
