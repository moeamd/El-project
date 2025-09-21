import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../features/courses/coursesSlice";
import CourseCard from "../Components/CourseCard";
import LoadingSpinner from "../Components/loading-spinner";

const InstructorCourses = ({ id }) => {
  const { course, isLoading, error } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const instructorCourses = course?.filter((c) => c.instructor === id);

  return (
    <div>
      {instructorCourses.length > 0 ? (
        instructorCourses.map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            
          />
        ))
      ) : (
        <p>No courses found for this instructor.</p>
      )}
    </div>
  );
};

export default InstructorCourses;
