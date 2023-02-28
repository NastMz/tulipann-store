import {categorySlice} from "../reducer";

/**
 * Exported actions for the id slice of the Redux store.
 *
 * @constant
 * @type {object}
 * @property {function} addCategory - Action creator for adding a id to the list.
 * @property {function} removeCategory - Action creator for removing a id from the list.
 */
export const { addCategory, removeCategory, removeAllCategories } = categorySlice.actions;
