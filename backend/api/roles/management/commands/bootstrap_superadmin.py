from django.core.management.base import BaseCommand, CommandError

from api.authentication.models import User
from api.roles.models import Role, State, UserAssignment


class Command(BaseCommand):
    help = "Create the first Superadmin for a state. Nothing approves this - it's the root."

    def add_arguments(self, parser):
        parser.add_argument("--email", required=True)
        parser.add_argument("--password", required=True)
        parser.add_argument("--state", required=True, help="State code, e.g. UP")

    def handle(self, *args, **options):
        state = State.objects.filter(code=options["state"]).first()
        if not state:
            raise CommandError(f"No state with code {options['state']!r}.")

        role = Role.objects.get(name=Role.SUPERADMIN)
        user, created = User.objects.get_or_create(
            email=options["email"], defaults={"status": User.ACTIVE}
        )
        user.set_password(options["password"])
        user.status = User.ACTIVE
        user.save()

        UserAssignment.objects.filter(user=user, is_active=True).update(is_active=False)
        UserAssignment.objects.create(user=user, role=role, state=state)

        verb = "Created" if created else "Updated"
        self.stdout.write(
            self.style.SUCCESS(f"{verb} superadmin {user.email} for {state.code}.")
        )
