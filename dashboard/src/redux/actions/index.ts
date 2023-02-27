/**
 * Exports of actions for different slices of the Redux store.
 *
 * @module store/actions
 * @exports {function} addProduct - Action creator to add a product to the store.
 * @exports {function} removeProduct - Action creator to remove a product from the store.
 * @exports {function} removeAllProducts - Action creator to remove all products from the store.
 * @exports {function} addCategory - Action creator to add a id to the store.
 * @exports {function} removeCategory - Action creator to remove a id from the store.
 * @exports {function} addSubcategory - Action creator to add a subcategory to the store.
 * @exports {function} removeSubcategory - Action creator to remove a subcategory from the store.
 * @exports {function} addArticle - Action creator to add an article to the store.
 * @exports {function} removeArticle - Action creator to remove an article from the store.
 * @exports {function} addOrder - Action creator to add an order to the store.
 * @exports {function} removeOrder - Action creator to remove an order from the store.
 * @exports {function} setUser - Action creator to set the user in the store.
 * @exports {function} resetUser - Action creator to reset the user in the store.
 * @exports {function} addDepartment - Action creator to add a departmentId to the store.
 * @exports {function} removeDepartment - Action creator to remove a departmentId from the store.
 * @exports {function} addCity - Action creator to add a cityId to the store.
 * @exports {function} removeCity - Action creator to remove a cityId from the store.
 * @exports {function} addOrderStatus - Action creator to add an order status to the store.
 * @exports {function} removeOrderStatus - Action creator to remove an order status from the store.
 */

export { addProduct, removeProduct, removeAllProducts } from './productActions';
export { addCategory, removeCategory, removeAllCategories } from './categoryActions';
export { addSubcategory, removeSubcategory, removeAllSubcategories } from './subcategoryActions';
export { addArticle, removeArticle } from './articleActions';
export { addOrder, removeOrder, clearOrders } from './orderActions';
export { setUser, resetUser } from './userActions';
export { addDepartment, removeDepartment } from './departmentActions';
export {addCity, removeCity} from './cityActions';
export {addOrderStatus, removeOrderStatus} from './orderStatusActions';