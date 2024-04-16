import { createSlice } from '@reduxjs/toolkit';
import { fetchAdverts } from './operations';

const advertsSlice = createSlice({
  name: 'adverts',
  initialState: { items: [], isLoading: false, error: null, loadMore: true },
  extraReducers: builder => {
    builder
      .addCase(fetchAdverts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchAdverts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
        //   state.error = null;
        //   if (
        //     action.meta.arg.pageNumber === 1 ||
        //     action.meta.arg === undefined ||
        //     action.meta.arg.brand ||
        //     action.meta.arg.brand === ''
        //   ) {
        //     state.items = action.payload;
        //     state.loadMore = true;
        //   } else {
        //     state.items.push(...action.payload);
        //   }
        //   if (action.payload.length < 8 || action.payload.length > 8) {
        //     state.loadMore = false;
        //   }
      })
      .addCase(fetchAdverts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const advertsReducer = advertsSlice.reducer;
