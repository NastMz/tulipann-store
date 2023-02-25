/**
 * Interface for representing a product in the local storage.
 *
 * @interface LocalStorageProduct
 * @property {string} id - The id of the product.
 * @property {number} count - The number of items of the product in the cart.
 */
interface LocalStorageProduct {
  id: string;
  count: number;
}

const CART_STATE_KEY = 'cartState';

/**
 * Loads the cart state from the local storage.
 *
 * @returns {Array<LocalStorageProduct>} The cart state as an array of products.
 */
export const loadCartState = (): Array<LocalStorageProduct> => {
  try {
    const serializedState = localStorage.getItem(CART_STATE_KEY);
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    return [];
  }
};

/**
 * Saves the cart state to the local storage.
 *
 * @param {Array<LocalStorageProduct>} state - The cart state as an array of products.
 */
export const saveCartState = (state: Array<LocalStorageProduct>) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(CART_STATE_KEY, serializedState);
  } catch (error: any) {
    throw new Error(error);
  }
};
