import React from "react";
import ProfileNav from "./ProfileNav";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Favorites from "./Favorites";
import { Wishlist } from "./Wishlist";
import MyCourses from "./MyCourses";
import { useTranslation } from "react-i18next";

const MainProfile = () => {
  const { t, i18n } = useTranslation();

  return (

    <div
      className={`text-center mt-20 flex flex-col bg-white dark:bg-surface-dark min-h-screen transition-colors duration-300 ${i18n.language === "ar" ? "rtl" : "ltr"
        }`}
    >
      <ProfileNav />
      <Routes>
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/MyCourses" element={<MyCourses />} />
      </Routes>
    </div>

  );
};

export default MainProfile;
