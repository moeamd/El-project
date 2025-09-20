import bannerImg from "../assets/images/image.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Banner() {
  const { t, i18n } = useTranslation();
    const navigate = useNavigate(); 

  return (
    <section
      className={`bg-yellow-200 dark:bg-yellow-300/90 px-6 md:px-12 py-16 relative flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start pt-[200px] transition-colors duration-300 ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <div className="max-w-lg text-center md:text-left mb-10 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-text dark:text-text-dark">
          {t("common.learnSomething")}
        </h1>
        <p className="text-base md:text-lg mb-6 text-muted dark:text-muted-dark">
          {t("common.becomeProfessionals")}
        </p>
        <div className="flex flex-col gap-4 sm:flex-col md:flex-row sm:gap-4 md:gap-6 justify-center md:justify-start">
          <button onClick={()=>{ navigate("/SearchPage");}} className="bg-primary text-white px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-medium text-lg hover:bg-primary-dark transition-colors">
            {t("common.browseCourse")}
            
          </button>
          <button className="bg-white dark:bg-card text-primary border border-primary px-8 py-3 sm:px-10 sm:py-4 rounded-2xl font-medium text-lg hover:bg-primary hover:text-white transition-colors">
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
