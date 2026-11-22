from django.urls import include, path

urlpatterns = [
    path("api/auth/", include("accounts.urls")),
    path("api/", include("catalog.urls")),
    path("api/", include("orders.urls")),
    path("api/", include("journal.urls")),
    path("api/", include("contact.urls")),
    path("api/admin/", include("orders.admin_urls")),
    path("api/admin/", include("catalog.admin_urls")),
]
