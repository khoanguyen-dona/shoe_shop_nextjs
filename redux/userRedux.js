import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { persistor } from "./store";
// const wishlist = useSelector((state)=>state.wishlist.userWishlist)
// const cart = useSelector((state)=>state.cart.userCart)

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
 
  },
  reducers: {
    setLogin: (state, action) => {
        state.currentUser = action.payload
    },
    // setLogout: (state) => {
    //     state =  undefined
    // },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
