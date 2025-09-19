import { useState ,useEffect} from "react";
import { addCourse } from "../features/courses/addCourse";
import {
  BookOpenIcon,
  CurrencyDollarIcon,
  ClockIcon,
  TagIcon,
  VideoCameraIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircle2Icon, Link, PhoneOutgoingIcon } from "lucide-react";
import { selectCurrentUser } from "../features/auth/currentUserSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const NewCourse = () => {

  const currentUser = useSelector(selectCurrentUser);
  const { instructors } = useSelector((state) => state.instructors);
  const isInstructor =
  currentUser?.uid && instructors?.some((inst) => inst.id === currentUser.uid  );



  const [data, setData] = useState({
    name: "",
    price: "",
    hours: "",
    category: "",
    video: null,
    poster: null,
    status: "draft",
    description: "",
    instructorId: "",
    instructorName: "Unknown",
    instructorImage: "",
    createdAt: new Date(),
    rejectReason: "",
  });

  useEffect(() => {
    if (currentUser) {
      setData(prev => ({
        ...prev,
        instructorId: currentUser.uid || "",
        instructorName: currentUser.name || currentUser.email || "Unknown",
        instructorImage: currentUser.image || "/default-avatar.png",
      }));
    }
  }, [currentUser]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
    "Business",
    "Photography",
    "Music",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Course name is required";
    } else if (data.name.trim().length < 3) {
      newErrors.name = "Course name must be at least 3 characters";
    }

    if (!data.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(data.price) || parseFloat(data.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!data.hours.trim()) {
      newErrors.hours = "Course duration is required";
    } else if (isNaN(data.hours) || parseFloat(data.hours) <= 0) {
      newErrors.hours = "Please enter a valid duration";
    }

    if (!data.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!data.video) {
      newErrors.video = "Course video is required";
    }

    if (!data.poster) {
      newErrors.poster = "Course poster is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setData((prev) => ({ ...prev, [name]: file }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await addCourse(data);
      setSubmitStatus("success");
      setData({
        name: "",
        price: "",
        hours: "",
        category: "",
        video: null,
        poster: null,
        status: "draft",
        description: "",
        instructorId: "",
        instructorName: "",
        instructorImage: "",
        createdAt: new Date(),
        rejectReason: "",
      });
      // Reset file inputs
      const videoInput = document.getElementById("video-upload");
      const posterInput = document.getElementById("poster-upload");
      if (videoInput) videoInput.value = "";
      if (posterInput) posterInput.value = "";
    } catch (error) {
      console.error("Error adding course:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isInstructor) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Course
          </h1>
          <p className="text-gray-600">
            Fill in the details below to add your course to the platform
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 border border-gray-100 transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                <BookOpenIcon className="w-5 h-5 inline mr-2" />
                Course Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter course name"
                value={data.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>
            {/* Course Description */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                <BookOpenIcon className="w-5 h-5 inline mr-2" />
                Course Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter course description"
                value={data.description}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.description
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Price and Hours Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  <CurrencyDollarIcon className="w-5 h-5 inline mr-2" />
                  Price ($)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={data.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.price
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Hours */}
              <div>
                <label
                  htmlFor="hours"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  <ClockIcon className="w-5 h-5 inline mr-2" />
                  Duration (Hours)
                </label>
                <input
                  id="hours"
                  name="hours"
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="0"
                  value={data.hours}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.hours
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
                  }`}
                />
                {errors.hours && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                    {errors.hours}
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                <TagIcon className="w-5 h-5 inline mr-2" />
                Category
              </label>
              <select
                id="category"
                name="category"
                value={data.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.category
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300 focus:border-blue-500"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* Video Upload */}
            <div>
              <label
                htmlFor="video-upload"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                <VideoCameraIcon className="w-5 h-5 inline mr-2" />
                Course Video
              </label>
              <div className="relative">
                <input
                  id="video-upload"
                  type="file"
                  name="video"
                  onChange={handleFileChange}
                  accept="video/mp4,video/mov,video/avi,video/mkv"
                  className="hidden"
                />
                <label
                  htmlFor="video-upload"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                    errors.video
                      ? "border-red-300 bg-red-50 hover:bg-red-100"
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                >
                  <CloudArrowUpIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-blue-600 hover:text-blue-500">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    MP4, MOV, AVI, MKV (MAX. 2GB)
                  </p>
                </label>
              </div>
              {data.video && (
                <p className="mt-2 text-sm text-green-600 flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  Selected: {data.video.name}
                </p>
              )}
              {errors.video && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {errors.video}
                </p>
              )}
            </div>

            {/* Poster Upload */}
            <div>
              <label
                htmlFor="poster-upload"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                <PhoneOutgoingIcon className="w-5 h-5 inline mr-2" />
                Course Poster
              </label>
              <div className="relative">
                <input
                  id="poster-upload"
                  type="file"
                  name="poster"
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                />
                <label
                  htmlFor="poster-upload"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                    errors.poster
                      ? "border-red-300 bg-red-50 hover:bg-red-100"
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                >
                  <CloudArrowUpIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-blue-600 hover:text-blue-500">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, JPEG, WEBP (MAX. 5MB)
                  </p>
                </label>
              </div>
              {data.poster && (
                <>
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckCircle2Icon className="w-4 h-4 mr-1" />
                    Selected: {data.poster.name}
                  </p>
                  {/* Preview */}
                  <div className="mt-3">
                    <img
                      src={URL.createObjectURL(data.poster)}
                      alt="Course Poster"
                      className="h-32 rounded-lg shadow"
                    />
                  </div>
                </>
              )}
              {errors.poster && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {errors.poster}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Course...
                  </div>
                ) : (
                  "Create Course"
                )}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                  <p className="text-green-800 font-medium">
                    Course created successfully!
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
                  <p className="text-red-800 font-medium">
                    Failed to create course. Please try again.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
