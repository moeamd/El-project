import React, { useState } from "react";
import { ShoppingCartIcon, BellIcon } from "@heroicons/react/24/solid";
import profileImg from "../assets/images/profileImage.png";
import logoImg from "../assets/images/logo.png";
import ProfilePopup from "./ProfilePopup";
import { Link } from "react-router-dom";

function Navbar() {
  const [showPopup, setShowPopup] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: "Amal Salah",
    email: "amalsalah00945@gmail.com",
  });

  const togglePopup = () => setShowPopup((prev) => !prev);

  return (
    <nav className="bg-transparent text-black px-6 md:px-12 py-4 flex justify-between items-center shadow-md  mb-9 absolute top-0 z-20 w-[100%]">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center gap-2 font-bold text-xl">
          <img src={logoImg} alt="Logo" className="w-10 h-10 object-cover" />
          <span>MyCourse.io</span>
        </div>
      </Link>

      {/* Items */}
      <div className="flex items-center gap-6 relative">
        <Link to="instructorsignup">
          <span className="cursor-pointer font-medium hover:underline hidden sm:inline">
            Become Instructor
          </span>
        </Link>

        <div className="flex items-center gap-4 relative">
          <ShoppingCartIcon className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
          <BellIcon className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />

          {/* Profile */}
          <div className="relative">
            <img
              src={profileImg}
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-transform ml-2"
              onClick={togglePopup}
            />

            {/* Popup */}
            {showPopup && (
              <div className="absolute top-full right-0 mt-1">
                <ProfilePopup
                  show={showPopup}
                  userName={currentUser.name}
                  userEmail={currentUser.email}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
