import { configureStore } from "@reduxjs/toolkit";
import { api } from "./APi/api";
import authSlice from "./reducers/Auth";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware], //remove this if you are not using RTK Query
});

export default store;
