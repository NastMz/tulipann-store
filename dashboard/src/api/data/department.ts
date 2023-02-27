import {apiRequest} from "../request";

/**
 * Sends a GET request to the server to retrieve a list of departments names.
 *
 * @returns {Promise<any>} List of departments.
 */
export async function getDepartments(): Promise<any> {
    return await apiRequest("GET", "data/departments/", undefined, false);
}
