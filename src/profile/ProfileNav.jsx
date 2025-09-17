import React from 'react'
import { Link } from 'react-router-dom'

const ProfileNav = () => {
  return (
    <div className='container mx-auto flex justify-around border-b-2 border-gray-300 pb-4 mb-4 text-lg font-medium'>
        <Link to="/MainProfile/Profile">Profile</Link>
        <Link to="/MainProfile/Favorites">Favorites</Link>
        <Link to="/MainProfile/Wishlist">Wishlist</Link>
        <Link to="/MainProfile/MyCourses">My Courses</Link>
    </div>
  )
}

export default ProfileNav