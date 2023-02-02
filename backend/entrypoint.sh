#!/bin/sh

echo 'Make migrations...'

python manage.py makemigrations --settings=tulipann_store.settings.production

echo 'Applying migrations...'

python manage.py migrate --settings=tulipann_store.settings.production

echo 'Running server...'

gunicorn --env DJANGO_SETTINGS_MODULE=tulipann_store.settings.production tulipann_store.wsgi:application --bind 0.0.0.0:8000