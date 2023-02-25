import { citySlice } from "../reducer";

/**
 * Exported actions for the cityId slice of the Redux store.
 *
 * @constant
 * @type {object}
 * @property {function} addCity - Action creator for adding a cityId to the list.
 * @property {function} removeCity - Action creator for removing a cityId from the list.
 */
export const { addCity, removeCity } = citySlice.actions;
