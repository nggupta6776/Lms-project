import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import ClipLoader from 'react-spinners/ClipLoader'; 
import { setUserData } from '../redux/userSlice'; 

const serverUrl = 'http://localhost:7000';

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);

  const initial = userData?.name?.charAt(0).toUpperCase() || 'U';

  const [name, setName] = useState(userData?.name || '');
  const [email] = useState(userData?.email || '');
  const [description, setDescription] = useState(userData?.description || '');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fullPhotoUrl = userData?.photoUrl?.startsWith("http")
    ? userData.photoUrl
    : `${serverUrl}${userData?.photoUrl}`;

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("description", description);
      if (photoUrl) {
        formData.append("photoUrl", photoUrl);
      }

      const result = await axios.post(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );

      console.log("Updated user data from backend:", result.data);
      dispatch(setUserData(result.data));
      toast.success("Profile Updated");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">

        {/* Back Arrow */}
        <FaArrowLeftLong
          className="absolute top-5 left-5 w-5 h-5 cursor-pointer"
          onClick={() => navigate("/profile")}
        />

        <h2 className="text-center text-2xl font-semibold mb-6">Edit Profile</h2>

        <form className='space-y-5' onSubmit={(e) => e.preventDefault()}>

          {/* Avatar Preview */}
          <div className="flex flex-col items-center mb-4">
            {userData?.photoUrl ? (
              <img
                src={fullPhotoUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-black"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
                {initial}
              </div>
            )}
          </div>

          {/* Avatar Upload */}
          <div>
            <label htmlFor='image' className="block text-sm font-medium text-gray-700 mb-1">Select Avatar</label>
            <input
              id='image'
              type="file"
              name='photoUrl'
              accept='image/*'
              className='w-full px-4 py-2 border rounded-md text-sm'
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor='name' className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <input
              id='name'
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-black"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
              value={email}
              readOnly
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name='description'
              rows="3"
              placeholder="Tell us about yourself"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-black"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:opacity-90 transition cursor-pointer"
            disabled={loading}
            onClick={handleEditProfile}
          >
            {loading ? <ClipLoader size={20} color='white' /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
