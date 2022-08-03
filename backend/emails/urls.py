from django.urls import path, include
from rest_framework.routers import DefaultRouter

from emails.views.email import EmailViewSet

router = DefaultRouter(trailing_slash=True)
router.register(r"", EmailViewSet, basename='email')

urlpatterns = [path("", include(router.urls))]
