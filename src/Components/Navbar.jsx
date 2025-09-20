import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartIcon, BellIcon } from "@heroicons/react/24/solid";
import profileImg from "../assets/images/profileImage.png";
import logoImg from "../assets/images/logo.png";
import ProfilePopup from "./ProfilePopup";
import {
  fetchCurrentUser,
  selectCurrentUser,
  selectCurrentUserLoading,
} from "../features/auth/currentUserSlice";
import LoadingSpinner from "./loading-spinner";
import { useNavigate, Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import { getInstructors } from "../features/users/getinstructors-aprove";

function Navbar() {
  const [showPopup, setShowPopup] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectCurrentUserLoading);
  const { instructors } = useSelector((state) => state.instructors);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isInstructor =
    currentUser?.uid &&
    instructors?.some((inst) => inst.uid === currentUser.uid && inst.status === true);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(getInstructors());
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;

  const togglePopup = () => setShowPopup((prev) => !prev);

  return (
    <nav
      className={`bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 px-6 md:px-12 py-4 flex justify-between items-center shadow-md mb-9 fixed top-0 z-20 w-full transition-colors duration-500 ${i18n.language === "ar" ? "rtl" : "ltr"
        }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 text-xl font-bold transition-transform cursor-pointer hover:scale-105"
      >
        <img src={logoImg} alt="Logo" className="object-cover w-10 h-10" />
        <span>{t("app.name")}</span>
      </Link>

      {/* Navbar Items */}
      <div className="flex items-center gap-6 rtl:gap-reverse">
        {!currentUser && (
          <Link to="/instructorsignup">
            <span className="hidden font-medium transition-colors cursor-pointer sm:inline hover:underline">
              {t("common.becomeInstructor")}
            </span>
          </Link>
        )}

        {isInstructor && (
          <Link to="/newCourse">
            <span className="hidden font-medium transition-colors cursor-pointer sm:inline hover:underline">
              {t("addNewCourse")}
            </span>
          </Link>
        )}

        <div className="relative flex items-center gap-4 rtl:gap-reverse">
          {currentUser?.uid ? (
            <>
              <BellIcon className="w-6 h-6 text-gray-700 transition-transform cursor-pointer hover:scale-110 dark:text-gray-200" />

              <div className="relative">
                <img
                  src={currentUser.photoURL || profileImg}
                  alt="Profile"
                  onClick={togglePopup}
                  className="w-8 h-8 ml-2 transition-transform border-2 border-transparent rounded-full cursor-pointer hover:scale-110 rtl:mr-2 rtl:ml-0 hover:border-blue-400 dark:hover:border-blue-300"
                />
                {showPopup && (
                  <div
                    className={`absolute top-full mt-1 ${i18n.language === "ar" ? "left-0" : "right-0"
                      } animate-slide-in`}
                  >
                    <ProfilePopup
                      show={showPopup}
                      userName={currentUser.displayName || "User"}
                      userEmail={currentUser.email || ""}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="py-1.5 px-4 rounded-xl font-semibold border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors duration-300 "
              >
                {t("common.logIn")}
              </button>
              <button
                onClick={() => navigate("/signup")}
                  className="px-4 py-2 font-semibold text-white transition-colors duration-300 rounded-xl bg-[#21ac92] hover:bg-[#0c8b74]"
              >
                {t("common.signUp")}
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 rtl:gap-reverse">
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
