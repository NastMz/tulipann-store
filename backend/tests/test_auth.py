import re
import subprocess
import sys
from pathlib import Path

import pytest
from django.core import mail
from django.core.cache import caches
from django.db import connection
from rest_framework.test import APIClient

from accounts.models import User

pytestmark = pytest.mark.django_db

REGISTRATION = {
    "email": "Nueva@Example.test",
    "first_name": "Nueva",
    "last_name": "Clienta",
    "password": "Jardin-de-invierno-7",
}


def csrf_client():
    """A browser-like client: CSRF is enforced and the token comes from the cookie."""
    client = APIClient(enforce_csrf_checks=True)
    client.get("/api/auth/csrf")
    client.credentials(HTTP_X_CSRFTOKEN=client.cookies["csrftoken"].value)
    return client


def activation_link(message):
    return re.search(r"/activar/(?P<uid>[^/]+)/(?P<token>\S+)", message.body)


def test_register_creates_an_inactive_account_and_mails_an_activation_link():
    client = csrf_client()
    response = client.post("/api/auth/register", REGISTRATION, format="json")
    assert response.status_code == 202
    assert "token" not in str(response.json()).lower()
    user = User.objects.get(email="nueva@example.test")
    assert user.is_active is False
    assert client.get("/api/auth/me").json() == {"user": None}
    link = activation_link(mail.outbox[0])
    activated = client.post("/api/auth/activate", {"uid": link["uid"], "token": link["token"]}, format="json")
    assert activated.status_code == 200
    assert activated.json()["user"]["is_staff"] is False
    assert client.cookies["sessionid"]["httponly"]
    client.credentials(HTTP_X_CSRFTOKEN=client.cookies["csrftoken"].value)
    assert client.get("/api/auth/me").json()["user"]["first_name"] == "Nueva"
    # Single use, and never valid as a password-reset token.
    again = client.post("/api/auth/activate", {"uid": link["uid"], "token": link["token"]}, format="json")
    assert again.status_code == 400
    reset = {"uid": link["uid"], "token": link["token"], "new_password": "Otra-clave-segura-9"}
    assert client.post("/api/auth/password/reset/confirm", reset, format="json").status_code == 400


def test_inactive_accounts_cannot_log_in():
    client = csrf_client()
    client.post("/api/auth/register", REGISTRATION, format="json")
    response = client.post(
        "/api/auth/login", {"email": REGISTRATION["email"], "password": REGISTRATION["password"]}, format="json"
    )
    assert response.status_code == 400


def test_register_does_not_reveal_existing_accounts(customer):
    client = csrf_client()
    fresh = client.post("/api/auth/register", REGISTRATION, format="json")
    taken = client.post(
        "/api/auth/register", {**REGISTRATION, "email": customer.email.upper()}, format="json"
    )
    assert taken.status_code == fresh.status_code == 202
    assert taken.json() == fresh.json()
    # The owner of the existing account is told, by e-mail only.
    assert mail.outbox[1].to == [customer.email]
    assert "ya tienes una" in mail.outbox[1].body
    assert User.objects.filter(email=customer.email).count() == 1
    customer.refresh_from_db()
    assert customer.check_password("Cliente.2026")


def test_register_still_validates_the_password(customer):
    client = csrf_client()
    response = client.post("/api/auth/register", {**REGISTRATION, "password": "12345678"}, format="json")
    assert response.status_code == 400
    assert "password" in response.json()
    assert "email" not in response.json()


def test_register_cannot_grant_staff():
    client = csrf_client()
    client.post("/api/auth/register", {**REGISTRATION, "is_staff": True}, format="json")
    assert User.objects.get(email="nueva@example.test").is_staff is False


def test_login_without_csrf_token_is_refused(customer):
    client = APIClient(enforce_csrf_checks=True)
    response = client.post("/api/auth/login", {"email": customer.email, "password": "Cliente.2026"}, format="json")
    assert response.status_code == 403


def test_login_me_and_logout(customer):
    client = csrf_client()
    bad = client.post("/api/auth/login", {"email": customer.email, "password": "wrong"}, format="json")
    assert bad.status_code == 400
    ok = client.post("/api/auth/login", {"email": "CLARA@example.test", "password": "Cliente.2026"}, format="json")
    assert ok.status_code == 200
    client.credentials(HTTP_X_CSRFTOKEN=client.cookies["csrftoken"].value)  # rotated on login
    assert client.get("/api/auth/me").json()["user"]["email"] == customer.email
    assert client.post("/api/auth/logout").status_code == 204
    assert client.get("/api/auth/me").json() == {"user": None}


def test_profile_update_cannot_change_email_or_role(as_customer, customer):
    body = as_customer.patch(
        "/api/auth/me", {"phone": "311 000 0000", "email": "x@y.z", "is_staff": True}, format="json"
    ).json()
    customer.refresh_from_db()
    assert body["user"]["phone"] == "311 000 0000"
    assert customer.email == "clara@example.test"
    assert customer.is_staff is False


def test_password_change_requires_the_current_password(as_customer, customer):
    wrong = as_customer.post(
        "/api/auth/password/change", {"current_password": "nope", "new_password": "Otra-clave-segura-9"}, format="json"
    )
    assert wrong.status_code == 400
    ok = as_customer.post(
        "/api/auth/password/change",
        {"current_password": "Cliente.2026", "new_password": "Otra-clave-segura-9"},
        format="json",
    )
    assert ok.status_code == 200
    customer.refresh_from_db()
    assert customer.check_password("Otra-clave-segura-9")


def test_password_reset_by_mail_link(customer):
    client = csrf_client()
    response = client.post("/api/auth/password/reset", {"email": customer.email}, format="json")
    assert response.status_code == 200
    link = re.search(r"/recuperar/(?P<uid>[^/]+)/(?P<token>\S+)", mail.outbox[0].body)
    payload = {"uid": link["uid"], "token": link["token"], "new_password": "Tulipa-nueva-2026"}
    assert client.post("/api/auth/password/reset/confirm", payload, format="json").status_code == 200
    customer.refresh_from_db()
    assert customer.check_password("Tulipa-nueva-2026")
    # The token is single-use: the password hash changed.
    assert client.post("/api/auth/password/reset/confirm", payload, format="json").status_code == 400


def test_password_reset_does_not_reveal_unknown_accounts(customer):
    client = csrf_client()
    known = client.post("/api/auth/password/reset", {"email": customer.email}, format="json").json()
    unknown = client.post("/api/auth/password/reset", {"email": "nadie@example.test"}, format="json").json()
    assert known == unknown
    assert len(mail.outbox) == 1


def test_login_is_throttled(customer):
    client = csrf_client()
    codes = [
        client.post("/api/auth/login", {"email": customer.email, "password": "wrong"}, format="json").status_code
        for _ in range(25)
    ]
    assert codes[0] == 400
    assert 429 in codes


def test_spoofed_forwarded_for_does_not_reset_the_login_limit(customer):
    """A client-supplied X-Forwarded-For must not become the throttle identity.

    Behind nginx (NUM_PROXIES = 1) only the last hop counts; here each request
    pretends to come from a different address, as an attacker would.
    """
    client = csrf_client()
    codes = [
        client.post(
            "/api/auth/login",
            {"email": customer.email, "password": "wrong"},
            format="json",
            HTTP_X_FORWARDED_FOR=f"10.0.{i}.{i}, 203.0.113.7",
        ).status_code
        for i in range(30)
    ]
    assert codes[0] == 400
    assert codes[-1] == 429
    assert codes.count(400) == 20


def test_throttle_counters_live_in_the_shared_database_cache(customer):
    """Every gunicorn worker reads the same counters, so the limit is global."""
    assert type(caches["default"]).__name__ == "DatabaseCache"
    client = csrf_client()
    client.post("/api/auth/login", {"email": customer.email, "password": "wrong"}, format="json")
    with connection.cursor() as cursor:
        cursor.execute("SELECT COUNT(*) FROM tulipann_cache WHERE cache_key LIKE %s", ["%throttle_auth%"])
        assert cursor.fetchone()[0] == 1


def test_settings_refuse_to_start_without_a_secret_key():
    backend = Path(__file__).resolve().parent.parent
    script = "import os; os.environ.pop('DJANGO_SECRET_KEY', None); import config.settings"
    result = subprocess.run(
        [sys.executable, "-c", script], cwd=backend, capture_output=True, text=True, env={"PATH": ""}
    )
    assert result.returncode != 0
    assert "DJANGO_SECRET_KEY must be set" in result.stderr
