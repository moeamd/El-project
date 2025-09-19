import { FaStar, FaBookOpen, FaClock, FaUser } from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

import Alert from "./Alert";
import noWishlistImage from '../Assets/icons/noWishlist.png';
import WishlistImage from '../Assets/icons/wishlisted.png';
import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, selectUsers } from '../features/auth/usersSlice';
import { fetchCurrentUser, selectCurrentUser } from '../features/auth/currentUserSlice';
import { addToWishList, removeFromWishList, addToFavorites, removeFromFavorites } from '../features/auth/auth'

export default function CourseCard({ course, onCardClick }) {

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const { users, isloading, error } = useSelector(selectUsers);
  const { currentUser } = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])


  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const currentUserInfo = useMemo(() => {
    if (!currentUser?.uid || !Array.isArray(users)) return null;
    return users.find((u) => u?.uid === currentUser.uid) || null;
  }, [users, currentUser]);

  const userId = currentUserInfo?.uid;

  //wishlist
  const [localWishList, setLocalWishList] = useState(currentUserInfo?.wishList || []);

  useEffect(() => {
    setLocalWishList(currentUserInfo?.wishList || []);
  }, [currentUserInfo]);

  const isWishListed = useMemo(() => {
    if (!course.id || !Array.isArray(localWishList)) return false;
    return localWishList.some((w) => w?.id === course.id);
  }, [localWishList, course]);


  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    try {
      ("wishlist ");
      if (isWishListed) {
        await removeFromWishList(course.id, userId);
        setLocalWishList((prev) => prev.filter((w) => w.id !== course.id));
        setAlertMessage("Removed from WishList");
      }
      else {
        await addToWishList(course, userId);
        setLocalWishList((prev) => [...prev, course]);
        setAlertMessage("Added to WishList");
      }

      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      let message = "Failed to update wishlist. Please try again.";
      if (!userId) {
        message = "User not found. please Login";
      }
      else if (error?.code === "permission-denied") {
        message = "You do not have permission to update the wishlist.";
      } else if (error?.code === "unavailable" || error?.message?.includes("Network")) {
        message = "Network error. Please check your connection.";
      } else if (error?.code === "not-found") {
        message = "Course or user not found.";
      } else if (error?.code === "invalid-argument") {
        message = "Invalid data provided. Please contact support.";
      } else if (error?.code) {
        message = `Error: ${error.code}`;
      } else if (typeof error === "string") {
        message = error;
      } else if (error?.message) {
        message = error.message;
      }
      setAlertMessage(message);
      setAlertType("error");
      setShowAlert(true);
    }
  }
  //wishlist

  //favorites
  const [localFavorites, setLocalFavorites] = useState(currentUserInfo?.favorites || []);

  useEffect(() => {
    setLocalFavorites(currentUserInfo?.favorites || []);
  }, [currentUserInfo]);

  const isFavoritesed = useMemo(() => {
    if (!course.id || !Array.isArray(localFavorites)) return false;
    return localFavorites.some((w) => w?.id === course.id);
  }, [localFavorites, course]);


  const handleAddToFavorites = async (e) => {
    e.stopPropagation();
    try {
      if (isFavoritesed) {
        await removeFromFavorites(course.id, userId);
        setLocalFavorites((prev) => prev.filter((w) => w.id !== course.id));
        setAlertMessage("Removed from Favorites");
      }
      else {
        await addToFavorites(course, userId);
        setLocalFavorites((prev) => [...prev, course]);
        setAlertMessage("Added to Favorites");
      }

      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      let message = "Failed to update Favorites. Please try again.";
      if (!userId) {
        message = "User not found. please Login";
      }
      else if (error?.code === "permission-denied") {
        message = "You do not have permission to update the Favorites.";
      } else if (error?.code === "unavailable" || error?.message?.includes("Network")) {
        message = "Network error. Please check your connection.";
      } else if (error?.code === "not-found") {
        message = "Course or user not found.";
      } else if (error?.code === "invalid-argument") {
        message = "Invalid data provided. Please contact support.";
      } else if (error?.code) {
        message = `Error: ${error.code}`;
      } else if (typeof error === "string") {
        message = error;
      } else if (error?.message) {
        message = error.message;
      }
      setAlertMessage(message);
      setAlertType("error");
      setShowAlert(true);
    }
  }
  //favorites

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 hover:z-10"
      style={{ maxWidth: '400px' }}
      onClick={() => onCardClick(course)}
    >
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-44 object-cover"
        />

        <div className="absolute top-3 left-3 flex items-center bg-white px-2 py-1 rounded-full text-xs font-medium shadow">
          <FaStar className="text-yellow-400 mr-1" /> {course.rating}
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-500">by {course.author}</p>


        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
            <FaBookOpen /> {course.lessons} Lessons
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
            <FaClock /> {course.duration}
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
            <FaUser /> {course.students}+ Enrolled
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
          <div className="flex items-center  gap-1 bg-gray-100  rounded-full">
            {(isFavoritesed ?
              <MdOutlineFavorite
                onClick={(e) => {
                  handleAddToFavorites(e);
                }}
                className="w-10 h-10 cursor-pointer text-red-500 px-2 py-1 "
              />
              :
              <MdFavoriteBorder
                onClick={(e) => {
                  handleAddToFavorites(e);
                }}
                className="w-10 h-10 cursor-pointer px-2 py-1"
              />
            )}
          </div>

          <div className="flex items-center gap-1 bg-gray-100 rounded-full">
            <img src={isWishListed ? WishlistImage : noWishlistImage} alt="nowishlist"
              className=" w-8 h-8 text-red-500 px-1 py-1"
              onClick={(e) => {
                handleAddToWishlist(e);
              }}

            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-bold text-gray-800">
            ${course.price}.00{" "}
            <span className="text-sm font-normal text-gray-500">/lifetime</span>
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              ("Enroll clicked for:", course.title);
            }}
            className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition"
          >
            Enroll Now
          </button>
        </div>
      </div>


      {showAlert && <Alert message={alertMessage} type={alertType} />}
    </div>
  );
}


