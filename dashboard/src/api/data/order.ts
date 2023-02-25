import {Order} from "../../models/interfaces";
import {apiRequest} from "../request";

/**
 * Sends a GET request to the server to retrieve a list of orders.
 *
 * @returns {Promise<Order[]>} List of orders.
 */
export async function getOrders(): Promise<Order[]> {
    // Send a GET request to the '/api/orders' endpoint
    const {data} = await apiRequest("GET", "data/orders/");
    // Return the list of orders from the response data
    return data.orders;
}