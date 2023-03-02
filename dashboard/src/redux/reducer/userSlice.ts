import {User} from "../../models/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Interface for UserSlice state
 *
 * @interface UserSliceState
 * @property {User[]} list - List of users.
 */
interface UserSliceState {
    list: User[];
}

/**
* Initial state for the UserSlice.
*
* @constant
* @type {UserSliceState}
*/
const initialState: UserSliceState = {
    list: [],
};

/**
* User slice for the Redux store.
*
* This slice includes actions and reducers for handling the state of users in the app,
* including adding and removing users from the list.
*
* @constant
* @type {Slice}
*/
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        /**
         * Reducer for adding a user to the list.
         *
         * @param {UserSliceState} state - Current state of the slice.
         * @param {PayloadAction<User>} action - Action object with the user to be added.
         * @returns {void}
         */
        addUser: (state, action: PayloadAction<User>) => {
            // Only add the user if it doesn't exist in the list
            if (!state.list.some((user) => user.id === action.payload.id)) {
                state.list = [...state.list, action.payload];
            }
        },
        /**
         * Reducer for removing a user from the list.
         *
         * @param {UserSliceState} state - Current state of the slice.
         * @param {PayloadAction<string>} action - Action object with the id of the user to be removed.
         * @returns {void}
         */
        removeUser: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((user) => user.id !== action.payload);
        },
        /**
         * Reducer for removing all users from the list.
         *
         * @param {UserSliceState} state - Current state of the slice.
         * @returns {void}
         */
        removeAllUsers: (state) => {
            state.list = [];
        }
    },
});
