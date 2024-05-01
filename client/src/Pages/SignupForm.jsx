import { useState } from "react"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, isValidPassword } from "../helpers/regexMatcher";

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    const createNewAccount = async (event) => {
        event.preventDefault();
        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("Please fill all the details")
            return;
        }

        // email validation
        if (!isEmail(signupData.email)) 
        {
            toast.error("Invalid email id");
            return;
        }

        // password validation
        if(!isValidPassword(signupData.password))
        {
            toast.error("Password should atleast have 8 characters with a small letter, a capital letter, a number, a special character");
            return;
        }

        const formData= new FormData()
        formData.append("fullName", signupData.fullName)
        formData.append("email", signupData.email)
        formData.append("password", signupData.password)

        // dispatch create account action

        const response= await dispatch(createAccount(formData));
        console.log(response);
        if(response?.payload?.success){
            navigate("/");
        }

        setSignupData({
            fullName: "",
            email: "",
            password: "",
        });
    }

    return (
            <div className="flex items-center justify-center h-[100vh]">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Registration Page </h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold">Name</label>
                        <input required type="text" name="fullName" id="fullName" placeholder="Enter your full name" className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={setSignupData.fullName} />
                    </div>


                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input required type="email" name="email" id="email" placeholder="Enter your email id" className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={setSignupData.email} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input required type="password" name="password" id="password" placeholder="Enter your password" className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={setSignupData.password} />
                    </div>

                    <button className=" bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer mt-2" type="submit">
                        Create account
                    </button>
                    <p className="text-center">
                        Already have an accout? <Link to='/login' className="link text-accent cursor-pointer">Login</Link>
                    </p>
                </form>

            </div>
    )
}

export default SignUp
