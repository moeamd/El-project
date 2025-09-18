import React from "react";

function CourseDetails() {
  const course = JSON.parse(localStorage.getItem("selectedCourse"));

  if (!course) {
    return <p>No course selected.</p>;
  }

  return (
    <div className="p-6">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-60 object-cover rounded-xl mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-2">by {course.author}</p>
      <p className="text-gray-700 mb-4">{course.lessons} Lessons</p>
      <p className="text-gray-700 mb-4">Duration: {course.duration}</p>
      <p className="text-gray-700 mb-4">Students: {course.students}+</p>
      <p className="text-lg font-bold text-gray-900">
        ${course.price}.00 / lifetime
      </p>
    </div>
  );
}

export default CourseDetails; 
