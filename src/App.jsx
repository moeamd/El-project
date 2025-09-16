import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import { NewCourse } from "./Pages/NewCourse";
import {  MainDashboard } from "./Dashboard/MainDahsbord";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newCourse" element={<NewCourse />} />
<<<<<<< Updated upstream
        <Route path="/MainDahsbord" element={<MainDashboard />} />
=======
        <Route path="/MainDahsbord" element={<CoursesDahsbord />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         <Route path="/instructorsignup" element={<InstructorSignUp/>} />
        <Route path="/checkout" element={<Checkout />} />
>>>>>>> Stashed changes
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
