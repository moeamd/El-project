import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileNav = () => {
  const { t, i18n } = useTranslation();

  return (
    <div
      className={`container mx-auto flex justify-around border-b-2 border-gray-300 dark:border-gray-600 pb-4 mb-4 text-lg font-medium transition-colors duration-300 ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <Link
        to="/MainProfile/Profile"
        className="text-gray-700 dark:text-gray-300 hover:text-[#3DCBB1] dark:hover:text-[#3DCBB1] transition-colors"
      >
        {t("common.myProfile")}
      </Link>
      <Link
        to="/MainProfile/Wishlist"
        className="text-gray-700 dark:text-gray-300 hover:text-[#3DCBB1] dark:hover:text-[#3DCBB1] transition-colors"
      >
        {t("common.wishlist")}
      </Link>
      <Link
        to="/MainProfile/Favorites"
        className="text-gray-700 dark:text-gray-300 hover:text-[#3DCBB1] dark:hover:text-[#3DCBB1] transition-colors"
      >
        {t("common.favorites")}
      </Link>
      <Link
        to="/MainProfile/MyCourses"
        className="text-gray-700 dark:text-gray-300 hover:text-[#3DCBB1] dark:hover:text-[#3DCBB1] transition-colors"
      >
        {t("common.myCourses")}
      </Link>
    </div>
  );
};

export default ProfileNav;
