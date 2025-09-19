import { FaStar, FaBookOpen, FaClock, FaUser } from "react-icons/fa";

export default function CourseCard({ course, onCardClick }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
      onClick={() => onCardClick(course)}
    >
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-44 object-cover"
        />

     
        <div className="absolute top-3 left-3 flex items-center bg-white px-2 py-1 rounded-full text-xs font-medium shadow">
          <FaStar className="text-yellow-400 mr-1" /> {course.rating}
        </div>


        <div className="absolute top-3 right-3">
          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("common.by")} {course.author}
        </p>

        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            <FaBookOpen /> {course.lessons} {t("common.lessons")}
          </div>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            <FaClock /> {course.duration}
          </div>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            <FaUser /> {course.students}+ {t("common.enrolled")}
          </div>
        </div>

    
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-bold text-gray-800">
            ${course.price}.00{" "}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              /{t("common.lifetime")}
            </span>
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              console.log("Enroll clicked for:", course.title);
            }}
            className="bg-black dark:bg-gray-700 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            {t("common.enrollNow")}
          </button>
        </div>
      </div>


      {showAlert && <Alert message={alertMessage} type={alertType} />}
    </div>
  );
}
