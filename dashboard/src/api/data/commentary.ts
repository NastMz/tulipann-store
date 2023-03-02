import {apiRequest} from "../request";

/**
 * Sends a GET request to the server to retrieve a list of products feedback.
 *
 * @returns {Promise<any]>} List of cities.
 */
export async function getCommentaries(): Promise<any> {
    return await apiRequest("GET", "crud/commentaries/", undefined, true);
}
