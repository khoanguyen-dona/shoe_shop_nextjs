import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    userWishlist: null
 
  },
  reducers: {
    setWishlist: (state, action) => {
      state.userWishlist = action.payload
    },
  },
});

export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
