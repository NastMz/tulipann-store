import {City} from "../../models/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Interface for CitySlice state
 *
 * @interface CitySliceState
 * @property {City[]} list - List of categories.
 */
interface CitySliceState {
    list: City[];
}

/**
* Initial state for the CitySlice.
*
* @constant
* @type {CitySliceState}
*/
const initialState: CitySliceState = {
    list: [],
};

/**
* City slice for the Redux store.
*
* This slice includes actions and reducers for handling the state of categories in the app,
* including adding and removing categories from the list.
*
* @constant
* @type {Slice}
*/
export const citySlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        /**
         * Action creator for adding a cityId to the list.
         *
         * @param {CitySliceState} state - Current state of the slice.
         * @param {PayloadAction<City>} action - Action object with the id to be added.
         * @returns {void}
         */
        addCity: (state, action: PayloadAction<City>) => {
                state.list = [
                    ...state.list.filter((city) => city.id !== action.payload.id),
                    action.payload,
                    ];
                },
        /**
         * Reducer for removing a cityId from the list.
         *
         * @param {CitySliceState} state - Current state of the slice.
         * @param {PayloadAction<string>} action - Action object with the id of the id to be removed.
         * @returns {void}
         */
        removeCity: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(city => city.id !== action.payload);
        }
    }
});

