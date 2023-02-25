import {Order} from "../../models/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Interface for ProductSlice state
 *
 * @interface OrderSliceState
 * @property {Order[]} list - List of orders.
 */
interface OrderSliceState {
    list: Order[];
}

/**
* Initial state for the OrderSlice.
*
* @constant
* @type {OrderSliceState}
*/
const initialState: OrderSliceState = {
    list: [],
};

/**
* Order slice for the Redux store.
*
* This slice includes actions and reducers for handling the state of orders in the app,
* including adding and removing orders from the list.
*
* @constant
* @type {Slice}
*/
export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        /**
         * Reducer for adding a order to the list.
         *
         * @param {OrderSliceState} state - Current state of the slice.
         * @param {PayloadAction<Order>} action - Action object with the order to be added.
         * @returns {void}
         */
        addOrder: (state, action: PayloadAction<Order>) => {
            // Only add the order if it doesn't exist in the list
            if (!state.list.some((order) => order.id === action.payload.id)) {
                state.list = [...state.list, action.payload];
            }
        },
        /**
         * Reducer for removing order from the list.
         *
         * @param {OrderSliceState} state - Current state of the slice.
         * @param {PayloadAction<string>} action - Action object with the id of the order to be removed.
         * @returns {void}
         */
        removeOrder: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((order) => order.id !== action.payload);
        },
    },
});
