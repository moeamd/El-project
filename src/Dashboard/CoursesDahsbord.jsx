import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../features/courses/coursesSlice";

export const CoursesDahsbord = () => {
  const dispatch = useDispatch();
  const { course, isLoading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        All Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {c.name}
            </h3>
            <p className="text-gray-600 mb-1">Hours: {c.hours}</p>
            <p className="text-gray-600 mb-1">Price: ${c.price}</p>
            <p className="text-gray-600 mb-3">Category: {c.category}</p>

            {c.video && (
              <video
                src={c.video}
                controls
                className="w-full rounded-lg mt-3"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
