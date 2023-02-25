/**
 * Exports of actions for different slices of the Redux store.
 *
 * @module store/actions
 * @exports {function} addProduct - Action creator to add a product to the store.
 * @exports {function} removeProduct - Action creator to remove a product from the store.
 * @exports {function} addCategory - Action creator to add a id to the store.
 * @exports {function} removeCategory - Action creator to remove a id from the store.
 * @exports {function} addSubcategory - Action creator to add a subcategory to the store.
 * @exports {function} removeSubcategory - Action creator to remove a subcategory from the store.
 * @exports {function} addArticle - Action creator to add an article to the store.
 * @exports {function} removeArticle - Action creator to remove an article from the store.
 * @exports {function} addOrder - Action creator to add an order to the store.
 * @exports {function} removeOrder - Action creator to remove an order from the store.
 * @exports {function} addToCart - Action creator to add an item to the shopping cart.
 * @exports {function} removeFromCart - Action creator to remove an item from the shopping cart.
 * @exports {function} emptyCart - Action creator to remove all items from the shopping cart.
 * @exports {function} increaseCount - Action creator to increase the count of an item in the shopping cart.
 * @exports {function} decreaseCount - Action creator to decrease the count of an item in the shopping cart.
 * @exports {function} setUser - Action creator to set the user in the store.
 * @exports {function} resetUser - Action creator to reset the user in the store.
 * @exports {function} addDepartment - Action creator to add a departmentId to the store.
 * @exports {function} removeDepartment - Action creator to remove a departmentId from the store.
 * @exports {function} addCity - Action creator to add a cityId to the store.
 * @exports {function} removeCity - Action creator to remove a cityId from the store.
 * @exports {function} addOrderStatus - Action creator to add an order status to the store.
 * @exports {function} removeOrderStatus - Action creator to remove an order status from the store.
 */

export { addProduct, removeProduct } from './productActions';
export { addCategory, removeCategory } from './categoryActions';
export { addSubcategory, removeSubcategory } from './subcategoryActions';
export { addArticle, removeArticle } from './articleActions';
export { addOrder, removeOrder } from './orderActions';
export {
  addToCart,
  removeFromCart,
  emptyCart,
  increaseCount,
  decreaseCount,
} from './shoppingCartActions';
export { setUser, resetUser } from './userActions';
export { addDepartment, removeDepartment } from './departmentActions';
export {addCity, removeCity} from './cityActions';
export {addOrderStatus, removeOrderStatus} from './orderStatusActions';