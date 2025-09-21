import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import { NewCourse } from "./Pages/NewCourse";
import { CoursesDahsbord } from "./Dashboard/CoursesDahsbord";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import InstructorSignUp from "./Pages/Instructor-signup";
import Checkout from "./Pages/Checkout";
import { MainDashboard } from "./Dashboard/MainDashboard";
import UserProfile from "./Components/UserProfile";
import MainProfile from "./profile/MainProfile";
import CourseDetails from "./Pages/CourseDetails";

import WishList from "./Components/WishList";
import SearchPage from "./Pages/search/search-page";
import InstructorDetials from "./Pages/InstructorDetials";
import InstructorCourses from "./Pages/InstructorCourses";
import { Wishlist } from "./profile/Wishlist";
import LoadingSpinner from "./Components/loading-spinner";
import { useEffect, useState } from "react";


function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); 
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, [location.pathname]); 

  const hiddenRoutes = [
    "/login",
    "/signup",
    "/instructorsignup",
    "/MainDashboard",
    "/MainDashboard/CoursesDahsbord",
    "/MainDashboard/InstructorDashboard",
  ];
  const shouldHideNavbarAndFooter = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!shouldHideNavbarAndFooter && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newCourse" element={<NewCourse />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/MainProfile/*" element={<MainProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/MainDashboard/*" element={<MainDashboard />} />
            <Route path="/instructorsignup" element={<InstructorSignUp />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/CourseDetails" element={<CourseDetails />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/SearchPage" element={<SearchPage />} />
            <Route path="/instructorDetials" element={<InstructorDetials />} />
            <Route path="/InstructorCourses" element={<InstructorCourses />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
          {!shouldHideNavbarAndFooter && <Footer />}
        </>
      )}
    </>
  );
}

export default App;

