// store.js
import { configureStore } from "@reduxjs/toolkit";
import { coursesReducer } from "../features/courses/coursesSlice";
import { currentUserReducer } from "../features/auth/currentUserSlice";

export const store = configureStore({
  reducer: {
    course: coursesReducer,
    currentUser: currentUserReducer,
  },
});
