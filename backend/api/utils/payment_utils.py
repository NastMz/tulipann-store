from api.models import Product


def get_total_amount(products):
    """
    This function calculates the total amount of a list of products.

    Parameters:
    products (List[Dict]): A list of dictionaries containing information about products. Each dictionary should contain a 'product_id' key and a 'quantity' key.

    Returns:
    float: The total amount of all the products in the input list.

    Example:
    products = [{'product_id': 1, 'quantity': 2}, {'product_id': 2, 'quantity': 3}]
    get_total_amount(products)
    Output: 17.5 (assuming the price of product 1 is 5 and the price of product 2 is 3.5)
    """
    amount = 0

    for product in products:
        amount += Product.all_objects.get(product_id=product['product_id']).price * product['quantity']

    return amount

