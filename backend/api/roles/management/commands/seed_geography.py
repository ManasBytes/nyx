import csv
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand

from api.roles.models import District, State

SEED_DIR = Path(settings.BASE_DIR) / "seed"

# This is a single-state deployment (see plan1_auth.md / project docs): each
# state is meant to eventually run its own isolated Nyx instance, so only
# seed the one this instance serves.
SUPPORTED_STATE_CODES = {"UP"}


class Command(BaseCommand):
    help = "Seed the supported state(s) and their districts from backend/seed/*.csv"

    def handle(self, *args, **options):
        states_created = self._seed_states()
        districts_created = self._seed_districts()
        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {states_created} states and {districts_created} districts."
            )
        )

    def _seed_states(self):
        created = 0
        with open(SEED_DIR / "states.csv", newline="") as f:
            for row in csv.DictReader(f):
                if row["code"] not in SUPPORTED_STATE_CODES:
                    continue
                _, was_created = State.objects.get_or_create(
                    id=int(row["id"]),
                    defaults={"name": row["name"], "code": row["code"]},
                )
                created += was_created
        return created

    def _seed_districts(self):
        created = 0
        with open(SEED_DIR / "up_districts.csv", newline="") as f:
            for row in csv.DictReader(f):
                state = State.objects.get(id=int(row["state_id"]))
                _, was_created = District.objects.get_or_create(
                    state=state, name=row["name"]
                )
                created += was_created
        return created
