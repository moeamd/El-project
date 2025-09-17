import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import GitHubIcon from "../Assets/Images/RegisterImages/github.png";
import GoogleIcon from "../Assets/Images/RegisterImages/google.png";
import RegisterImage from "../Assets/Images/RegisterImages/register.png";
import RegisterButton from "../Components/RegisterUser/RegisterButton";
import MyCoursesIo from "../Components/RegisterUser/MyCourses.io";
import {
  signInWithGoogle,
  signInWithGithub,
  signUp,
  getCurrentUser,
} from "../features/auth/auth";
import Alert from "../Components/Alert";

function Signup() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.username) {
        errors.username = "Required";
      }

      const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      if (!values.email) {
        errors.email = "Required";
      } else if (!validateEmail.test(values.email)) {
        errors.email = "Invalid email address";
      }

      const minLength = 8;
      const hasUpper = /[A-Z]/.test(values.password);
      const hasLower = /[a-z]/.test(values.password);
      const hasNumber = /\d/.test(values.password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(values.password);

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < minLength) {
        errors.password = "Password must be at least 8 characters long";
      } else if (!hasUpper) {
        errors.password = "Password must contain at least one uppercase letter";
      } else if (!hasLower) {
        errors.password = "Password must contain at least one lowercase letter";
      } else if (!hasNumber) {
        errors.password = "Password must contain at least one number";
      } else if (!hasSpecial) {
        errors.password =
          "Password must contain at least one special character";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      return errors;
    },
    onSubmit: (values) => {
      const user = {
        username: values.username,
        email: values.email,
        password: values.password,
      };

      signUp(user)
        .then(() => {
          setAlertMessage("Signed up successfully! Please verify your email.");
          setAlertType("success");
          setShowAlert(true);

          formik.resetForm();

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((error) => {
          let msg = "";
          switch (error.code || error.message) {
            case "auth/email-already-in-use":
              msg = "Email is already in use.";
              break;
            case "auth/invalid-email":
              msg = "Invalid email address.";
              break;
            case "auth/weak-password":
              msg = "Password is too weak.";
              break;
            case "MISSING_CREDENTIALS":
              msg = "Please enter both email and password.";
              break;
            case "auth/account-exists-with-different-credential":
              msg = "Email is already in use with different account.";
              break;
            default:
              msg = "Something went wrong. Please try again.";
          }
          console.log(error);

          setAlertMessage(msg);
          setAlertType("error");
          setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        });
    },
  });

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        setAlertMessage("Signed in with Google successfully!");
        setAlertType("success");
        setShowAlert(true);

        setTimeout(() => {
          navigate("/", { replace: false });
        }, 3000);
      })
      .catch((error) => {
        let msg = "";
        switch (error.code || error.message) {
          case "auth/popup-closed-by-user":
            msg = "Popup closed before completing sign in.";
            break;
          case "auth/cancelled-popup-request":
            msg = "Sign in was cancelled.";
            break;
          case "auth/account-exists-with-different-credential":
            msg = "Email is already in use with different account.";
            break;
          default:
            msg = "Something went wrong. Please try again.";
        }
        console.log(error);
        setAlertMessage(msg);
        setAlertType("error");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const handleSignInWithGithub = () => {
    signInWithGithub()
      .then(() => {
        setAlertMessage("Signed in with GitHub successfully!");
        setAlertType("success");
        setShowAlert(true);

        setTimeout(() => {
          navigate("/", { replace: false });
        }, 3000);
      })
      .catch((error) => {
        let msg = "";
        switch (error.code || error.message) {
          case "auth/popup-closed-by-user":
            msg = "Popup closed before completing sign in.";
            break;
          case "auth/cancelled-popup-request":
            msg = "Sign in was cancelled.";
            break;
          case "auth/account-exists-with-different-credential":
            msg = "Email is already in use with different account.";
            break;
          default:
            msg = "Something went wrong. Please try again.";
        }
        console.log(error);
        setAlertMessage(msg);
        setAlertType("error");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  function fetchAndAddUser() {
    useEffect(() => {
      async () => {
        try {
          const user = await getCurrentUser();
          if (user) {
            addUser(user); // or dispatch(addUser(user)) if using Redux
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
    }, []);
  }
  return (
    <main
      id="signup"
      className={" w-full  h-screen inset-0 bg-[rgba(27,27,27,0.6)] z-50"}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full h-full max-w-[800px] md:max-h-[550px] sm:h-auto flex flex-col sm:flex-row shadow-[0_4px_30px_rgba(0,0,0,0.1)] sm:rounded-[8px] ">
          <div
            className={
              "hidden sm:block w-full md:w-1/2 h-full md:h-auto rounded-tl-[8px] rounded-bl-[6px]"
            }
          >
            <img
              src={RegisterImage}
              className={"w-full h-full rounded-tl-[8px] rounded-bl-[6px]"}
              alt="loading"
            />
          </div>
          <div
            className={
              " relative w-full md:w-1/2 h-full md:h-auto flex flex-col justify-stretch  md:justify-between  bg-[#FFFFFF] p-5 sm:rounded-tr-[8px] sm:rounded-br-[6px]"
            }
          >
            <X
              size={20}
              className="cursor-pointer absolute top-2 right-2"
              onClick={() => {
                navigate(-2);
              }}
            />

            <MyCoursesIo />

            <p className={"loading-[24px] my-4 md:my-1 text-[#1B1B1B]/60"}>
              Join us and get more benefits.
            </p>

            <div className={"gap-3 flex flex-col"}>
              <RegisterButton
                image={GitHubIcon}
                text="Sign up with GitHub"
                onClick={handleSignInWithGithub}
                bgColor="bg-[#1B1B1B]"
                hover=" hover:bg-[#000000]"
              />
              <RegisterButton
                image={GoogleIcon}
                text="Sign up with Google"
                onClick={handleSignInWithGoogle}
                bgColor="border-[#1B1B1B1A]"
                textColor="text-black"
                hover=" hover:bg-amber-300"
              />
            </div>

            <div className={" flex justify-center items-center my-4 md:my-0"}>
              or you can
            </div>

            <form
              className={"flex flex-col gap-2"}
              onSubmit={formik.handleSubmit}
            >
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
                className={"w-full p-2 bg-[#F9F9F9E5] rounded-[3px]"}
              />
              {displayError(formik.errors.username, formik.touched.username)}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className={"w-full p-2 bg-[#F9F9F9E5] rounded-[3px]"}
              />
              {displayError(formik.errors.email, formik.touched.email)}

              <input
                type="text"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                className={"w-full p-2 bg-[#F9F9F9E5] rounded-[3px]"}
              />
              {displayError(formik.errors.password, formik.touched.password)}

              <input
                type="text"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                className={"w-full p-2 bg-[#F9F9F9E5] rounded-[3px]"}
              />
              {displayError(
                formik.errors.confirmPassword,
                formik.touched.confirmPassword
              )}

              <input
                type="submit"
                value="Create Account"
                name="submit"
                className={
                  ' bg-[#3DCBB1] hover:bg-[#19a88e] w-full text-white font-semibold py-[10px] px-[18px] rounded-[14px] items-center border"'
                }
              />
            </form>

            <div className={"text-center mt-[50px] md:mt-1"}>
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className={"text-[#3DCBB1] hover:underline cursor-pointer"}
              >
                Log In
              </span>
            </div>
          </div>
        </div>
      </div>

      {showAlert && <Alert message={alertMessage} type={alertType} />}
    </main>
  );
}

function displayError(error, touched) {
  return (
    touched &&
    error && <p className={"text-xs text-red-700 m-0 p-0"}>{error}</p>
  );
}

export default Signup;
