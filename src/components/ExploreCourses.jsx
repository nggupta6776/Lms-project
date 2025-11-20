import React from 'react';
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { PiOpenAiLogo } from "react-icons/pi";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";

function ExploreCourses() {
  return (
    <div className='w-full min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'>

      {/* Left / Top Section */}
      <div className='w-full lg:w-[350px] h-[400px] lg:h-full flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]'>
        <span className='text-[35px] font-semibold'>Explore</span>
        <span className='text-[35px] font-semibold'>our Courses</span>
        <p className='text-[17px]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem vel iure explicabo laboriosam accusantium expedita laudantium facere magnam.
        </p>

        <button className='px-[20px] py-[10px] border-2 bg-black border-white text-white rounded-[10px] text-[18px] font-light flex items-center gap-2 mt-[40px] cursor-pointer'>
          Explore Courses
          <SiViaplay className='w-[30px] h-[30px] fill-white' />
        </button>
      </div>

      {/* Right / Bottom Section */}
      <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex flex-wrap items-center justify-center gap-[50px] mb-[50px] lg:mb-0'>

        {/* Example Course Card */}
        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center items-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <TbDeviceDesktopAnalytics className='w-[60px] h-[60px] text-[#6d6c6c]' />
          </div>
          <span>Web Deve</span>
        </div>


        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center items-center'>
          <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
            <LiaUikit className='w-[60px] h-[60px] text-[#6d6c6e]' />
          </div>
          <span>UI/UX Desigining</span>
        </div>


        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center items-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9c8] rounded-lg flex items-center justify-center'>
            <MdAppShortcut className='w-[50px] h-[50px] text-[#6d6c6c]' />
          </div>
          <span>App dev</span>
        </div>


        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center items-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <FaHackerrank className='w-[55px] h-[55px] text-[#6d6c6c]' />
          </div>
          <span>Ethical Hacking</span>
        </div>


        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center items-center'>
          <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
            <PiOpenAiLogo className='w-[60px] h-[60px] text-[#6d6c6c]' />
          </div>
          <span>AI/ML</span>
        </div>


        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center items-center'>
          <div className='w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center'>
            <SiGoogledataproc  className='w-[50px] h-[50px] text-[#6d6c6c]' />
          </div>
          <span>Data science</span>
        </div>


        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center items-center'>
          <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center'>
            <BsClipboardData  className='w-[50px] h-[50px] text-[#6d6c6c]' />
          </div>
          <span>Data Analytics</span>
        </div>


        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center items-center'>
          <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center'>
            <SiOpenaigym  className='w-[50px] h-[50px] text-[#6d6c6c]' />
          </div>
          <span>AI Tools</span>
        </div>


      </div>
    </div>
  );
}

export default ExploreCourses;
