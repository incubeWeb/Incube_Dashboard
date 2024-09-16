import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";
import {gsap} from 'gsap'
import Incubelogo from '../Icons/Incubelogo.svg'
import { HiOutlineUserAdd } from "react-icons/hi";
import { IoDocumentOutline } from "react-icons/io5";
import Logout from '../Icons/Logout.svg'
import { RiHome6Line } from "react-icons/ri";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { SlSocialDropbox } from "react-icons/sl";
import { RiCheckboxMultipleLine } from "react-icons/ri";



const Navigation = ({activeField,setActiveField,hidenavbar,sethidenavbar}) => {
  
    const location=useLocation()
    const handleLogout=()=>{
          localStorage.clear() 
    }
    const NavbarRef=useRef(null)
    const settingBtnRef=useRef(null)

    const hideNav=()=>{
        if(!hidenavbar)
        {
            gsap.to(NavbarRef.current,{
                x:"-100%",
                duration:0.4,
                
            })
            gsap.to(settingBtnRef.current,{
                x:'-1400%',
                rotation:'360',
                duration:0.4,
                onComplete:()=>{
                    sethidenavbar(true)
                }
            })
        }
        else{
            gsap.to(NavbarRef.current,{
                x:"0%",
                duration:0.4
            })
            gsap.to(settingBtnRef.current,{
                x:'0%',
                rotation:'-360',
                duration:0.4,
                onComplete:()=>{
                    sethidenavbar(false)
                }
            })
        }
        
    }

    useEffect(()=>{
        setActiveField(location.pathname)
    },[activeField])
  return (
        <div className='w-[100%] '>
        <div ref={NavbarRef} className=' text-gray-700 select-none font-roboto w-[20%] shadow-lg z-[60] fixed h-[100%] bg-white p-[40px] pt-[30px] flex flex-col '>
       <div className='flex flex-col items-start justify-start h-[100%] w-[100%]'>
            <div className='w-[100%] h-[13%] flex justify-start items-center'>
            <img src={Incubelogo} className='h-[67px]] w-[24px] ml-1'/>   <p className='text-[24px] ml-1 font-kadwa font-bold'> InCube</p>
                
            </div>
            <div className='flex flex-col space-y-2 w-[100%] h-[80%] pt-2'>

                <Link to='/dashboard'>
                    <div className={`${activeField=='/dashboard'?'bg-blue-600 text-white':'select-none hover:bg-gray-300 cursor-pointer hover:text-white'} flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`}  onClick={()=>setActiveField('/dashboard')}>
                        <div><RiHome6Line  size={24}  className={`${activeField=='/dashboard'?' text-white ':'text-[#667085]'} `}/> </div>
                    <div className='text-[14px] -mb-2 font-inter font-semibold'><p>Dashboard</p></div>
                    </div>
                </Link>
                <Link to='/dealpipeline'>
                <div className={`${activeField=='/dealpipeline'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/dealpipeline')}>
                    <div><HiOutlineChartBarSquare  size={24} className={`${activeField=='/dealpipeline'?' text-white ':'text-[#667085]'} `}/></div>
                    <div className='text-[14px] font-inter font-semibold'><p>Deal pipeline</p></div>
                </div>
                </Link>
                <Link to='/dealsourcing'>
                <div className={`${activeField=='/dealsourcing'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/dealsourcing')}>
                    <div><SlSocialDropbox size={24} className={`${activeField=='/dealsourcing'?' text-white ':'text-[#667085]'} `}/></div>
                    <div className='text-[14px] font-inter font-semibold'><p>Deal sourcing</p></div>
                </div>
                </Link>
                <Link to='/portfolio'>
                <div className={`${activeField=='/portfolio'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/portfolio')}>
                    <div><RiCheckboxMultipleLine  size={24} className={`${activeField=='/portfolio'?' text-white ':'text-[#667085]'} `}/> </div>
                    <div className='text-[14px] font-inter font-semibold'><p>Portfolio analysis</p></div>
                </div>
                </Link>
                <Link to='/adduser'>
                <div className={`${activeField=='/adduser'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/adduser')}>
                    <div><HiOutlineUserAdd size={24} className={`${activeField=='/adduser'?' text-white ':'text-[#667085]'} `} /></div>
                    <div className='text-[14px] font-inter font-semibold'><p className='-mb-1'>Add Users</p></div>
                </div>
                </Link>
                <Link to='/allDocs'>
                <div className={`${activeField=='/allDocs'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/allDocs')}>
                    <div><IoDocumentOutline  className={`${activeField=='/allDocs'?' text-white ':'text-[#667085]'} `} size={24}/></div>
                    <div className='text-[14px] font-inter font-semibold'><p>Documents</p></div>
                </div>
                </Link>

            </div>

           

            <div className='w-[100%] h-[20%] flex items-center justify-center border-t mb-10 border-gray-400 '>
            
                    <a href='/' className='w-[70%] h-[100%] flex items-center justify-center'> 
                     <div className='flex flex-row w-[100%]  h-[40%] items-center justify-center  space-x-2 ' > 
                    
                       
                         <div><p className='text-[14px] font-inter cursor-pointer text-gray-500' onClick={handleLogout}>Logout</p></div>
                         <div><img src={Logout} className='cursor-pointer' onClick={handleLogout}/></div>
                    </div>
                    </a>
            </div>
       </div>
       
    </div>

        <div className='ml-20  cursor-pointer left-[-20px] z-[90] fixed w-[16%] top-[50px]  flex justify-end items-start '>
                <div ref={settingBtnRef}>
                    <FiAlignJustify  className='text-gray-500' size={20} onClick={hideNav}/>
                </div>
        </div>
    </div>

  )
}

export default Navigation