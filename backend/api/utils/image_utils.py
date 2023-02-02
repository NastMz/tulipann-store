import base64
import uuid
import os
from io import BytesIO
from PIL import Image as Pillow
from django.http import HttpResponse

from api.models import Article, Product, Feature, Category, Image

base_path = 'images/'

# Mapping of subfolder names to model classes and field names for object ids and image names
subfolder_mapping = {
    'article': (Article, 'id', 'banner'),
    'product': (Product, 'id', 'src'),
    'feature': (Feature, 'id', 'image'),
    'category': (Category, 'id', 'image'),
}


def update_images(image_data, object_id, subfolder):
    """
    Updates the images of an object.

    This function receives a request with an object ID and a list of images, and
    updates the images of the object in the database and in a subfolder of the
    project. The current images of the object are deleted and the new images are
    optimized and saved to the subfolder.

    Args:
        image_data (str): The base64 representation of the image.
        object_id (int): The ID of the object to update.
        subfolder (string): The name of the subfolder where the image was saved.

    Returns:
        None
    """

    # Look up the model class and field names based on the subfolder name
    model_class, pk_field, image_field_name = subfolder_mapping[subfolder]

    if subfolder == 'product':
        model_class = Image
        pk_field = 'id'

    # Fetch the object
    item = model_class.all_objects.get(**{pk_field: object_id})

    # Delete the images
    delete_images(item, image_field_name)

    return optimize_and_save_image(image_data, subfolder, subfolder)


def optimize_and_save_image(image_data, subfolder, object_name):
    """
    Optimizes and saves an image to a subfolder.

    This function receives an image in base64 format, optimizes it to reduce its
    size and then saves it to a subfolder. The image is saved with a file name
    that is constructed using the object name and a unique identifier. The image
    is saved in WebP format.

    Args:
        image_data (str): The base64 representation of the image.
        subfolder (str): The name of the subfolder where the image will be saved.
        object_name (str): The name of the object.

    Returns:
        The name of the saved image.
    """
    # Decode the base64 image data
    image_data = base64.b64decode(image_data)
    # Create a BytesIO object from the image data
    image = BytesIO(image_data)
    # Open the image using Pillow
    img = Pillow.open(image)
    # Create the subfolder if it doesn't exist
    subfolder_path = base_path + subfolder
    if not os.path.exists(subfolder_path):
        os.makedirs(subfolder_path)
    # Build the image file name using the object name
    image_file_name = object_name + '_' + str(uuid.uuid4()) + '.webp'
    # Save the optimized image to the subfolder in WebP format and Compress the image to reduce its size further
    img.save(subfolder_path + '/' + image_file_name, format="WebP", optimize=True, quality=85)
    return subfolder + "/" + image_file_name


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
    image_name = getattr(item, image_field_name)
    # Check if the file exists
    if not os.path.exists(base_path + image_name):
        raise FileNotFoundError(f"{image_name} does not exist.")
    # Delete the image from the storage
    try:
        os.remove(base_path + image_name)
    except Exception as e:
        raise Exception(f"Error deleting image: {e}")


def get_image(request, subfolder, image_name):
    """
    This function handle a GET request for an image file.
    
    Parameters:
        request: Object that contains information about the current HTTP request
        subfolder: a string that represents the name of the subfolder where the image is located
        image_name: a string that represents the name of the image to be obtained

    Raises:
        ValueError: if the file extension is not .webp or if the file doesn't exists

    Returns:
        HttpResponse containing the image file with content type "image/webp"
    """
    base_name, ext = os.path.splitext(image_name)
    if ext != '.webp':
        raise ValueError("Invalid image type")
    image_path = base_path+subfolder+'/'+image_name
    if not os.path.isfile(image_path):
        raise ValueError("File not found")
    image_data = open(image_path, "rb").read()
    return HttpResponse(image_data, content_type="image/webp")


