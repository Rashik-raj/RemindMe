from rest_framework import serializers

from users.models import User, Profile


class ProfileDetailSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField('get_profile_url')

    class Meta:
        model = Profile
        exclude = ('user',)

    def get_profile_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.profile.url)


class UserDetailSerializer(serializers.ModelSerializer):
    profile = ProfileDetailSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'full_name', 'profile']


class UserCreateSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ["email", "password", "first_name", "last_name"]
