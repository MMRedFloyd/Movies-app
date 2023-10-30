import { createSlice } from "@reduxjs/toolkit";

const initialStateStart = {
  setMessage: false,
  resultsPage: false,
  loaderPages: false,
};

const startSlice = createSlice({
  name: "start",
  initialState: initialStateStart,
  reducers: {
    manageStartSite(state, action) {
      state.setMessage = action.payload.message;
      state.resultsPage = action.payload.resultsPage;
    },
    setLoaderPages(state, action) {
      state.loaderPages = action.payload;
    },
  },
});

export const startActions = startSlice.actions;

export default startSlice;
