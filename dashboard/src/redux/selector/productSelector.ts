import {store} from "../store";

/**
 * Selector for getting the list of products from the Redux store.
 *
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @returns {Product[]} List of products.
 */
export const selectProducts = (state: ReturnType<typeof store.getState>) =>
  state.products.list;


/**
 * Selector for getting a product from the Redux store.
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @param {string} id - ID of the product to get.
 * @returns {Product} Product with the given ID.
 */
export const selectProduct = (state: ReturnType<typeof store.getState>, id: string) =>
    state.products.list.find((product) => product.id === id);