import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartIcon, BellIcon } from "@heroicons/react/24/solid";
import profileImg from "../assets/images/profileImage.png";
import logoImg from "../assets/images/logo.png";
import ProfilePopup from "./ProfilePopup";
import {
  fetchCurrentUser,
  selectCurrentUser,
} from "../features/auth/currentUserSlice";
import LoadingSpinner from "./loading-spinner";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [showPopup, setShowPopup] = useState(false);

  const { user, isLoading, error } = useSelector(selectCurrentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const togglePopup = () => setShowPopup((prev) => !prev);

  return (
    <nav className="bg-transparent text-black px-6 md:px-12 py-4 flex justify-between items-center shadow-md mb-9 absolute top-0 z-20 w-full">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center gap-2 font-bold text-xl">
          <img src={logoImg} alt="Logo" className="w-10 h-10 object-cover" />
          <span>MyCourse.io</span>
        </div>
      </Link>

      {/* Items */}
      <div className="flex items-center gap-6 relative">
        {!user && (
          <Link to="instructorsignup">
            <span className="cursor-pointer font-medium hover:underline hidden sm:inline">
              Become Instructor
            </span>
          </Link>
        )}

        <div className="flex items-center gap-4 relative">
          {user && (
            <>
              <ShoppingCartIcon className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              <BellIcon className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />

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
                      userName={user.displayName || "User"}
                      userEmail={user.email || ""}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {!user && (
            <div>
              <button
                onClick={() => navigate("/login")}
                className="border-2 rounded-xl py-1.5 px-3 font-bold hover:bg-[#3DCBB1] focus:bg-[#48a392]"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
