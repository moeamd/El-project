import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../Components/CourseCard";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../features/courses/coursesSlice";

function Courses() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { course, isLoading, error } = useSelector((state) => state.course);

  const handleCourseClick = (course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    navigate("/CourseDetails");
  };

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  if (isLoading)
    return (
      <p className="mt-10 text-center text-gray-600 dark:text-gray-300">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="mt-10 text-center text-red-600 dark:text-red-400">
        {t("error.loadingCourses")}
      </p>
    );

  return (
    <div
      className={`min-h-screen py-12 px-6
        bg-[#f2f8fc] dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        transition-colors duration-500 
        ${i18n.language === "ar" ? "rtl" : "ltr"}`}
    >
      <h2 className="mb-8 text-2xl font-bold text-center md:text-3xl">
        {t("dashboard.courses")}
      </h2>

      <div className="flex flex-wrap justify-center gap-[60px] align-items-center sm:flex pt-[70px] pb-[70px]">
        {course
          .filter((c) => c.status === "Publish")
          .map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              onCardClick={handleCourseClick}
            />
          ))}
      </div>
    </div>
  );
}

export default Courses;
