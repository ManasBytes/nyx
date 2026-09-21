from django.utils import timezone
from rest_framework.exceptions import ValidationError

from api.authentication.models import User

from .approval_mail import notify_request_approved, notify_request_submitted
from .authz import require_approver_or_superadmin
from .models import AccessRequest, Role, UserAssignment

# The chain a request climbs for approval. Superadmin has no parent - it is
# assigned directly (see the bootstrap_superadmin command), never requested.
PARENT_ROLE = {
    Role.DGP: Role.SUPERADMIN,
    Role.CP: Role.DGP,
    Role.DSP: Role.CP,
    Role.INSPECTOR: Role.DSP,
}

# Which jurisdiction fields a role's own assignment/request must carry.
REQUIRED_JURISDICTION_FIELDS = {
    Role.SUPERADMIN: ("state",),
    Role.DGP: ("state",),
    Role.CP: ("state", "district"),
    Role.DSP: ("state", "district", "zone"),
    Role.INSPECTOR: ("state", "district", "zone", "city"),
}

ALL_JURISDICTION_FIELDS = ("state", "district", "zone", "city")


def validate_jurisdiction(role, jurisdiction):
    """jurisdiction: dict with keys state/district/zone/city (some may be None).
    Raises ValidationError unless exactly the fields the role requires are set."""
    required = REQUIRED_JURISDICTION_FIELDS[role.name]
    for field in ALL_JURISDICTION_FIELDS:
        present = jurisdiction.get(field) is not None
        should_be_present = field in required
        if present != should_be_present:
            raise ValidationError(
                f"{role.name} requires exactly: {', '.join(required)}."
            )


def resolve_approver(role, jurisdiction):
    """Find who should approve a request for `role` at `jurisdiction`: the
    active holder of the parent role at the matching jurisdiction, falling
    back to the state's superadmin if no one holds the parent role yet."""
    parent_role_name = PARENT_ROLE[role.name]
    parent_fields = REQUIRED_JURISDICTION_FIELDS[parent_role_name]
    parent_match = {field: jurisdiction[field] for field in parent_fields}

    approver_assignment = UserAssignment.objects.filter(
        role__name=parent_role_name, is_active=True, **parent_match
    ).first()
    if approver_assignment:
        return approver_assignment.user

    superadmin_assignment = UserAssignment.objects.filter(
        role__name=Role.SUPERADMIN, is_active=True, state=jurisdiction["state"]
    ).first()
    return superadmin_assignment.user if superadmin_assignment else None


def submit_access_request(user, role, jurisdiction):
    if role.name == Role.SUPERADMIN:
        raise ValidationError("Superadmin is assigned directly, not requested.")

    validate_jurisdiction(role, jurisdiction)
    approver = resolve_approver(role, jurisdiction)
    access_request = AccessRequest.objects.create(
        user=user,
        requested_role=role,
        approver_user=approver,
        **jurisdiction,
    )
    notify_request_submitted(access_request)
    return access_request


@require_approver_or_superadmin
def approve_access_request(access_request, acting_user):
    role = access_request.requested_role
    jurisdiction = {
        field: getattr(access_request, field) for field in ALL_JURISDICTION_FIELDS
    }

    if role.name == Role.DGP:
        existing = UserAssignment.objects.filter(
            role=role, state=access_request.state, is_active=True
        ).exclude(user=access_request.user)
        if existing.exists():
            raise ValidationError("This state already has an active DGP.")

    # Only one active role per user for now (multi-role is a later feature).
    UserAssignment.objects.filter(user=access_request.user, is_active=True).update(
        is_active=False
    )
    assignment = UserAssignment.objects.create(
        user=access_request.user, role=role, **jurisdiction
    )

    access_request.status = AccessRequest.APPROVED
    access_request.approved_at = timezone.now()
    access_request.save(update_fields=["status", "approved_at"])

    access_request.user.status = User.ACTIVE
    access_request.user.save(update_fields=["status"])

    notify_request_approved(access_request)
    return assignment


@require_approver_or_superadmin
def reject_access_request(access_request, acting_user, reason=""):
    access_request.status = AccessRequest.REJECTED
    access_request.reason = reason
    access_request.save(update_fields=["status", "reason"])
    return access_request
