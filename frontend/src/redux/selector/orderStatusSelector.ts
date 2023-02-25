import { store } from "../store";

/**
 * Selector for getting the list of cities from the Redux store.
 *
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @returns {OrderStatus[]} List of cities.
 */
export const selectOrderStatus = (state: ReturnType<typeof store.getState>) =>
  state.orderStatus.list;
