import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstructors } from "../features/users/getinstructors-aprove";
import { Check, X, Mail, Phone, Linkedin } from "lucide-react";

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const { instructors, isLoading, error } = useSelector(
    (state) => state.instructors
  );

  const handelApprove = (Id)=> {
            
  }

  useEffect(() => {
    dispatch(getInstructors());
    
  }, [dispatch]);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 space-y-10">
      {/* Section 1: Pending Requests */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Pending Requests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors
            .filter((inst) => inst.status === false) 
            .map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white shadow-md rounded-xl p-5 flex flex-col hover:shadow-lg transition"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-20 h-20 rounded-full object-cover border mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-gray-500">{instructor.email}</p>
                </div>

                <div className="mt-4 flex justify-center gap-3">
                  <button className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600" onClick={()=> {handelApprove(instructor.id);
                  }}>
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Section 2: All Instructors */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Instructors</h2>
        <div className="divide-y divide-gray-200 bg-white shadow rounded-xl">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-800">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail className="w-4 h-4" /> {instructor.email}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  instructor.status
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {instructor.status ? "Approved" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
