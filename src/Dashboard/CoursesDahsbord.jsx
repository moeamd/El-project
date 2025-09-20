import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../features/courses/coursesSlice";
import { BookOpen, Check, Clock, DollarSign, Tag, X } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Api/Firebase-Config";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../Components/ThemeToggle";
import LanguageToggle from "../Components/LanguageToggle";
import { Navigate, useNavigate } from "react-router-dom";
export const CoursesDahsbord = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const { course, isLoading, error } = useSelector((state) => state.course);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
  const handleApprove = async (id) => {
    try {
      const ref = doc(db, "courses", id);
      await updateDoc(ref, { status: "Publish" });
      dispatch(getCourses());
    } catch (err) {
      console.error("Error approving:", err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const ref = doc(db, "courses", id);
      await updateDoc(ref, { status: "Draft" });
      dispatch(getCourses());
    } catch (err) {
      console.error("Error rejecting:", err.message);
    }
  };

  const handleCourseClick = (course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    Navigate("/CourseDetails");
  };
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen transition-colors duration-300 bg-white dark:bg-surface-dark">
        <div className="w-12 h-12 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <p className="mt-10 text-lg text-center text-red-500 dark:text-red-400">
        {error}
      </p>
    );

  return (
    <div
      className={`p-8 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-dark-bg dark:to-dark-surface min-h-screen w-full transition-all duration-300 ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      {/* Header with toggle controls */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 animate-fade-in">
          📚 {t("dashboard.title")}
        </h2>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      {course.length === 0 ? (
        <p className="text-lg text-center text-gray-500 dark:text-gray-400">
          {t("common.noData")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {course.map((c) => (
            <div
              key={c.id}
              className="flex flex-col p-6 transition-all duration-300 bg-white shadow-lg dark:bg-card rounded-2xl hover:shadow-2xl animate-slide-in"
            >
              {/* Poster / Video */}
              <div className="relative mb-4">
                {c.poster ? (
                  <img
                    src={c.poster}
                    alt="Course Poster"
                    className="object-cover w-full h-40 rounded-xl"
                  />
                ) : c.video ? (
                  <video
                    src={c.video}
                    controls
                    className="object-cover w-full h-40 rounded-xl"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-40 text-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-gray-500 rounded-xl">
                    {t("common.noMedia")}
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="flex items-center mb-2 text-xl font-bold text-gray-800 dark:text-dark-text">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-500 rtl:ml-2 rtl:mr-0" />
                {c.name}
              </h3>

              <div className="flex items-center mb-1 text-gray-600 dark:text-dark-textSecondary">
                <Clock className="w-4 h-4 mr-2 text-indigo-400 rtl:ml-2 rtl:mr-0" />
                {c.hours} {t("common.hours")}
              </div>

              <div className="flex items-center mb-1 text-gray-600 dark:text-dark-textSecondary">
                <DollarSign className="w-4 h-4 mr-2 text-green-500 rtl:ml-2 rtl:mr-0" />
                ${c.price}
              </div>

              <div className="flex items-center mb-4 text-gray-600 dark:text-dark-textSecondary">
                <Tag className="w-4 h-4 mr-2 text-pink-500 rtl:ml-2 rtl:mr-0" />
                {c.category}
              </div>

              <div
                className={`text-lg mb-4 ${
                  c.status === "Publish"
                    ? "text-green-500"
                    : c.status === "Draft"
                    ? "text-red-500"
                    : "text-gray-600"
                } dark:text-dark-textSecondary`}
              >
                {c.status || t("common.unknown")}
              </div>

              {/* Action */}
              <button onClick={()=> {handleCourseClick(c)}} className="px-4 py-2 mt-auto font-semibold text-white transition-all bg-indigo-600 dark:bg-indigo-700 rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600">
                {t("common.viewDetails")}
              </button>

              <div className="flex justify-center gap-3 mt-4">
                <button
                  className="flex items-center gap-1 px-3 py-1 text-sm text-white transition-colors bg-green-500 rounded-lg dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500"
                  onClick={() => {
                    handleApprove(c.id);
                  }}
                >
                  <Check className="w-4 h-4" /> {t("common.publish")}
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 text-sm text-white transition-colors bg-red-500 rounded-lg dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-500"
                  onClick={() => {
                    handleReject(c.id);
                  }}
                >
                  <X className="w-4 h-4" /> {t("common.unpublish")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
