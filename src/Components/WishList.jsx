
import { useEffect, useMemo , useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, selectUsers } from '../features/auth/usersSlice';
import { fetchCurrentUser, selectCurrentUser } from '../features/auth/currentUserSlice';
import CourseCard from './CourseCard';
import Pagination from './pagination';
function WishList() {

    const currentUser = useSelector(selectCurrentUser) ?? null;
    const { users } = useSelector(selectUsers) ?? [];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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
    const totalPages = Math.ceil(wishList.length / itemsPerPage);
 const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWishCourses = wishList.slice(startIndex, endIndex);



    return (
        <div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWishCourses.length ?
                currentWishCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                    />
                )) : <div>
                    WishList Is Empty
                </div>
            }
        </div>
    <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={(page) => setCurrentPage(page)}

      />
        </div>
      
    )
}

export default WishList