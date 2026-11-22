from django.urls import path

from . import admin_views

urlpatterns = [
    path("products", admin_views.ProductAdminListView.as_view()),
    path("products/<int:pk>", admin_views.ProductAdminDetailView.as_view()),
    path("reviews", admin_views.ReviewAdminListView.as_view()),
    path("reviews/<int:pk>", admin_views.ReviewAdminDeleteView.as_view()),
]
