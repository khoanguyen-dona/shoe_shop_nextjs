import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userCart: null
  },
  reducers: {
    setCart: (state, action) => {
      state.userCart=action.payload
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
