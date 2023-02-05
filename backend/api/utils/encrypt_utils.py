import base64
from cryptography.fernet import Fernet
import environ

# Initialise environment variables
env = environ.Env()
environ.Env.read_env('../../tulipann_store/.env')


def encrypt_token(text_to_encrypt):
    """
    Encrypts the token that is used for password recovery for a user
    Args:
         text_to_encrypt (str): Text to be encrypted

     Returns:
         Encrypted text
    """
    # Decodificar la clave en formato bytes
    key = base64.urlsafe_b64decode(env('CIPHER_KEY').encode() + b'==')

    # Crear la suite de cifrado
    cipher_suite = Fernet(key)

    # Encriptar el texto
    encrypt_text = cipher_suite.encrypt(text_to_encrypt.encode())

    return encrypt_text


def decrypt_token(text_encrypted):
    """
    Decrypts the token used for password recovery for a user
    Args:
        text_encrypted:  Encrypted text to be deEncrypted

    Returns:
        Plain text but binary
    """
    # Decodificar la clave en formato bytes
    key = base64.urlsafe_b64decode(env('CIPHER_KEY').encode() + b'==')

    # Crear la suite de cifrado
    cipher_suite = Fernet(key)

    # Desencriptar el texto
    plain_text = cipher_suite.decrypt(text_encrypted)

    return plain_text
