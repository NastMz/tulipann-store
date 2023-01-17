import { articleSlice } from "../reducer";

/**
 * Exported actions for the article slice of the Redux store.
 *
 * @constant
 * @type {object}
 * @property {function} addArticle - Action creator for adding an article to the list.
 * @property {function} removeArticle - Action creator for removing an article from the list.
 */
export const { addArticle, removeArticle } = articleSlice.actions;
