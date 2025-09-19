import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartIcon, BellIcon } from "@heroicons/react/24/solid";
import profileImg from "../assets/images/profileImage.png";
import logoImg from "../assets/images/logo.png";
import ProfilePopup from "./ProfilePopup";
import {
  fetchCurrentUser,
  selectCurrentUser,
  selectCurrentUserError,
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
  const error = useSelector(selectCurrentUserError);
  const { instructors } = useSelector((state) => state.instructors);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isInstructor =
  currentUser?.uid && instructors?.some((inst) => inst.uid === currentUser.uid && inst.status === true);

  
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(getInstructors());
  }, [dispatch]);

  if (isLoading) return <LoadingSpinner />;

  const togglePopup = () => setShowPopup((prev) => !prev);

  return (
    <nav
      className={`bg-white dark:bg-surface-dark text-text dark:text-text-dark px-6 md:px-12 py-4 flex justify-between items-center shadow-md mb-9 absolute top-0 z-20 w-full transition-colors duration-300 ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center gap-2 text-xl font-bold">
          <img src={logoImg} alt="Logo" className="object-cover w-10 h-10" />
          <span className="text-text dark:text-text-dark">{t("app.name")}</span>
        </div>
      </Link>

      {/* Items */}
      <div className="relative flex items-center gap-6 rtl:gap-reverse">
        {!currentUser && (
          <Link to="instructorsignup">
            <span className="hidden font-medium cursor-pointer hover:underline sm:inline">
              {t("common.becomeInstructor")}
            </span>
          </Link>
        )}

        {isInstructor && (
          <Link to="newCourse">
            <span className="hidden font-medium cursor-pointer hover:underline sm:inline">
              {t("  addNewCourse")}
            </span>
          </Link>
        )}

        <div className="flex items-center sm:gap-1.5 md:gap-4 relative rtl:gap-reverse">
          {currentUser?.uid ? (
            <>
              <ShoppingCartIcon className="w-6 h-6 transition-transform cursor-pointer hover:scale-110" />
              <BellIcon className="w-6 h-6 transition-transform cursor-pointer hover:scale-110" />

              <div className="relative">
                <img
                  src={currentUser.photoURL || profileImg}
                  alt="Profile"
                  className="w-8 h-8 ml-2 transition-transform rounded-full cursor-pointer hover:scale-110 rtl:mr-2 rtl:ml-0"
                  onClick={togglePopup}
                />

                {showPopup && (
                  <div
                    className={`absolute top-full mt-1 ${
                      i18n.language === "ar" ? "left-0" : "right-0"
                    }`}
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
                className="rounded-xl py-1.5 px-3 font-bold border border-gray-300 hover:bg-primary/10 dark:border-gray-600 dark:text-white transition-colors"
              >
                {t("common.logIn")}
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="rounded-xl py-2 px-3 font-bold bg-primary text-white hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/70 transition-colors"
              >
                {t("common.signUp")}
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 rtl:gap-reverse">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
