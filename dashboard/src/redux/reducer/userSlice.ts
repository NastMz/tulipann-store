import {User} from '../../models/interfaces';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Interface for UserSlice state.
 *
 * @interface UserSliceState
 * @property {User} user - User object.
 */
interface UserSliceState {
    user: User;
}

/**
 * Initial state for the UserSlice.
 *
 * @constant
 * @type {UserSliceState}
 */
const initialState: UserSliceState = {
    user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        departmentId: '',
        cityId: '',
        address: '',
    }
}

/**
 * User slice for the Redux store.
 *
 * This slice includes actions and reducers for handling the state of the user in the app,
 * including setting the user.
 *
 * @constant
 * @type {Slice}
 */
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * Action creator for setting the user.
         *
         * @param {UserSliceState} state - Current state of the slice.
         * @param {PayloadAction<User>} action - Action object with the user to be set.
         * @returns {void}
         */
        setUser: (state: UserSliceState, action: PayloadAction<User>): void => {
            state.user = action.payload;
        },
        /**
         * Action creator for resetting the user.
         *
         * @param {UserSliceState} state - Current state of the slice.
         * @returns {void}
         */
        resetUser: (state: UserSliceState): void => {
            state.user = initialState.user;
        }
    }
});