import {Product} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ProductSliceState {
    list: Product[];
}

const initialState: ProductSliceState = {
    list: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.list = [
                ...state.list.filter(product => product.id !== action.payload.id),
                action.payload,
            ]
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(product => product.id !== action.payload);
        }
    }
});

