import {subcategorySlice} from '../reducer';

/**
 * Actions for the subcategory slice of the Redux store.
 *
 * @type {Object}
 * @property {function} addSubcategory - Action creator to add a subcategory to the store.
 * @property {function} removeSubcategory - Action creator to remove a subcategory from the store.
 */
export const { addSubcategory, removeSubcategory } = subcategorySlice.actions;
