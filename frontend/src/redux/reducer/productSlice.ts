import { Product } from "../../models/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface for ProductSlice state
 *
 * @interface ProductSliceState
 * @property {Product[]} list - List of products.
 */
interface ProductSliceState {
    list: Product[];
}

/**
* Initial state for the ProductSlice.
*
* @constant
* @type {ProductSliceState}
*/
const initialState: ProductSliceState = {
    list: [],
};

/**
* Product slice for the Redux store.
*
* This slice includes actions and reducers for handling the state of products in the app,
* including adding and removing products from the list.
*
* @constant
* @type {Slice}
*/
export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        /**
         * Reducer for adding a product to the list.
         *
         * @param {ProductSliceState} state - Current state of the slice.
         * @param {PayloadAction<Product>} action - Action object with the product to be added.
         * @returns {void}
         */
        addProduct: (state, action: PayloadAction<Product>) => {
            // Only add the product if it doesn't exist in the list
            if (!state.list.some((product) => product.id === action.payload.id)) {
                state.list = [...state.list, action.payload];
            }
        },
        /**
         * Reducer for removing a product from the list.
         *
         * @param {ProductSliceState} state - Current state of the slice.
         * @param {PayloadAction<string>} action - Action object with the id of the product to be removed.
         * @returns {void}
         */
        removeProduct: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((product) => product.id !== action.payload);
        },
    },
});
