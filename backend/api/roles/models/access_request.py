from django.conf import settings
from django.db import models

from .geography import City, District, State, Zone
from .role import Role


class AccessRequest(models.Model):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (APPROVED, "Approved"),
        (REJECTED, "Rejected"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="access_requests",
    )
    requested_role = models.ForeignKey(
        Role, on_delete=models.PROTECT, related_name="access_requests"
    )
    state = models.ForeignKey(
        State, on_delete=models.PROTECT, related_name="access_requests"
    )
    district = models.ForeignKey(
        District,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="access_requests",
    )
    zone = models.ForeignKey(
        Zone,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="access_requests",
    )
    city = models.ForeignKey(
        City,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="access_requests",
    )
    approver_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="requests_to_approve",
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    reason = models.TextField(blank=True)
    requested_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-requested_at"]

    def __str__(self):
        return f"{self.user.email} -> {self.requested_role.name} ({self.status})"
