import {userSlice} from '../reducer';

/**
 * Exported actions for the user slice of the Redux store.
 *
 * @constant
 * @type {object}
 * @property {function} setUser - Action creator for setting the user.
 * @property {function} resetUser - Action creator for resetting the user.
 */

export const {setUser, resetUser} = userSlice.actions;