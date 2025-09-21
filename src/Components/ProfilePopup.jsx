import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../features/auth/auth";
import { clearAuthState } from "../features/auth/currentUserSlice";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import ConfirmModal from "./ConfirmModal";

function ProfilePopup({ show, userName, userEmail }) {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!show) return null;

  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(clearAuthState());
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      className={`absolute mt-2 bg-white dark:bg-card-dark rounded shadow-lg border border-gray-200 dark:border-gray-700 z-50 transition-colors duration-300 
        ${i18n.language === "ar" ? "left-0 rtl" : "right-0 ltr"}`}
    >
      {/* Name & Email */}
      <Link
        to="/MainProfile/Profile"
        className="block font-semibold text-center transition-colors"
      >
  <div className="p-2 transition-colors border-b border-gray-200 cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-card-dark">
          <p className="font-bold text-text dark:text-text-dark">{userName}</p>
          <p className="text-sm text-muted dark:text-muted-dark">{userEmail}</p>
        </div>
      </Link>

      {/* Courses, Favorites & Wishlist */}
      <div className="flex flex-col p-2 border-b border-gray-200 dark:border-gray-700">
        <Link to="/MainProfile/MyCourses" className="p-2 text-gray-900 transition-colors hover:underline dark:text-gray-900">
          {t("common.myCourses")}
        </Link>
        <Link to="/MainProfile/Favorites" className="p-2 text-gray-700 transition-colors hover:underline dark:text-gray-900">
          {t("common.favorites")}
        </Link>
        <Link to="/MainProfile/Wishlist" className="p-2 text-gray-700 transition-colors hover:underline dark:text-gray-900">
          {t("common.wishlist")}
        </Link>
      </div>

      {/* Notifications & Account Settings */}
      <div className="flex flex-col p-2 border-b border-gray-200 dark:border-gray-700">
        <Link to="/notifications" className="p-2 text-gray-700 transition-colors hover:underline dark:text-gray-900">
          {t("common.notifications")}
        </Link>
        <Link to="/MainProfile/Profile" className="p-2 text-gray-700 transition-colors hover:underline dark:text-gray-900">
          {t("common.accountSetting")}
        </Link>
      </div>

      {/* Logout */}
      <button
        className="block w-full p-2 text-left text-red-500 hover:underline"
        onClick={() => setShowModal(true)}
      >
        {t("common.logout")}
      </button>

      {/* Confirm Logout Modal */}
      {showModal && (
        <ConfirmModal
          show={showModal}
          message={t("common.confirmLogout")}
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ProfilePopup;
