from api.mailer.services import schedule_email

from .models import AccessRequest


def notify_request_submitted(access_request):
    schedule_email(
        subject="Your access request has been recorded",
        recipient=access_request.user.email,
        template_name="email/request-recorded.html",
        context={
            "user_name": access_request.user.first_name or access_request.user.email
        },
    )
    if access_request.approver_user:
        pending_count = AccessRequest.objects.filter(
            approver_user=access_request.approver_user,
            status=AccessRequest.PENDING,
        ).count()
        schedule_email(
            subject="Access requests are waiting for approval",
            recipient=access_request.approver_user.email,
            template_name="email/pending-requests.html",
            context={"pending_count": pending_count},
        )


def notify_request_approved(access_request):
    schedule_email(
        subject="Your access request has been approved",
        recipient=access_request.user.email,
        template_name="email/request-approved.html",
        context={
            "user_name": access_request.user.first_name or access_request.user.email
        },
    )
