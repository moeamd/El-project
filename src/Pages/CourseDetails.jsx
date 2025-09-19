import React, { useState } from "react";
import {
  Share2,
  Star,
  Users,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

function CourseDetails() {
  const course = JSON.parse(localStorage.getItem("selectedCourse"));
  const [activeTab, setActiveTab] = useState("description");

  if (!course) {
    return <p className="text-center text-gray-500 mt-10">No course selected.</p>;
  }

  return (
    <div className="bg-gray-50 contaa dark:bg-gray-900 min-h-screen flex justify-center p-8 pt-[160px]">
      <div className="w-[80%] max-w-8xl grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2 flex flex-col items-center lg:items-start space-y-8">
          {/* Title */}
          <h1 className="text-5xl font-extrabold text-center lg:text-left text-gray-900 dark:text-gray-100">
            {course.name}
          </h1>

          {/* Short Description */}
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center lg:text-left max-w-4xl">
            Learn the skills you need to excel in this course with hands-on
            projects, expert guidance, and lifetime access.
          </p>

          {/* Rating + Meta Info */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-gray-700 text-base">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-lg">4.7 (2,350 reviews)</span>
            </div>
            <span>|</span>
            <span className="text-lg">{course.hours || "20"} total hours</span>
            <span>|</span>
            <span className="text-lg">{course.lessons || "45"} lectures</span>
            <span>|</span>
            <span className="text-lg">All Levels</span>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center gap-5 mt-8 mb-12">
            <img
              src={course.instructorImg || "./instructorImage.png"}
              alt="Instructor"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <p className="text-gray-500 text-base">Created by</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{course.author}</p>
            </div>
          </div>

          {/* ================= TABS ================= */}
          <div className="w-full max-w-4xl space-y-6">
            {/* Tab Headers */}
            <div className="flex justify-center lg:justify-start gap-8 border-b-2 border-gray-200 dark:border-gray-700 mb-6 text-lg">
              {["description", "certification", "instructor", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 capitalize font-semibold ${
                    activeTab === tab
                      ? "border-b-4 border-blue-600 text-blue-600"
                      : "text-gray-600 dark:text-gray-400 hover:text-blue-500 transition"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 text-center lg:text-left text-lg">
              {activeTab === "description" && (
                <>
                  <h2 className="text-3xl font-semibold">Course Description</h2>
                  <p>
                    {course.description ||
                      "This course covers everything you need to become proficient. You'll start from basics and move to advanced topics with real-world projects."}
                  </p>
                </>
              )}

              {activeTab === "certification" && (
                <>
                  <h2 className="text-3xl font-semibold">Certification</h2>
                  <p>
                    Upon completion, you will receive a certificate of achievement
                    to showcase your skills.
                  </p>
                </>
              )}

              {activeTab === "instructor" && (
                <>
                  <h2 className="text-3xl font-semibold">Instructor</h2>
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-6">
                    <img
                      src={course.instructorImg || "https://i.pravatar.cc/100"}
                      alt="Instructor"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{course.author}</p>
                      <p className="text-base text-gray-500 dark:text-gray-400">Lead Instructor</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-lg text-gray-700 dark:text-gray-300 mb-6">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <span>{course.reviews || "2,350"} Reviews</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <span>{course.students || "12,000"} Students</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      <span>{course.courses || "25"} Courses</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-base max-w-3xl mx-auto lg:mx-0">
                    {course.instructorBio ||
                      "This instructor has years of experience teaching and mentoring students worldwide. Their courses are highly rated and trusted by thousands of learners."}
                  </p>
                </>
              )}

              {activeTab === "reviews" && (
                <>
                  <h2 className="text-3xl font-semibold">Reviews</h2>
                  <p>No reviews yet. Be the first to leave a review!</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="border rounded-2xl shadow-lg p-6 bg-white dark:bg-card flex flex-col gap-6">
          <img
            src={course.poster}
            alt={course.name}
            className="w-full h-64 object-cover rounded-lg"
          />

          {/* Price */}
          <div className="flex flex-col items-center gap-3 text-lg font-medium">
            <span className="text-3xl text-gray-900 dark:text-gray-100">
              ${course.price || 49}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-red-500 line-through text-lg">${course.oldPrice || 99}</span>
              <span className="text-green-600 font-semibold text-lg">50% off</span>
            </div>
          </div>

          {/* Buttons */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-lg transition">
            Buy Now
          </button>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 dark:text-gray-900 font-bold py-4 rounded-lg text-lg transition">
            Add to Cart
          </button>

          {/* Share Icons */}
          <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-300 mt-2 text-xl">
            <FaFacebook className="w-6 h-6 cursor-pointer hover:text-blue-600 transition" />
            <FaTwitter className="w-6 h-6 cursor-pointer hover:text-sky-500 transition" />
            <FaLinkedin className="w-6 h-6 cursor-pointer hover:text-blue-700 transition" />
            <Share2 className="w-6 h-6 cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
