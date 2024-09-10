import React, { useEffect, useRef, useState } from 'react'
import { LuHome } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { BsStack } from "react-icons/bs";
import { HiMiniSquare2Stack } from "react-icons/hi2";
import { Link, useLocation } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";
import { MdOutlineSort, MdOutlineTrendingUp } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import { RiSettings4Fill, RiSettings6Fill } from 'react-icons/ri';
import { FiAlignJustify } from "react-icons/fi";
import {gsap} from 'gsap'

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
        <div ref={NavbarRef} className=' text-gray-700 select-none font-roboto w-[20%] shadow-lg z-[60] fixed h-[100%] bg-white p-[40px] pt-[30px] flex flex-col'>
       <div className='flex flex-col items-start justify-start h-[100%] w-[100%]'>
            <div className='w-[100%] h-[13%] flex justify-start items-center'>
                <p className='text-[21px] font-roboto'>Incube Web</p>
                
            </div>
            <div className='flex flex-col space-y-2 w-[100%] h-[80%] pt-2'>

                <Link to='/dashboard'>
                    <div className={`${activeField=='/dashboard'?'bg-blue-600 text-white':'select-none hover:bg-gray-300 cursor-pointer hover:text-white'} flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`}  onClick={()=>setActiveField('/dashboard')}>
                        <div><LuHome size={20}/></div>
                    <div className='text-[14px]'><p>Dashboard</p></div>
                    </div>
                </Link>
                <Link to='/dealpipeline'>
                <div className={`${activeField=='/dealpipeline'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/dealpipeline')}>
                    <div><VscGraph size={20}/></div>
                    <div className='text-[14px]'><p>Deal pipeline</p></div>
                </div>
                </Link>
                <Link to='/dealsourcing'>
                <div className={`${activeField=='/dealsourcing'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/dealsourcing')}>
                    <div><BsStack size={20}/></div>
                    <div className='text-[14px]'><p>Deal sourcing</p></div>
                </div>
                </Link>
                <Link to='/portfolio'>
                <div className={`${activeField=='/portfolio'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/portfolio')}>
                    <div><HiMiniSquare2Stack size={20}/></div>
                    <div className='text-[14px]'><p>Portfolio analysis</p></div>
                </div>
                </Link>
                <Link to='/adduser'>
                <div className={`${activeField=='/adduser'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/adduser')}>
                    <div><FaUserPlus size={20} /></div>
                    <div className='text-[14px]'><p>Add Users</p></div>
                </div>
                </Link>
                <Link to='/allDocs'>
                <div className={`${activeField=='/allDocs'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/allDocs')}>
                    <div><IoIosDocument size={20}/></div>
                    <div className='text-[14px]'><p>Documents</p></div>
                </div>
                </Link>

            </div>

            <div className='w-[100%] h-[30%] flex flex-col items-start justify-start'>
            <Link to='/investment' className='w-[100%] h-[100%]'>
                    <a className='w-[100%] h-[80%] flex items-start justify-center'> 
                     <div onClick={()=>setActiveField('/investment')} className='flex flex-row w-[90%] cursor-pointer h-[30%] items-center justify-center space-x-2 rounded-md hover:text-white bg-gradient-to-t from-gray-900 to-gray-500 text-white '> 
                         <div><MdOutlineTrendingUp size={20} /></div>
                         <div><p className='text-[13px]'>add investiment</p></div>
                    </div>
                    </a>
                </Link>
            </div>

            <div className='w-[100%] h-[20%] flex items-center justify-center'>
                    <a href='/' className='w-[70%] h-[100%] flex items-center justify-center'> 
                     <div className='flex flex-row w-[100%]  h-[40%] items-center justify-center space-x-2 ' > 
                    
                         <div><IoLogOut size={20} className='cursor-pointer' onClick={handleLogout}/></div>
                         <div><p className='text-[14px] cursor-pointer text-gray-500' onClick={handleLogout}>Logout</p></div>
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