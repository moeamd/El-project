import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstructors } from "../features/users/getinstructors-aprove";
import { Check, X, Mail, Phone, Linkedin } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Api/Firebase-Config";

const InstructorDashboard = () => {
  const dispatch = useDispatch();
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

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 space-y-12 bg-gray-100 dark:bg-gray-900 min-h-screen flex-1">
      {/* Section 1: Pending Requests */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Pending Requests
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors
            .filter((inst) => inst.status === "pending")
            .map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white dark:bg-card shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition duration-300"
              >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {instructor.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {instructor.email}
                </p>
  
                <div className="flex justify-center gap-3">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition"
                    onClick={() => handleApprove(instructor.id)}
                  >
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                    onClick={() => handleReject(instructor.id)}
                  >
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
  
      {/* Section 2: All Instructors */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          All Instructors
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-card shadow rounded-xl transition-colors duration-300">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Mail className="w-4 h-4" /> {instructor.email}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  instructor.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
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
