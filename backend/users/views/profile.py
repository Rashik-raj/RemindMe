from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from users.models import Profile
from users.serializers.user import ProfileDetailSerializer
from utils.permissions import ProfilePermission


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileDetailSerializer
    permission_classes = [ProfilePermission]

    @action(detail=False, methods=['GET'], url_path='my-profile', url_name='my-profile')
    def my_profile(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)
