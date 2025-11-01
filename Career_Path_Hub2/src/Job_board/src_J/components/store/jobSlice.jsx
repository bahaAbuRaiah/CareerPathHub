import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSingleJob = createAsyncThunk('jobs/fetchSingleJob', async (jobId) => {
  const response = await fetch(`/api/jobs/${jobId}`); // قم بتحديث URL الطلب حسب API الخاص بك
  return response.json();
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    singleJob: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleJob.fulfilled, (state, action) => {
        state.loading = false;
        state.singleJob = action.payload;
      })
      .addCase(fetchSingleJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
