import {store} from "../store";

export const selectSubcategories = (state: ReturnType<typeof store.getState>) => state.subcategories.list;