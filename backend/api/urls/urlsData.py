from django.urls import path
from api.views.data import UserSelfView, UserSelfUpdateView

"""
This file configures all the paths that a user has access to view and change their own information.
"""

urlpatterns = [
    path('user/', UserSelfView.as_view(), name='view_user'),
    path('user/update/', UserSelfUpdateView.as_view(), name='update_user'),
]
