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

function App() {
  const location = useLocation();

  const hiddenRoutes = ["/login", "/signup", "/instructorsignup","/MainDashboard",'/MainDashboard/CoursesDahsbord',"/MainDashboard/InstructorDashboard"];
  const shouldHideNavbarAndFooter = hiddenRoutes.includes(location.pathname);

  return (
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!shouldHideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;
