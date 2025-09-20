import React, { useState } from "react";
import { Share2, Star, Users, BookOpen, MessageSquare } from "lucide-react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

function CourseDetails() {
  const course = JSON.parse(localStorage.getItem("selectedCourse"));
  const [activeTab, setActiveTab] = useState("description");

  if (!course) {
    return (
      <p className="mt-10 text-center text-gray-500 dark:text-gray-400">
        No course selected.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f8fc] dark:bg-gray-900 flex justify-center px-4 sm:px-6 pt-[140px] md:pt-[160px] lg:pt-[180px] transition-colors duration-500">
      <div className="grid w-full gap-6 mb-20 max-w-7xl md:gap-10 lg:gap-14 lg:grid-cols-4">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center space-y-6 md:space-y-8 lg:col-span-3 lg:items-start lg:px-8">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 md:text-4xl lg:text-5xl dark:text-gray-100 lg:text-left">
            {course.name}
          </h1>

          <p className="max-w-3xl text-base text-center text-gray-700 dark:text-gray-300 md:text-lg lg:text-left">
            {course.description ||
              "Learn the skills you need to excel in this course with hands-on projects, expert guidance, and lifetime access."}
          </p>

          {/* Rating + Meta */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-700 md:gap-6 md:text-base dark:text-gray-300 lg:justify-start">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Star className="w-4 h-4 text-yellow-400 md:w-5 md:h-5 fill-yellow-400" />
              <span className="text-sm font-semibold md:text-base">
                4.7 (2,350 reviews)
              </span>
            </div>
            <span className="hidden sm:inline">|</span>
            <span>{course.hours || "20"} total hours</span>
            <span className="hidden sm:inline">|</span>
            <span>{course.lessons || "45"} lectures</span>
            <span className="hidden sm:inline">|</span>
            <span>All Levels</span>
          </div>

          {/* Instructor Info */}
          <div className="flex flex-col items-center gap-4 mt-4 mb-8 sm:flex-row sm:items-center">
            <img
              src={course.instructorImg || "https://i.pravatar.cc/100"}
              alt="Instructor"
              className="object-cover w-16 h-16 border-2 border-gray-300 rounded-full sm:w-20 sm:h-20 dark:border-gray-700"
            />
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Created by
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {course.author}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="w-full max-w-4xl space-y-4 md:space-y-6">
            {/* Tab Headers */}
            <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm border-b-2 border-gray-200 md:text-lg lg:justify-start dark:border-gray-700">
              {["description", "certification", "instructor", "reviews"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 md:pb-3 capitalize font-semibold ${
                      activeTab === tab
                        ? "border-b-4 border-blue-600 text-blue-600"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Tab Content */}
            <div className="space-y-4 text-sm leading-relaxed text-center text-gray-700 md:space-y-6 md:text-lg dark:text-gray-300 lg:text-left">
              {activeTab === "description" && (
                <>
                  <h2 className="text-xl font-semibold md:text-2xl">
                    Course Description
                  </h2>
                  <p>
                    {course.description ||
                      "This course covers everything you need to become proficient."}
                  </p>
                </>
              )}
              {activeTab === "certification" && (
                <>
                  <h2 className="text-xl font-semibold md:text-2xl">
                    Certification
                  </h2>
                  <p>
                    Upon completion, you will receive a certificate of
                    achievement.
                  </p>
                </>
              )}
              {activeTab === "instructor" && (
                <>
                  <h2 className="text-xl font-semibold md:text-2xl">
                    Instructor
                  </h2>
                  <div className="flex flex-col items-center gap-4 mb-6 lg:flex-row lg:items-start">
                    <img
                      src={course.instructorImg || "https://i.pravatar.cc/100"}
                      alt="Instructor"
                      className="object-cover w-16 h-16 rounded-full sm:w-20 sm:h-20"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {course.author}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Lead Instructor
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mb-4 text-gray-700 md:gap-8 dark:text-gray-300 lg:justify-start">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-600 md:w-5 md:h-5" />{" "}
                      <span>{course.reviews || "2,350"} Reviews</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <Users className="w-4 h-4 text-green-600 md:w-5 md:h-5" />{" "}
                      <span>{course.students || "12,000"} Students</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <BookOpen className="w-4 h-4 text-purple-600 md:w-5 md:h-5" />{" "}
                      <span>{course.courses || "25"} Courses</span>
                    </div>
                  </div>
                  <p className="max-w-3xl mx-auto text-gray-600 lg:mx-0 dark:text-gray-400">
                    {course.instructorBio ||
                      "This instructor has years of experience teaching and mentoring students worldwide."}
                  </p>
                </>
              )}
              {activeTab === "reviews" && (
                <>
                  <h2 className="text-xl font-semibold md:text-2xl">Reviews</h2>
                  <p>No reviews yet. Be the first to leave a review!</p>
                </>
              )}
            </div>
          </div>
        </div>

     {/* RIGHT SIDE */}
<div className="flex flex-col gap-4 p-5 bg-white border border-gray-200 shadow-lg rounded-2xl lg:w-[380px] h-fit">
  {/* Course Poster */}
  <div className="overflow-hidden rounded-xl">
    <img
      src={course.poster}
      alt={course.name}
      className="object-cover w-full h-64 transition-transform duration-300 hover:scale-105"
    />
  </div>

  {/* Price Section */}
  <div className="flex flex-col items-center gap-1">
    <span className="text-3xl font-extrabold text-gray-900">
      ${course.price || 49}
    </span>
    <div className="flex items-center gap-2">
      <span className="text-lg text-red-500 line-through">
        ${course.oldPrice || 99}
      </span>
      <span className="text-lg font-semibold text-green-600">50% OFF</span>
    </div>
  </div>

  {/* Buttons */}
  <div className="flex flex-col w-full gap-2">
    <button className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
      Buy Now
    </button>
    <button className="w-full py-3 text-lg font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
      Add to Cart
    </button>
  </div>

  {/* Extras */}
  <div className="flex flex-col items-center gap-2 pt-4 text-sm text-gray-600 border-t">
    <p>✔ Lifetime access</p>
    <p>✔ 30-day money-back guarantee</p>
    <p>✔ Access on mobile and TV</p>
  </div>

  {/* Share Section */}
  <div className="flex flex-col items-center gap-2 mt-2">
    <p className="text-sm font-medium text-gray-500">Share this course</p>
    <div className="flex items-center justify-center gap-4 text-gray-600">
      <FaFacebook className="w-6 h-6 cursor-pointer hover:text-blue-600" />
      <FaTwitter className="w-6 h-6 cursor-pointer hover:text-sky-500" />
      <FaLinkedin className="w-6 h-6 cursor-pointer hover:text-blue-700" />
      <Share2 className="w-6 h-6 cursor-pointer hover:text-gray-800" />
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default CourseDetails;


