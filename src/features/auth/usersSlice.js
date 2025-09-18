import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db,collection,getDocs } from "../../Api/Firebase-Config";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const querySnapShot = await getDocs(collection(db, "users"));
  let AllUsers = [];

  querySnapShot.forEach((user) => {
    const data = user.data();

    if (data.createdAt && typeof data.createdAt.toDate === "function") {
      data.createdAt = data.createdAt.toDate().toISOString();
    }
    AllUsers.push(data);
  });

  return AllUsers;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUsers = (state) => state.users;
