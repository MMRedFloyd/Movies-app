import { createSlice } from "@reduxjs/toolkit";

const initialStateForm = {
  isVisible: false,
};

const formSlice = createSlice({
  name: "form",
  initialState: initialStateForm,
  reducers: {
    showForm(state) {
      state.isVisible = true;
    },
    hideForm(state) {
      state.isVisible = false;
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice;
