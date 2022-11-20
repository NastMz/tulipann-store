import {Article} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ArticleSliceState {
    list: Article[];
}

const initialState: ArticleSliceState = {
    list: []
}

export const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        addArticle: (state, action: PayloadAction<Article>) => {
            state.list = [
                ...state.list.filter(Article => Article.id !== action.payload.id),
                action.payload,
            ]
        },
        removeArticle: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(Article => Article.id !== action.payload);
        }
    }
});