import {store} from "../store";

/**
 * Selector for getting the list of commentaries from the Redux store.
 *
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @returns {Commentary[]} List of commentaries.
 */
export const selectCommentaries = (state: ReturnType<typeof store.getState>) =>
  state.commentaries.list;
