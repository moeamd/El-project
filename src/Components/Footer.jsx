import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-black dark:bg-gray-900 text-white pt-10 transition-colors duration-300">
      <div
        className={`max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 items-start ${
          i18n.language === "ar" ? "rtl" : "ltr"
        }`}
      >
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <img src={logoImg} alt="Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold">MyCourse.io</span>
        </div>

        <div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/web-development"
                className="hover:underline transition-colors"
              >
                {t("courseCategories.webProgramming")}
              </Link>
            </li>
            <li>
              <Link
                to="/data-science"
                className="hover:underline transition-colors"
              >
                {t("courseCategories.mobileProgramming")}
              </Link>
            </li>
            <li>
              <Link to="/ui-ux" className="hover:underline transition-colors">
                {t("courseCategories.javaBeginner")}
              </Link>
            </li>
            <li>
              <Link
                to="/marketing"
                className="hover:underline transition-colors"
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
                className="hover:underline transition-colors"
              >
                {t("courseCategories.adobeIllustrator")}
              </Link>
            </li>
            <li>
              <Link
                to="/photography"
                className="hover:underline transition-colors"
              >
                {t("courseCategories.adobePhotoshop")}
              </Link>
            </li>
            <li>
              <Link
                to="/health-fitness"
                className="hover:underline transition-colors"
              >
                {t("courseCategories.designLogo")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/finance" className="hover:underline transition-colors">
                {t("courseCategories.writingCourse")}
              </Link>
            </li>
            <li>
              <Link to="/design" className="hover:underline transition-colors">
                {t("courseCategories.photography")}
              </Link>
            </li>
            <li>
              <Link to="/music" className="hover:underline transition-colors">
                {t("courseCategories.videoMaking")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600 dark:border-gray-700 mx-6 py-4">
        <div
          className={`max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between ${
            i18n.language === "ar" ? "rtl" : "ltr"
          }`}
        >
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {t("common.copyright")}
          </p>

          <div className="flex space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
            <Link to="/facebook">
              <FaFacebookF className="h-6 w-6 hover:text-gray-300 dark:hover:text-gray-400 transition-colors" />
            </Link>
            <Link to="/twitter">
              <FaTwitter className="h-6 w-6 hover:text-gray-300 dark:hover:text-gray-400 transition-colors" />
            </Link>
            <Link to="/instagram">
              <FaInstagram className="h-6 w-6 hover:text-gray-300 dark:hover:text-gray-400 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
