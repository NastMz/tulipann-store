import { store } from "../store/store";

/**
 * Selector for getting the list of articles from the Redux store.
 *
 * @param {ReturnType<typeof store.getState>} state - Current state of the store.
 * @returns {Article[]} List of articles.
 */
export const selectArticles = (state: ReturnType<typeof store.getState>) =>
  state.articles.list;
