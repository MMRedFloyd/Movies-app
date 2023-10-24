import { createSlice } from "@reduxjs/toolkit";

const initialStateAuth = {
  isLoggedIn: false,
  loading: true,
  currentAcc: "",
  userUid: "",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {},
});

const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        laoding: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        laoding: false,
        error: null,
      };

    case "FAILURE":
      return {
        ...state,
        isLoggedIn: false,
        laoding: false,
        error: action.payload,
      };

    case "END":
      return {
        ...state,
        laoding: false,
      };

    default:
      return state;
  }
};

export const authActions = authSlice.actions;

export default authSlice;
