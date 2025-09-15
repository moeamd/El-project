import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import { NewCourse } from "./Pages/NewCourse";
import {  MainDashboard } from "./Dashboard/MainDahsbord";
import  InstructorSignUp  from "./Pages/Instructor-signup";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newCourse" element={<NewCourse />} />
        <Route path="/MainDahsbord" element={<MainDashboard />} />
        <Route path="/instructorsignup" element={<InstructorSignUp/>} />
        <Route path="/checkout" element={<Checkout />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
