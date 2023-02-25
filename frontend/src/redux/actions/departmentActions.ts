import { departmentSlice } from "../reducer";

/**
 * Exported actions for the departmentId slice of the Redux store.
 *
 * @constant
 * @type {object}
 * @property {function} addDepartment - Action creator for adding a departmentId to the list.
 * @property {function} removeDepartment - Action creator for removing a departmentId from the list.
 */
export const { addDepartment, removeDepartment } = departmentSlice.actions;
