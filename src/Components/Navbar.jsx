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
import { useNavigate, Link, useLocation } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "react-i18next";
import { getInstructors } from "../features/users/getinstructors-aprove";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


function Navbar({ onOpenInstructorSignUp, onSignup, onLogin }) {
  const [showPopup, setShowPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectCurrentUserLoading);
  const { instructors } = useSelector((state) => state.instructors);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  const isInstructor =
    currentUser?.uid &&
    instructors?.some(
      (inst) => inst.uid === currentUser.uid && inst.status === true
    );

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(getInstructors());
  }, [dispatch]);

  useEffect(() => {
    setShowPopup(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  if (isLoading) return <LoadingSpinner />;

  const togglePopup = () => setShowPopup((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const insta = instructors.find((i) => i.uid === currentUser?.uid);

  return (
<nav className="relative flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800 z-50">
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
    className="block md:hidden text-gray-700 focus:outline-none "
    onClick={toggleMenu}
  >
    {isMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
  </button>

{/* Navbar Items */}
<div
  className={`
    md:flex md:items-center md:justify-between gap-6 transition-all duration-300
    ${isMenuOpen
      ? "fixed top-16 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-40 opacity-100 scale-100"
      : "hidden md:flex opacity-0 scale-95 md:opacity-100 md:scale-100"}
    `}
  style={{ transition: "all 0.3s ease-in-out" }}
>
  {/* Become Instructor */}
  {!currentUser && (
    <button
      onClick={onOpenInstructorSignUp}
      className="px-4 py-2 font-medium transition-colors hover:underline"
    >
      {t("common.becomeInstructor")}
    </button>
  )}

  {/* New Course */}
  {isInstructor && (
    <Link to="/newCourse" onClick={() => setIsMenuOpen(false)}>
      <span className="block px-4 py-2 font-medium transition-colors hover:underline md:inline">
        {t("addNewCourse")}
      </span>
    </Link>
  )}

  {/* Admin Dashboard */}
  {insta?.role === "admin" && (
    <Link to="/MainDashboard" onClick={() => setIsMenuOpen(false)}>
      <span className="block px-4 py-2 font-medium transition-colors hover:underline md:inline">
        Dashboard
      </span>
    </Link>
  )}

  {/* User Actions */}
  <div className="flex flex-col md:flex-row md:items-center gap-4">
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
            className={`absolute top-full mt-2 right-0 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-50`}
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
            onLogin();
            setIsMenuOpen(false);
          }}

            className="px-4 py-2 font-medium transition-colors rounded-xl hover:text-white hover:bg-[#149981]"

        >
          {t("common.logIn")}
        </button>
        <button
          onClick={() => {
            onSignup();
            setIsMenuOpen(false);
          }}
          className="px-4 py-2 font-semibold text-white transition-colors duration-300 rounded-xl bg-[#21ac92] hover:bg-[#0c8b74]"
        >
          {t("common.signUp")}
        </button>
      </>
    )}
  </div>

  {/* Language Toggle */}
  <div className="flex items-center gap-4">{/* Language */} <LanguageToggle /> </div>
</div>

</nav>

  );
}

export default Navbar;
