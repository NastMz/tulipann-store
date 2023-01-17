import { productSlice } from "../reducer";

/**
 * Exported actions for the product slice of the Redux store.
 *
 * @constant
 * @type {object}
 * @property {function} addProduct - Action creator for adding a product to the list.
 * @property {function} removeProduct - Action creator for removing a product from the list.
 */
export const { addProduct, removeProduct } = productSlice.actions;
