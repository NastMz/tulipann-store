from django.contrib.auth.tokens import PasswordResetTokenGenerator


class ActivationTokenGenerator(PasswordResetTokenGenerator):
    """Signs account-activation links.

    It uses its own salt, so an activation link can never be replayed as a
    password-reset link, and it covers ``is_active``, so it stops working once
    the account is active.
    """

    key_salt = "tulipann.accounts.ActivationTokenGenerator"

    def _make_hash_value(self, user, timestamp):
        return f"{super()._make_hash_value(user, timestamp)}{user.is_active}"


activation_token = ActivationTokenGenerator()
