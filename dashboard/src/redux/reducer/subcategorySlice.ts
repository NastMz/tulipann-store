import {Subcategory} from "../../models/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Interface for SubcategorySlice state
 *
 * @interface SubcategorySliceState
 * @property {Subcategory[]} list - List of subcategories.
 */
interface SubcategorySliceState {
    list: Subcategory[];
}

/**
 * Initial state for the SubcategorySlice.
 *
 * @constant
 * @type {SubcategorySliceState}
 */
const initialState: SubcategorySliceState = {
    list: [],
};

/**
 * Subcategory slice for the Redux store.
 *
 * This slice includes actions and reducers for handling the state of subcategories in the app,
 * including adding and removing subcategories from the list.
 *
 * @constant
 * @type {Slice}
 */
export const subcategorySlice = createSlice({
    name: "subcategories",
    initialState,
    reducers: {
        /**
         * Action creator for adding a subcategory to the list.
         *
         * @param {SubcategorySliceState} state - Current state of the slice.
         * @param {PayloadAction<Subcategory>} action - Action object with the subcategory to be added.
         * @returns {void}
         */
        addSubcategory: (state, action: PayloadAction<Subcategory>) => {
            state.list = [
                ...state.list.filter((subcategory) => subcategory.id !== action.payload.id),
                action.payload,
            ];
        },
        /**
         * Action creator for removing a subcategory from the list.
         *
         * @param {SubcategorySliceState} state - Current state of the slice.
         * @param {PayloadAction<string>} action - Action object with the id of the subcategory to be removed.
         * @returns {void}
         */
        removeSubcategory: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((subcategory) => subcategory.id !== action.payload);
        },
        /**
         * Action creator for removing all subcategories from the list.
         *
         * @param {SubcategorySliceState} state - Current state of the slice.
         * @returns {void}
         */
        removeAllSubcategories: (state) => {
            state.list = [];
        }
    },
});
