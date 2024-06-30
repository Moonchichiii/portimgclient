import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/apiDefaults';

export const fetchPosts = createAsyncThunk('blog/fetchPosts', async () => {
  const response = await axiosInstance.get('/api/posts/');
  return response.data;
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
