import {Department} from "../../models/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Interface for DepartmentSlice state
 *
 * @interface DepartmentSliceState
 * @property {Department[]} list - List of categories.
 */
interface DepartmentSliceState {
    list: Department[];
}

/**
* Initial state for the DepartmentSlice.
*
* @constant
* @type {DepartmentSliceState}
*/
const initialState: DepartmentSliceState = {
    list: [],
};

/**
* Department slice for the Redux store.
*
* This slice includes actions and reducers for handling the state of categories in the app,
* including adding and removing categories from the list.
*
* @constant
* @type {Slice}
*/
export const departmentSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {
        /**
         * Action creator for adding a departmentId to the list.
         *
         * @param {DepartmentSliceState} state - Current state of the slice.
         * @param {PayloadAction<Department>} action - Action object with the id to be added.
         * @returns {void}
         */
        addDepartment: (state, action: PayloadAction<Department>) => {
                state.list = [
                    ...state.list.filter((department) => department.id !== action.payload.id),
                    action.payload,
                    ];
                },
        /**
         * Reducer for removing a departmentId from the list.
         *
         * @param {DepartmentSliceState} state - Current state of the slice.
         * @param {PayloadAction<string>} action - Action object with the id of the id to be removed.
         * @returns {void}
         */
        removeDepartment: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(department => department.id !== action.payload);
        }
    }
});

