import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import { NewCourse } from "./Pages/NewCourse";
import {  CoursesDahsbord, MainDashboard } from "./Dashboard/CoursesDahsbord";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newCourse" element={<NewCourse />} />
        <Route path="/MainDahsbord" element={<CoursesDahsbord />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
