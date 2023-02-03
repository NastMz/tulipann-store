import base64
import uuid
import os
from io import BytesIO
from PIL import Image as Pillow
from django.http import HttpResponse
import cloudinary
import cloudinary.uploader
import cloudinary.api

from api.models import Article, Product, Feature, Category, Image
import environ

# Initialise environment variables
env = environ.Env()
environ.Env.read_env('../../tulipann_store/.env')

cloudinary.config(
    cloud_name=env('CLOUDINARY_CLOUD_NAME'),
    api_key=env('CLOUDINARY_API_KEY'),
    api_secret=env('CLOUDINARY_API_SECRET'),
    secure=True
)

base_path = 'images/'

# Mapping of object_name names to model classes and field names for object ids and image names
subfolder_mapping = {
    'article': (Article, 'id', 'banner'),
    'product': (Product, 'id', 'src'),
    'feature': (Feature, 'id', 'image'),
    'category': (Category, 'id', 'image'),
}


def update_images(image_data, object_id, object_name):
    """
    Updates the images of an object.

    This function receives a request with an object ID and a list of images, and
    updates the images of the object in the database and in a subfolder of the
    project. The current images of the object are deleted and the new images are
    optimized and saved to the subfolder.

    Args:
        image_data (str): The base64 representation of the image.
        object_id (int): The ID of the object to update.
        object_name (string): The name of the object.

    Returns:
        None
    """

    # Look up the model class and field names based on the object_name name
    model_class, pk_field, url = subfolder_mapping[object_name]

    if object_name == 'product':
        model_class = Image
        pk_field = 'id'

    # Fetch the object
    item = model_class.all_objects.get(**{pk_field: object_id})

    # Delete the images
    delete_images(item, url)

    return optimize_and_save_image(image_data, object_name)


def optimize_and_save_image(image_data, object_name):
    """
    Optimizes and saves an image to a object_name.

    This function receives an image in base64 format, optimizes it to reduce its
    size and then saves it to a object_name. The image is saved with a file name
    that is constructed using the object name and a unique identifier. The image
    is saved in WebP format.

    Args:
        image_data (str): The base64 representation of the image.
        object_name (str): The name of the object.

    Returns:
        The name of the saved image.
    """
    # Decode the base64 image data
    image_data = base64.b64decode(image_data)

    # Build the image file name using the object name
    image_file_name = object_name + '-' + str(uuid.uuid4())

    # Optimize image size
    image_data = reduce_image_size(image_data)

    # Save image
    image = cloudinary.uploader.upload(image_data,
                                       public_id=image_file_name
                                       )

    return get_optimized_url(image['secure_url'])


# Function to delete images
def delete_images(item, image_field_name):
    """
   Deletes the image associated with the item from the storage.

   Parameters:
       item (object): The object containing the image field.
       image_field_name (str): The name of the image field in the item.
   """
    # Check if the image_field_name passed is a valid field of the item
    if not hasattr(item, image_field_name):
        raise ValueError(f"{image_field_name} is not a valid field of the item.")
    url = getattr(item, image_field_name)
    public_id = get_public_id_from_url(url)
    # Delete the image from the storage
    cloudinary.uploader.destroy(public_id)


def get_public_id_from_url(url):
    """
    This method extracts the public id of an image from his url
    Args:
        url (str): The image's url

    Returns:
        The image's public id
    """
    # Split the string based on "/"
    url_parts = url.split("/")

    # Get the public ID from the URL
    public_id = url_parts[-1].split(".")[0]

    return public_id


def get_optimized_url(url):
    """
    This method add optimization flags to the image url.
    Args:
        url (str): The url to add flags.

    Returns:
        The url with flags added
    """
    return url.replace("/upload/", "/upload/f_auto,q_auto/")


def reduce_image_size(input_data):
    """
    This method optimize the size of and image.
    Args:
        input_data: Image bytes to optimize

    Returns:
        The optimized image bytes
    """
    input_file = BytesIO(input_data)
    original_image = Pillow.open(input_file)
    output_file = BytesIO()
    original_image.save(output_file, format="WebP", optimize=True, quality=80)
    return output_file.getvalue()
