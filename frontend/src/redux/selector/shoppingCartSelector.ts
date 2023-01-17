import { store } from '../store/store';

/**
 * Selector to get the list of items in the cart from the Redux store.
 *
 * @param {Object} state - The current state of the Redux store.
 * @returns {Array} The list of items in the cart.
 */
export const selectCart = (state: ReturnType<typeof store.getState>) => state.cart.list;
