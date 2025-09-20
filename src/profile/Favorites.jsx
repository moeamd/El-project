
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, selectUsers } from '../features/auth/usersSlice';
import { fetchCurrentUser, selectCurrentUser } from '../features/auth/currentUserSlice';
import CourseCard from '../Components/CourseCard';
function Favorites() {

  const currentUser = useSelector(selectCurrentUser) ?? null;
  const { users } = useSelector(selectUsers) ?? [];

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



  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.length ?
        favorites.map((course,index) => (
          <CourseCard
            key={course.id || index}
            course={course}
          />
        )) : <div>
          favorites Is Empty
        </div>
      }
    </div>
  )
}

export default Favorites