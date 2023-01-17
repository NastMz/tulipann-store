import { store } from '../store/store';

/**
* Selector to get the list of subcategoriesIds from the Redux store.
*
* @param {Object} state - The current state of the Redux store.
* @returns {Subcategory[]} The list of subcategoriesIds.
*/
export const selectSubcategories = (state: ReturnType<typeof store.getState>) => state.subcategories.list;