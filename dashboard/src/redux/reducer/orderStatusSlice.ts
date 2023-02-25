import {OrderStatus} from "../../models/interfaces/Order";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Interface for OrderStatusSlice state
 *
 * @interface OrderStatusSliceState
 * @property {OrderStatus[]} list - List of categories.
 */
interface OrderStatusSliceState {
    list: OrderStatus[];
}

/**
* Initial state for the OrderStatusSlice.
*
* @constant
* @type {OrderStatusSliceState}
*/
const initialState: OrderStatusSliceState = {
    list: [],
};

/**
* OrderStatus slice for the Redux store.
*
* This slice includes actions and reducers for handling the state of categories in the app,
* including adding and removing categories from the list.
*
* @constant
* @type {Slice}
*/
export const orderStatusSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        /**
         * Action creator for adding an order status to the list.
         *
         * @param {OrderStatusSliceState} state - Current state of the slice.
         * @param {PayloadAction<OrderStatus>} action - Action object with the id to be added.
         * @returns {void}
         */
        addOrderStatus: (state, action: PayloadAction<OrderStatus>) => {
                state.list = [
                    ...state.list.filter((orderStatus) => orderStatus.id !== action.payload.id),
                    action.payload,
                    ];
                },
        /**
         * Reducer for removing an order status from the list.
         *
         * @param {OrderStatusSliceState} state - Current state of the slice.
         * @param {PayloadAction<string>} action - Action object with the id of the id to be removed.
         * @returns {void}
         */
        removeOrderStatus: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(orderStatus => orderStatus.id !== action.payload);
        }
    }
});

