import { Category } from "../../models/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface for CategorySlice state
 *
 * @interface CategorySliceState
 * @property {Category[]} list - List of categories.
 */
interface CategorySliceState {
    list: Category[];
}

/**
* Initial state for the CategorySlice.
*
* @constant
* @type {CategorySliceState}
*/
const initialState: CategorySliceState = {
    list: [],
};

/**
* Category slice for the Redux store.
*
* This slice includes actions and reducers for handling the state of categories in the app,
* including adding and removing categories from the list.
*
* @constant
* @type {Slice}
*/
export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        /**
         * Action creator for adding a categoryId to the list.
         *
         * @param {CategorySliceState} state - Current state of the slice.
         * @param {PayloadAction<Category>} action - Action object with the categoryId to be added.
         * @returns {void}
         */
        addCategory: (state, action: PayloadAction<Category>) => {
                state.list = [
                    ...state.list.filter((category) => category.id !== action.payload.id),
                    action.payload,
                    ];
                },
        /**
         * Reducer for removing a categoryId from the list.
         *
         * @param {CategorySliceState} state - Current state of the slice.
         * @param {PayloadAction<number>} action - Action object with the id of the categoryId to be removed.
         * @returns {void}
         */
        removeCategory: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(category => category.id !== action.payload);
        }
    }
});

