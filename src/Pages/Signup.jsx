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
import { useTranslation } from "react-i18next";
import LanguageToggle from "../Components/LanguageToggle";
import ThemeToggle from "../Components/ThemeToggle";

function Signup({onClose}) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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
        errors.username = t("common.required");
      }

      const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      if (!values.email) {
        errors.email = t("common.required");
      } else if (!validateEmail.test(values.email)) {
        errors.email = t("common.invalidEmail");
      }

      const minLength = 8;
      const hasUpper = /[A-Z]/.test(values.password);
      const hasLower = /[a-z]/.test(values.password);
      const hasNumber = /\d/.test(values.password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(values.password);

      if (!values.password) {
        errors.password = t("common.required");
      } else if (values.password.length < minLength) {
        errors.password = t("common.passwordTooShort");
      } else if (!hasUpper) {
        errors.password = t("common.passwordMustContainUppercase");
      } else if (!hasLower) {
        errors.password = t("common.passwordMustContainLowercase");
      } else if (!hasNumber) {
        errors.password = t("common.passwordMustContainNumber");
      } else if (!hasSpecial) {
        errors.password = t("common.passwordMustContainSpecial");
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = t("common.required");
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = t("common.passwordsNotMatch");
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
          }, 5000);
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
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
    <main
      id="signup"
      className={`w-full h-screen inset-0 bg-black/40 dark:bg-surface-dark/80 z-50 transition-colors duration-300 ${i18n.language === "ar" ? "rtl" : "ltr"
        }`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full h-full max-w-[800px] md:max-h-[550px] sm:h-auto flex flex-col sm:flex-row shadow-lg sm:rounded-lg overflow-hidden bg-transparent">
          <div
            className={`hidden sm:block w-full md:w-1/2 h-full md:h-auto ${i18n.language === "ar"
                ? "rounded-tr-[8px] rounded-br-[6px]"
                : "rounded-tl-[8px] rounded-bl-[6px]"
              }`}
          >
            <img
              src={RegisterImage}
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
            {/* <div className="absolute top-2 right-2 flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div> */}

            <X
              size={20}
              className={`cursor-pointer absolute ${i18n.language === "ar" ? "top-2 left-2" : "top-2 right-2"
                } z-10`}
              onClick={() => {
                onClose();
              }}
            />

            <MyCoursesIo />

            <p className="loading-[24px] my-4 md:my-1 text-muted dark:text-muted-dark">
              {t("common.joinUs")}
            </p>

            <div className="gap-3 flex flex-col">
              <RegisterButton
                image={GitHubIcon}
                text={t("common.signUpWithGitHub")}
                onClick={handleSignInWithGithub}
                bgColor="bg-[#1B1B1B] dark:bg-gray-700"
                hover="hover:bg-[#000000] dark:hover:bg-gray-800"
              />
              <RegisterButton
                image={GoogleIcon}
                text={t("common.signUpWithGoogle")}
                onClick={handleSignInWithGoogle}
                bgColor="border-[#1B1B1B1A] dark:border-gray-600"
                textColor="text-black dark:text-white"
                hover="hover:bg-amber-300 dark:hover:bg-amber-400"
              />
            </div>

            <div className="flex justify-center items-center my-4 md:my-0">
              {t("common.orYouCan")}
            </div>

            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <input
                type="text"
                name="username"
                placeholder={t("common.username")}
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
                className="w-full p-2 bg-gray-100 dark:bg-card dark:text-text-dark rounded-sm transition-colors"
              />
              {displayError(formik.errors.username, formik.touched.username)}
              <input
                type="email"
                name="email"
                placeholder={t("common.emailAddress")}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className="w-full p-2 bg-gray-100 dark:bg-card dark:text-text-dark rounded-sm transition-colors"
              />
              {displayError(formik.errors.email, formik.touched.email)}

              <input
                type="text"
                name="password"
                placeholder={t("common.password")}
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                className="w-full p-2 bg-gray-100 dark:bg-card dark:text-text-dark rounded-sm transition-colors"
              />
              {displayError(formik.errors.password, formik.touched.password)}

              <input
                type="text"
                name="confirmPassword"
                placeholder={t("common.confirmPassword")}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-[3px] transition-colors"
              />
              {displayError(
                formik.errors.confirmPassword,
                formik.touched.confirmPassword
              )}

              <input
                type="submit"
                value={t("common.createAccount")}
                name="submit"
                className="bg-[#3DCBB1] hover:bg-[#21b69a] dark:bg-primary dark:hover:bg-primary-dark w-full text-white font-semibold py-2 px-4 rounded-lg "
              />
            </form>

            <div className="text-center mt-[50px] md:mt-1">
              {t("common.alreadyHaveAccount")}{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className="text-[#3DCBB1] hover:underline cursor-pointer dark:text-[#3DCBB1] transition-colors"
              >
                {t("common.logIn")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showAlert && <Alert message={alertMessage} type={alertType} />}
    </main>
    </div>
  );
}

function displayError(error, touched) {
  return (
    touched &&
    error && <p className={"text-xs text-red-700 m-0 p-0"}>{error}</p>
  );
}

export default Signup;
