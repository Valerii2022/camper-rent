import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://661d607b98427bbbef01a6d6.mockapi.io';

export const fetchAdverts = createAsyncThunk(
  'adverts/fetchFiltered',
  async ({ page }, thunkAPI) => {
    try {
      const { data } = await axios.get('/adverts', {
        params: {
          page,
          limit: 4,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchTotalAdverts = createAsyncThunk(
  'adverts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/adverts');
      return data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);
