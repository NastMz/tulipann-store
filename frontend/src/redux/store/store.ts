import {configureStore} from "@reduxjs/toolkit";
import {
    articleSlice,
    categorySlice,
    productSlice,
    shoppingCartSlice,
    subcategorySlice,
    userSlice,
    orderSlice,
    departmentSlice,
    citySlice,
    orderStatusSlice
} from "../reducer";

/**
* Store object for the Redux store.
*
* This store is configured using the configureStore function from the @reduxjs/toolkit package,
* and includes the reducers for user, products, categories, subcategories, articles, orders and the shopping cart.
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
        user: userSlice.reducer,
        orders: orderSlice.reducer,
        departments: departmentSlice.reducer,
        cities: citySlice.reducer,
        orderStatus: orderStatusSlice.reducer
    },
});