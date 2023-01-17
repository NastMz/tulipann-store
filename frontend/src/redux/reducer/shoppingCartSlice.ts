import { Product } from "../../models/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface for a product in the shopping cart.
 *
 * @interface ProductCart
 * @extends {Product}
 * @property {number} count - Number of items of this product in the cart.
 */
interface ProductCart extends Product {
  count: number;
}

/**
 * Interface for ShoppingCartSlice state.
 *
 * @interface ShoppingCartSliceState
 * @property {ProductCart[]} list - List of products in the cart.
 * @property {number} subtotal - Current subtotal of the cart.
 */
interface ShoppingCartSliceState {
  list: ProductCart[];
  subtotal: number;
}

/**
 * Initial state for the ShoppingCartSlice.
 *
 * @constant
 * @type {ShoppingCartSliceState}
 */
const initialState: ShoppingCartSliceState = {
  list: [],
  subtotal: 0,
};

/**
 * Shopping cart slice for the Redux store.
 *
 * This slice includes actions and reducers for handling the state of the shopping cart in the app,
 * including adding and removing products, increasing and decreasing product counts, and calculating the subtotal.
 *
 * @constant
 * @type {Slice}
 */
export const shoppingCartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /**
         * Reducer for adding a product to the shopping cart.
         *
         * @param {ShoppingCartSliceState} state - Current state of the slice.
         * @param {PayloadAction<Product>} action - Action object with the product to be added.
         * @returns {void}
         */
        addProductToCart: (state, action: PayloadAction<Product>) => {
            if (state.list.filter((product) => product.id === action.payload.id).length === 0) {
                state.list = [
                    ...state.list,
                    {
                        ...action.payload,
                        count: 1,
                    },
                    ];
            }
            state.subtotal = 0;
            state.list.forEach((product) => (state.subtotal += product.count * product.price));
        },
        /**
         * Reducer for removing a product from the shopping cart.
         *
         * @param {ShoppingCartSliceState} state - Current state of the slice.
         * @param {PayloadAction<number>} action - Action object with the id of the product to be removed.
         * @returns {void}
         */
        removeProductFromCart: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((product) => product.id !== action.payload);
            state.subtotal = 0;
            state.list.forEach((product) => (state.subtotal += product.count * product.price));
        },
        /**
         * Reducer for increasing the count of a product in the shopping cart.
         *
         * @param {ShoppingCartSliceState} state - Current state of the slice.
         * @param {PayloadAction<number>} action - Action object with the id of the product to increase the count.
         * @returns {void}
         */
        increaseProductCartCount: (state, action: PayloadAction<string>) => {
            state.list = state.list.map((product) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        count: product.count + 1,
                    };
                }
                return product;
            });
            state.subtotal = 0;
            state.list.forEach((product) => (state.subtotal += product.count * product.price));
        },
        /**
         * Reducer for decreasing the count of a product in the shopping cart.
         *
         * @param {ShoppingCartSliceState} state - Current state of the slice.
         * @param {PayloadAction<number>} action - Action object with the id of the product to decrease the count.
         * @returns {void}
         */
        decreaseProductCartCount: (state, action: PayloadAction<string>) => {
            state.list = state.list.map((product) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        count: product.count - 1,
                    };
                }
                return product;
            });
            state.subtotal = 0;
            state.list.forEach((product) => (state.subtotal += product.count * product.price));
        },
        /**
        * Reducer for cleaning the shopping cart.
        *
        * @param {ShoppingCartSliceState} state - Current state of the slice.
        * @returns {void}
        */
        cleanCart: (state) => {
                state.list = [];
                state.subtotal = 0;
                },
        },
});



