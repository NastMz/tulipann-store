from rest_framework import status


def authorization(request):
    """
    This method checks if the user is an admin and returns a response
    depending on the role of the user.

    Args:
        request (HttpRequest): The request object containing information about the current request.

    Returns:
        Dict: A dictionary containing the success status, status code, and message of the request.

    """

    # Check if the user's role is "Admin"
    if request.user.role.name == "Admin":
        response = {
            'success': True,
            'status_code': status.HTTP_200_OK,
            'message': 'Successful login'
        }
        return response
    else:
        response = {
            'success': False,
            'status_code': status.HTTP_401_UNAUTHORIZED,
            'message': 'You are not authorized to perform this action'
        }
        return response
