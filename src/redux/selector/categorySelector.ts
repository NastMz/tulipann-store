import {store} from "../store";

export const selectCategories = (state: ReturnType<typeof store.getState>) => state.categories.list;