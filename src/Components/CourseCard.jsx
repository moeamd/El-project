import { FaStar, FaBookOpen, FaClock, FaUser } from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Alert from "./Alert";
import noWishlistImage from '../Assets/icons/noWishlist.png';
import WishlistImage from '../Assets/icons/wishlisted.png';
import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, selectUsers } from '../features/auth/usersSlice';
import { fetchCurrentUser, selectCurrentUser } from '../features/auth/currentUserSlice';
import { addToWishList, removeFromWishList, addToFavorites, removeFromFavorites } from '../features/auth/auth';
import { useTranslation } from "react-i18next";

export default function CourseCard({ course, onCardClick }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  // Alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  // Users
  const currentUser = useSelector(selectCurrentUser) ?? null;
  const { users } = useSelector(selectUsers) ?? [];

  useEffect(() => { dispatch(getUsers()) }, [dispatch]);
  useEffect(() => { dispatch(fetchCurrentUser()) }, [dispatch]);

  const currentUserInfo = useMemo(() => {
    if (!currentUser?.uid || !Array.isArray(users)) return null;
    return users.find(u => u.uid === currentUser.uid) || null;
  }, [users, currentUser]);

  const userId = currentUserInfo?.uid;

  // Wishlist
  const [localWishList, setLocalWishList] = useState(currentUserInfo?.wishList || []);
  useEffect(() => setLocalWishList(currentUserInfo?.wishList || []), [currentUserInfo]);
  const isWishListed = useMemo(() => localWishList.some(w => w.id === course.id), [localWishList, course]);

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    try {
      if (isWishListed) {
        await removeFromWishList(course.id, userId);
        setLocalWishList(prev => prev.filter(w => w.id !== course.id));
        setAlertMessage(t("common.removedFromWishlist"));
      } else {
        await addToWishList(course, userId);
        setLocalWishList(prev => [...prev, course]);
        setAlertMessage(t("common.addedToWishlist"));
      }
      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error?.message || t("common.updateFailed"));
      setAlertType("error");
      setShowAlert(true);
    }
  };

  // Favorites
  const [localFavorites, setLocalFavorites] = useState(currentUserInfo?.favorites || []);
  useEffect(() => setLocalFavorites(currentUserInfo?.favorites || []), [currentUserInfo]);
  const isFavoritesed = useMemo(() => localFavorites.some(w => w.id === course.id), [localFavorites, course]);

  const handleAddToFavorites = async (e) => {
    e.stopPropagation();
    try {
      if (isFavoritesed) {
        await removeFromFavorites(course.id, userId);
        setLocalFavorites(prev => prev.filter(w => w.id !== course.id));
        setAlertMessage(t("common.removedFromFavorites"));
      } else {
        await addToFavorites(course, userId);
        setLocalFavorites(prev => [...prev, course]);
        setAlertMessage(t("common.addedToFavorites"));
      }
      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error?.message || t("common.updateFailed"));
      setAlertType("error");
      setShowAlert(true);
    }
  };

  const createdAt = course.createdAt?.toDate?.()?.toLocaleDateString() || course.createdAt;

  return (
    <div
      className={` flex flex-col justify-between w-[440px] bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer ${i18n.language === "ar" ? "rtl" : "ltr"} p-[20px]`}
      onClick={() => onCardClick(course)}
    >
      {showAlert && <Alert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />}

      {/* Poster */}
      <div className="relative">
        <img src={course.poster} alt={course.name} className="object-cover w-full h-[400px] shadow-md md:h-80 lg:h-96 rounded-3xl" />

        {/* Rating */}
        {course.rating && (
          <div className="absolute flex items-center px-2 py-1 text-xs font-medium bg-white rounded-full shadow top-3 left-3">
            <FaStar className="mr-1 text-yellow-400" /> {course.rating}
          </div>
        )}

        {/* Category */}
        <div className={`absolute top-3 ${i18n.language === "ar" ? "right-3" : "left-3"}`}>
          <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {course.category || course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{course.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{course.description}</p>

        {/* Instructor Info */}
        <div className="flex items-center gap-2">
          {course.instructorImage && <img src={course.instructorImage} alt={course.instructorName} className="object-cover w-6 h-6 rounded-full" />}
          <p className="text-xs text-gray-500 dark:text-gray-400">{t("common.by")} {course.instructorName || t("common.unknown")}</p>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">{t("common.createdAt")}: {createdAt}</p>

        {/* Favorites & Wishlist */}
        <div className="flex items-center gap-2 mt-2">
          <button onClick={handleAddToFavorites}>
            {isFavoritesed ? <MdOutlineFavorite className="w-6 h-6 text-red-500" /> : <MdFavoriteBorder className="w-6 h-6" />}
          </button>
          <button onClick={handleAddToWishlist}>
            <img src={isWishListed ? WishlistImage : noWishlistImage} alt="wishlist" className="w-6 h-6" />
          </button>
        </div>

        {/* Footer */}
        <div className={`flex justify-between items-center mt-3 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ${course.price}
            <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">/{t("common.lifetime")}</span>
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); console.log("Enroll clicked:", course.name); }}
            className="px-4 py-2 text-sm text-white transition-colors rounded-full bg-primary hover:bg-primary-dark"
          >
            {t("common.enrollNow")}
          </button>
        </div>
      </div>
    </div>
  );
}
