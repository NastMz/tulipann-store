#!/bin/sh
set -eu
python manage.py migrate --noinput
if [ "${TULIPANN_SEED:-1}" = "1" ]; then
  python manage.py seed_demo
fi
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers "${GUNICORN_WORKERS:-3}" --access-logfile -
