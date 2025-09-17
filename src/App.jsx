import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import { NewCourse } from "./Pages/NewCourse";
import {  CoursesDahsbord } from "./Dashboard/CoursesDahsbord";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import InstructorSignUp from "./Pages/Instructor-signup";
import Checkout from "./Pages/Checkout";
import { MainDashboard } from "./Dashboard/MainDashboard";
import MainProfile from "./profile/MainProfile";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newCourse" element={<NewCourse />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/MainProfile/*" element={<MainProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/MainDashboard/*" element={<MainDashboard />} />
        <Route path="/instructorsignup" element={<InstructorSignUp/>} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;



