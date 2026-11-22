"""Validation of the ``art`` recipe that the storefront turns into an SVG plate.

Product pictures are not files: each product stores a small recipe (colours,
petal form, random seed...) and the frontend draws the plate from it. This
keeps the store self-contained and lets the workshop compose a new plate from
the admin area.
"""
import re

from django.core.exceptions import ValidationError

HEX = re.compile(r"^#[0-9a-fA-F]{6}$")
SHAPES = {"cup", "lily", "parrot", "double", "fringed"}
COLOR_KEYS = {"petal", "flame", "leaf", "glaze", "frame", "paper"}
INT_RANGES = {"seed": (0, 2**31 - 1), "tiers": (1, 4), "stems": (3, 9)}
ALLOWED = COLOR_KEYS | set(INT_RANGES) | {"shape"}


def validate_art(value) -> None:
    if not isinstance(value, dict):
        raise ValidationError("La receta de la lámina debe ser un objeto.")
    unknown = set(value) - ALLOWED
    if unknown:
        raise ValidationError(f"Claves desconocidas en la lámina: {', '.join(sorted(unknown))}.")
    for key in COLOR_KEYS & set(value):
        if value[key] is not None and not (isinstance(value[key], str) and HEX.match(value[key])):
            raise ValidationError(f"«{key}» debe ser un color #RRGGBB.")
    for key, (low, high) in INT_RANGES.items():
        if key in value:
            item = value[key]
            if isinstance(item, bool) or not isinstance(item, int) or not low <= item <= high:
                raise ValidationError(f"«{key}» debe ser un entero entre {low} y {high}.")
    if "shape" in value and value["shape"] not in SHAPES:
        raise ValidationError(f"Forma desconocida: {value['shape']}.")
    if "petal" not in value:
        raise ValidationError("La lámina necesita al menos el color «petal».")
