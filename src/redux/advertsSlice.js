import { createSlice } from '@reduxjs/toolkit';
import { fetchAdverts, fetchTotalAdverts } from './operations';

const advertsSlice = createSlice({
  name: 'adverts',
  initialState: {
    totalAdvertsCount: 13,
    totalAdverts: [],
    items: [],
    isLoading: false,
    error: null,
    loadMore: true,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAdverts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTotalAdverts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.items = action.payload;
        } else {
          state.items = [...state.items, ...action.payload];
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchTotalAdverts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.totalAdverts = payload;
        state.totalAdvertsCount = payload.length;
        state.error = null;
      })
      .addCase(fetchAdverts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.items = [];
        state.error = payload;
      })
      .addCase(fetchTotalAdverts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const advertsReducer = advertsSlice.reducer;
