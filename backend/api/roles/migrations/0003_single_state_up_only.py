from django.db import migrations


def remove_other_states(apps, schema_editor):
    State = apps.get_model("roles", "State")
    State.objects.exclude(code="UP").delete()


class Migration(migrations.Migration):

    dependencies = [
        ("roles", "0002_seed_roles"),
    ]

    operations = [
        migrations.RunPython(remove_other_states, migrations.RunPython.noop),
    ]
