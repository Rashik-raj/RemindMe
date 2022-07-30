from django.urls import path, include
from rest_framework.routers import DefaultRouter

from schedules.views.schedule import ScheduleViewSet

router = DefaultRouter(trailing_slash=True)
router.register(r"", ScheduleViewSet, basename="schedule")

urlpatterns = [path("", include(router.urls))]
