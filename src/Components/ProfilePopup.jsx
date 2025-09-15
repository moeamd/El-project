
import React from "react";
import { Link } from "react-router-dom";

function ProfilePopup({ show, userName, userEmail }) {
  if (!show) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border border-gray-200 z-50">
      {/* Name & Email */}
      <div className="p-2 border-b border-gray-200">
        <p className="font-bold">{userName}</p>
        <p className="text-sm text-gray-500">{userEmail}</p>
      </div>

      {/*Courses & Cart & Wishlist */}
      <div className="flex flex-col p-2 border-b border-gray-200">
        <Link to="/my-courses" className="p-2 hover:underline">My Courses</Link>
        <Link to="/my-cart" className="p-2 hover:underline">My Cart</Link>
        <Link to="/my-wishlist" className="p-2 hover:underline">My Wishlist</Link>
      </div>

      {/* Notifications & Account Settings */}
      <div className="flex flex-col p-2 border-b border-gray-200">
        <Link to="/notifications" className="p-2 hover:underline">Notifications</Link>
        <Link to="/account-settings" className="p-2 hover:underline">Account Setting</Link>
      </div>

      {/* Logout */}
      <Link to="/logout" className="block p-2 text-red-500 hover:underline">
        Logout
      </Link>
    </div>
  );
}

export default ProfilePopup;
