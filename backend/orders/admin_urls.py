from django.urls import path

from . import admin_views

urlpatterns = [
    path("summary", admin_views.SummaryView.as_view()),
    path("orders", admin_views.StaffOrderListView.as_view()),
    path("orders/<uuid:pk>", admin_views.StaffOrderDetailView.as_view()),
    path("orders/<uuid:pk>/transition", admin_views.StaffOrderTransitionView.as_view()),
    path("customers", admin_views.CustomerListView.as_view()),
]
