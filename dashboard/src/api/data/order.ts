import {apiRequest} from "../request";
import {UpdateOrder} from "../../models/interfaces";

/**
 * Sends a GET request to the server to retrieve a list of orders.
 *
 * @returns {Promise<Order[]>} List of orders.
 */
export async function getOrders(): Promise<any> {
    return await apiRequest("GET", "crud/orders/", null, true);
}

/**
 * Sends a PUT request to the server to update an order.
 *
 * @param {Order} order - Order to update.
 * @param {string} id - ID of the order to update.
 * @returns {Promise<any>} The response from the server.
 */
export async function updateOrder({order, id}: { order: UpdateOrder, id: string }): Promise<any> {
    return await apiRequest("PUT", `crud/orders/${id}/update/`, order, true);
}