import {configureStore} from "@reduxjs/toolkit";
import {articleSlice, categorySlice, productSlice} from "./reducer";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        categories: categorySlice.reducer,
        articles: articleSlice.reducer,
    }
});