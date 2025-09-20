import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { useTranslation } from "react-i18next";
import { getInstructors } from "../features/users/getinstructors-aprove";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function Navbar() {
  const [showPopup, setShowPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav
      className={`fixed top-0 w-full z-20 px-6 md:px-12 py-4 flex justify-between items-center shadow-md bg-white text-gray-800 
        ${i18n.language === "ar" ? "rtl" : "ltr"}`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 text-xl font-bold transition-transform cursor-pointer hover:scale-105"
      >
        <img src={logoImg} alt="Logo" className="object-cover w-10 h-10" />
        <span>{t("app.name")}</span>
      </Link>

      {/* Burger Menu (Mobile) */}
      <button
        className="md:hidden block text-gray-700 focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
      </button>

      {/* Navbar Items */}
      <div
        className={`flex-col md:flex md:flex-row md:items-center gap-6 rtl:gap-reverse absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        {!currentUser && (
          <Link to="/instructorsignup" onClick={() => setIsMenuOpen(false)}>
            <span className="block px-4 py-2 font-medium transition-colors hover:underline md:inline">
              {t("common.becomeInstructor")}
            </span>
          </Link>
        )}

        {isInstructor && (
          <Link to="/newCourse" onClick={() => setIsMenuOpen(false)}>
            <span className="block px-4 py-2 font-medium transition-colors hover:underline md:inline">
              {t("addNewCourse")}
            </span>
          </Link>
        )}

        <div className="flex items-center gap-4 px-4 py-2 md:px-0 md:py-0">
          {currentUser?.uid ? (
            <div className="relative">
              <img
                src={currentUser.photoURL || profileImg}
                alt="Profile"
                onClick={togglePopup}
                className="w-8 h-8 ml-2 transition-all border-2 border-transparent rounded-full cursor-pointer rtl:mr-2 rtl:ml-0 hover:scale-110 hover:border-blue-400"
              />
              {showPopup && (
                <div
                  className={`absolute top-full mt-1 ${
                    i18n.language === "ar" ? "left-0" : "right-0"
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
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="py-1.5 px-4 rounded-xl font-semibold border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
              >
                {t("common.logIn")}
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 font-semibold text-white transition-colors duration-300 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
              >
                {t("common.signUp")}
              </button>
            </>
          )}
        </div>

        {/* Language Toggle */}
        <div className="flex items-center gap-4 px-4 py-2 md:px-0 md:py-0">
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
