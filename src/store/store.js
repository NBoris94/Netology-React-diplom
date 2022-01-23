import { configureStore } from "@reduxjs/toolkit";
import topSalesSlice from "./slices/topSalesSlice";
import catalogSlice from "./slices/catalogSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";

export default configureStore({
  reducer: {
    topSalesSlice,
    catalogSlice,
    productSlice,
    cartSlice,
  },
})