import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';

import getCurrentUser from './customHooks/getCurrentUser';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ForgetPassword from './pages/forgetPassword';
import Editprofile from './pages/Editprofile';
import Dashboard from './pages/Educator/Dashboard';
import Courses from './pages/Educator/Courses';
import CreateCourses from './pages/Educator/CreateCourses';
export const serverUrl = "http://localhost:7000";

function App() {
  getCurrentUser(); // custom hook
  const { userData } = useSelector(state => state.user);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={userData ? <Profile /> 
        : <Navigate to={"/signup"} />} />
        <Route path="/forget" element={userData ? <ForgetPassword /> : <Navigate to={"/signup"}/>} />
         <Route path="/editprofile" element={userData ? <Editprofile /> : <Navigate to={"/signup"}/>} />
         <Route path="/dashboard" element={userData ?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"}/>} />
         <Route path="/courses" element={userData ?.role === "educator" ? <Courses /> : <Navigate to={"/signup"}/>} />
           <Route path="/createcourses" element={userData ?.role === "educator" ? <CreateCourses /> : <Navigate to={"/signup"}/>} />
      </Routes>
    </>
  );
}

export default App;
