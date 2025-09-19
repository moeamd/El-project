import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../Components/CourseCard";
import CardImage from "../assets/Images/CardImage.png";
import { useTranslation } from "react-i18next";

function Courses() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [courses] = useState([
    {
      id: 1,
      title: "Learn Figma from Basic",
      author: "purepearl studio",
      lessons: 17,
      duration: "2h 16m",
      students: 850,
      price: 50,
      rating: 4.5,
      level: "Beginner",
      image: CardImage,
    },
    {
      id: 2,
      title: "Master React in Depth",
      author: "Code Studio",
      lessons: 25,
      duration: "5h 40m",
      students: 1200,
      price: 75,
      rating: 4.8,
      level: "Intermediate",
      image: CardImage,
    },
  ]);

  const handleCourseClick = (course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    navigate("/CourseDetails");
  };

  return (
    <div
      className={`p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300 ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        {t("dashboard.courses")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
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
