import { useNavigate } from "react-router-dom";
import bannerImg from "../assets/images/image.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


function Banner() {
  const { t, i18n } = useTranslation();

  return (
    <section

      className={`bg-yellow-200 dark:bg-yellow-300/90 px-6 md:px-12 py-16 relative flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start pt-[200px] transition-colors duration-300 ${i18n.language === "ar" ? "rtl" : "ltr"
        }`}

    >
      {/* LEFT SIDE */}
      <div className="z-10 max-w-xl space-y-6 text-center md:text-left">
        <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl dark:text-gray-900 drop-shadow-sm">
          {t("common.learnSomething")}
        </h1>
        <p className="text-lg font-medium text-gray-700 md:text-xl dark:text-gray-800">
          {t("common.becomeProfessionals")}
        </p>

        <div className="flex flex-col gap-4 sm:flex-col md:flex-row sm:gap-4 md:gap-6 justify-center md:justify-start">
          <button onClick={()=>{ navigate("/SearchPage");}} className="bg-primary text-white px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-medium text-lg hover:bg-primary-dark transition-colors">
          
          {t("common.browseCourse")}
            
          </button>
          <button className="bg-white dark:bg-card text-primary border border-primary px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-medium text-lg hover:text-white hover:bg-[#149981] transition-colors">



            {t("common.startMakeAccount")}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div

        className={`absolute bottom-0 hidden md:block ${i18n.language === "ar" ? "left-0" : "right-0"
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
