from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from users.models import Profile
from utils.permissions import ProfilePermission
from users.serializers.user import ProfileDetailSerializer


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileDetailSerializer
    permission_classes = [ProfilePermission]

    @action(detail=False, methods=['GET'], url_path='my-profile', url_name='my-profile')
    def my_profile(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileDetailSerializer(profile, context={"request": request})
        return Response(serializer.data)

