import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function CourseCard({ course, onCardClick }) {
  const { t, i18n } = useTranslation();

  const createdAt =
    course.createdAt?.toDate?.().toLocaleDateString() || course.createdAt;

  return (
    <div
      className={`w-[420px] bg-white dark:bg-gray-800 rounded-2xl 
        shadow-[0_4px_10px_rgba(0,0,0,0.1)] 
        dark:shadow-[0_4px_12px_rgba(0,0,0,0.6)] 
        hover:shadow-[0_6px_14px_rgba(0,0,0,0.15)] 
        dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)] 
        transform hover:-translate-y-1 hover:scale-105 
        transition-all duration-300 ease-out cursor-pointer 
        ${i18n.language === "ar" ? "rtl" : "ltr"}`}
      onClick={() => onCardClick(course)}
    >
      {/* Poster */}
      <div className="relative">
        <img
          src={course.poster}
          alt={course.name}
          className="w-full h-44 object-cover"
        />

        {/* Rating */}
        {course.rating && (
          <div className="absolute top-3 left-3 flex items-center bg-white px-2 py-1 rounded-full text-xs font-medium shadow">
            <FaStar className="text-yellow-400 mr-1" /> {course.rating}
          </div>
        )}

        {/* Category */}
        <div
          className={`absolute top-3 ${
            i18n.language === "ar" ? "right-3" : "left-3"
          }`}
        >
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded-full">
            {course.category || course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {course.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {course.description}
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t("common.by")} {course.instructor || t("common.unknown")}
        </p>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          {t("common.createdAt")}: {createdAt}
        </p>

        {/* Footer */}
        <div
          className={`flex justify-between items-center mt-3 ${
            i18n.language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ${course.price}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
              /{t("common.lifetime")}
            </span>
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Enroll clicked for:", course.name);
            }}
            className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-dark transition-colors"
          >
            {t("common.enrollNow")}
          </button>
        </div>
      </div>
    </div>
  );
}
