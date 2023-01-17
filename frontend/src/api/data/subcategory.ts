import { apiRequest } from "../request";
import { Subcategory } from "../../models/interfaces";

/**
 * Sends a GET request to the server to retrieve a list of subcategoriesIds.
 *
 * @returns {Promise<Subcategory[]>} List of subcategoriesIds.
 */
export async function getSubcategories(): Promise<Subcategory[]> {
    // Send a GET request to the '/api/subcategoriesIds' endpoint
    const { data } = await apiRequest("GET", "/api/subcategories", undefined, false);

    // Return the list of subcategoriesIds from the response data
    return data.subcategories;
}
