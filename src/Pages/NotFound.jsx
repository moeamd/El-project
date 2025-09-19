import React from "react";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-white dark:bg-surface-dark transition-colors duration-300 ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t("common.notFound")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t("common.pageNotFound")}
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-[#3DCBB1] hover:bg-[#33b09d] text-white px-6 py-3 rounded-lg transition-colors"
        >
          {t("common.goBack") || "Go Back"}
        </button>
      </div>
    </div>
  );
}

export default NotFound;
