import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstructors } from "../features/users/getinstructors-aprove";
import { Check, X, Mail, Phone, Linkedin } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Api/Firebase-Config";
import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { instructors, isLoading, error } = useSelector(
    (state) => state.instructors
  );

  const handleApprove = async (id) => {
    try {
      const ref = doc(db, "Instructors", id);
      await updateDoc(ref, { status: true });
      dispatch(getInstructors());
    } catch (err) {
      console.error("Error approving:", err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const ref = doc(db, "Instructors", id);
      await updateDoc(ref, { status: false });
      dispatch(getInstructors());
    } catch (err) {
      console.error("Error rejecting:", err.message);
    }
  };

  useEffect(() => {
    dispatch(getInstructors());
  }, [dispatch]);
    const handleCourseClick = (course) => {
    localStorage.setItem("selectedInstructor", JSON.stringify(course));
    Navigate("/instructorDetials");
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 space-y-10">
      {/* Section 1: Pending Requests */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Pending Requests
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {instructors
            .filter((inst) => inst.status === "pending")
            .map((instructor) => (
              <div
                key={instructor.id}
                className="flex flex-col p-5 transition-colors duration-300 bg-white shadow-md dark:bg-card rounded-xl hover:shadow-lg"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="object-cover w-20 h-20 mb-3 border rounded-full"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-gray-500">{instructor.email}</p>
                </div>

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600"
                    onClick={() => {
                      handleApprove(instructor.id);
                    }}
                  >
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                    onClick={() => {
                      handleReject(instructor.id);
                    }}
                  >
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Section 2: All Instructors */}
      <div >
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          All Instructors
        </h2>
        <div className="transition-colors duration-300 bg-white divide-y divide-gray-200 shadow dark:bg-card rounded-xl">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={()=> {handleCourseClick(instructor)}}
            >
              <div className="flex items-center gap-4">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="object-cover w-12 h-12 border rounded-full"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-800">
                    {instructor.name}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail className="w-4 h-4" /> {instructor.email}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  instructor.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-300 text-yellow-700"
                }`}
              >
                {instructor.status ? "Approved" : "Rejected"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
