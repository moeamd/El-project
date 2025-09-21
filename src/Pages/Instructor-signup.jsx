import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { createUser, addUser } from "../features/users/addUser";
import { useState } from "react";
import LoadingSpinner from "../Components/loading-spinner";
import { X, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import MyCoursesIo from "../Components/RegisterUser/MyCourses.io";
export default function InstructorSignUp({ onClose }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      phone: "",
      linkedin: "",
      image: null,
      status: false,
      courses: [],
      uid: "",
    },
    onSubmit: async (values) => {
      setError("");
      setSuccess(false);
      setLoading(true);

      try {
        const userCredential = await createUser(values.email, values.password);
        const user = userCredential.user;
        const { password, ...userData } = values;

        await addUser(
          {
            ...userData,
            status: "pending",
            createdAt: new Date(),
          },
          user.uid
        );

        setSuccess(true);
        formik.resetForm();

       
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (err) {
        if (err.code) {
          switch (err.code) {
            case "auth/email-already-in-use":
              setError("Email already in use. Please use a different email.");
              break;
            case "auth/invalid-email":
              setError("Invalid email format.");
              break;
            case "auth/weak-password":
              setError("Password must be at least 6 characters.");
              break;
            default:
              setError("Signup failed. Please try again.");
          }
        } else {
          setError(err.message || "Signup failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name is required";
      if (!values.bio) errors.bio = "Bio is required";
      if (!values.phone) errors.phone = "Phone is required";
      if (!values.linkedin) errors.linkedin = "LinkedIn is required";
      if (!values.image) errors.image = "Profile image is required";
      if (!values.email) errors.email = "Email is required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "Invalid email address";
      if (!values.password) errors.password = "Password is required";
      else if (values.password.length < 6)
        errors.password = "Password must be at least 6 characters";
      return errors;
    },
  });

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
  <div className="relative bg-white dark:bg-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 rounded-2xl shadow-2xl transition-colors duration-300">
   <X
  size={24}
  className={`cursor-pointer absolute ${
    i18n.language === "ar" ? "top-3 left-3" : "top-3 right-3"
  } z-10`}
  onClick={onClose}
/>
 <MyCoursesIo />

    <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-gray-100">
      Instructor Sign Up
    </h2>


    {/* Success Message */}
        {success && (
          <div className="mb-6 p-6 bg-green-50 border border-green-300 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-green-700 text-center">
              Your account has been created!
            </h2>
            <p className="text-center text-gray-700 mt-2">
              Your account is under review. We will get back to you shortly.
            </p>
          </div>
        )}

    {/* Error Message */}
    {error && (
      <div className="mb-6 p-4 text-red-700 bg-red-100 border border-red-300 rounded-lg text-sm">
        {error}
      </div>
    )}

    {/* Form */}
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "name", placeholder: "Full Name", type: "text" },
          { name: "email", placeholder: "Email Address", type: "email" },
          { name: "password", placeholder: "Password", type: "password" },
          { name: "phone", placeholder: "Phone Number", type: "tel" },
          { name: "linkedin", placeholder: "LinkedIn Profile", type: "url" },
        ].map((field) => (
          <div key={field.name} className="text-start col-span-1">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field.name]}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#3DCBB1] text-lg"
            />
            {formik.errors[field.name] && formik.touched[field.name] && (
              <p className="text-red-500 mt-1 text-sm">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="text-start">
        <textarea
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bio}
          name="bio"
          placeholder="Short Bio"
          rows="5"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3DCBB1] text-lg"
        />
        {formik.errors.bio && formik.touched.bio && (
          <p className="text-red-500 mt-1 text-sm">{formik.errors.bio}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="text-start">
        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <Upload size={40} className="text-gray-500 mb-3" />
          <span className="text-gray-600 font-medium">
            Click to upload profile picture
          </span>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={(event) =>
              formik.setFieldValue("image", event.currentTarget.files[0])
            }
          />
        </label>

        {formik.errors.image && formik.touched.image && (
          <p className="text-red-500 mt-2 text-sm">{formik.errors.image}</p>
        )}

        {formik.values.image && (
          <div className="mt-4 flex justify-center">
            <img
              src={URL.createObjectURL(formik.values.image)}
              alt="Preview"
              className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-[#3DCBB1] shadow-md"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-[#3DCBB1] text-white rounded-xl text-lg font-semibold hover:bg-[#35b3a1] transition"
      >
        {loading ? <LoadingSpinner /> : "Create Account"}
      </button>
    </form>

    <p className="text-center mt-8 text-gray-600 dark:text-gray-300">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-[#3DCBB1] font-semibold hover:underline"
      >
        Login
      </Link>
    </p>
  </div>
</div>

  );
}
