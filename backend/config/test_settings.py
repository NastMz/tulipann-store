"""Settings for the test-suite: in-memory SQLite, fast hashing, captured mail."""
import os

os.environ.setdefault("DJANGO_SECRET_KEY", "test-only-not-a-secret")
os.environ.pop("DATABASE_URL", None)
os.environ.pop("EMAIL_HOST", None)

from .settings import *  # noqa: E402,F401,F403

DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}}
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]
MAILERS = {"default": {"BACKEND": "django.core.mail.backends.locmem.EmailBackend"}}
LOGGING = {"version": 1, "disable_existing_loggers": False}
