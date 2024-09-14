import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaGithub } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { LuUserSquare2 } from "react-icons/lu";
import axios from 'axios';
const CompanyTemplate = ({name,description,photolink}) => {
  return (
    <div className='font-roboto w-[100%] h-[70%] rounded-md space-x-3 shadow-md border-gray-300 border-[1px] flex flex-row p-[23px]'>
        <div className=' w-[20%] h-[100%] rounded-md'>
            <img src={photolink}  className='object-cover w-[100%] h-[100%] rounded-md'/>
        </div>
        
        <div className='w-[80%] h-[100%] flex flex-col space-y-4 text-gray-700'>
            <div className='w-[100%] h-[30%] flex flex-row'>
                  <div className='flex flex-col basis-3/4 '>
                      <p className='text-[14px]'>{description}</p>
                      <p className='text-[15px] font-bold'>{name}</p>
                  </div>
                  <div className='flex flex-row basis-1/4 items-center justify-end'>
                      <div className='w-[45px] h-[90%] rounded-md border-blue-600 border-[1px] flex flex-col items-center justify-center'><FaRegHeart size={16} className='text-blue-600'/></div>
                  </div>
            </div>
            <div className='w-[100%] h-[40%] flex flex-row'>
                <div className='basis-3/4 flex font-roboto flex-col space-y-3'>
                      <p className='text-[14px]'>Latest funding round - $50m - 21 Jan 24</p>
                      <div className='flex flex-row text-[15px] space-x-4'>
                        <div className='flex flex-row space-x-1 items-center'>
                          <IoLocationOutline size={16} />
                          <p className='text-[14px]'>Sector 53, Gurugram</p>
                        </div>
                        <div className='flex flex-row space-x-2 items-center'>
                          <LuUserSquare2 size={16}/>
                          <p className='text-[14px]'>Aloke Bajpai</p>
                        </div>
                        <div className='flex flex-row space-x-2 items-center'>
                          <CiCalendar size={16}/>
                          <p className='text-[14px]'>Founded in 2014</p>
                        </div>
                      </div>
                </div>
                <div className='basis-1/4 flex flex-row items-end  mt-10 ml-50 space-x-2'>
                  <TiSocialLinkedin size={20} className=''/>
                  <FaGithub size={20}/>
                </div>
            </div>
            <div className='w-[100%] h-[40%] flex flex-row justify-end items-center border-t border-gray-300  space-x-2'>
                <div className='border-[1px] border-gray-300 w-[120px] h-[80%] mt-4  rounded-md flex items-center justify-center'>
                    <p className='text-[14px]'>Financials</p>
                </div>
                <div className='border-[1px] border-gray-300 w-[190px] h-[80%] mt-4 rounded-md flex items-center justify-center'>
                    <p className='text-[14px]'>Download company data</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompanyTemplate