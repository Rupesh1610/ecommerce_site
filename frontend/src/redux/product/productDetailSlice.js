import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const statuses = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const productDetailSlice = createSlice({
  name: "productDetails",
  initialState: {
    status: statuses.IDLE,
    productDetails: {},
    error: null,
  },
  reducers: {
    setProductDetails: (state, action) => {
      state.productDetails = action.payload.product;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProductDetails, setStatus } = productDetailSlice.actions;
export default productDetailSlice.reducer;

export function fetchProductDetails(id) {
  return async function fetchProductDetailsThunk(dispatch, getState) {
    try {
      dispatch(setStatus(statuses.LOADING));
      const res = await axios.get(`/api/product/${id}`);
      dispatch(setProductDetails(res.data));
      dispatch(setStatus(statuses.IDLE));
    } catch (error) {
      console.log(error);
    }
  };
}
