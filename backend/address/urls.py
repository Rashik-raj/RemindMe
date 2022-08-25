from django.urls import path, include
from rest_framework.routers import DefaultRouter

from address.views.address import AddressViewSet

router = DefaultRouter(trailing_slash=True)
router.register(r"", AddressViewSet, basename="address")

urlpatterns = [path("", include(router.urls))]
