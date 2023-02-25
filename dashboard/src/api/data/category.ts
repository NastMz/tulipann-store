import {apiRequest} from "../request";
import {Category, NewCategory, UpdateCategory} from "../../models/interfaces";

/**
 * Sends a GET request to the server to retrieve a list of categories.
 *
 * @returns {Promise<any>} The response from the server.
 */
export const getCategories = async () => {
    return await apiRequest("GET", "crud/categories/", undefined, true);
}

/**
 * Sends a POST request to the server to create a new categoryId.
 *
 * @param {Category} category - Category to create.
 * @returns {Promise<any>} The response from the server.
 */
export const createCategory = async (category: NewCategory) => {
    return await apiRequest("POST", "crud/categories/create/", category, true);
}

/**
 * Sends a PUT request to the server to update a categoryId.
 *
 * @param {Category} category - Category to update.
 * @param {string} id - ID of the categoryId to update.
 * @returns {Promise<any>} The response from the server.
 */
export const updateCategory = async ({category, id}: { category: UpdateCategory, id: string }) => {
    return await apiRequest("PUT", `crud/categories/${id}/update/`, category, true);
}

/**
 * Sends a DELETE request to the server to delete a categoryId.
 *
 * @param {string} id - ID of the categoryId to delete.
 * @returns {Promise<any>} The response from the server.
 */
export const deleteCategory = async (id: string) => {
    return await apiRequest("DELETE", `crud/categories/${id}/delete/`, undefined, true);
}
