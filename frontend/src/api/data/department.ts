import { apiRequest } from "../request";

/**
 * Sends a GET request to the server to retrieve a list of departments names.
 *
 * @returns {Promise<string[]>} List of departments names.
 */
export async function getDepartments(): Promise<string[]> {
    // Send a GET request to the '/api/articles' endpoint
    const { data } = await apiRequest("GET", "/api/department", undefined, false);

    // Return the list of articles from the response data
    return data.departments;
}
