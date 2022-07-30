from rest_framework.viewsets import ModelViewSet

from users.models import Profile
from utils.permissions import ProfilePermission
from users.serializers.user import ProfileDetailSerializer


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileDetailSerializer
    permission_classes = [ProfilePermission]

