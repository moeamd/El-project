import React from "react";
import ProfileNav from "./ProfileNav";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Favorites from "./Favorites";
import { Wishlist } from "./Wishlist";
import MyCourses from "./myCourses";

const MainProfile = () => {
  return (
    <div className="text-center mt-20 flex flex-col">
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
