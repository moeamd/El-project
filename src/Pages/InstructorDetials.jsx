import { Mail, Phone, Globe, Star, BookOpen } from "lucide-react";
import { LiaLinkedin } from "react-icons/lia";
import InstructorCourses from "./InstructorCourses";

const InstructorDetials = () => {
    const instructor = JSON.parse(localStorage.getItem("selectedInstructor")) || []
    console.log(instructor.id);
    
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-[50px]">
      {/* Cover Header */}
      {/* Cover Header */}
{/* Cover Header */}
<div className="relative h-60 bg-gradient-to-r from-[#3DCBB1] to-[#34b9a3]">
  <div className="absolute transform -translate-x-1/2 left-1/2 -bottom-16 sm:left-20 sm:translate-x-0">
    <img
      src={instructor.image}
      alt="Instructor"
      className="object-cover border-4 border-white rounded-full shadow-lg w-[200px] h-[200px]"
    />
  </div>
</div>


      {/* Main Content */}
      <div className="px-6 pt-24 sm:pt-20 sm:px-12 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Sidebar Info */}
          <aside className="space-y-8 lg:col-span-1">
            {/* Profile Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {instructor.name}
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {instructor.title || 'Front End Developer' }
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    {instructor.rate || '4.8 (230 reviews)' }
                  
                </span>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Follow
                </button>
                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Message
                </button>
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                About Me
              </h2>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {instructor.bio}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                Contact Information
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-500" /> {instructor.email}
                </li>
                <li className="flex items-center gap-2">
                  <LiaLinkedin className="w-5 h-5 text-blue-500" /> {instructor.linkedin}
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-500" /> +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-500" /> www.johndoe.dev
                </li>
              </ul>
            </div>
          </aside>

          {/* Courses Section */}
          <main className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Courses by Instructor
              </h2>
              <button className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                View All
              </button>
            </div>

            <InstructorCourses id={instructor.uid}/>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetials;
