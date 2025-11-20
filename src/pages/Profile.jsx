import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

const serverUrl = 'http://localhost:7000';

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const initial = userData?.name?.[0]?.toUpperCase() || 'U';

  const fullPhotoUrl = userData?.photoUrl?.startsWith("http")
    ? userData.photoUrl
    : `${serverUrl}${userData?.photoUrl}`;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative">
        <FaArrowLeftLong className='absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/")} />
        <div className="flex flex-col items-center text-center">
          {userData?.photoUrl ? (
            <img
              src={fullPhotoUrl}
              alt={userData.name || 'User Profile'}
              className="w-24 h-24 rounded-full object-cover border-4 border-black"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-semibold">
              {initial}
            </div>
          )}

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            {userData?.name || 'Unnamed User'}
          </h2>

          <p className="text-gray-600 capitalize">
            {userData?.role === 'educator' ? 'Educator' : 'Student'}
          </p>

          <p className="mt-2 text-sm text-gray-500">{userData?.email || 'No email available'}</p>

          <div className="mt-4 text-left w-full">
            <h3 className="font-semibold text-gray-700">Bio:</h3>
            <p className="text-gray-600 text-sm">{userData?.description || 'No bio provided.'}</p>
          </div>

          <div className="mt-2 text-left w-full">
            <h3 className="font-semibold text-gray-700">Enrolled Courses:</h3>
            <p className="text-gray-600 text-sm">{userData?.enrolledCourses ?? 0}</p>
          </div>
        </div>
        <div className='mt-6 flex justify-center gap-4'>
          <button className='px-5 py-2 rounded bg-[black] text-white active:bg-[#4b4b4b] cursor-pointer transition' onClick={() => navigate("/editprofile")}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
