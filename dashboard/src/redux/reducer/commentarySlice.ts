import {Commentary} from "../../models/interfaces";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Interface for CommentarySlice state
 *
 * @interface CommentarySliceState
 * @property {Commentary[]} list - List of categories.
 */
interface CommentarySliceState {
    list: Commentary[];
}

/**
* Initial state for the CommentarySlice.
*
* @constant
* @type {CommentarySliceState}
*/
const initialState: CommentarySliceState = {
    list: [],
};

/**
* Commentary slice for the Redux store.
*
* This slice includes actions and reducers for handling the state of categories in the app,
* including adding and removing categories from the list.
*
* @constant
* @type {Slice}
*/
export const commentarySlice = createSlice({
    name: "commentaries",
    initialState,
    reducers: {
        /**
         * Action creator for adding a commentaryId to the list.
         *
         * @param {CommentarySliceState} state - Current state of the slice.
         * @param {PayloadAction<Commentary>} action - Action object with the id to be added.
         * @returns {void}
         */
        addCommentary: (state, action: PayloadAction<Commentary>) => {
                state.list = [
                    ...state.list.filter((commentary) => commentary.id !== action.payload.id),
                    action.payload,
                    ];
                },
        /**
         * Reducer for removing a commentaryId from the list.
         *
         * @param {CommentarySliceState} state - Current state of the slice.
         * @param {PayloadAction<string>} action - Action object with the id of the id to be removed.
         * @returns {void}
         */
        removeCommentary: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(commentary => commentary.id !== action.payload);
        },
        /**
         * Reducer for removing all commentaries from the list.
         *
         * @param {CommentarySliceState} state - Current state of the slice.
         * @returns {void}
         */
        removeAllCommentaries: (state) => {
            state.list = [];
        }
    }
});

