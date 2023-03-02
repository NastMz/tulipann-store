import {configureStore} from "@reduxjs/toolkit";
import {
    articleSlice,
    categorySlice,
    citySlice,
    commentarySlice,
    departmentSlice,
    orderSlice,
    orderStatusSlice,
    productSlice,
    subcategorySlice,
    userSlice,
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
        orders: orderSlice.reducer,
        departments: departmentSlice.reducer,
        cities: citySlice.reducer,
        orderStatus: orderStatusSlice.reducer,
        users: userSlice.reducer,
        commentaries: commentarySlice.reducer,
    },
});