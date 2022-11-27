import {Product} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ProductCart extends Product{
    count: number
}

interface ShoppingCartSliceState {
    list: ProductCart[],
    subtotal: number
}

const initialState: ShoppingCartSliceState = {
    list: [],
    subtotal: 0
}

export const shoppingCartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<Product>) => {
            if (state.list.filter(product => product.id === action.payload.id).length === 0) {
                state.list = [
                    ...state.list,
                    {
                        ...action.payload,
                        count: 1
                    },
                ]
            }
            state.subtotal = 0;
            state.list.forEach((product) => state.subtotal += product.count * product.price);
        },
        removeProductFromCart: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(product => product.id !== action.payload);
            state.subtotal = 0;
            state.list.forEach((product) => state.subtotal += product.count * product.price);
        },
        increaseProductCartCount: (state, action: PayloadAction<number>) => {
            state.list = state.list.map((product) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        count: product.count + 1
                    }
                }
                return product;
            });
            state.subtotal = 0;
            state.list.forEach((product) => state.subtotal += product.count * product.price);
        },
        decreaseProductCartCount: (state, action: PayloadAction<number>) => {
            state.list = state.list.map((product) => {
                if (product.id === action.payload) {
                    return {
                        ...product,
                        count: product.count - 1
                    }
                }
                return product;
            });
            state.subtotal = 0;
            state.list.forEach((product) => state.subtotal += product.count * product.price);
        },
        cleanCart: (state) => {
            state.list = [];
            state.subtotal = 0;
        }
    }
});

