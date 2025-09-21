import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const LanguageToggle = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  const isArabic = language === "ar";

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={t("language.toggleLanguage")}
    >
      <Globe className="h-4 w-4 text-[#149981]" />
      
      <span className="font-medium text-[#149981]">
        {isArabic ? t("language.english") : t("language.arabic")}
      </span>

    </button>
  );
};

export default LanguageToggle;
