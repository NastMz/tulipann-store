import {apiRequest} from "../request";

/**
 * Sends a GET request to the server to retrieve a list of order statuses.
 *
 * @returns {Promise<any]>} List of cities.
 */
export async function getOrderStatus(): Promise<any> {
    return await apiRequest("GET", "crud/states/", undefined, true);
}
