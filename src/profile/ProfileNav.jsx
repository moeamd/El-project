import { NavLink } from 'react-router-dom'

const ProfileNav = () => {
    return (
        <div className='container mx-auto flex justify-around border-b-2 border-gray-300 pb-4 mb-4 text-lg font-medium'>
            <NavLink to="/MainProfile/Profile" className={({ isActive }) => isActive ? "text-[#21ac92] font-bold text-2xl" : ""}>Profile</NavLink>
            <NavLink to="/MainProfile/Wishlist" className={({ isActive }) => isActive ? "text-[#21ac92] font-bold text-2xl" : ""}>Wishlist</NavLink>
            <NavLink to="/MainProfile/Favorites" className={({ isActive }) => isActive ? "text-[#21ac92] font-bold text-2xl" : ""}>Favorites</NavLink>
            <NavLink to="/MainProfile/MyCourses" className={({ isActive }) => isActive ? "text-[#21ac92] font-bold text-2xl" : ""}>My Courses</NavLink>
        </div>
    )
}

export default ProfileNav