import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://661d607b98427bbbef01a6d6.mockapi.io';

export const fetchAdverts = createAsyncThunk(
  'adverts/fetchFiltered',
  async ({ page, location, type, transmission, limit }, thunkAPI) => {
    const params = {
      page,
      limit,
      location,
      form: type,
      transmission,
    };
    try {
      const { data } = await axios.get('/adverts', {
        params,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
