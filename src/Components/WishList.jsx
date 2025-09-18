
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, selectUsers } from '../features/auth/usersSlice';
import { fetchCurrentUser, selectCurrentUser } from '../features/auth/currentUserSlice';
import { updateWishList } from '../features/auth/auth'
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


    const handleAddToWishlist = async () => {
        try {
            const userId = currentUserInfo?.uid;

            await updateWishList(course, userId)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(currentUserInfo?.wishList);

    return (
        <div className="flex flex-col items-center w-[75%] m-auto justify-center min-h-screen p-10 gap-10 shadow-2xl mb-4">
            <div>
                <button className=' bg-[#0ca0a0] p-3 rounded-2xl focus:bg-[#0a8181]'
                    onClick={handleAddToWishlist}>Add to Wishlist</button>
            </div>

        </div>
    )
}

export default WishList