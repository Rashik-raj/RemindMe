from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views.profile import ProfileViewSet
from users.views.user import UserViewSet

router = DefaultRouter(trailing_slash=True)
router.register(r"", UserViewSet, basename="user")

urlpatterns = [path("", include(router.urls))]
