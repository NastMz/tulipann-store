/**
 * Exports of selectors for different slices of the Redux store.
 *
 * @module store/selectors
 * @exports {function} selectProducts - Selector to get the list of products from the store.
 * @exports {function} selectCategories - Selector to get the list of categories from the store.
 * @exports {function} selectSubcategories - Selector to get the list of subcategories from the store.
 * @exports {function} selectArticles - Selector to get the list of articles from the store.
 * @exports {function} selectUser - Selector to get the user from the store.
 * @exports {function} selectOrders - Selector to get the list of orders from the store.
 * @exports {function} selectDepartments - Selector to get the list of departments from the store.
 * @exports {function} selectCities - Selector to get the list of cities from the store.
 * @exports {function} selectOrderStatus - Selector to get the list of order statuses from the store.
 * @exports {function} selectUsers - Selector to get the list of users from the store.
 * @exports {function} selectCommentaries - Selector to get the list of commentaries from the store.
 */

export { selectProducts } from './productSelector';
export { selectCategories } from './categorySelector';
export { selectSubcategories } from './subcategorySelector';
export { selectArticles } from './articleSelector';
export { selectOrders } from './orderSelector';
export {selectDepartments} from './departmentSelector';
export {selectCities} from './citySelector';
export {selectOrderStatus} from './orderStatusSelector';
export {selectUsers} from './userSelector';
export {selectCommentaries} from './commentarySelector';
