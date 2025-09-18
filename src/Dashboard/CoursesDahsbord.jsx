import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../features/courses/coursesSlice";
import { BookOpen, Clock, DollarSign, Tag } from "lucide-react";
export const CoursesDahsbord = () => {
  const dispatch = useDispatch();
  const { course, isLoading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 text-lg mt-10">{error}</p>;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen w-full">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-indigo-700">
        📚 All Courses
      </h2>

      {course.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {course.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col"
            >
              {/* Poster / Video */}
              <div className="mb-4 relative">
                {c.poster ? (
                  <img
                    src={c.poster}
                    alt="Course Poster"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                ) : c.video ? (
                  <video
                    src={c.video}
                    controls
                    className="w-full h-40 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl">
                    No Media
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <BookOpen className="w-5 h-5 text-indigo-500 mr-2" />
                {c.name}
              </h3>

              <div className="flex items-center text-gray-600 mb-1">
                <Clock className="w-4 h-4 mr-2 text-indigo-400" />
                {c.hours} Hours
              </div>

              <div className="flex items-center text-gray-600 mb-1">
                <DollarSign className="w-4 h-4 mr-2 text-green-500" />${c.price}
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <Tag className="w-4 h-4 mr-2 text-pink-500" />
                {c.category}
              </div>

              {/* Action */}
              <button className="mt-auto bg-indigo-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
