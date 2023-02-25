import { store } from "../store";

/**
 * Selector for getting the list of departments from the Redux store.
 *
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @returns {Department[]} List of departments.
 */
export const selectDepartments = (state: ReturnType<typeof store.getState>) =>
  state.departments.list;
