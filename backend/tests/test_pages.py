import datetime

import pytest
from django.core import mail

from contact.models import ContactMessage
from journal.models import Article

pytestmark = pytest.mark.django_db


def test_departments_list_cities_and_shipping(api, city):
    assert api.get("/api/departments").json() == [
        {"id": city.department.id, "name": "Boyacá", "shipping_cost": 16000, "cities": [{"id": city.id, "name": "Tunja"}]}
    ]


def test_gazette_lists_and_splits_paragraphs(api):
    Article.objects.create(
        title="Plantar", slug="plantar", summary="Cómo", body="Uno.\n\nDos.\n\n", tags=["cultivo"],
        published_on=datetime.date(2026, 3, 1),
    )
    assert api.get("/api/articles").json()[0]["slug"] == "plantar"
    assert api.get("/api/articles/plantar").json()["paragraphs"] == ["Uno.", "Dos."]
    assert api.get("/api/articles/nope").status_code == 404


def test_contact_letter_is_stored_and_forwarded_to_the_workshop(api):
    letter = {"name": "Ana", "email": "ana@example.test", "subject": "Bulbos", "message": "¿Envían a Pasto?"}
    assert api.post("/api/contact", letter, format="json").status_code == 201
    assert ContactMessage.objects.get().subject == "Bulbos"
    assert mail.outbox[0].to == ["taller@tulipann.test"]
    assert mail.outbox[0].reply_to == ["ana@example.test"]


def test_contact_letter_is_validated(api):
    assert api.post("/api/contact", {"name": "Ana", "email": "no"}, format="json").status_code == 400
