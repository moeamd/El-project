import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { createUser, addUser } from "../features/users/addUser";
import { useState } from "react";
import LoadingSpinner from "../Components/loading-spinner";

export default function InstructorSignUp({ isOpen, onClose }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen flex items-start justify-center bg-gray-100 dark:bg-gray-900 pt-10 px-4">
      <div className="relative bg-white dark:bg-card max-w-md w-full p-8 rounded-2xl shadow-xl transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-gray-700 text-2xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-gray-100">
          Instructor Sign Up
        </h2>

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

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          {[
            { name: "name", placeholder: "Full Name", type: "text" },
            { name: "email", placeholder: "Email Address", type: "email" },
            { name: "password", placeholder: "Password", type: "password" },
            { name: "phone", placeholder: "Phone Number", type: "tel" },
            { name: "linkedin", placeholder: "LinkedIn Profile", type: "url" },
          ].map((field) => (
            <div key={field.name} className="text-start">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg"
              />
              {formik.errors[field.name] && formik.touched[field.name] && (
                <p className="text-red-500 mt-1 text-sm">
                  {formik.errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="text-start">
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bio}
              name="bio"
              placeholder="Short Bio"
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg"
            />
            {formik.errors.bio && formik.touched.bio && (
              <p className="text-red-500 mt-1 text-sm">{formik.errors.bio}</p>
            )}
          </div>

          <div className="text-start">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) =>
                formik.setFieldValue("image", event.currentTarget.files[0])
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {formik.errors.image && formik.touched.image && (
              <p className="text-red-500 mt-1 text-sm">{formik.errors.image}</p>
            )}
            {formik.values.image && (
              <div className="mt-3 flex justify-center">
                <img
                  src={URL.createObjectURL(formik.values.image)}
                  alt="Preview"
                  className="w-28 h-28 object-cover rounded-full border"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#3DCBB1] text-white rounded-xl text-lg font-semibold hover:bg-[#35b3a1] transition"
          >
            {loading ? <LoadingSpinner /> : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
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
