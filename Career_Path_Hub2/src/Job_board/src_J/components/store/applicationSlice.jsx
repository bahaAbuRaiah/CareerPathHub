import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postApplication = createAsyncThunk('applications/postApplication', async ({ formData, jobId }) => {
  const response = await fetch(`/api/jobs/${jobId}/applications`, {
    method: 'POST',
    body: formData,
  }); // قم بتحديث URL الطلب حسب API الخاص بك
  return response.json();
});

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearAllApplicationErrors: (state) => {
      state.error = null;
    },
    resetApplicationSlice: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Application submitted successfully';
      })
      .addCase(postApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearAllApplicationErrors, resetApplicationSlice } = applicationSlice.actions;

export default applicationSlice.reducer;
