import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items/${productId}`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    }
    catch (e) {
      return rejectWithValue(e.message);
    }
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