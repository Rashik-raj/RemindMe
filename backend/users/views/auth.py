from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # Add custom code here
        return super().post(request, *args, **kwargs)


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Add custom code here
        return super().post(request, *args, **kwargs)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = TokenRefreshSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            token = RefreshToken(request.data.get("refresh"))
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
