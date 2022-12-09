import {Subcategory} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SubcategorySliceState {
    list: Subcategory[];
}

const initialState: SubcategorySliceState = {
    list: []
}

export const subcategorySlice = createSlice({
    name: 'subcategories',
    initialState,
    reducers: {
        addSubcategory: (state, action: PayloadAction<Subcategory>) => {
            state.list = [
                ...state.list.filter(subcategory => subcategory.id !== action.payload.id),
                action.payload,
            ]
        },
        removeSubcategory: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(subcategory => subcategory.id !== action.payload);
        }
    }
});

