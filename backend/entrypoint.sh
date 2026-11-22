#!/bin/sh
set -eu
python manage.py migrate --noinput
python manage.py createcachetable
# Demo data is opt-in: docker-compose.yml turns it on for the local demo.
if [ "${TULIPANN_SEED:-0}" = "1" ]; then
  python manage.py seed_demo
fi
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers "${GUNICORN_WORKERS:-3}" --access-logfile -
