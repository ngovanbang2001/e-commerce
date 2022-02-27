import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";

const rootReducer = {
  cart: cartSlice,
};
export default configureStore({
  reducer: rootReducer,
});
