// store.js
import { configureStore } from "@reduxjs/toolkit";
import { coursesReducer } from "../features/courses/coursesSlice";
import { instructorsReducer } from "../features/users/getinstructors-aprove";

export const store = configureStore({
  reducer: {
    course: coursesReducer,
    instructors:instructorsReducer,
  },
});
