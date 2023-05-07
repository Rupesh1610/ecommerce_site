import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/productSlice";
import productDetailReducer from "./product/productDetailSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailReducer,
    user: userReducer,
  },
});
