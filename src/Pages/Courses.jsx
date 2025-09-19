import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../Components/CourseCard";
import CardImage from "../assets/Images/CardImage.png";
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

  useEffect(()=> {
      dispatch(getCourses())
      
  },[])
  if (isLoading) {return <p className="text-center text-gray-500">Loading...</p>}
  return (
    <div
      className={`py-12 px-6 
        bg-gray-50 dark:bg-gray-900 
        transition-colors duration-500 
        ${i18n.language === "ar" ? "rtl" : "ltr"}`}
    >
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 transition-colors md:text-3xl dark:text-gray-100">
        {t("dashboard.courses")}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {course.map((course) => (
          course.status == "Publish" &&
          <CourseCard
            key={course.id}
            course={course}
            onCardClick={handleCourseClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Courses;
