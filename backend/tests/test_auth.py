import re
import subprocess
import sys
from pathlib import Path

import pytest
from django.core import mail
from rest_framework.test import APIClient

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


def test_register_creates_a_session_and_returns_no_token():
    client = csrf_client()
    response = client.post("/api/auth/register", REGISTRATION, format="json")
    assert response.status_code == 201
    assert response.json()["user"]["email"] == "nueva@example.test"
    assert response.json()["user"]["is_staff"] is False
    assert "token" not in str(response.json()).lower()
    assert client.cookies["sessionid"]["httponly"]
    assert client.get("/api/auth/me").json()["user"]["first_name"] == "Nueva"


def test_register_rejects_duplicate_email_and_weak_password(customer):
    client = csrf_client()
    response = client.post(
        "/api/auth/register", {**REGISTRATION, "email": customer.email.upper(), "password": "12345678"}, format="json"
    )
    assert response.status_code == 400
    assert set(response.json()) >= {"email"}
    response = client.post("/api/auth/register", {**REGISTRATION, "password": "12345678"}, format="json")
    assert "password" in response.json()


def test_register_cannot_grant_staff():
    client = csrf_client()
    body = client.post("/api/auth/register", {**REGISTRATION, "is_staff": True}, format="json").json()
    assert body["user"]["is_staff"] is False


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


def test_settings_refuse_to_start_without_a_secret_key():
    backend = Path(__file__).resolve().parent.parent
    script = "import os; os.environ.pop('DJANGO_SECRET_KEY', None); import config.settings"
    result = subprocess.run(
        [sys.executable, "-c", script], cwd=backend, capture_output=True, text=True, env={"PATH": ""}
    )
    assert result.returncode != 0
    assert "DJANGO_SECRET_KEY must be set" in result.stderr
