import React from "react";
import { useTranslation } from "react-i18next";

function CourseDetails() {
  const { t, i18n } = useTranslation();
  const course = JSON.parse(localStorage.getItem("selectedCourse"));

  if (!course) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 ${
          i18n.language === "ar" ? "rtl" : "ltr"
        }`}
      >
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {t("common.noCourseSelected")}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300 ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-60 object-cover rounded-xl mb-4"
      />
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        {course.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        {t("common.by")} {course.author}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {course.lessons} {t("common.lessons")}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {t("common.duration")}: {course.duration}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {t("common.students")}: {course.students}+
      </p>
      <p className="text-lg font-bold text-gray-900 dark:text-white">
        ${course.price}.00 / {t("common.lifetime")}
      </p>
    </div>
  );
}

export default CourseDetails;
