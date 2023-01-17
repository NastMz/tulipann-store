import environ
import hashlib
import requests
import  uuid

from ..utils.payment_utils import get_total_amount
from api.models import User

# Initialise environment variables
env = environ.Env()
environ.Env.read_env()


class PayUPayment:
    def __init__(self):
        self.verified = False

    def create(self, user_id, products):
        client = User.objects.get(user_id=user_id)
        amount = get_total_amount(products)
        request_data = {
            "apiKey": env('PAYU_API_KEY'),
            "apiLogin": env('PAYU_API_LOGIN'),
            "merchantId": env('PAYU_MERCHANT_ID'),
            "accountId": env('PAYU_ACCOUNT_ID'),
            "referenceCode": uuid.uuid4().hex,
            "description": "Payment test description",
            "signature": self.generate_signature(amount),
            "currency": env('CURRENCY'),
            "amount": amount,
            "buyerEmail": client.email,
            "telephone": client.phone,
            "buyerFullName": " ".join([client.first_name, client.last_name]),
            # "responseUrl": "http://www.test.com/response",
            # "confirmationUrl": "http://www.test.com/confirmation",
        }

        response = requests.post(env('PAYU_TEST_URL'), json=request_data)

        print('hola')

    def generate_signature(self, amount):
        signature = "~".join([env('PAYU_API_KEY'), env('PAYU_MERCHANT_ID'), str(amount), env('CURRENCY')])

        # Crear un objeto SHA-256
        hash_object = hashlib.sha256()

        # Pasar la cadena de texto a hash
        hash_object.update(signature.encode())

        # Obtener la huella digital en formato hexadecimal
        hex_dig = hash_object.hexdigest()

        return hex_dig
