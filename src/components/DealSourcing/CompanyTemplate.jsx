import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaGithub } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { LuUserSquare2 } from "react-icons/lu";
import axios from 'axios';
import { FaPlus } from "react-icons/fa";

import { BsBuildings } from "react-icons/bs";

 




const CompanyTemplate = ({name,length}) => {
  return (
   
    
    <div className='font-inter w-[100%] h-[100%] rounded-md -mt-6 space-x-3 shadow-md border-gray-300 border-[1px] flex  p-[23px]'>
        <div className='mt-2'>
        <BsBuildings size={26} />
        </div>
                      <p className='text-[12px] font-bold font-inter justify-center ml-4'>{name}</p>
                
                  <div className='flex -mt-5 items-center justify-end'>
                      <div className='w-[30px] h-[40%] rounded-md border-blue-600 border-[1px] flex flex-col items-center justify-center'><FaRegHeart size={16} className='text-blue-600'/></div>
                  </div>
                  
            </div>
           
 
       
 
  )
}

export default CompanyTemplate