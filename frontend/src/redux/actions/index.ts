/**
 * Exports of actions for different slices of the Redux store.
 *
 * @module store/actions
 * @exports {function} addProduct - Action creator to add a product to the store.
 * @exports {function} removeProduct - Action creator to remove a product from the store.
 * @exports {function} addCategory - Action creator to add a categoryId to the store.
 * @exports {function} removeCategory - Action creator to remove a categoryId from the store.
 * @exports {function} addSubcategory - Action creator to add a subcategory to the store.
 * @exports {function} removeSubcategory - Action creator to remove a subcategory from the store.
 * @exports {function} addArticle - Action creator to add an article to the store.
 * @exports {function} removeArticle - Action creator to remove an article from the store.
 * @exports {function} addToCart - Action creator to add an item to the shopping cart.
 * @exports {function} removeFromCart - Action creator to remove an item from the shopping cart.
 * @exports {function} emptyCart - Action creator to remove all items from the shopping cart.
 * @exports {function} increaseCount - Action creator to increase the count of an item in the shopping cart.
 * @exports {function} decreaseCount - Action creator to decrease the count of an item in the shopping cart.
 */

export { addProduct, removeProduct } from './productActions';
export { addCategory, removeCategory } from './categoryActions';
export { addSubcategory, removeSubcategory } from './subcategoryActions';
export { addArticle, removeArticle } from './articleActions';
export {
  addToCart,
  removeFromCart,
  emptyCart,
  increaseCount,
  decreaseCount,
} from './shoppingCartActions';
