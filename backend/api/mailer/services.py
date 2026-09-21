from django.db import transaction

from .tasks import send_template_email


def schedule_email(*, subject, recipient, template_name, context):
    transaction.on_commit(
        lambda: send_template_email.delay(subject, recipient, template_name, context)
    )
