import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    roominfor: (state, action) => {
      state.orders.push(action.payload);
      console.log(state);
    },
  },
});

export const { roominfor } = orderSlice.actions;

export default orderSlice;
