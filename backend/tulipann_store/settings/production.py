from tulipann_store.settings.base import *
from tulipann_store.logging import *
import environ

# Initialise environment variables
env = environ.Env()
environ.Env.read_env(os.path.join(Path(__file__).resolve().parent.parent, '.env.production'))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False # tons porque sale eso? xd que cosa? el listado de urls no deberia salirahhh

ALLOWED_HOSTS = ['https://api.tulipannstore.com/', 'https://tulipannstore.com/', 'https://admin.tulipannstore.com/']

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'id',
    'SIGNING_KEY': env("TOKEN_SECRET_KEY")
}

# Database

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASS'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT')
    }
}

CORS_ALLOWED_ORIGINS = [
    'https://tulipannstore.com',
    'https://admin.tulipannstore.com',
]   # If this is used, then not need to use `CORS_ALLOW_ALL_ORIGINS = True`
