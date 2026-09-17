from functools import wraps

from rest_framework.exceptions import PermissionDenied

from .models import Role, UserAssignment


def is_superadmin(user):
    return UserAssignment.objects.filter(
        user=user, role__name=Role.SUPERADMIN, is_active=True
    ).exists()


def require_approver_or_superadmin(func):
    """Wrap a service(access_request, acting_user, ...) call so only the
    request's resolved approver or a superadmin may run it."""

    @wraps(func)
    def wrapper(access_request, acting_user, *args, **kwargs):
        is_approver = access_request.approver_user_id == acting_user.id
        if not (is_approver or is_superadmin(acting_user)):
            raise PermissionDenied("You are not the approver for this request.")
        return func(access_request, acting_user, *args, **kwargs)

    return wrapper
