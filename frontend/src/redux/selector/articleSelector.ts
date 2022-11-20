import {store} from "../store";

export const selectArticles = (state: ReturnType<typeof store.getState>) => state.articles.list;