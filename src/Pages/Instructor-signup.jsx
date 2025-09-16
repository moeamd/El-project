import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { createUser, addUser } from "../features/users/addUser";
import { useState } from "react";
import LoadingSpinner from "../Components/loading-spinner"

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
        },
        onSubmit: async (values) => {
            setError("");
            setSuccess(false);
            setLoading(true);

            try {
                const userCredential = await createUser(values.email, values.password);
                const user = userCredential.user;
                await addUser({ ...values, creatAt: new Date() });
                setSuccess(true);
                formik.resetForm();
            } catch (err) {
                console.error("Signup Error:", err);

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
            if (!values.email) {
                errors.email = "Email is required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Password is required";
            } else if (values.password.length < 6) {
                errors.password = "Password must be at least 6 characters";
            }
            return errors;
        },

    })

    // if (!isOpen) return null;
    return <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-10"> <div className="bg-white  max-w-lg p-6 rounded-xl shadow-lg center w-[400px]">
        <button
            onClick={onClose}
            className="absolute top-3 right-3 text-red-500 hover:text-gray-700"
        >
            ✕
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">
            Sign Up
        </h2>
        {success &&
            <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 border border-green-300 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-green-700 text-center">
                    your account has been created
                </h2>
                <p className="text-center text-gray-700 mt-2">
                    Your account is under review. We will get back to you shortly.
                </p>
            </div>
        }
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
            {error && (
                <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded-lg text-sm">
                    {error}
                </div>
            )}
            <div className="text-start">
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-[352px] h-[41px] max-w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {formik.errors.name && formik.touched.name && <p className="text-red-500">{formik.errors.name}</p>}
            </div>
            <div className="text-start">
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-[352px] h-[41px] max-w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {formik.errors.email && formik.touched.email && <p className="text-red-500">{formik.errors.email}</p>}

            </div>
            <div className="text-start">
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="w-[352px] h-[41px] max-w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {formik.errors.password && formik.touched.password && <p className="text-red-500">{formik.errors.password}</p>}

            </div>
            <div className="text-start">
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-[352px] h-[41px] max-w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {formik.errors.phone && formik.touched.phone && <p className="text-red-500">{formik.errors.phone}</p>}

            </div>
            <div className="text-start">
                <textarea
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bio}
                    name="bio"
                    placeholder="Short Bio"
                    rows="5"
                    className="w-[352px] h-[100px] max-w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                ></textarea>
                {formik.errors.bio && formik.touched.bio && <p className="text-red-500">{formik.errors.bio}</p>}

            </div>
            <div className="text-start">
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.linkedin}
                    type="url"
                    name="linkedin"
                    placeholder="LinkedIn Profile"
                    className="w-[352px] h-[41px] max-w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {formik.errors.linkedin && formik.touched.linkedin && <p className="text-red-500">{formik.errors.linkedin}</p>}

            </div>
            <div className="text-start">
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(event) => {
                        formik.setFieldValue("image", event.currentTarget.files[0]);
                    }}
                    className="w-[352px] h-[41px] max-w-full border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                {formik.errors.image && formik.touched.image && (
                    <p className="text-red-500">{formik.errors.image}</p>
                )}
                {formik.values.image && (
                    <div className="mt-2">
                        <img
                            src={URL.createObjectURL(formik.values.image)}
                            alt="image preview"
                            className="w-24 h-24 object-cover rounded-full border"
                        />
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-[#3DCBB1] text-white rounded-lg hover:bg-gray-500 transition rounded-xl[14px] text-16px "
            >
                {loading ? <LoadingSpinner /> : "Create Account"}
            </button>

        </form>
        <div className="text-center mt-5">
            <p>
                Already have an Account?
                <Link to="/login" className="text-[#3DCBB1] text-bold">Login</Link>
            </p>
        </div>
    </div>
    </div>
}