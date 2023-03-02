import {store} from "../store";

/**
 * Selector for getting the list of users from the Redux store.
 *
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @returns {User[]} List of users.
 */
export const selectUsers = (state: ReturnType<typeof store.getState>) =>
  state.users.list;


/**
 * Selector for getting a user from the Redux store.
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @param {string} id - ID of the user to get.
 * @returns {User} User with the given ID.
 */
export const selectUser = (state: ReturnType<typeof store.getState>, id: string) =>
    state.users.list.find((user) => user.id === id);
