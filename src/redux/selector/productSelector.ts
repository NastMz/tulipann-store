import {store} from "../store";

export const selectProducts = (state: ReturnType<typeof store.getState>) => state.products.list;