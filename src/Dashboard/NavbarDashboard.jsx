import { ArrowLeftFromLine, Gauge, UsersRound } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavbarDashboard = () => {
  const [close, setClose] = useState(false);
  console.log(close);

  return (
    <div className="bg-blue-950 w-[400px] min-h-screen flex flex-col gap-5 text-2xl px-5 text-white pt-[100px] relative transition-all"
    style={{
      width: close ? "30px" : "300px",
      overflow: "hidden",
    }}
    >
      <ArrowLeftFromLine
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => {
          close ? setClose(false) : setClose(true);
        }}
      />
      <Link to="/MainDashboard/CoursesDahsbord" className="flex gap-5">
        <Gauge /> CourseDash
      </Link>
      <Link to="/MainDashboard/InstructorDashboard" className="flex gap-5">
        {" "}
        <UsersRound />
        InstructorDashboard
      </Link>
    </div>
  );
};

export default NavbarDashboard;
