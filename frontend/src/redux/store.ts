import {configureStore} from "@reduxjs/toolkit";
import {articleSlice, categorySlice, productSlice, shoppingCartSlice, subcategorySlice} from "./reducer";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        categories: categorySlice.reducer,
        subcategories: subcategorySlice.reducer,
        articles: articleSlice.reducer,
        cart: shoppingCartSlice.reducer,
    }
});