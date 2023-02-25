import {store} from "../store";

/**
 * Selector for getting the user from the store.
 *
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @returns {User} The user from the store.
 */
export const selectUser = (state: ReturnType<typeof store.getState>) =>
    state.user.user;