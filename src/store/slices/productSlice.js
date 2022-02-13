import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchProduct} from "../../libs/api";

const initialState = {
  product: {
    id: 0,
    category: 0,
    title: '',
    images: [],
    sku: '',
    manufacturer: '',
    color: '',
    material: '',
    reason: '',
    season: '',
    heelSize: '',
    price: 0,
    sizes: [],
  },
  loading: 'idle',
  error: null,
  currentRequestId: undefined,
}

// Получение товара по id
export const getProductByIdRequest = createAsyncThunk(
  'products/get',
  async ({ productId }, {getState, requestId, rejectWithValue}) => {
    const { currentRequestId, loading } = getState().productSlice;

    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    return await fetchProduct(productId, rejectWithValue);
  }
);

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getProductByIdRequest.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })

      .addCase(getProductByIdRequest.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.product = action.payload;
          state.currentRequestId = undefined;
        }
      })

      .addCase(getProductByIdRequest.rejected, (state, action) => {
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
  }
});

export default productSlice.reducer;