import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../features/courses/coursesSlice";
import { BookOpen, Check, Clock, DollarSign, Tag, X } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Api/Firebase-Config";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../Components/ThemeToggle";
import LanguageToggle from "../Components/LanguageToggle";
export const CoursesDahsbord = () => {
  const dispatch = useDispatch();
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 text-lg mt-10 dark:text-red-400">
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
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 animate-fade-in">
          📚 {t("dashboard.title")}
        </h2>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      {course.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          {t("common.noData")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {course.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-dark-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col animate-slide-in"
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
                  <div className="w-full h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl">
                    {t("common.noMedia")}
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-gray-800 dark:text-dark-text mb-2 flex items-center">
                <BookOpen className="w-5 h-5 text-indigo-500 mr-2 rtl:ml-2 rtl:mr-0" />
                {c.name}
              </h3>

              <div className="flex items-center text-gray-600 dark:text-dark-textSecondary mb-1">
                <Clock className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-indigo-400" />
                {c.hours} {t("common.hours")}
              </div>

              <div className="flex items-center text-gray-600 dark:text-dark-textSecondary mb-1">
                <DollarSign className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-green-500" />
                ${c.price}
              </div>

              <div className="flex items-center text-gray-600 dark:text-dark-textSecondary mb-4">
                <Tag className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-pink-500" />
                {c.category}
              </div>

              {/* Action */}
              <button className="mt-auto bg-indigo-600 dark:bg-indigo-700 text-white py-2 px-4 rounded-xl font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all">
                {t("common.viewDetails")}
              </button>

              <div className="mt-4 flex justify-center gap-3">
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 dark:bg-green-600 text-white text-sm rounded-lg hover:bg-green-600 dark:hover:bg-green-500 transition-colors"
                  onClick={() => {
                    handleApprove(c.id);
                  }}
                >
                  <Check className="w-4 h-4" /> {t("common.publish")}
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 dark:bg-red-600 text-white text-sm rounded-lg hover:bg-red-600 dark:hover:bg-red-500 transition-colors"
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
