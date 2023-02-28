import {OrderProduct} from "../models/interfaces/Order";
import {store} from "../redux/store";

/**
 * This function is used to parse JSON strings to OrderDetail object.
 *
 * @param json - The JSON string to parse.
 * @returns The OrderDetail object.
 */
export function orderUtils(json: { [key: string]: any[] }){
    const obj: { [key: string]: any } = {};
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            obj[key] = json[key][0];
        }
    }
    return obj;
}


/**
 * This function is used to get the total price of an order.
 * @param {OrderProduct[]} products - The list of products in the order.
 * @returns {number} The total price of the order.
 */
export function getAmount(products: OrderProduct[]){
    let total = 0;
    products.forEach((product) => {
        let price = store.getState().products.list.find((p) => p.id === product.productId)?.price ?? 0;
        total += product.quantity * price;
    });
    return total;
}

/**
 * This function is used to get the formatted price of an order.
 *
 * @param {number} price - The price to format.
 * @returns {string} The formatted price.
 */
export function formatPrice(price: number){
    const priceNumber = Number(price);
    return priceNumber.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}