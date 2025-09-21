import React from "react";
import joinBg from "../assets/images/pattern.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

function JoinComponent() {
  const { t, i18n } = useTranslation();

  return (
    <section className="flex justify-center w-full px-6 py-12 transition-colors duration-500">
      <div
        className={`w-full max-w-6xl 
          bg-gray-900 
          rounded-2xl shadow-lg 
          flex flex-col md:flex-row items-center justify-between 
          p-8 gap-6 transition-colors duration-500 
          ${i18n.language === "ar" ? "rtl" : "ltr"}`}
        style={{
          backgroundImage: `url(${joinBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition:
            i18n.language === "ar" ? "left bottom" : "right bottom",
        }}
      >
        {/* النصوص */}
        <div className="flex-1 mb-4 text-center md:text-left md:mb-0">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 transition-colors md:text-3xl dark:text-white">
            {t("common.joinAndGetDiscount")}
          </h2>
          <p className="text-gray-600 transition-colors dark:text-gray-300">
            {t("common.responsiveThemes")}
          </p>
        </div>

        {/* الفورم */}
        <div className="flex flex-col items-center justify-center flex-1 w-full gap-4 sm:flex-row md:justify-end md:w-auto rtl:space-x-reverse">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder={t("common.emailAddress")}
              className="w-full px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 transition-colors bg-white border border-gray-300 rounded-full dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            <MagnifyingGlassIcon
              className={`h-6 w-6 text-gray-500 dark:text-gray-300 absolute top-1/2 transform -translate-y-1/2 ${
                i18n.language === "ar" ? "left-3" : "right-3"
              }`}
            />
          </div>
          <button className="px-6 py-3 text-white transition-colors rounded-full bg-primary hover:bg-primary-dark">
            {t("common.subscribe")}
          </button>
        </div>
      </div>
    </section>
  );
}

export default JoinComponent;
