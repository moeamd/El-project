
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, selectUsers } from '../features/auth/usersSlice';
import { fetchCurrentUser, selectCurrentUser } from '../features/auth/currentUserSlice';
import CourseCard from './CourseCard';
function WishList() {

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
    const wishList = userId?.wishList || [];



    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishList.length ?
                wishList.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                    />
                )) : <div>
                    WishList Is Empty
                </div>
            }
        </div>
      
    )
}

export default WishList