import { useState } from "react";
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
import { CheckCircle2Icon, PhoneOutgoingIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/currentUserSlice";
import { useTranslation } from "react-i18next";

export const NewCourse = () => {
  const { t } = useTranslation();
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    price: "",
    hours: "",
    category: "",
    video: null,
    poster: null,
    status: "draft",
    description: "",
    instructor: currentUser?.uid ,
    createdAt: new Date(),
    rejectReason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

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
        instructor: currentUser?.uid || "",
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

return (
  <div className="min-h-screen px-4 py-[70px] bg-gradient-to-br from-slate-50 to-blue-50 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {t("courseForm.title")}
        </h1>
        <p className="text-gray-600">{t("courseForm.subtitle")}</p>
      </div>

      {/* Form Container */}
      <div className="p-8 transition-colors duration-300 bg-white border border-gray-100 shadow-xl dark:bg-card rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              <BookOpenIcon className="inline w-5 h-5 mr-2" />
              {t("courseForm.name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder={t("courseForm.namePlaceholder")}
              value={data.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3DCBB1] focus:border-transparent transition-all duration-200 ${
                errors.name
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 hover:border-gray-300 focus:border-[#3DCBB1]"
              }`}
            />
            {errors.name && (
              <p className="flex items-center mt-2 text-sm text-red-600">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {t(`courseValidation.${errors.name}`)}
              </p>
            )}
          </div>

          {/* Course Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              <BookOpenIcon className="inline w-5 h-5 mr-2" />
              {t("courseForm.description")}
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder={t("courseForm.descriptionPlaceholder")}
              value={data.description}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#3DCBB1] focus:border-transparent transition-all duration-200 ${
                errors.description
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 hover:border-gray-300 focus:border-[#3DCBB1]"
              }`}
            />
            {errors.description && (
              <p className="flex items-center mt-2 text-sm text-red-600">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {t(`courseValidation.${errors.description}`)}
              </p>
            )}
          </div>

          {/* Price and Hours Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                <CurrencyDollarIcon className="inline w-5 h-5 mr-2" />
                {t("courseForm.price")}
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder={t("courseForm.pricePlaceholder")}
                value={data.price}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3DCBB1] focus:border-transparent transition-all duration-200 ${
                  errors.price
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300 focus:border-[#3DCBB1]"
                }`}
              />
              {errors.price && (
                <p className="flex items-center mt-2 text-sm text-red-600">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {t(`courseValidation.${errors.price}`)}
                </p>
              )}
            </div>

            {/* Hours */}
            <div>
              <label
                htmlFor="hours"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                <ClockIcon className="inline w-5 h-5 mr-2" />
                {t("courseForm.hours")}
              </label>
              <input
                id="hours"
                name="hours"
                type="number"
                step="0.5"
                min="0"
                placeholder={t("courseForm.hoursPlaceholder")}
                value={data.hours}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3DCBB1] focus:border-transparent transition-all duration-200 ${
                  errors.hours
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 hover:border-gray-300 focus:border-[#3DCBB1]"
                }`}
              />
              {errors.hours && (
                <p className="flex items-center mt-2 text-sm text-red-600">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {t(`courseValidation.${errors.hours}`)}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              <TagIcon className="inline w-5 h-5 mr-2" />
              {t("courseForm.category")}
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3DCBB1] focus:border-transparent transition-all duration-200 ${
                errors.category
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 hover:border-gray-300 focus:border-[#3DCBB1]"
              }`}
            >
              <option value="">{t("courseForm.categoryPlaceholder")}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="flex items-center mt-2 text-sm text-red-600">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {t(`courseValidation.${errors.category}`)}
              </p>
            )}
          </div>

          {/* Video Upload */}
          <div>
            <label
              htmlFor="video-upload"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              <VideoCameraIcon className="inline w-5 h-5 mr-2" />
              {t("courseForm.video")}
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
                <CloudArrowUpIcon className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-[#3DCBB1] hover:text-[#34b09b]">
                    {t("courseForm.upload")}
                  </span>{" "}
                  {t("courseForm.dragDrop")}
                </p>
                <p className="text-xs text-gray-400">{t("courseForm.videoFormats")}</p>
              </label>
            </div>
            {data.video && (
              <p className="flex items-center mt-2 text-sm text-green-600">
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                {t("courseForm.selected")}: {data.video.name}
              </p>
            )}
            {errors.video && (
              <p className="flex items-center mt-2 text-sm text-red-600">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {t(`courseValidation.${errors.video}`)}
              </p>
            )}
          </div>

          {/* Poster Upload */}
          <div>
            <label
              htmlFor="poster-upload"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              <PhoneOutgoingIcon className="inline w-5 h-5 mr-2" />
              {t("courseForm.poster")}
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
                <CloudArrowUpIcon className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-[#3DCBB1] hover:text-[#34b09b]">
                    {t("courseForm.upload")}
                  </span>{" "}
                  {t("courseForm.dragDrop")}
                </p>
                <p className="text-xs text-gray-400">{t("courseForm.imageFormats")}</p>
              </label>
            </div>
            {data.poster && (
              <>
                <p className="flex items-center mt-2 text-sm text-green-600">
                  <CheckCircle2Icon className="w-4 h-4 mr-1" />
                  {t("courseForm.selected")}: {data.poster.name}
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
              <p className="flex items-center mt-2 text-sm text-red-600">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {t(`courseValidation.${errors.poster}`)}
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
                  : "bg-gradient-to-r from-[#3DCBB1] to-[#34b09b] hover:from-[#34b09b] hover:to-[#2a8a78] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                  {t("courseForm.creating")}
                </div>
              ) : (
                t("courseForm.submit")
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="p-4 mt-4 border border-green-200 bg-green-50 rounded-xl">
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                <p className="font-medium text-green-800">
                  {t("courseStatus.success")}
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 mt-4 border border-red-200 bg-red-50 rounded-xl">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-red-600" />
                <p className="font-medium text-red-800">
                  {t("courseStatus.error")}
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
