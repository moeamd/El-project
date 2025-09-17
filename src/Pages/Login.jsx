import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  logIn,
  signInWithGoogle,
  signInWithGithub,
  resetPassword,
} from "../features/auth/auth";
import { X } from "lucide-react";
import GitHubIcon from "../Assets/Images/RegisterImages/github.png";
import GoogleIcon from "../Assets/Images/RegisterImages/google.png";
import LoginImage from "../Assets/Images/RegisterImages/login.png";
import RegisterButton from "../Components/RegisterUser/RegisterButton";
import MyCoursesIo from "../Components/RegisterUser/MyCourses.io";
import Alert from "../Components/Alert";
function Login() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }

      return errors;
    },
    onSubmit: (values) => {
      const user = values;

      logIn(user)
        .then(() => {
          setAlertMessage("Logged in successfully!");
          setAlertType("success");
          setShowAlert(true);

          formik.resetForm();
          setTimeout(() => {
            navigate("/", { replace: false });
          }, 3000);
        })
        .catch((error) => {
          let msg = "";
          switch (error.code || error.message) {
            case "auth/invalid-credential":
              msg = "User not found.";
              break;
            case "auth/wrong-password":
              msg = "Incorrect password.";
              break;
            case "auth/invalid-email":
              msg = "Invalid email address.";
              break;
            case "MISSING_CREDENTIALS":
              msg = "Please enter both email and password.";
              break;
            case "auth/account-exists-with-different-credential":
              msg = "Email is already in use with different account.";
              break;
            case "EMAIL_NOT_VERIFIED":
              msg = "Check your email for verification link.";
              break;
            case "auth/network-request-failed":
              msg = "Check your internet connection.";
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

  return (
    <main className={" w-full  h-screen bg-[#1B1B1B]/60"}>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full h-full max-w-[800px] md:max-h-[550px] sm:h-auto flex flex-col sm:flex-row shadow-[0_4px_30px_rgba(0,0,0,0.1)] sm:rounded-[8px] ">
          <div
            className={
              "hidden sm:block w-full md:w-1/2 h-full md:h-auto rounded-tl-[8px] rounded-bl-[6px]"
            }
          >
            <img
              src={LoginImage}
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
                navigate(-1);
              }}
            />

            <MyCoursesIo />

            <p className={"loading-[24px] my-5 md:my-1 text-[#1B1B1B]/60"}>
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

            <div
              className={" flex justify-center  items-center my-[30px] md:my-0"}
            >
              or you can
            </div>

            <form
              className={"flex flex-col gap-3"}
              onSubmit={formik.handleSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className={"w-full p-2 bg-[#F9F9F9E5] rounded-[3px]"}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {displayError(formik.errors.email, formik.touched.email)}
              <input
                type="text"
                name="password"
                placeholder="Password"
                className={"w-full p-2 bg-[#F9F9F9E5] rounded-[3px]"}
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {displayError(formik.errors.password, formik.touched.password)}

              <div className={" flex justify-end my-0"}>
                <span
                  onClick={() => {
                    resetPassword(formik.values.email);
                  }}
                  className={
                    "text-xs  hover:underline cursor-pointer hover:text-[#3DCBB1]"
                  }
                >
                  Forget Password?
                </span>
              </div>

              <input
                type="submit"
                value="Log In"
                className={
                  ' bg-[#3DCBB1] hover:bg-[#19a88e] w-full text-white font-semibold mt-[25px] md:mt-1 py-[10px] px-[18px] rounded-[14px] items-center border"'
                }
              />
            </form>

            <div className={"text-center mt-[50px] md:mt-4"}>
              Need an account?{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className={"text-[#3DCBB1] hover:underline cursor-pointer "}
              >
                Sign Up
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

export default Login;
