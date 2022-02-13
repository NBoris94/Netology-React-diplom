import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchTopSales} from "../../libs/api";

const initialState = {
  products: [],
  loading: 'idle',
  error: null,
  currentRequestId: undefined,
};

// Получение популярных товаров
export const getTopSalesRequest = createAsyncThunk(
  'topSales/getAll',
  async (args, {getState, requestId, rejectWithValue}) => {
    const { currentRequestId, loading } = getState().topSalesSlice;

    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    return await fetchTopSales(rejectWithValue);
  }
);

const topSalesSlice = createSlice({
  name: 'topSalesSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder

      .addCase(getTopSalesRequest.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })

      .addCase(getTopSalesRequest.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.products = action.payload;
          state.currentRequestId = undefined;
        }
      })

      .addCase(getTopSalesRequest.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
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

export default topSalesSlice.reducer;