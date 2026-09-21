from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from api.roles.models import UserAssignment

from .serializers import (
    EmailTokenObtainPairSerializer,
    SignupSerializer,
    UserSerializer,
)


class SignupView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = EmailTokenObtainPairSerializer


class DevLoginView(APIView):
    """One-click login as a seeded demo account, for local development only.
    Refuses to work unless DEBUG is on - never reachable in production,
    regardless of what the frontend shows."""

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        if not settings.DEBUG:
            return Response(status=status.HTTP_404_NOT_FOUND)

        role_name = request.data.get("role", "")
        assignment = (
            UserAssignment.objects.filter(role__name=role_name, is_active=True)
            .select_related("user")
            .first()
        )
        if not assignment:
            return Response(
                {"detail": f"No active {role_name} account exists yet."},
                status=status.HTTP_404_NOT_FOUND,
            )

        user = assignment.user
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "email": user.email,
            }
        )
