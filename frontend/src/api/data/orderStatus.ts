import { apiRequest } from "../request";
import {OrderStatus} from "../../models/interfaces/Order";

/**
 * Sends a GET request to the server to retrieve a list of order statuses.
 *
 * @returns {Promise<OrderStatus[]>} List of cities.
 */
export async function getOrderStatus(): Promise<OrderStatus[]> {
    // Send a GET request to the '/api/cities' endpoint
    const {data} = await apiRequest("GET", "data/states/", undefined, false);

    // Return the list of articles from the response data
    return data.states;
}
