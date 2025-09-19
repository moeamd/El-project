
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, selectUsers } from '../features/auth/usersSlice';
import { fetchCurrentUser, selectCurrentUser } from '../features/auth/currentUserSlice';
import CourseCard from '../Components/CourseCard';
function Favorites() {

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

  const userId = currentUserInfo;
  const favorites = userId?.favorites || [];

  const handleCourseClick = (course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    navigate("/CourseDetails");
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.length ?
        favorites.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onCardClick={handleCourseClick}
          />
        )) : <div>
          favorites Is Empty
        </div>
      }
    </div>
  )
}

export default Favorites