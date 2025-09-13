// MainDashboard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../features/courses/coursesSlice";

export const MainDashboard = () => {
  const dispatch = useDispatch();
  const { course, isLoading, error } = useSelector((state) => state.course);
  console.log(course);
  
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>All Courses</h2>
      <ul>
        {course.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
};
