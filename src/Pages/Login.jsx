import { replace, useFormik } from "formik";
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
import { useTranslation } from "react-i18next";

function Login({ onClose }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = t("common.required");
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = t("common.invalidEmail");
      }
      if (!values.password) {
        errors.password = t("common.required");
      } else if (values.password.length < 8) {
        errors.password = t("common.passwordTooShort");
      }

      return errors;
    },
    onSubmit: (values) => {
      setLoading(true);
      const user = values;

      logIn(user)
        .then(() => {
          setAlertMessage("Logged in successfully!");
          setAlertType("success");
          setShowAlert(true);

          formik.resetForm();
          setTimeout(() => {
           navigate("/" , replace(false));
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

          setAlertMessage(msg);
          setAlertType("error");
          setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }).finally(() => {
          setLoading(false);
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
          onclose();
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
          onclose();
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
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <main
        className={`w-full h-screen bg-black/40 dark:bg-surface-dark/80 transition-colors duration-300 ${i18n.language === "ar" ? "rtl" : "ltr"
          }`}
      >

        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full h-full max-w-[800px] md:max-h-[550px] sm:h-auto flex flex-col sm:flex-row shadow-lg sm:rounded-lg overflow-hidden bg-transparent">
            <div
              className={`hidden sm:block w-full md:w-1/2 h-full md:h-auto ${i18n.language === "ar"
                ? "rounded-tr-[8px] rounded-br-[6px]"
                : "rounded-tl-[8px] rounded-bl-[6px]"
                }`}
            >
              <img
                src={LoginImage}
                className={`w-full h-full ${i18n.language === "ar"
                  ? "rounded-tr-[8px] rounded-br-[6px]"
                  : "rounded-tl-[8px] rounded-bl-[6px]"
                  }`}
                alt="loading"
              />
            </div>
            <div
              className={`relative w-full md:w-1/2 h-full md:h-auto flex flex-col justify-stretch md:justify-between bg-white dark:bg-card p-5 ${i18n.language === "ar"
                ? "sm:rounded-tl-[8px] sm:rounded-bl-[6px]"
                : "sm:rounded-tr-[8px] sm:rounded-br-[6px]"
                } transition-colors duration-300`}
            >

              {/* <div className="absolute flex items-center gap-2 top-2 right-2">
              <LanguageToggle />
              <ThemeToggle />
            </div> */}

              <X
                size={20}
                className={`cursor-pointer absolute ${i18n.language === "ar" ? "top-2 left-2" : "top-2 right-2"
                  } z-10`}
                onClick={onClose}
              />

              <MyCoursesIo />


              <p className="loading-[24px] my-5 md:my-1 text-muted dark:text-muted-dark">
                {t("common.joinUs")}
              </p>

              <div className="flex flex-col gap-3">
                <RegisterButton
                  image={GitHubIcon}
                  text={t("common.signUpWithGitHub")}
                  onClick={handleSignInWithGithub}
                  bgColor="bg-[#1B1B1B] dark:bg-gray-700 "
                  hover="hover:bg-[#000000] "
                />
                <RegisterButton
                  image={GoogleIcon}
                  text={t("common.signUpWithGoogle")}
                  onClick={handleSignInWithGoogle}
                  bgColor="border-[#1B1B1B1A] dark:border-gray-600 "
                  textColor="text-black dark:text-white "
                  hover="hover:bg-yellow-400 "
                />
              </div>

              <div className="flex justify-center items-center my-[30px] md:my-0">
                {t("common.orYouCan")}
              </div>

              <form
                className="flex flex-col gap-3"
                onSubmit={formik.handleSubmit}
              >
                <input
                  type="email"
                  name="email"
                  placeholder={t("common.emailAddress") || "Email Address"}
                  className="w-full p-2 transition-colors bg-gray-100 rounded-sm dark:bg-card dark:text-text-dark"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {displayError(formik.errors.email, formik.touched.email)}
                <input
                  type="text"
                  name="password"
                  placeholder={t("common.password") || "Password"}
                  className="w-full p-2 transition-colors bg-gray-100 rounded-sm dark:bg-card dark:text-text-dark"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {displayError(formik.errors.password, formik.touched.password)}

                <div className="flex justify-end my-0">
                  <span
                    onClick={() => {
                      resetPassword(formik.values.email);
                    }}
                    className="text-xs hover:underline cursor-pointer hover:text-[#3DCBB1] dark:text-gray-400 dark:hover:text-[#3DCBB1] transition-colors"
                  >
                    {t("common.forgetPassword")}
                  </span>
                </div>
                <input
                  type="submit"
                  value={t("common.logIn")}
                  className="w-full px-4 py-2 mt-6 font-semibold text-white  rounded-lg bg-[#3DCBB1] hover:bg-[#21b69a] dark:bg-[#3DCBB1] dark:hover:bg-primary-dark"
                  disabled={loading}
                />

              </form>

              <div className="text-center mt-[50px] md:mt-4">
                {t("common.needAccount")}{" "}
                <span
                  onClick={() => {
                    onClose();
                  }}
                  className="text-[#3DCBB1] hover:underline cursor-pointer dark:text-[#3DCBB1] transition-colors"
                >
                  {t("common.signUp")}
                </span>
              </div>
            </div>
          </div>
        </div >

        {showAlert && <Alert message={alertMessage} type={alertType} />
        }
      </main >
    </div >
  );
}

function displayError(error, touched) {
  return (
    touched &&
    error && <p className={"text-xs text-red-700 m-0 p-0"}>{error}</p>
  );
}

export default Login;
