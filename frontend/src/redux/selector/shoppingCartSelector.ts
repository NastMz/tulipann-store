import {store} from "../store";

export const selectCart = (state: ReturnType<typeof store.getState>) => state.cart.list;