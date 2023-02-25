import { store } from "../store";

/**
 * Selector for getting the list of categories from the Redux store.
 *
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @returns {Category[]} List of categories.
 */
export const selectCategories = (state: ReturnType<typeof store.getState>) =>
  state.categories.list;
