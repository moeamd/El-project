import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Api/Firebase-Config";
import {updateDoc, doc} from "firebase/firestore";
const initialState = {
  instructors: [],
  isLoading: false,
  error: null,
};

export const getInstructors = createAsyncThunk("instructors/getInstructors", async () => {
  const querySnapShot = await getDocs(collection(db, "Instructors"));
  let AllInstructors = [];

  querySnapShot.forEach((instructor) => {
    const data = instructor.data()
    AllInstructors.push({ id: instructor.id, ...data , creatAt: data.creatAt?.toDate().toISOString() || null });
  });

  return AllInstructors;
});


const instructorsSlice = createSlice({
  name: "instructord",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getInstructors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInstructors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.instructors  = action.payload;
      })
      .addCase(getInstructors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const instructorsReducer = instructorsSlice.reducer;
