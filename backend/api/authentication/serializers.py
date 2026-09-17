from django.contrib.auth import authenticate
from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api.roles import services as role_services
from api.roles.models import City, District, Role, State, Zone

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "status", "date_joined")
        read_only_fields = ("id", "status", "date_joined")


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, min_length=8, style={"input_type": "password"}
    )
    requested_role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), write_only=True
    )
    state = serializers.PrimaryKeyRelatedField(
        queryset=State.objects.all(), write_only=True
    )
    district = serializers.PrimaryKeyRelatedField(
        queryset=District.objects.all(),
        required=False,
        allow_null=True,
        write_only=True,
    )
    zone = serializers.PrimaryKeyRelatedField(
        queryset=Zone.objects.all(), required=False, allow_null=True, write_only=True
    )
    city = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(), required=False, allow_null=True, write_only=True
    )

    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "first_name",
            "last_name",
            "requested_role",
            "state",
            "district",
            "zone",
            "city",
        )

    def create(self, validated_data):
        password = validated_data.pop("password")
        role = validated_data.pop("requested_role")
        jurisdiction = {
            "state": validated_data.pop("state"),
            "district": validated_data.pop("district", None),
            "zone": validated_data.pop("zone", None),
            "city": validated_data.pop("city", None),
        }
        with transaction.atomic():
            user = User.objects.create_user(password=password, **validated_data)
            role_services.submit_access_request(user, role, jurisdiction)
        return user


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "email"

    def validate(self, attrs):
        credentials = {
            "email": attrs.get("email"),
            "password": attrs.get("password"),
        }
        self.user = authenticate(request=self.context.get("request"), **credentials)

        if not self.user or not self.user.is_active:
            self.fail("no_active_account")

        if self.user.status == User.SUSPENDED:
            raise serializers.ValidationError("This account has been suspended.")

        refresh = self.get_token(self.user)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}
