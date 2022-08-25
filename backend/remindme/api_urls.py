from django.urls import path, include

urlpatterns = [
    path("auth/", include("users.auth_urls")),
    path("users/", include("users.urls.user")),
    path("profiles/", include("users.urls.profile")),
    path("schedules/", include("schedules.urls")),
    path("emails/", include("emails.urls")),
    path("address/", include("address.urls")),
]