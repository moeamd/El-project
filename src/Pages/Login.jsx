import GitHubIcon from "../Assets/Images/RegisterImages/github.png"
import GoogleIcon from "../Assets/Images/RegisterImages/google.png"
import LoginImage from "../Assets/Images/RegisterImages/login.png"
import RegisterButton from '../Components/RegisterUser/RegisterButton'
import MyCoursesIo from "../Components/RegisterUser/MyCourses.io"
import { useFormik } from "formik"

function Login() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: values => {

            let errors = {};


            if (!values.email) {
                errors.email = 'Required'
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 8) {
                errors.password = 'Password must be at least 8 characters long'
            }


            return errors;
        },
        onSubmit: values => {
            console.log(values);
        }
    });
    console.log("values :", formik.errors)
    return (
        <main className={' w-full  h-screen bg-[#1B1B1B]/60'}>
            <div className="w-full h-full flex justify-center items-center">


                <div className="w-full h-full max-w-[800px] md:max-h-[550px] sm:h-auto flex flex-col sm:flex-row shadow-[0_4px_30px_rgba(0,0,0,0.1)] sm:rounded-[8px] ">

                    <div className={'hidden sm:block w-full md:w-1/2 h-full md:h-auto rounded-tl-[8px] rounded-bl-[6px]'}>
                        <img src={LoginImage} className={'w-full h-full rounded-tl-[8px] rounded-bl-[6px]'} alt="loading" />
                    </div>
                    <div className={'w-full md:w-1/2 h-full md:h-auto flex flex-col justify-stretch  md:justify-between  bg-[#FFFFFF] p-5 sm:rounded-tr-[8px] sm:rounded-br-[6px]'}>

                        {/* <FontAwesomeIcon icon={byPrefixAndName.fas['x']} /> */}

                        <MyCoursesIo />

                        <p className={'loading-[24px] my-5 md:my-1 text-[#1B1B1B]/60'}>Join us and get more benefits.</p>

                        <div className={'gap-3 flex flex-col'}>

                            <RegisterButton
                                image={GitHubIcon}
                                text="Sign up with GitHub"
                                onClick={() => console.log("GitHub Sign Up")}
                                bgColor="bg-[#1B1B1B]"
                            />
                            <RegisterButton
                                image={GoogleIcon}
                                text="Sign up with Google"
                                onClick={() => console.log("Google Sign Up")}
                                bgColor="border-[#1B1B1B1A]"
                                textColor="text-black"
                            />
                        </div>

                        <div className={' flex justify-center items-center my-[30px] md:my-0'}>or you can</div>

                        <form className={'flex flex-col gap-3'}>
                            <input type="email" name="email" placeholder='Email Address' className={'w-full p-2 bg-[#F9F9F9E5] rounded-[3px]'}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                            />
                            {displayError(formik.errors.email, formik.touched.email)}
                            <input type="text" name="password" placeholder='Password' className={'w-full p-2 bg-[#F9F9F9E5] rounded-[3px]'}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                            />
                            {displayError(formik.errors.password, formik.touched.password)}

                            <input type="submit" value="Create Account" className={' bg-[#3DCBB1] w-full text-white font-semibold mt-[25px] md:mt-1 py-[10px] px-[18px] rounded-[14px] items-center border"'} />
                        </form>

                        <div className={'text-center mt-[50px] md:mt-4'}>
                            Need an account? <span onClick={() => { window.location.href = '/' }} className={'text-[#3DCBB1] hover:underline cursor-pointer'}>Sign Up</span>
                        </div>
                    </div>
                </div>
            </div >
        </main >
    )
}


function displayError(error, touched) {
    return (
        (touched && error) && <p className={"text-xs text-red-700 m-0 p-0"}>{error}</p>
    )
}

export default Login