import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../features/auth/auth";
import { clearAuthState } from "../features/auth/currentUserSlice";
import ConfirmModal from "./confirmModal";
import { useDispatch } from "react-redux";


function ProfilePopup({ show, userName, userEmail }) {
  if (!show) return null;

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(clearAuthState());
      navigate("/login");
    } catch (error) {
      // Optionally show error
      console.error("Logout failed", error);
    }
  };


  return (
    <div className="absolute right-0 mt-2  bg-white rounded shadow-lg border border-gray-200 z-50">
      {/* Name & Email */}
      <Link
        to="/MainProfile/Profile"
        className="block text-blue-500 hover:underline text-center font-semibold"
      >
        <div className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100">
          <p className="font-bold">{userName}</p>
          <p className="text-sm text-gray-500">{userEmail}</p>
        </div>
      </Link>

      {/*Courses & Cart & Wishlist */}
      <div className="flex flex-col p-2 border-b border-gray-200">
        <Link to="/MainProfile/MyCourses" className="p-2 hover:underline">
          My Courses
        </Link>
        <Link to="/MainProfile/Favorites" className="p-2 hover:underline">
          Favorites
        </Link>
        <Link to="/MainProfile/Wishlist" className="p-2 hover:underline">
          My Wishlist
        </Link>
      </div>

      {/* Notifications & Account Settings */}
      <div className="flex flex-col p-2 border-b border-gray-200">
        <Link to="/notifications" className="p-2 hover:underline">
          Notifications
        </Link>
        <Link to="/MainProfile/Profile" className="p-2 hover:underline">
          Account Setting
        </Link>
      </div>

      {/* Logout */}
      <Link
        to="/"
        className="block p-2 text-red-500 hover:underline "
        onClick={() => { setShowModal(true) }}
      >
        Logout
      </Link>
      <ConfirmModal
        show={showModal}
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default ProfilePopup;
