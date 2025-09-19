import React from "react";
import { Link } from "react-router-dom";
import { logOut } from "../features/auth/auth";
import { useTranslation } from "react-i18next";

function ProfilePopup({ show, userName, userEmail }) {
  const { t, i18n } = useTranslation();

  if (!show) return null;

  return (
    <div
      className={`absolute mt-2 bg-white dark:bg-card rounded shadow-lg border border-gray-200 dark:border-gray-700 z-50 transition-colors duration-300 ${
        i18n.language === "ar" ? "left-0" : "right-0"
      } ${i18n.language === "ar" ? "rtl" : "ltr"}`}
    >
      {/* Name & Email */}
      <Link
        to="/MainProfile"
        className="block text-primary dark:text-primary hover:underline text-center font-semibold transition-colors"
      >
        <div className="p-2 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-card transition-colors">
          <p className="font-bold text-text dark:text-text-dark">{userName}</p>
          <p className="text-sm text-muted dark:text-muted-dark">{userEmail}</p>
        </div>
      </Link>

      {/*Courses & Cart & Wishlist */}
      <div className="flex flex-col p-2 border-b border-gray-200 dark:border-gray-700">
        <Link
          to="/MainProfile/MyCourses"
          className="p-2 hover:underline text-gray-700 dark:text-gray-300 transition-colors"
        >
          {t("common.myCourses")}
        </Link>
        <Link
          to="/MainProfile/Favorites"
          className="p-2 hover:underline text-gray-700 dark:text-gray-300 transition-colors"
        >
          {t("common.favorites")}
        </Link>
        <Link
          to="/MainProfile/Wishlist"
          className="p-2 hover:underline text-gray-700 dark:text-gray-300 transition-colors"
        >
          {t("common.wishlist")}
        </Link>
      </div>

      {/* Notifications & Account Settings */}
      <div className="flex flex-col p-2 border-b border-gray-200 dark:border-gray-700">
        <Link
          to="/notifications"
          className="p-2 hover:underline text-gray-700 dark:text-gray-300 transition-colors"
        >
          {t("common.notifications")}
        </Link>
        <Link
          to="/MainProfile/Profile"
          className="p-2 hover:underline text-gray-700 dark:text-gray-300 transition-colors"
        >
          {t("common.accountSetting")}
        </Link>
      </div>

      {/* Logout */}
      <Link
        to="/"
        className="block p-2 text-red-500 dark:text-red-400 hover:underline transition-colors"
        onClick={logOut}
      >
        {t("common.logout")}
      </Link>
    </div>
  );
}

export default ProfilePopup;
