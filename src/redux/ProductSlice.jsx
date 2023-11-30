
import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cart: [],
    cartTotal: 0,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
      return state
    },


    addToCart: (state, action) => {
      const productId = action.payload;
      const item = state.products.find((product) => product.id === productId);
      const existingItemIndex = state.cart.findIndex((cartItem) => cartItem.id === productId);

      if (item) {
        if (existingItemIndex !== -1) {
          // If the item already exists in the cart, update the quantity
          state.cart[existingItemIndex].quantity += 1;
        } else {
          // If the item is not in the cart, add it with quantity 1
          state.cart.push({ ...item, quantity: 1 });
        }

        // Update cartTotal here based on offer
        if (item.offer) {
          state.cartTotal = state.cart.reduce(
            (acc, item) => acc + parseInt(item.h) * parseInt(item.quantity),
            0
          );
        } else {
          state.cartTotal = state.cart.reduce(
            (acc, item) => acc + parseInt(item.g) * parseInt(item.quantity),
            0
          );
        }
      }
    },


    removeFromCart: (state, action) => {
      const productId = action.payload;
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      state.cart = updatedCart;

      // Update cartTotal here
      state.cartTotal = state.cart.reduce(
        (acc, item) => acc + parseInt(item.h) * parseInt(item.quantity),
        0
      );
    },

    addQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cart.find((cartItem) => cartItem.id === id);

      if (item) {
        item.quantity = qty;
      }


      state.cartTotal = state.cart.reduce(
        (acc, item) => acc + parseInt(item.h) * parseInt(item.quantity),
        0
      );
    },




    addTotal: (state, action) => {
      state.cartTotal = state.cart.reduce(
        (acc, item) => acc + parseInt(item.h) * parseInt(item.quantity),
        0
      );
      return state
    }

  }
})




export const { setProducts, addToCart, addQty, addTotal, removeFromCart } = productSlice.actions;