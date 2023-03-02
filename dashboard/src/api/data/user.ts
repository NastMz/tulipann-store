import {apiRequest} from "../request";

/**
 * Sends a GET request to the server to retrieve a list of users.
 *
 * @returns {Promise<any>} A promise that resolves to the list of users.
 */
export async function getUsers(): Promise<any> {
    return await apiRequest("GET", "crud/users/", undefined, true);
}
