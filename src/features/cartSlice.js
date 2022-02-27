import { createSlice } from "@reduxjs/toolkit";
// localStorage.setItem(
//   "cart",
//   JSON.stringify({
//     id: 1,
//     title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     price: 109.95,
//     description:
//       "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     rating: {
//       rate: 3.9,
//       count: 120,
//     },
//   })
// );
const data = JSON.parse(localStorage.getItem("cart"));
const initialState = data ? data : [];
export const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      let newItem = action.payload;
      if (state.value.length > 0) {
        const duplicate = state.value.filter(
          (e) => e.product.id === newItem.product.id
        );
        if (duplicate.length > 0) {
          state.value = state.value.filter(
            (e) => e.product.id !== newItem.product.id
          );
          newItem = {
            product: newItem.product,
            quantity: newItem.quantity + duplicate[0].quantity,
          };
          state.value = [...state.value, newItem];
        } else {
          state.value = [
            ...state.value,
            {
              ...action.payload,
            },
          ];
        }
      } else {
        state.value = [action.payload];
      }
      localStorage.setItem(
        "cart",
        JSON.stringify(state.value.sort((a, b) => a.product.id - b.product.id))
      );
    },
    deleteProduct: (state, action) => {
      state.value = state.value.filter(
        (e) => e.product.id !== action.payload.id
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(state.value.sort((a, b) => a.product.id - b.product.id))
      );
    },
    changeQuantity: (state, action) => {
      console.log(action.payload);
      const newItem = action.payload;
      const item = state.value.filter(
        (e) => e.product.id === newItem.product.id
      );
      if (item.length > 0) {
        state.value = state.value.filter(
          (e) => e.product.id !== newItem.product.id
        );
      }
      state.value = [...state.value, newItem];

      localStorage.setItem(
        "cart",
        JSON.stringify(state.value.sort((a, b) => a.product.id - b.product.id))
      );
    },
  },
});
export const { addProduct, deleteProduct, changeQuantity } = slice.actions;
export const cart = (state) => state.cart.value;
export default slice.reducer;
