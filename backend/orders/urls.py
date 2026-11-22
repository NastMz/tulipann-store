from django.urls import path

from . import views

urlpatterns = [
    path("departments", views.DepartmentListView.as_view()),
    path("cart/quote", views.QuoteView.as_view()),
    path("orders", views.OrderListCreateView.as_view()),
    path("orders/<uuid:pk>", views.OrderDetailView.as_view()),
    path("orders/<uuid:pk>/pay", views.OrderPaymentView.as_view()),
    path("orders/<uuid:pk>/cancel", views.OrderCancelView.as_view()),
]
