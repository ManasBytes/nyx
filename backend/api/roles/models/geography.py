from django.db import models


class State(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class District(models.Model):
    state = models.ForeignKey(State, on_delete=models.PROTECT, related_name="districts")
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["name"]
        unique_together = ("state", "name")

    def __str__(self):
        return f"{self.name}, {self.state.code}"


class Zone(models.Model):
    district = models.ForeignKey(
        District, on_delete=models.PROTECT, related_name="zones"
    )
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["name"]
        unique_together = ("district", "name")

    def __str__(self):
        return f"{self.name}, {self.district.name}"


class City(models.Model):
    zone = models.ForeignKey(Zone, on_delete=models.PROTECT, related_name="cities")
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["name"]
        unique_together = ("zone", "name")
        verbose_name_plural = "cities"

    def __str__(self):
        return f"{self.name}, {self.zone.name}"
