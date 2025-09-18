import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./auth";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    try {
      const user = await getCurrentUser();

      if (!user) return null;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        phoneNamber: user.phoneNamber ||'',
        emailVerified: !!user.emailVerified,
      };
    } catch (error) {
      throw error
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    clearAuthState(state) {
      state.currentUser = null; 
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
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.currentUser = null;
      });
  },
});

export const { clearAuthState } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
export const selectCurrentUser = (state) => state.currentUser;
