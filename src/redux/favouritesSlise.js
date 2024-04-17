import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const favouritesSlice = createSlice({
  name: 'filter',
  initialState: {
    favourites: [],
    filter: [],
  },
  reducers: {
    addFavourites(state, { payload }) {
      state.favourites = [...state.favourites, payload];
    },
    deleteFavourites(state, { payload }) {
      state.favourites = state.favourites.filter(el => el !== payload);
    },
    addFilter(state, { payload }) {
      state.filter = payload;
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
