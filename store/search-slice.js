import { createSlice } from "@reduxjs/toolkit";

const initialStateSearch = {
  searchTitle: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialStateSearch,
  reducers: {
    setSearchTitle(state, action) {
      state.searchTitle = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
