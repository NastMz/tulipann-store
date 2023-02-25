import {orderSlice} from "../reducer";

/**
 * Exported actions for the order slice of the Redux store.
 *
 * @constant
 * @type {object}
 * @property {function} addOrder - Action creator for adding an order to the list.
 * @property {function} removeOrder - Action creator for removing an order from the list.
 */
export const { addOrder, removeOrder } = orderSlice.actions;
