import bannerImg from "../assets/images/image.png";
import { useTranslation } from "react-i18next";

function Banner() {
  const { t, i18n } = useTranslation();

  return (
    <section
      className={`h-[50vh] relative flex flex-col md:flex-row items-center md:items-center justify-between px-6 md:px-16 py-20 transition-colors duration-300
        bg-gradient-to-r from-yellow-200 to-yellow-400
        ${i18n.language === "ar" ? "rtl" : "ltr"}`}
    >
      {/* LEFT SIDE */}
      <div className="z-10 max-w-xl space-y-6 text-center md:text-left">
        <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl dark:text-gray-900 drop-shadow-sm">
          {t("common.learnSomething")}
        </h1>
        <p className="text-lg font-medium text-gray-700 md:text-xl dark:text-gray-800">
          {t("common.becomeProfessionals")}
        </p>

        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row md:gap-6 md:justify-start">
          <button className="px-8 py-3 text-lg font-semibold text-white transition shadow-md rounded-2xl bg-primary hover:bg-primary-dark">
            {t("common.browseCourse")}
          </button>
          <button className="px-8 py-3 text-lg font-semibold transition bg-white border-2 rounded-2xl border-primary text-primary hover:bg-primary hover:text-white">
            {t("common.startMakeAccount")}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div
        className={`mt-10 md:mt-0 md:absolute bottom-0 ${
          i18n.language === "ar" ? "left-10" : "right-10"
        }`}
      >
        <img
          src={bannerImg}
          alt="Banner"
          className="w-[380px] md:w-[480px] lg:w-[520px] object-contain drop-shadow-xl"
        />
      </div>
    </section>
  );
}

export default Banner;
