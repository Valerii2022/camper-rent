import { createSlice } from '@reduxjs/toolkit';
import { fetchAdverts, fetchTotalAdverts } from './operations';

const advertsSlice = createSlice({
  name: 'adverts',
  initialState: {
    totalAdverts: 0,
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
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTotalAdverts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalAdverts = action.payload.length;
        state.error = null;
      })
      .addCase(fetchAdverts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchTotalAdverts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const advertsReducer = advertsSlice.reducer;
