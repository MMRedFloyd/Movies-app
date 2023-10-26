import { createSlice } from "@reduxjs/toolkit";

const initialStateStart = {
  setMessage: true,
  resultsPage: false,
};

const startSlice = createSlice({
  name: "start",
  initialState: initialStateStart,
  reducers: {
    manageStartSite(state, action) {
      state.setMessage = action.payload.message;
      state.resultsPage = action.payload.resultsPage;
    },
  },
});

export const startActions = startSlice.actions;

export default startSlice;
