/**
 * Exports of selectors for different slices of the Redux store.
 *
 * @module store/selectors
 * @exports {function} selectProducts - Selector to get the list of products from the store.
 * @exports {function} selectCategories - Selector to get the list of categories from the store.
 * @exports {function} selectSubcategories - Selector to get the list of subcategoriesIds from the store.
 * @exports {function} selectArticles - Selector to get the list of articles from the store.
 * @exports {function} selectCart - Selector to get the list of items in the cart from the store.
 */

export { selectProducts } from './productSelector';
export { selectCategories } from './categorySelector';
export { selectSubcategories } from './subcategorySelector';
export { selectArticles } from './articleSelector';
export { selectCart } from './shoppingCartSelector';
