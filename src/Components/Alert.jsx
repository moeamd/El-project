import { useState } from "react";
import { useTranslation } from "react-i18next";

function Alert({ message, type = "info" }) {
  const [isVisible, setIsVisible] = useState(true);
  const { i18n } = useTranslation();

  const baseStyles =
    "container fixed top-5 left-1/2 -translate-x-1/2 max-w-xl px-4 py-3 rounded shadow-lg flex items-start justify-between space-x-4 transition-colors duration-300";
  const typeStyles = {
    success:
      "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700",
    error:
      "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700",
    warning:
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700",
    info: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700",
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${baseStyles} ${typeStyles[type] || typeStyles.info} ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
      role="alert"
    >
      <p className="flex-1">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="text-xl font-bold leading-none text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none transition-colors"
      >
        &times;
      </button>
    </div>
  );
}

export default Alert;
