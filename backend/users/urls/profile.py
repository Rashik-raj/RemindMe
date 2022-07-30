from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views.profile import ProfileViewSet

router = DefaultRouter(trailing_slash=True)
router.register(r"", ProfileViewSet, basename="profile")

urlpatterns = [path("", include(router.urls))]
