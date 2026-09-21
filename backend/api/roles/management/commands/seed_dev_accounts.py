from django.core.management.base import BaseCommand

from api.authentication.models import User
from api.roles.models import Role, State, UserAssignment

DEV_PASSWORD = "ChangeMe123!"
DEV_ACCOUNTS = [
    (Role.SUPERADMIN, "admin@nyx.dev"),
    (Role.DGP, "dgp@nyx.dev"),
]


class Command(BaseCommand):
    help = "Seed fixed demo accounts (superadmin, dgp) for local dev-login only."

    def add_arguments(self, parser):
        parser.add_argument("--state", default="UP", help="State code, e.g. UP")

    def handle(self, *args, **options):
        state = State.objects.get(code=options["state"])
        for role_name, email in DEV_ACCOUNTS:
            role = Role.objects.get(name=role_name)
            user, _ = User.objects.get_or_create(
                email=email, defaults={"status": User.ACTIVE}
            )
            user.set_password(DEV_PASSWORD)
            user.status = User.ACTIVE
            user.save()

            UserAssignment.objects.filter(user=user, is_active=True).update(
                is_active=False
            )
            UserAssignment.objects.create(user=user, role=role, state=state)
            self.stdout.write(
                self.style.SUCCESS(f"{role_name}: {email} / {DEV_PASSWORD}")
            )
