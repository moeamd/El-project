import bannerImg from "../assets/images/image.png";
import { useTranslation } from "react-i18next";

function Banner() {
  const { t, i18n } = useTranslation();

  return (
    <section
      className={`bg-[#F4D876] dark:bg-[#F4D876]/90 px-6 md:px-12 py-16 relative flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start pt-[200px] transition-colors duration-300 ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <div className="max-w-lg text-center md:text-left mb-10 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-900">
          {t("common.learnSomething")}
        </h1>
        <p className="text-base md:text-lg mb-6 text-gray-700 dark:text-gray-800">
          {t("common.becomeProfessionals")}
        </p>
        <div className="flex flex-col gap-4 sm:flex-col md:flex-row sm:gap-4 md:gap-6 justify-center md:justify-start">
          <button className="bg-[#3DCBB1] dark:bg-[#3DCBB1] text-white px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-medium text-lg hover:bg-[#33b09d] dark:hover:bg-[#33b09d] transition-colors">
            {t("common.browseCourse")}
          </button>
          <button className="bg-white dark:bg-white text-[#3DCBB1] dark:text-[#3DCBB1] border border-[#3DCBB1] dark:border-[#3DCBB1] px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-medium text-lg hover:bg-[#3DCBB1] dark:hover:bg-[#3DCBB1] hover:text-white dark:hover:text-white transition-colors">
            {t("common.startMakeAccount")}
          </button>
        </div>
      </div>

      <div
        className={`absolute bottom-0 hidden md:block ${
          i18n.language === "ar" ? "left-0" : "right-0"
        }`}
      >
        <img
          src={bannerImg}
          alt="Banner"
          className="w-[400px] object-contain"
        />
      </div>
    </section>
  );
}

export default Banner;
