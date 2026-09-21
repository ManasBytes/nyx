import smtplib

from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


@shared_task(
    autoretry_for=(OSError, smtplib.SMTPException),
    retry_backoff=True,
    max_retries=3,
)
def send_template_email(subject, recipient, template_name, context):
    html = render_to_string(template_name, {**context, "subject": subject})
    message = EmailMultiAlternatives(
        subject, strip_tags(html), settings.DEFAULT_FROM_EMAIL, [recipient]
    )
    message.attach_alternative(html, "text/html")
    return message.send()
