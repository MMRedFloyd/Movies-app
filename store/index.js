import { configureStore } from "@reduxjs/toolkit";

import searchSlice from "./search-slice";
import formSlice from "./form-slice";
import authSlice from "./auth-slice";
import savedSlice from "./saved-slice";

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    search: searchSlice.reducer,
    auth: authSlice.reducer,
    saved: savedSlice.reducer,
  },
});

export default store;
