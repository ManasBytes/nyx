from rest_framework import serializers

from .models import AccessRequest, City, District, Role, State, UserAssignment, Zone


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ("id", "name", "code")


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ("id", "name", "state")


class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = ("id", "name", "district")


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ("id", "name", "zone")


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ("id", "name", "level")


class AccessRequestSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    requested_role = RoleSerializer()
    approver_user = serializers.StringRelatedField()
    state = serializers.StringRelatedField()
    district = serializers.StringRelatedField()
    zone = serializers.StringRelatedField()
    city = serializers.StringRelatedField()

    class Meta:
        model = AccessRequest
        fields = (
            "id",
            "user",
            "requested_role",
            "state",
            "district",
            "zone",
            "city",
            "approver_user",
            "status",
            "reason",
            "requested_at",
            "approved_at",
        )


class UserAssignmentSerializer(serializers.ModelSerializer):
    role = RoleSerializer()
    state = serializers.StringRelatedField()
    district = serializers.StringRelatedField()
    zone = serializers.StringRelatedField()
    city = serializers.StringRelatedField()

    class Meta:
        model = UserAssignment
        fields = ("id", "role", "state", "district", "zone", "city", "created_at")


class AccessRequestCreateSerializer(serializers.Serializer):
    requested_role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all())
    state = serializers.PrimaryKeyRelatedField(queryset=State.objects.all())
    district = serializers.PrimaryKeyRelatedField(
        queryset=District.objects.all(), required=False, allow_null=True
    )
    zone = serializers.PrimaryKeyRelatedField(
        queryset=Zone.objects.all(), required=False, allow_null=True
    )
    city = serializers.PrimaryKeyRelatedField(
        queryset=City.objects.all(), required=False, allow_null=True
    )
