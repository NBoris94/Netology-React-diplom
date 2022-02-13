import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import {load} from "../../libs/localStorage";
import {fetchOrder} from "../../libs/api";

const initialState = {
  items: load("cart") || [],
  success: false,
  loading: 'idle',
  error: null,
  currentRequestId: undefined,
}

// Создание заказа
export const createOrderRequest = createAsyncThunk(
  'order/create',
  async (order, { getState, requestId, rejectWithValue }) => {
    const { currentRequestId, loading } = getState().cartSlice;

    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    return await fetchOrder(order, rejectWithValue);
  }
);

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    // Установка данных клиента в cookie
    setCustomerInfo(state, action) {
      const { name, value } = action.payload;
      document.cookie = `${name}=${value};samesite=strict;`;
    },

    // Добавдление товара в корзину или добавление количества к существующему, но количество не должно привышать 10
    addItemToCart(state, action) {
      const idx = state.items.findIndex((i) => i.productId === action.payload.productId && i.selectedSize === action.payload.selectedSize);

      if (idx !== -1) {
        const item = state.items[idx];
        const itemCount = item.count + action.payload.count > 10 ? 10 : item.count + action.payload.count;

        state.items[idx] = { id: item.id, ...action.payload, count: itemCount };
      } else {
        state.items.push({ id: uuidv4(), ...action.payload });
      }
    },

    // Удаление товара из корзины
    removeItemFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Установка флага успеха
    setOnSuccess(state, action) {
      state.success = action.payload;
    },

    // Очистка всей корзины
    clearCartItems(state, action) {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(createOrderRequest.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.error = null;
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })

      .addCase(createOrderRequest.fulfilled, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.error = null;
          state.currentRequestId = undefined;
        }
      })

      .addCase(createOrderRequest.rejected, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = undefined;

          if (action.payload) {
            state.error = action.payload;
          }
          else {
            state.error = action.error.message;
          }
        }
      })
  },
});

export const {
  getCartItemsFromLocalStorage,
  setCartItemsToLocalStorage,
  setCustomerInfo,
  addItemToCart,
  removeItemFromCart,
  clearCartItems,
  setOnSuccess
} = cartSlice.actions;

export default cartSlice.reducer;