import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartIcon, BellIcon } from "@heroicons/react/24/solid";
import profileImg from "../assets/images/profileImage.png";
import logoImg from "../assets/images/logo.png";
import ProfilePopup from "./ProfilePopup";
import { fetchCurrentUser, selectCurrentUser } from "../features/auth/currentUserSlice";
import LoadingSpinner from "./loading-spinner";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [showPopup, setShowPopup] = useState(false);

  const { currentUser, isLoading, error } = useSelector(selectCurrentUser);

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
        {!currentUser && (
          <Link to="instructorsignup">
            <span className="cursor-pointer font-medium hover:underline hidden sm:inline">
              Become Instructor
            </span>
          </Link>
        )}

        <div className="flex items-center  sm:gap-1.5 md:gap-4 relative">
          {currentUser && (
            <>
              <ShoppingCartIcon className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              <BellIcon className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />

              <div className="relative">
                <img
                  src={currentUser.photoURL ? currentUser.photoURL : profileImg}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 transition-transform ml-2"
                  onClick={togglePopup}
                />

                {/* Popup */}
                {showPopup && (
                  <div className="absolute top-full right-0 mt-1">
                    <ProfilePopup
                      show={showPopup}
                      userName={currentUser.displayName || "User"}
                      userEmail={currentUser.email || ""}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {!currentUser && (
            <>
              <div>
                <button
                  onClick={() => navigate("/login")}
                  className="border-1 rounded-xl py-1.5 px-3 font-bold hover:bg-[#3DCBB1] focus:bg-[#48a392]"
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate("/signup")}
                  className=" rounded-xl py-2 px-3 font-bold bg-[#3DCBB1] hover:bg-[#7bc5b7] focus:bg-[#48a392]"
                >
                  Signup
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
