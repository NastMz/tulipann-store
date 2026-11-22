from django import template

register = template.Library()


@register.filter
def cop(value) -> str:
    """Formats an integer amount as Colombian pesos: 48000 -> "$ 48.000"."""
    return "$ " + f"{int(value):,}".replace(",", ".")
