import {configureStore} from "@reduxjs/toolkit";
import {articleSlice, categorySlice, productSlice, shoppingCartSlice} from "./reducer";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        categories: categorySlice.reducer,
        articles: articleSlice.reducer,
        cart: shoppingCartSlice.reducer,
    }
});