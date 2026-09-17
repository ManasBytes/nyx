from django.conf import settings
from django.db import models

from .geography import City, District, State, Zone
from .role import Role


class UserAssignment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="assignments"
    )
    role = models.ForeignKey(Role, on_delete=models.PROTECT, related_name="assignments")
    state = models.ForeignKey(
        State, on_delete=models.PROTECT, related_name="assignments"
    )
    district = models.ForeignKey(
        District,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="assignments",
    )
    zone = models.ForeignKey(
        Zone,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="assignments",
    )
    city = models.ForeignKey(
        City,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="assignments",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.email} - {self.role.name}"
