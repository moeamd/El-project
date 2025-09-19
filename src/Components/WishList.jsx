
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, selectUsers } from '../features/auth/usersSlice';
import { fetchCurrentUser, selectCurrentUser } from '../features/auth/currentUserSlice';
import CourseCard from './CourseCard';
function WishList() {

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
    const wishList = userId?.wishList || [];

    const handleCourseClick = (course) => {
        localStorage.setItem("selectedCourse", JSON.stringify(course));
        navigate("/CourseDetails");
    };

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishList.length ?
                wishList.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onCardClick={handleCourseClick}
                    />
                )) : <div>
                    WishList Is Empty
                </div>
            }
        </div>
        // <div className="flex flex-col items-center w-[75%] m-auto justify-center min-h-screen p-10 gap-10 shadow-2xl mb-4">
        //     <div>

        //     </div>

        // </div>
    )
}

export default WishList