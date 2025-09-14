import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Api/Firebase-Config";

const initialState = {
  course: [],
  isLoading: false,
  error: null,
};

export const getCourses = createAsyncThunk("courses/getCourses", async () => {
  const querySnapShot = await getDocs(collection(db, "courses"));
  let AllCourses = [];

  querySnapShot.forEach((course) => {
    const data = course.data()
    AllCourses.push({ id: course.id, ...data , creatAt: data.creatAt?.toDate().toISOString() || null });
  });

  return AllCourses;
});

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.course = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const coursesReducer = coursesSlice.reducer;
