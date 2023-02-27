import {apiRequest} from "../request";

/**
 * Sends a GET request to the server to retrieve a list of cities names.
 *
 * @returns {Promise<any>} List of cities.
 */
export async function getCities(): Promise<any> {
    return await apiRequest("GET", "data/cities/", undefined, false);
}
