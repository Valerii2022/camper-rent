import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const favouritesSlice = createSlice({
  name: 'filter',
  initialState: {
    favourites: [],
    filter: { filter: false, rentalPrice: '1000', min: '0', max: '10000' },
  },
  reducers: {
    addFavourites(state, { payload }) {
      // state.favourites.push(payload);
    },
    deleteFavourites(state, { payload }) {
      // state.favourites = state.favourites.filter(id => id !== payload);
    },
    addFilter(state, { payload }) {
      // state.filter.rentalPrice = payload.rentalPrice;
      // state.filter.min = payload.min;
      // state.filter.max = payload.max;
    },
  },
});

const persistConfig = {
  key: 'filter',
  storage,
};

export const favouritesReducer = persistReducer(
  persistConfig,
  favouritesSlice.reducer
);

export const { addFavourites, deleteFavourites, addFilter } =
  favouritesSlice.actions;
