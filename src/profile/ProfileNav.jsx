import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileNav = () => {
  const { t, i18n } = useTranslation();

  const activeClass = "text-[#21ac92] font-bold text-2xl";

  return (
    <div
      className={`container mx-auto flex justify-around border-b-2 border-gray-300 dark:border-gray-600 pb-4 mb-4 text-lg font-medium transition-colors duration-300 ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <NavLink
        to="/MainProfile/Profile"
        className={({ isActive }) => (isActive ? activeClass : "text-gray-700 dark:text-gray-300")}
      >
        {t("common.myProfile")}
      </NavLink>

      <NavLink
        to="/MainProfile/Wishlist"
        className={({ isActive }) => (isActive ? activeClass : "text-gray-700 dark:text-gray-300")}
      >
        {t("common.wishlist")}
      </NavLink>

      <NavLink
        to="/MainProfile/Favorites"
        className={({ isActive }) => (isActive ? activeClass : "text-gray-700 dark:text-gray-300")}
      >
        {t("common.favorites")}
      </NavLink>

      <NavLink
        to="/MainProfile/MyCourses"
        className={({ isActive }) => (isActive ? activeClass : "text-gray-700 dark:text-gray-300")}
      >
        {t("common.myCourses")}
      </NavLink>
    </div>
  );
};

export default ProfileNav;
