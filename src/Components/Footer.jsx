import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t, i18n } = useTranslation();

  return (
   <footer className="pt-10 transition-colors duration-300 bg-gray-200 text-text dark:text-text-dark">

<div
  className={`max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 items-start justify-items-center md:justify-items-start ${
    i18n.language === "ar" ? "rtl" : "ltr"
  }`}
>
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <img src={logoImg} alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-text dark:text-text-dark">
            {t("app.name")}
          </span>
        </div>

        <div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/web-development"
                className="transition-colors hover:underline"
              >
                {t("courseCategories.webProgramming")}
              </Link>
            </li>
            <li>
              <Link
                to="/data-science"
                className="transition-colors hover:underline"
              >
                {t("courseCategories.mobileProgramming")}
              </Link>
            </li>
            <li>
              <Link to="/ui-ux" className="transition-colors hover:underline">
                {t("courseCategories.javaBeginner")}
              </Link>
            </li>
            <li>
              <Link
                to="/marketing"
                className="transition-colors hover:underline"
              >
                {t("courseCategories.phpBeginner")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/business"
                className="transition-colors hover:underline"
              >
                {t("courseCategories.adobeIllustrator")}
              </Link>
            </li>
            <li>
              <Link
                to="/photography"
                className="transition-colors hover:underline"
              >
                {t("courseCategories.adobePhotoshop")}
              </Link>
            </li>
            <li>
              <Link
                to="/health-fitness"
                className="transition-colors hover:underline"
              >
                {t("courseCategories.designLogo")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/finance" className="transition-colors hover:underline">
                {t("courseCategories.writingCourse")}
              </Link>
            </li>
            <li>
              <Link to="/design" className="transition-colors hover:underline">
                {t("courseCategories.photography")}
              </Link>
            </li>
            <li>
              <Link to="/music" className="transition-colors hover:underline">
                {t("courseCategories.videoMaking")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-4 mx-6 border-t border-gray-600 dark:border-gray-700">
        <div
          className={`max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between ${
            i18n.language === "ar" ? "rtl" : "ltr"
          }`}
        >
          <p className="text-sm text-muted dark:text-muted-dark">
            {t("common.copyright")}
          </p>

          <div className="flex mt-4 space-x-4 rtl:space-x-reverse md:mt-0">
            <Link to="/facebook">
              <FaFacebookF className="w-6 h-6 transition-colors hover:text-gray-300 dark:hover:text-gray-400" />
            </Link>
            <Link to="/twitter">
              <FaTwitter className="w-6 h-6 transition-colors hover:text-gray-300 dark:hover:text-gray-400" />
            </Link>
            <Link to="/instagram">
              <FaInstagram className="w-6 h-6 transition-colors hover:text-gray-300 dark:hover:text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
