from rest_framework import generics, permissions
from rest_framework.response import Response

from . import services
from .authz import is_superadmin
from .models import AccessRequest, City, District, Role, State, UserAssignment, Zone
from .permissions import IsAccessRequestApprover
from .serializers import (
    AccessRequestCreateSerializer,
    AccessRequestSerializer,
    CitySerializer,
    DistrictSerializer,
    RoleSerializer,
    StateSerializer,
    UserAssignmentSerializer,
    ZoneSerializer,
)


# These four are plain reference/lookup data (no user-specific or sensitive
# content), and the signup form needs them before a user has a token.
class StateListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = StateSerializer
    queryset = State.objects.all()


class DistrictListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = DistrictSerializer

    def get_queryset(self):
        queryset = District.objects.all()
        state_id = self.request.query_params.get("state")
        if state_id:
            queryset = queryset.filter(state_id=state_id)
        return queryset


class ZoneListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ZoneSerializer

    def get_queryset(self):
        queryset = Zone.objects.all()
        district_id = self.request.query_params.get("district")
        if district_id:
            queryset = queryset.filter(district_id=district_id)
        return queryset


class CityListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CitySerializer

    def get_queryset(self):
        queryset = City.objects.all()
        zone_id = self.request.query_params.get("zone")
        if zone_id:
            queryset = queryset.filter(zone_id=zone_id)
        return queryset


class RoleListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RoleSerializer
    queryset = Role.objects.all()


class MyAssignmentView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserAssignmentSerializer

    def get(self, request):
        assignment = UserAssignment.objects.filter(
            user=request.user, is_active=True
        ).first()
        if not assignment:
            return Response(None)
        return Response(self.get_serializer(assignment).data)


class AccessRequestCreateView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AccessRequestCreateSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        jurisdiction = {
            "state": data["state"],
            "district": data.get("district"),
            "zone": data.get("zone"),
            "city": data.get("city"),
        }
        access_request = services.submit_access_request(
            user=request.user, role=data["requested_role"], jurisdiction=jurisdiction
        )
        return Response(AccessRequestSerializer(access_request).data, status=201)


class MyAccessRequestsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AccessRequestSerializer

    def get_queryset(self):
        return AccessRequest.objects.filter(user=self.request.user)


class PendingApprovalsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AccessRequestSerializer

    def get_queryset(self):
        queryset = AccessRequest.objects.filter(status=AccessRequest.PENDING)
        if is_superadmin(self.request.user):
            return queryset
        return queryset.filter(approver_user=self.request.user)


class ApproveAccessRequestView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, IsAccessRequestApprover]
    queryset = AccessRequest.objects.all()

    def post(self, request, pk):
        access_request = self.get_object()
        services.approve_access_request(access_request, request.user)
        return Response(AccessRequestSerializer(access_request).data)


class RejectAccessRequestView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, IsAccessRequestApprover]
    queryset = AccessRequest.objects.all()

    def post(self, request, pk):
        access_request = self.get_object()
        services.reject_access_request(
            access_request, request.user, reason=request.data.get("reason", "")
        )
        return Response(AccessRequestSerializer(access_request).data)
