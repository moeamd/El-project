// store.js
import { configureStore } from "@reduxjs/toolkit";
import { coursesReducer } from "../features/courses/coursesSlice";
import { currentUserReducer } from "../features/auth/currentUserSlice";
import { instructorsReducer } from "../features/users/getinstructors-aprove";
import { usersReducer } from "../features/auth/usersSlice";

export const store = configureStore({
  reducer: {
    course: coursesReducer,
    currentUser: currentUserReducer,
    instructors:instructorsReducer,
    users:usersReducer,
  },
});
