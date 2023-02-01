from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import environ

# Initialise environment variables
env = environ.Env()
environ.Env.read_env('../../tulipann_store/.env')


def send_mail(subject, html_content, to_emails=[]):
    """
    Send email using SendGrid API.

    Args:
        to_emails (list): List of emails to send to
        subject (str): Subject of the email
        html_content (str): HTML content of the email

    Raises:
        Exception: If the email could not be sent
    """
    message = Mail(
        from_email=env('FROM_EMAIL'),
        to_emails=to_emails,
        subject=subject,
        html_content=html_content)
    try:
        sg = SendGridAPIClient(env('SENDGRID_API_KEY'))
        sg.send(message)
    except Exception as e:
        raise e
