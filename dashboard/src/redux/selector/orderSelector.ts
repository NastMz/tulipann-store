import {store} from "../store";

/**
 * Selector for getting the list of orders from the Redux store.
 *
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @returns {Order[]} List of orders.
 */
export const selectOrders = (state: ReturnType<typeof store.getState>) =>
  state.orders.list;


/**
 * Selector for getting a order from the Redux store.
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @param {string} id - ID of the order to get.
 * @returns {Order} Order with the given ID.
 */
export const selectOrder = (state: ReturnType<typeof store.getState>, id: string) =>
    state.orders.list.find((order) => order.id === id);
