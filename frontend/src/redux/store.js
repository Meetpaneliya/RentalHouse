import { configureStore } from "@reduxjs/toolkit";
import { api } from "./APi/api";
import authSlice from "./reducers/Auth";
import { listingAPI } from "./APi/listingApi";
import orderSlice from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,

    // APIs
    [listingAPI.reducerPath]: listingAPI.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, listingAPI.middleware),
});

export default store;
