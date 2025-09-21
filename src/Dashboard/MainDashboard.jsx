import NavbarDashboard from "./NavbarDashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import { CoursesDahsbord } from "./CoursesDahsbord";
import InstructorDashboard from "./InstructorDashboard";
import { selectCurrentUser } from "../features/auth/currentUserSlice";
import { useSelector } from "react-redux";

export const MainDashboard = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { instructors } = useSelector((state) => state.instructors);

  const inst = instructors.find((i) => i.uid === currentUser?.uid);

  if (!inst || inst.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <NavbarDashboard />
      <div className="flex-1 p-8 space-y-12 bg-gray-100 dark:bg-gray-900">
        <Routes>
          <Route index element={<CoursesDahsbord />} />
          <Route path="CoursesDahsbord" element={<CoursesDahsbord />} />
          <Route path="InstructorDashboard" element={<InstructorDashboard />} />
        </Routes>
      </div>
    </div>
  );
};
