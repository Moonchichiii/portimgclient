import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/apiDefaults';

export const fetchCsrfToken = createAsyncThunk('auth/fetchCsrfToken', async () => {
  const response = await axiosInstance.get('/api/users/get-csrf-token/');
  return response.data;
});

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axiosInstance.post('/api/users/login/', credentials);
  return response.data;
});

export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await axiosInstance.post('/api/users/register/', userData);
  return response.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await axiosInstance.post('/api/users/logout/');
  return null;
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const refresh = document.cookie
    .split('; ')
    .find((row) => row.startsWith('refresh_token='))
    ?.split('=')[1];

  if (!refresh) {
    throw new Error('No refresh token found');
  }

  const response = await axiosInstance.post('/api/users/refresh/', { refresh });
  return response.data;
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  const response = await axiosInstance.get('/api/users/current_user/');
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    csrfToken: null,
    initialized: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.fulfilled, (state, action) => {
        state.csrfToken = action.payload.csrfToken;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        document.cookie = `access_token=${action.payload.access_token}; httponly`;
        // Fetch the current user after login
        fetchCurrentUser();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        document.cookie = `access_token=${action.payload.access_token}; httponly`;
        // Fetch the current user after registration
        fetchCurrentUser();
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        document.cookie = `access_token=${action.payload.access}; httponly`;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.initialized = true;
      });
  },
});

export default authSlice.reducer;
