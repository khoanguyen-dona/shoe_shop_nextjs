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
    addCartItem: (state, action) => {
      
      var existedItem = state.userCart.products.find(item => item.productId.toString()===action.payload.productId && 
      item.size?.toString() === action.payload?.size && item.color?.toString()===action.payload.color)
      if( existedItem){
        existedItem.quantity =  existedItem.quantity + 1
      } else {   
        state.userCart.products.push(action.payload)
      }
    },
    decreaseCartItem: (state, action) => {
      var existedItem = state.userCart.products.find(item => item.productId.toString()===action.payload.productId && 
      item.size.toString() === action.payload.size && item.color.toString()===action.payload.color)  
      
      if( existedItem){
          existedItem.quantity =  existedItem.quantity - 1
          if(existedItem.quantity === 0){
            state.userCart.products = state.userCart.products.filter((product) => product !== existedItem)          
          } else {
          }
      }
    },
    deleteCartItem: (state, action) => {
      
      var existedItem = state.userCart.products.find(item => item.productId.toString()===action.payload.productId && 
      item.size.toString() === action.payload.size && item.color.toString()===action.payload.color)  
      if(existedItem) {
        
        state.userCart.products = state.userCart.products.filter((product) => product !== existedItem )
      }
    }
  },
});

export const { setCart, addCartItem, decreaseCartItem, deleteCartItem } = cartSlice.actions;
export default cartSlice.reducer;
