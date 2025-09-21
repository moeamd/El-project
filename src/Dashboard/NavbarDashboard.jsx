import { ArrowLeftFromLine, Gauge, UsersRound, Home } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavbarDashboard = () => {
  const [close, setClose] = useState(false);

  return (
    <div
      className={`bg-blue-950 text-white min-h-screen flex flex-col pt-20 relative transition-all duration-300`}
      style={{
        width: close ? "80px" : "280px", 
        overflow: "hidden",
      }}
    >
      
      <ArrowLeftFromLine
        className={`absolute cursor-pointer top-5 right-5 transition-transform duration-300 ${
          close ? "rotate-180" : ""
        }`}
        onClick={() => setClose(!close)}
      />


      <nav className="flex flex-col gap-6 px-4 mt-10">
        <Link
          to="/"
          className="flex items-center gap-3 transition-colors hover:text-teal-300"
        >
          <Home />
          {!close && <span>Home</span>}
        </Link>

        <Link
          to="/MainDashboard/CoursesDahsbord"
          className="flex items-center gap-3 transition-colors hover:text-teal-300"
        >
          <Gauge />
          {!close && <span>Courses Dashboard</span>}
        </Link>

        <Link
          to="/MainDashboard/InstructorDashboard"
          className="flex items-center gap-3 transition-colors hover:text-teal-300"
        >
          <UsersRound />
          {!close && <span>Instructor Dashboard</span>}
        </Link>
      </nav>
    </div>
  );
};

export default NavbarDashboard;
