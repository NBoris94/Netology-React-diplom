import { configureStore } from "@reduxjs/toolkit";
import topSalesSlice from "./slices/topSalesSlice";
import catalogSlice from "./slices/catalogSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";
import {save} from "../libs/localStorage";

const store = configureStore({
  reducer: {
    topSalesSlice,
    catalogSlice,
    productSlice,
    cartSlice,
  },
});

store.subscribe(() => {
  save("cart", store.getState().cartSlice.items);
});

export default store;