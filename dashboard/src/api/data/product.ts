import {NewProduct, Product, UpdateProduct} from "../../models/interfaces";
import {apiRequest} from "../request";

/**
 * Sends a GET request to the server to retrieve a list of products.
 *
 * @returns {Promise<any>} A promise that resolves to the list of products.
 */
export async function getProducts(): Promise<any> {
    return await apiRequest("GET", "crud/products/", undefined, true);
}

/**
 * Sends a POST request to the server to create a new product.
 *
 * @param {Product} product - Product to create.
 * @returns {Promise<any>} The response from the server.
 */
export const createProduct = async (product: NewProduct) => {
    return await apiRequest("POST", "crud/products/create/", product, true);
}

/**
 * Sends a PUT request to the server to update a product.
 *
 * @param {Product} product - Product to update.
 * @param {string} id - ID of the product to update.
 * @returns {Promise<any>} The response from the server.
 */
export const updateProduct = async ({product, id}: { product: UpdateProduct, id: string }) => {
    return await apiRequest("PUT", `crud/products/${id}/update/`, product, true);
}

/**
 * Sends a DELETE request to the server to delete a product.
 *
 * @param {string} id - ID of the product to delete.
 * @returns {Promise<any>} The response from the server.
 */
export const deleteProduct = async (id: string) => {
    return await apiRequest("DELETE", `crud/products/${id}/delete/`, undefined, true);
}
