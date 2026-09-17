from django.db import models


class Role(models.Model):
    SUPERADMIN = "superadmin"
    DGP = "dgp"
    CP = "cp"
    DSP = "dsp"
    INSPECTOR = "inspector"

    name = models.CharField(max_length=50, unique=True)
    level = models.PositiveSmallIntegerField(unique=True)

    class Meta:
        ordering = ["level"]

    def __str__(self):
        return self.name
