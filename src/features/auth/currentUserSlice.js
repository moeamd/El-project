import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./auth";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      if (!user) return null;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        emailVerified: !!user.emailVerified,
      };
    } catch (error) {
      return rejectWithValue(error?.message || "AUTH_ERROR");
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    clearAuthState(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearAuthState } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
export const selectCurrentUser = (state) => state.currentUser;
