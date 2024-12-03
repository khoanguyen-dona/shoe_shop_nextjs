import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
 
  },
  reducers: {
    setLogin: (state, action) => {
        state.currentUser = action.payload
    },
    setLogout: (state, action) => {
        state.currentUser = action.payload
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
