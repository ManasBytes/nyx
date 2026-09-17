from django.urls import path

from .views import (
    AccessRequestCreateView,
    ApproveAccessRequestView,
    CityListView,
    DistrictListView,
    MyAccessRequestsView,
    MyAssignmentView,
    PendingApprovalsView,
    RejectAccessRequestView,
    RoleListView,
    StateListView,
    ZoneListView,
)

urlpatterns = [
    path("states/", StateListView.as_view(), name="state-list"),
    path("districts/", DistrictListView.as_view(), name="district-list"),
    path("zones/", ZoneListView.as_view(), name="zone-list"),
    path("cities/", CityListView.as_view(), name="city-list"),
    path("roles/", RoleListView.as_view(), name="role-list"),
    path("my-assignment/", MyAssignmentView.as_view(), name="my-assignment"),
    path(
        "access-requests/",
        AccessRequestCreateView.as_view(),
        name="access-request-create",
    ),
    path(
        "access-requests/mine/",
        MyAccessRequestsView.as_view(),
        name="access-request-mine",
    ),
    path(
        "access-requests/pending/",
        PendingApprovalsView.as_view(),
        name="access-request-pending",
    ),
    path(
        "access-requests/<int:pk>/approve/",
        ApproveAccessRequestView.as_view(),
        name="access-request-approve",
    ),
    path(
        "access-requests/<int:pk>/reject/",
        RejectAccessRequestView.as_view(),
        name="access-request-reject",
    ),
]
