import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import img from "../../assets/empty.jpg"
function Courses() {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='w-full min-h-screen p-4 sm:p-6 bg-gray-100'>

        {/* Header Section */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
          {/* Back + Title */}
          <div className='flex items-center gap-3'>
            <FaArrowLeftLong 
              className='w-[22px] h-[22px] cursor-pointer' 
              onClick={() => navigate("/dashboard")} 
            />
            <h1 className='text-2xl font-semibold'>All Created Courses</h1>
          </div>

          {/* Create Course Button */}
          <button 
            className='bg-black text-white px-4 py-2 rounded hover:bg-gray-700'
            onClick={() => navigate("/createcourse")}
          >
            Create Course
          </button>
        </div>

        {/* Large Screen Table */}
        <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>
          {/* Table Content Here */}
          <table className='min-w-full text-sm'>
            <thead className='border-b bg-gray-50'>
              <tr>
                <th className='text-left p-3 border-b'>Course Title</th>
                <th className='text-left p-3 border-b'>Price</th>
                <th className='text-left p-3 border-b'>Status</th>
                <th className='text-left p-3 border-b'>Actions</th>

              </tr>
            </thead>
            <tbody>
              <tr className='border-b hover:bg-gray-50 transition duration-200'>
                <td className='py-3 px-4 flex items-center gap-4'>
                  <img src={img} className='w-25 h-14 object-cover rounded-md ' alt="" /><span> Title</span>
                </td>
                <td className='px-4 py-3'>₹NA</td>

                <td className='px-4 py-3'><span className='px-3 py-1 rounded -full text-xs bg-reds-100 text-red-600'></span>Draft</td>

                <td className='px-4 py-3'>
                 < FaEdit className='text-gray -600 hover:text-blue-600 cursor-pointer' />
                </td>
              </tr>
            </tbody>
          </table>
          <p className='text-center text-sm text-gray-400 mt-6'>A list of your recent courses.</p>
        </div>

        {/* Small Screen Table */}
        <div className='md:hidden space-y-4'>
          <div className='bg-white rounded-xl shadow p-4 flex flex-col items-center gap-4'>
            <div className='flex gap-4 items-center'>
              <img src={img} alt="" className='w-16 h-16 rounded-md object-cover'/>
              <div className='flex flex-col'>
                <h2 className='font-medium text-sm'>title</h2>
                <p className='text-gray-600 text-xs mt-1'>₹ NA</p>
              </div>
              < FaEdit className='text-gray -600 hover:text-blue-600 cursor-pointer' />
            </div>
            <span className='w-fit px-3 py-1 texy-xs rounded-full bg-red-100 text-red-600'>Draft</span>
          </div>
           <p className='text-center text-sm text-gray-400 mt-4 '>A list of your recent courses.</p>
        </div>
          {/* Mobile View Content Here */}
        </div>

      </div> 
   
  )}


export default Courses
