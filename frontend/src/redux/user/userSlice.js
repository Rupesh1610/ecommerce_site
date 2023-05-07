import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const statuses = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: statuses.IDLE,
    user: [],
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    checkUser: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setStatus, setError, checkUser } = userSlice.actions;
export default userSlice.reducer;

export function loginUser(email, password) {
  return async function loginUserThunk(dispatch, getState) {
    dispatch(setStatus(statuses.LOADING));
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/login",
        { email, password },
        config
      );
      dispatch(setUser(data.user));
      dispatch(checkUser(true));
      dispatch(setStatus(statuses.IDLE));
    } catch (error) {
      console.log(error.message);
      dispatch(setError(error.message));
      dispatch(setStatus(statuses.ERROR));
    }
  };
}

export function registerUser(name, email, password, avatar) {
  return async function registerUserThunk(dispatch) {
    dispatch(setStatus(statuses.LOADING));
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/register",
        { name, email, password, avatar },
        config
      );

      dispatch(setUser(data.user));
      dispatch(checkUser(true));
      dispatch(setStatus(statuses.IDLE));
    } catch (error) {
      console.log(error.message);
      dispatch(setError(error.message));
      dispatch(setStatus(statuses.ERROR));
    }
  };
}

// Load user
export function loadUser() {
  return async function loadUserThunk(dispatch) {
    dispatch(setStatus(statuses.LOADING));
    try {
      const { data } = await axios.get("/api/me");
      dispatch(setUser(data));
      dispatch(checkUser(true));
      dispatch(setStatus(statuses.IDLE));
    } catch (error) {
      console.log(error.message);
      dispatch(setError(error.message));
      dispatch(setStatus(statuses.ERROR));
    }
  };
}

//logout user
export function logoutUser() {
  return async function logoutUserThunk(dispatch) {
    dispatch(setStatus(statuses.LOADING));
    try {
      await axios.get("/api/logout");
      dispatch(setUser(null));
      localStorage.clear();
      dispatch(checkUser(false));
      dispatch(setStatus(statuses.IDLE));
    } catch (error) {
      console.log(error.message);
      dispatch(setError(error.message));
      dispatch(setStatus(statuses.ERROR));
    }
  };
}
