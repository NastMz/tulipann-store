import {store} from "../store";

/**
 * Selector for getting the list of cities from the Redux store.
 *
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @returns {City[]} List of cities.
 */
export const selectCities = (state: ReturnType<typeof store.getState>) =>
  state.cities.list;
