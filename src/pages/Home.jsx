import React from 'react';
import Nav from '../components/Nav'; 
import home from "../assets/home1.jpg"
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import Logos from '../components/Logos';
import ExploreCourses from '../components/ExploreCourses';
function Home() {
  return (
    <div className='text-2xl text-[red]'>
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Nav />
        <img src={home} className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh] 'alt="" />

     
  {/* First Line */}
  <span className="absolute top-[15%] lg:top-[10%] w-full flex items-center justify-center text-white font-bold text-[20px] md:text-[40px] lg:text-[70px]">
    Grow Skills to Advance
  </span>

  {/* Second Line */}
  <span className="absolute top-[20%] lg:top-[18%] w-full flex items-center justify-center text-white font-bold text-[20px] md:text-[40px] lg:text-[70px]">
    Your Career Path
  </span>
  <div className='absolute lg:top-[30%] md:top-[80%] top-[75%] w-full flex flex-wrap items-center justify-center gap-3'>
  <button className='px-5 py-2 border-2 border-black lg:border-white text-black lg:text-white text-[18px] font-light flex gap-2 cursor-pointer'>
    View All Courses
    <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black'  />
  </button>
  <button className='px-5 py-2 bg-black text-white lg:bg-white lg:text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center'>
    Search With AI <img src={ai} className='w-[30px] h-[30px] rounded-full hidden lg:block' alt=""/> <img src={ai1} className='w-[35px] h-[35px] rounded-full lg:hidden' alt="" />
  </button>
</div>

</div>
<Logos/>
<ExploreCourses/>
 </div>
    
  );
}

export default Home;


