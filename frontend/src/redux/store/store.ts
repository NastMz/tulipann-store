import {configureStore} from "@reduxjs/toolkit";
import {
    articleSlice,
    categorySlice,
    productSlice,
    shoppingCartSlice,
    subcategorySlice
} from "../reducer";

/**
* Store object for the Redux store.
*
* This store is configured using the configureStore function from the @reduxjs/toolkit package,
* and includes the reducers for products, categories, subcategoriesIds, articles and the shopping cart.
*
* @constant
* @type {ToolkitStore}
*/
export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        categories: categorySlice.reducer,
        subcategories: subcategorySlice.reducer,
        articles: articleSlice.reducer,
        cart: shoppingCartSlice.reducer,
    },
});