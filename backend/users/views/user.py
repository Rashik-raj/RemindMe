from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from users.models import User
from users.serializers.user import UserDetailSerializer, UserCreateSerializer
from utils.permissions import UserPermission


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [UserPermission]

    def create(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create_user(**serializer.validated_data)
        user.create_profile()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
