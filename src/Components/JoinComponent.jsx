import React from "react";
import joinBg from "../assets/images/pattern.png";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

function JoinComponent() {
  const { t, i18n } = useTranslation();

  return (
    <section className="w-full flex justify-center py-12 px-6">
      <div
        className={`w-full max-w-6xl bg-[#2273D1] dark:bg-blue-800 rounded-2xl shadow-md flex flex-col md:flex-row items-center md:items-center justify-between p-8 transition-colors duration-300 ${
          i18n.language === "ar" ? "rtl" : "ltr"
        }`}
        style={{
          backgroundImage: `url(${joinBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition:
            i18n.language === "ar" ? "left bottom" : "right bottom",
        }}
      >
        <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-[#FFFFFF] mb-4">
            {t("common.joinAndGetDiscount")}
          </h2>
          <p className="text-[#FFFFFF]">{t("common.responsiveThemes")}</p>
        </div>

        <div className="flex-1 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto rtl:space-x-reverse">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder={t("common.emailAddress")}
              className="w-full rounded-full px-4 py-3 pr-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors"
            />
            <MagnifyingGlassIcon
              className={`h-6 w-6 text-white absolute top-1/2 transform -translate-y-1/2 ${
                i18n.language === "ar" ? "left-3" : "right-3"
              }`}
            />
          </div>
          <button className="bg-[#3DCBB1] text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
            {t("common.subscribe")}
          </button>
        </div>
      </div>
    </section>
  );
}

export default JoinComponent;
