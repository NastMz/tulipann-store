import { categorySlice } from "../reducer";

/**
 * Exported actions for the categoryId slice of the Redux store.
 *
 * @constant
 * @type {object}
 * @property {function} addCategory - Action creator for adding a categoryId to the list.
 * @property {function} removeCategory - Action creator for removing a categoryId from the list.
 */
export const { addCategory, removeCategory } = categorySlice.actions;
