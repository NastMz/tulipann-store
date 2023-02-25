import {apiRequest} from "../request";
import {NewSubcategory, UpdateSubcategory} from "../../models/interfaces";

/**
 * Sends a GET request to the server to retrieve a list of subcategories.
 *
 * @returns {Promise<any>} A promise that resolves to the list of subcategories.
 */
export async function getSubcategories(): Promise<any> {
    return await apiRequest("GET", "crud/subcategories/", undefined, true);
}

/**
 * Sends a POST request to the server to create a new categoryId.
 *
 * @param {Subcategory} subcategory - Subcategory to create.
 * @returns {Promise<any>} The response from the server.
 */
export const createSubcategory = async (subcategory: NewSubcategory) => {
    return await apiRequest("POST", "crud/subcategories/create/", subcategory, true);
}

/**
 * Sends a PUT request to the server to update a subcategoryId.
 *
 * @param {Subcategory} subcategory - Subcategory to update.
 * @param {string} id - ID of the subcategoryId to update.
 * @returns {Promise<any>} The response from the server.
 */
export const updateSubcategory = async ({subcategory, id}: { subcategory: UpdateSubcategory, id: string }) => {
    return await apiRequest("PUT", `crud/subcategories/${id}/update/`, subcategory, true);
}

/**
 * Sends a DELETE request to the server to delete a subcategoryId.
 *
 * @param {string} id - ID of the subcategoryId to delete.
 * @returns {Promise<any>} The response from the server.
 */
export const deleteSubcategory = async (id: string) => {
    return await apiRequest("DELETE", `crud/subcategories/${id}/delete/`, undefined, true);
}
