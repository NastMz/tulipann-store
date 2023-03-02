import {commentarySlice} from "../reducer";

/**
 * Exported actions for the commentaryId slice of the Redux store.
 *
 * @constant
 * @type {object}
 * @property {function} addCommentary - Action creator for adding a commentary to the list.
 * @property {function} removeCommentary - Action creator for removing a commentary from the list.
 * @property {function} removeAllCommentaries - Action creator for removing all commentaries from the list.
 */
export const { addCommentary, removeCommentary, removeAllCommentaries } = commentarySlice.actions;
