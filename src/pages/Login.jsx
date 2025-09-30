import React, { useState } from 'react';
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data.user));
      setLoading(false);
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        `${serverUrl}/api/auth/googleauth`,
        {
          name: user.displayName,
          email: user.email,
          role: "student", // or "educator" if you want dynamic role
        },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data.user));
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="bg-[#f2f2f2] w-screen h-screen flex items-center justify-center px-4">
      <form
        className="w-full max-w-[900px] h-auto md:h-[600px] bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Left Section */}
        <div className="w-full md:w-[55%] flex flex-col items-center justify-center gap-5 p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black mb-1">Welcome back</h1>
            <h2 className="text-[#666] text-lg">Login to your account</h2>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-[85%]">
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              id="email"
              type="email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 w-[85%] relative">
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShow(prev => !prev)}
            >
              {show ? <IoEyeOutline size={20} /> : <IoEye size={20} />}
            </div>
          </div>

          {/* Login Button */}
          <button
            className="w-[85%] h-11 bg-black text-white rounded-md hover:opacity-90 transition mt-2"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Login"}
          </button>

          {/* Forgot Password */}
          <span
            className="text-sm text-gray-500 hover:text-black underline cursor-pointer"
            onClick={() => navigate('/forget')}
          >
            Forgot your password?
          </span>

          {/* Divider */}
          <div className="w-[85%] flex items-center gap-3 my-2">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or continue</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <div
            className="w-[85%] h-[42px] border border-black rounded-md flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-100 transition"
            onClick={handleGoogleLogin}
          >
            <img src={google} alt="Google Logo" className="w-[20px] h-[20px]" />
            <span className="text-[15px] text-gray-700 font-medium">Continue with Google</span>
          </div>

          {/* Signup Link */}
          <div className="text-sm text-[#6f6f6f]">
            Don't have an account?{" "}
            <span
              className="underline underline-offset-1 text-black cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex md:w-[45%] h-full bg-black items-center justify-center flex-col rounded-r-3xl p-6">
          <img
            src={logo}
            alt="LMS Logo"
            className="w-[160px] max-h-[160px] mb-4 shadow-xl object-contain"
          />
          <span className="text-2xl text-white font-semibold">LMS Project</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
