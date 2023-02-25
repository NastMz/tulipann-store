import {orderStatusSlice} from "../reducer";

/**
 * Exported actions for the orderStatus slice of the Redux store.
 *
 * @constant
 * @type {object}
 * @property {function} addOrderStatus - Action creator for adding an order status to the list.
 * @property {function} removeOrderStatus - Action creator for removing an order status from the list.
 */
export const { addOrderStatus, removeOrderStatus } = orderStatusSlice.actions;
