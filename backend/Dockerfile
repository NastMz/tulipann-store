FROM python:3.13.18-slim-bookworm

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --require-hashes -r requirements.txt

COPY . .
RUN useradd --create-home --uid 10001 tulipann && chmod +x entrypoint.sh
USER tulipann

EXPOSE 8000
CMD ["./entrypoint.sh"]
