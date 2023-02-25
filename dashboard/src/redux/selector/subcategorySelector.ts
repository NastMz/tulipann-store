import {store} from '../store';

/**
* Selector to get the list of subcategories from the Redux store.
*
* @param {Object} state - The current state of the Redux store.
* @returns {Subcategory[]} The list of subcategories.
*/
export const selectSubcategories = (state: ReturnType<typeof store.getState>) => state.subcategories.list;