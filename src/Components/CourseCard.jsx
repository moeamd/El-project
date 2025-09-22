import { FaStar, FaBookOpen, FaClock, FaUser } from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import Alert from "./Alert";
import noWishlistImage from '../Assets/icons/noWishlist.png';
import WishlistImage from '../Assets/icons/wishlisted.png';
import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, selectUsers } from '../features/auth/usersSlice';
import { fetchCurrentUser, selectCurrentUser } from '../features/auth/currentUserSlice';
import {
  addToWishList, removeFromWishList,
  addToFavorites, removeFromFavorites,
  unEnrollCourse, enrollCourse,
} from '../features/auth/auth';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function CourseCard({ course, onCardClick }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Alerts
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [isVisible, setIsVisible] = useState(true);

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
        setAlertMessage("removedFromWishlist");
      } else {
        await addToWishList(course, userId);
        setLocalWishList(prev => [...prev, course]);
        setAlertMessage("addedToWishlist");
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
  const isFavoritesed = useMemo(() => localFavorites.some(w => w.id === course.id),
    [localFavorites, course]);

  const handleAddToFavorites = async (e) => {
    
    e.stopPropagation();
    try {
      if (isFavoritesed) {
        console.log(isFavoritesed)
        await removeFromFavorites(course.id, userId);
        setLocalFavorites(prev => prev.filter(w => w.id !== course.id));
        setAlertMessage("removedFromFavorites");
      } else {
        await addToFavorites(course, userId);
        setLocalFavorites(prev => [...prev, course]);
        setAlertMessage("addedToFavorites");
      }
      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error?.message || t("common.updateFailed"));
      setAlertType("error");
      setShowAlert(true);
    }
  };


  //MyCourses
  const [localMyCourses, setLocalMyCourses] = useState(currentUserInfo?.myCourses || []);
  useEffect(() => {
    setLocalMyCourses(currentUserInfo?.myCourses || []
    )
  }, [currentUserInfo]);

  const isMyCoursesed = useMemo(() => localMyCourses.some(w => w.id === course.id),
    [localMyCourses, course]);
    


    const handleAddToMyCourses = async (e) => {
      e.stopPropagation();
    
      try {
        if (isMyCoursesed) {
          // Show confirmation before unenroll
          const result = await Swal.fire({
            title: t("common.areYouSure"), // "Are you sure?"
            text: t("common.unenrollConfirm"), // "You will remove this course from your enrolled courses!"
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: t("common.yesUnenroll"), // "Yes, unenroll"
            cancelButtonText: t("common.cancel"), // "Cancel"
            reverseButtons: true,
          });
    
          if (!result.isConfirmed) return; // Exit if cancelled
    
          await unEnrollCourse(course.id, userId);
          setLocalMyCourses((prev) => prev.filter((w) => w.id !== course.id));
          setAlertMessage(t("common.removedFromMyCourses"));
        } else {
          await enrollCourse(course, userId);
          setLocalMyCourses((prev) => [...prev, course.id]);
          setAlertMessage(t("common.addedToMyCourses"));
        }
    
        setAlertType("success");
        setShowAlert(true);
      } catch (error) {
        setAlertMessage(error?.message);
        setAlertType("error");
        setShowAlert(true);
      }
    };
    

  const createdAt = course.createdAt?.toDate?.()?.toLocaleDateString() || course.createdAt;
  const handleCourseClick = (course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    navigate("/CourseDetails");
  };
  return (
    <div

      className="overflow-hidden transition-all duration-300 transform bg-white shadow-md cursor-pointer rounded-2xl hover:shadow-lg hover:scale-105 hover:z-10"
      style={{ maxWidth: '400px' }}
      onClick={() => handleCourseClick(course)}

    >
      {/* {showAlert && <Alert type={alertType} message={alertMessage} />} */}

      <div className="relative">

        <img
          src={course.poster}
          alt={course.name}
          className="object-cover w-[500px] h-44"
        />

        <div className="absolute flex items-center px-2 py-1 text-xs font-medium bg-white rounded-full shadow top-3 left-3">
          <FaStar className="mr-1 text-yellow-400" /> {course.rating}
        </div>

        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
            {course.level}

          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{course.name}</h3>
        <p className="text-sm text-gray-500">by {course.author}</p>



        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
            <FaBookOpen /> {course.lessons} Lessons
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
            <FaClock /> {createdAt}
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
            <FaUser /> {course.students}+ Enrolled
          </div>

        </div>

        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
          <div className="flex items-center gap-1 bg-gray-100 rounded-full">
            {(isFavoritesed ?
              <MdOutlineFavorite
                onClick={(e) => {
                  handleAddToFavorites(e);
                }}
                className="w-10 h-10 px-2 py-1 text-red-500 cursor-pointer "
              />
              :
              <MdFavoriteBorder
                onClick={(e) => {
                  handleAddToFavorites(e);
                }}
                className="w-10 h-10 px-2 py-1 cursor-pointer"
              />
            )}
          </div>


          <div className="flex items-center gap-1 bg-gray-100 rounded-full">
            <img src={isWishListed ? WishlistImage : noWishlistImage} alt="nowishlist"
              className="w-8 h-8 px-1 py-1 text-red-500 "
              onClick={(e) => {
                handleAddToWishlist(e);
              }}

            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-gray-800">
            ${course.price}.00{" "}
            <span className="text-sm font-normal text-gray-500">/lifetime</span>
          </p>
          <button
            onClick={(e) => {
              handleAddToMyCourses(e);

            }}
            className="bg-[#149981] text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition"

          >
            {isMyCoursesed ? "UnEnroll" : "Enroll Now"}
          </button>
        </div>
      </div>


      {showAlert && <Alert message={alertMessage} type={alertType} />}
    </div>
  );
}
