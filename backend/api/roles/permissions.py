from rest_framework.permissions import BasePermission

from .authz import is_superadmin


class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and is_superadmin(request.user))


class IsAccessRequestApprover(BasePermission):
    """Object-level: only the request's resolved approver or a superadmin may act on it."""

    def has_object_permission(self, request, view, obj):
        return bool(
            is_superadmin(request.user) or obj.approver_user_id == request.user.id
        )
