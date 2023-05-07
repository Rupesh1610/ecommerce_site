import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const statuses = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    status: statuses.IDLE,
    products: [],
    productsCount: 0,
    resultPerPage: 0,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setErrors: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setStatus, setErrors } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts(
  keyword = "",
  page = 1,
  price = [0, 30000],
  category,
  ratings = 0
) {
  return async function fetchProductThunk(dispatch, getState) {
    try {
      dispatch(setStatus(statuses.LOADING));
      let link = `/api/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}&avgRating[gte]=${ratings}`;
      if (category) {
        link = `/api/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${page}&category=${category}&avgRating[gte]=${ratings}`;
      }
      const res = await axios.get(link);
      dispatch(setProducts(res.data));
      dispatch(setStatus(statuses.IDLE));
    } catch (error) {
      dispatch(setErrors(error.response.data.message));
      dispatch(setStatus(statuses.ERROR));
    }
  };
}
