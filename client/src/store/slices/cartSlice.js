import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      // Ensure payload.id is serializable (number or string)
      state.push({
        ...action.payload,
        id: action.payload.id ?? Date.now(), // fallback to timestamp
        price: Number(action.payload.price), // ensure price is number
        quantity: action.payload.quantity ?? 1,
      });
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    removeAllItems: () => {
      return [];
    },
  },
});

// Selector to calculate total price
export const getTotalPrice = (state) =>
  state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

export const { addItems, removeItem, removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;
