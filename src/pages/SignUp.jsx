import React, { useState } from 'react';
import logo from "../assets/logo.jpg";
import google from "../assets/google.jpg";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, {
        name,
        email,
        password,
        role,
      }, { withCredentials: true });

      dispatch(setUserData(result.data));
      toast.success("Signup Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(`${serverUrl}/api/auth/googleauth`, {
        name: user.displayName,
        email: user.email,
        role,
      }, { withCredentials: true });

      dispatch(setUserData(result.data));
      toast.success("Signup Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Google Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[950px] bg-white shadow-xl rounded-3xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Section: Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="w-full md:w-[55%] flex flex-col justify-center px-8 py-10"
        >
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Let's Get Started</h1>
            <p className="text-gray-500 text-sm">Create your account</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-[38px] right-3 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <IoEyeOutline size={20} /> : <IoEye size={20} />}
              </div>
            </div>
          </div>

          {/* Role Buttons */}
          <div className="flex gap-3 mt-5">
            {["student", "educator"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  role === r
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 bg-black text-white py-2 rounded-md font-medium hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="mx-2 text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* Google Signup */}
          <div
            className="w-full border border-black rounded-md flex items-center justify-center gap-3 py-2 cursor-pointer hover:bg-gray-100 transition"
            onClick={handleGoogleSignup}
          >
            <img src={google} alt="Google Logo" className="w-5 h-5" />
            <span className="text-sm text-gray-700 font-medium">Continue with Google</span>
          </div>

          {/* Login Redirect */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate('/login')}
              className="text-black underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>

        {/* Right Section: Branding */}
        <div className="hidden md:flex md:w-[45%] bg-black items-center justify-center flex-col p-8">
          <img
            src={logo}
            alt="LMS Logo"
            className="w-[160px] h-[160px] mb-4 rounded-full object-cover shadow-lg"
          />
          <h2 className="text-2xl font-semibold text-white">LMS Project</h2>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
