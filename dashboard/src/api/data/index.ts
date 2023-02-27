/**
 * Exports of functions for getting data from different sources.
 *
 * @module data
 * @exports {function} getArticles - Function to get the list of articles from the data source.
 * @exports {function} getDepartments - Function to get the list of departments from the data source.
 * @exports {function} getCities - Function to get the list of cities from the data source.
 * @exports {function} getCategories - Function to get the list of categories from the data source.
 * @exports {function} createCategory - Function to create a new categoryId.
 * @exports {function} deleteCategory - Function to delete a categoryId.
 * @exports {function} updateCategory - Function to update a categoryId.
 * @exports {function} getProducts - Function to get the list of products from the data source.
 * @exports {function} createProduct - Function to create a new product.
 * @exports {function} deleteProduct - Function to delete a product.
 * @exports {function} updateProduct - Function to update a product.
 * @exports {function} getSubcategories - Function to get the list of subcategories from the data source.
 * @exports {function} getOrders - Function to get the list of orders from the data source.
 * @exports {function} getOrderStatus - Function to get the list of order statuses from the data source.
 */

export { getArticles } from "./article";
export { getDepartments } from "./department";
export { getCities } from "./city";
export { getCategories, createCategory, deleteCategory, updateCategory } from "./category";
export { getProducts, createProduct, deleteProduct, updateProduct } from "./product";
export { getSubcategories, deleteSubcategory, updateSubcategory, createSubcategory } from "./subcategory";
export { getOrders, updateOrder } from "./order";
export { getOrderStatus } from "./orderStatus";
