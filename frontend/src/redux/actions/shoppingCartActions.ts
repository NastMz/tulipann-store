import { shoppingCartSlice } from "../reducer";

/**
 * Object with actions for the shopping cart slice.
 *
 * @property {function} addToCart - Action for adding a product to the shopping cart.
 * @property {function} removeFromCart - Action for removing a product from the shopping cart.
 * @property {function} emptyCart - Action for cleaning the shopping cart.
 * @property {function} increaseCount - Action for increasing the count of a product in the shopping cart.
 * @property {function} decreaseCount - Action for decreasing the count of a product in the shopping cart.
 */
export const {
  addProductToCart: addToCart,
  removeProductFromCart: removeFromCart,
  cleanCart: emptyCart,
  increaseProductCartCount: increaseCount,
  decreaseProductCartCount: decreaseCount,
} = shoppingCartSlice.actions;
