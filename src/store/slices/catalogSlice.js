import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  selectedCategoryId: 0,
  offset: 0,
  searchString: '',
  isAllProductsLoaded: false,
  loading: 'idle',
  error: null,
  currentProductsRequestId: undefined,
  currentCategoriesRequestId: undefined,
};

// Получение всех категорий
export const getCategoriesRequest = createAsyncThunk(
  'categories/getAll',
  async (args, {getState, requestId, rejectWithValue}) => {
    const { currentCategoriesRequestId, loading } = getState().catalogSlice;

    if (loading !== 'pending' || requestId !== currentCategoriesRequestId) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
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

// Получение всех товаров
export const getProductsRequest = createAsyncThunk(
  'products/getAll',
  async ({ categoryId, offset, searchString }, {getState, requestId, rejectWithValue}) => {
    const { currentProductsRequestId, loading, selectedCategoryId } = getState().catalogSlice;

    if (selectedCategoryId !== categoryId) {
      offset = 0;
    }

    if (loading !== 'pending' || requestId !== currentProductsRequestId) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/items?categoryId=${categoryId}&offset=${offset}&q=${searchString}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      return { data, categoryId, offset };
    }
    catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const catalogSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    // Установка значения поля поиска
    changeSearchStringValue(state, action) {
      state.searchString = action.payload;
    },

    // Очистка массива всех товаров
    clearProducts(state, action) {
      state.products = [];
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getCategoriesRequest.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.currentCategoriesRequestId = action.meta.requestId;
        }
      })

      .addCase(getCategoriesRequest.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentCategoriesRequestId === requestId
        ) {
          state.loading = 'idle';
          state.categories = action.payload;
          state.currentCategoriesRequestId = undefined;
        }
      })

      .addCase(getCategoriesRequest.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentCategoriesRequestId === requestId
        ) {
          state.loading = 'idle';
          state.currentCategoriesRequestId = undefined;
          if (action.payload) {
            state.error = action.payload;
          }
          else {
            state.error = action.error.message;
          }
        }
      })

      .addCase(getProductsRequest.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.currentProductsRequestId = action.meta.requestId;
        }
      })

      .addCase(getProductsRequest.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentProductsRequestId === requestId
        ) {
          state.isAllProductsLoaded = action.payload.data.length < 6;

          if (action.payload.offset === 0) {
            state.products = action.payload.data;
          }
          else {
            state.products = [...state.products, ...action.payload.data];
          }

          state.selectedCategoryId = action.payload.categoryId;
          state.offset = action.payload.offset;
          state.loading = 'idle';
          state.currentProductsRequestId = undefined;
        }
      })

      .addCase(getProductsRequest.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentProductsRequestId === requestId
        ) {
          state.loading = 'idle';
          state.currentProductsRequestId = undefined;
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

export const { changeSearchStringValue, clearProducts } = catalogSlice.actions;

export default catalogSlice.reducer;