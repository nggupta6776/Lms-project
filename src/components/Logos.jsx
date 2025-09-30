import React from 'react';
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

function Logos() {
  const features = [
    {
      icon: <MdCastForEducation className="w-7 h-7 fill-[#03394b]" />,
      text: "20k+ Online Courses"
    },
    {
      icon: <SiOpenaccess className="w-7 h-7 fill-[#03394b]" />,
      text: "Lifetime Access"
    },
    {
      icon: <FaSackDollar className="w-7 h-7 fill-[#03394b]" />,
      text: "Value for Money"
    },
    {
      icon: <BiSupport className="w-7 h-7 fill-[#03394b]" />,
      text: "Lifetime Support"
    },
    {
      icon: <FaUsers className="w-7 h-7 fill-[#03394b]" />,
      text: "Community Support"
    }
  ];

  return (
    <div className='w-full flex flex-wrap items-center justify-center gap-4 md:mb-12 px-4'>
      {features.map((feature, index) => (
        <div
          key={index}
          className='flex items-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'
        >
          {feature.icon}
          <span className='text-sm md:text-base font-medium'>{feature.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Logos;
