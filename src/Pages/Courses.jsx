import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../Components/CourseCard";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../features/courses/coursesSlice";
import Pagination from "../Components/pagination";

function Courses() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { course, isLoading, error } = useSelector((state) => state.course);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const publishedCourses = course.filter((c) => c.status === "Publish");
  const totalPages = Math.ceil(publishedCourses.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = publishedCourses.slice(startIndex, endIndex);

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

      <div className="flex flex-wrap justify-center gap-[60px] sm:flex pt-[70px] pb-[70px]">
        {currentCourses.map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            onCardClick={handleCourseClick}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Courses;
