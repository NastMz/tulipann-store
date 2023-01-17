import { Article } from "../../models/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface for ArticleSlice state
 *
 * @interface ArticleSliceState
 * @property {Article[]} list - List of articles.
 */
interface ArticleSliceState {
  list: Article[];
}

/**
 * Initial state for the ArticleSlice.
 *
 * @constant
 * @type {ArticleSliceState}
 */
const initialState: ArticleSliceState = {
  list: [],
};

/**
 * Article slice for the Redux store.
 *
 * This slice includes actions and reducers for handling the state of articles in the app,
 * including adding and removing articles from the list.
 *
 * @constant
 * @type {Slice}
 */
export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    /**
     * Action creator for adding an article to the list.
     *
     * @param {ArticleSliceState} state - Current state of the slice.
     * @param {PayloadAction<Article>} action - Action object with the article to be added.
     * @returns {void}
     */
    addArticle: (state, action: PayloadAction<Article>) => {
      state.list = [
        ...state.list.filter((Article) => Article.id !== action.payload.id),
        action.payload,
      ];
    },
    /**
     * Action creator for removing an article from the list.
     *
     * @param {ArticleSliceState} state - Current state of the slice.
     * @param {PayloadAction<number>} action - Action object with the id of the article to be removed.
     * @returns {void}
     */
    removeArticle: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((Article) => Article.id !== action.payload);
    },
  },
});
