import {Category} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CategorySliceState {
    list: Category[];
}

const initialState: CategorySliceState = {
    list: []
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.list = [
                ...state.list.filter(category => category.id !== action.payload.id),
                action.payload,
            ]
        },
        removeCategory: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(category => category.id !== action.payload);
        }
    }
});

