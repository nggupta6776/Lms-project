import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";

function Nav() {
  const { userData } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setshow] = useState(false);
  const [showHam, setshowHam] = useState(false);

  const handleLogOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="w-full h-[70px] fixed top-0 px-6 py-2 flex items-center justify-between backdrop-blur-md bg-[#00000050] shadow-md z-30">
      
      {/* Logo */}
      <div className="lg:w-[20%] w-[40%]">
        <img
          src={logo}
          alt="Logo"
          className="w-[60px] rounded-[10px] border-2 border-white shadow-md cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-6 items-center relative">
      {/* Profile / Avatar */}
       {userData ? (
         userData.photoUrl ? (
        <img
          src={userData.photoUrl}
         className="w-[50px] h-[50px] bg-black text-white border-2 border-white rounded-full flex items-center justify-center text-xl cursor-pointer hover:scale-105 transition"
           onClick={() => setshow(prev => !prev)}
            alt="User Avatar"
          />
          ) : (
        <div
      className="w-[50px] h-[50px] bg-black text-white border-2 border-white rounded-full flex items-center justify-center text-xl cursor-pointer hover:scale-105 transition"
      onClick={() => setshow(prev => !prev)}
      >
      {userData?.name?.slice(0, 1)?.toUpperCase() || "U"}
    </div>
    )
    ) : (
  <IoPersonCircleSharp
    className="w-[50px] h-[50px] fill-white cursor-pointer hover:scale-110 transition"
    onClick={() => navigate("/login")}
  />
)}

        {/* Dropdown */}
        {show && (
          <div className="absolute top-[70px] right-0 w-[180px] bg-white shadow-xl rounded-lg p-4 flex flex-col gap-2 animate-fade-in border border-gray-200 z-50">
            <span
              className="text-black hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer transition"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </span>
            <span className="text-black hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer transition">
              My Courses
            </span>
          </div>
        )}

        {/* Educator Dashboard */}
        {userData?.role?.toLowerCase() === "educator" && (
      <div
       className="px-4 py-2 bg-black text-white rounded-md border-2 border-white cursor-pointer hover:bg-white hover:text-black transition"
        onClick={() => navigate("/dashboard")}
        >
         Dashboard
        </div>
      )}



        {/* Login/Logout */}
        {userData ? (
          <div
            className="px-4 py-2 bg-black text-white border-2 border-white rounded-md cursor-pointer hover:bg-red-600 transition"
            onClick={handleLogOut}
          >
            Logout
          </div>
        ) : (
          <div
            className="px-4 py-2 bg-black text-white border-2 border-white rounded-md cursor-pointer hover:bg-white hover:text-black transition"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        )}
      </div>

      {/* Hamburger Icon (Mobile) */}
      <RxHamburgerMenu
        className="w-[30px] h-[35px] lg:hidden fill-white cursor-pointer"
        onClick={() => setshowHam(true)}
      />

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black bg-opacity-90 backdrop-blur-md transform transition-transform duration-500 ease-in-out z-50 ${
          showHam ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <GiSplitCross
          className="w-[35px] h-[35px] fill-white absolute top-5 right-5 cursor-pointer"
          onClick={() => setshowHam(false)}
        />

        <div className="flex flex-col items-center justify-center h-full gap-6 text-white text-lg">
          {userData ? (
            <div
              className="w-[50px] h-[50px] bg-white text-black rounded-full flex items-center justify-center text-xl cursor-pointer"
            >
              {userData?.name?.slice(0, 1)?.toUpperCase() || "U"}
            </div>
          ) : (
            <IoPersonCircleSharp
              className="w-[50px] h-[50px] fill-white cursor-pointer"
              onClick={() => {
                navigate("/login");
                setshowHam(false);
              }}
            />
          )}

          <div
            className="w-[200px] py-3 bg-white text-black text-center rounded-md cursor-pointer hover:bg-gray-300 transition"
            onClick={() => {
              navigate("/profile");
              setshowHam(false);
            }}
          >
            My Profile
          </div>

          <div className="w-[200px] py-3 bg-white text-black text-center rounded-md cursor-pointer hover:bg-gray-300 transition">
            My Courses
          </div>

          {userData?.role === "educator" && (
            <div
              className="w-[200px] py-3 bg-white text-black text-center rounded-md cursor-pointer hover:bg-gray-300 transition"
              onClick={() => {
                navigate("/dashboard");
                setshowHam(false);
              }}
            >
              Dashboard
            </div>
          )}

          {userData ? (
            <div
              className="w-[200px] py-3 bg-red-600 text-white text-center rounded-md cursor-pointer hover:bg-red-700 transition"
              onClick={() => {
                handleLogOut();
                setshowHam(false);
              }}
            >
              Logout
            </div>
          ) : (
            <div
              className="w-[200px] py-3 bg-white text-black text-center rounded-md cursor-pointer hover:bg-gray-300 transition"
              onClick={() => {
                navigate("/login");
                setshowHam(false);
              }}
            >
              Login
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
