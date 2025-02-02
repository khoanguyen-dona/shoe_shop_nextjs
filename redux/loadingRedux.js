import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    status: false
 
  },
  reducers: {
    setLoading: (state, action) => {
      state.status = action.payload
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
