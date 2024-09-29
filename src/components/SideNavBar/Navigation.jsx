import React, { useEffect, useRef, useState } from 'react'
import { Link,  useLocation, useNavigate } from 'react-router-dom';
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
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { AiOutlineClose } from 'react-icons/ai';  // Close icon



const Navigation = ({setlogin,googleaccountconnected,activeField,setActiveField,hidenavbar,sethidenavbar}) => {
  
    const location=useLocation()
    const Navigate=useNavigate()

    const [showgoogleconnected,setshowgoogleconnected]=useState(false)
    const [loading,setloading]=useState(false)

    const handleLogout=()=>{
          setlogin(false)
          localStorage.clear() 
    }
    const NavbarRef=useRef(null)
    const settingBtnRef=useRef(null)
    const [showPopup, setShowPopup] = useState(false); 
    const [showPopup1, setShowPopup1] = useState(false);  
      
    useEffect(()=>
    {
        const checkGoogleLogin=async()=>{
           const response= await axios.post(`${import.meta.env.VITE_HOST_URL}1222/check-login-google`,{
                email:localStorage.getItem('email'),
                organization:localStorage.getItem('organization')
            })
            if(response.data.status==200 &&response.data.msg=="Valid Refresh token")
            {
                setshowgoogleconnected(true)
            }
        }
        checkGoogleLogin()
    },[googleaccountconnected])

    useEffect(()=>
        {
            const checkGoogleLogin=async()=>{
               const response= await axios.post(`${import.meta.env.VITE_HOST_URL}1222/check-login-google`,{
                    email:localStorage.getItem('email'),
                    organization:localStorage.getItem('organization')
                })
                if(response.data.status==200 &&response.data.msg=="Valid Refresh token")
                {
                    setshowgoogleconnected(true)
                }
            }
            checkGoogleLogin()
        },[])

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
        console.log(location.pathname)
        if(location.pathname!="/")
        {
            setActiveField(location.pathname)
            Navigate(location.pathname)
        }
        else{
            Navigate(activeField)
        }
    },[activeField,location.pathname])

    


   


    const handleRemoveGoogleConnect=async()=>{
        setloading(true)
        const email=localStorage.getItem('email')
        const organization=localStorage.getItem("organization")
        const response= await axios.post(`${import.meta.env.VITE_HOST_URL}1222/logout-google`,{
            email:email
            ,organization:organization
        })
        if(response.data.status==200)
        {
            
            setTimeout(()=>{
                setloading(false)
                setshowgoogleconnected(false)
            },1000)    
        }
    }

    const handleGoogleConnect=async()=>
    {
        setloading(true)
        const email=localStorage.getItem('email')
        const organization=localStorage.getItem("organization")
        const response= await axios.post(`${import.meta.env.VITE_HOST_URL}1222/generate-link`,{
            email:email
            ,organization:organization
        })
        if(response.data.status==200)
        {
            window.open(response.data.url,'_blank','noopener,noreferrer')
            setTimeout(()=>{
                setloading(false)
            },1000)    
        }
    }

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
                    <div className='text-[14px] font-inter font-semibold'><p>Dashboard</p></div>
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
                    <div className='text-[14px] font-inter font-semibold'><p>Deal sourcing (<span className='text-[12px]'>Beta)</span></p></div>
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

            <div className='w-[100%] h-[60px] flex items-center justify-center'>
            {
                loading?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Bars color="#8884d8" height={30} width={80} />
                </div>
                :
                <div className='w-[100%] h-[100%]'>
                    {
                        showgoogleconnected?
                        <div>
                        <div className='w-[120%] cursor-pointer mt-4 flex items-center justify-center h-[100%] '>
                          
                            <button onClick={()=>{setShowPopup1(true); setShowPopup(false);}}  class=" h-[110%] -mt-2 flex items-center justify-between mr-6 bg-white  shadow-md rounded-md p-2 hover:bg-gray-100 transition duration-200">
                <div class="relative">
                 <div class="absolute inset-0"></div>
                        </div>
             <div class="flex items-center space-x-2">
                 <div class="w-6 h-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" class="w-full h-full">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                 <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
            </div>
            <span class="text-gray-700  text-[12px] font-inter font-bold pr-3">Disconnect to google</span>
            </div>
            
            </button>
 
           
            {showPopup1 && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="relative w-[90%] md:w-[400px] bg-white shadow-md p-8 rounded-lg">
      <AiOutlineClose
        size={20}
        className="absolute top-4 right-4 bg-gray-100 rounded-full w-[25px] h-[25px] cursor-pointer"
        onClick={() => setShowPopup1(false)}
      />
      <div className="flex flex-col items-center mt-8">
        <p className="text-[14px] font-inter font-semibold text-center">
          Are you sure you want to disconnect with google?
          <br /><br />
          <span
            className='font-inter text-[18px] px-6 py-2 bg-white rounded-md hover:bg-gray-100 hover:text-black cursor-pointer inline-block'
            onClick={() => handleRemoveGoogleConnect()}
          >
            Ok
          </span>
        </p>
      </div>
    </div>
  </div>
)}

                            </div> 
                            </div>
                        :
                        <div>
                          <div className='w-[120%] cursor-pointer mt-4 flex items-center justify-center h-[100%] '>
                          
                                
            
                            <button onClick={() => {setShowPopup(true); setShowPopup1(false);}}  class=" h-[110%] -mt-2 flex items-center justify-between mr-6 bg-white  shadow-md rounded-md p-2 hover:bg-gray-100 transition duration-200">
                <div class="relative">
                 <div class="absolute inset-0"></div>
                        </div>
             <div class="flex items-center space-x-2">
                 <div class="w-6 h-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" class="w-full h-full">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                 <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
            </div>
            <span class="text-gray-700  text-[12px] font-inter font-bold pr-3">Connect to google</span>
            </div>
            
            </button>
 
           

                            </div> 
                {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="relative w-[90%] md:w-[400px] bg-white shadow-md p-8 rounded-lg">
      <AiOutlineClose
        size={20}
        className="absolute top-4 right-4 bg-gray-100 rounded-full w-[25px] h-[25px] cursor-pointer"
        onClick={() => setShowPopup(false)}
      />
      <div className="flex flex-col items-center mt-8">
        <p className="text-[14px] font-inter font-semibold text-center">
          Are you sure you want to connect with google?
          <br /><br />
          <span
            className='font-inter text-[18px] px-6 py-2 bg-white rounded-md hover:bg-gray-100 hover:text-black cursor-pointer inline-block'
            onClick={() => handleGoogleConnect()}
          >
            Ok
          </span>
        </p>
      </div>
    </div>
  </div>
)}


                            
                            </div>
                        } 
                           

           
                    
                </div>
            }
                
            </div>
           

            <div className='w-[100%] h-[20%] flex items-center justify-center border-t mt-5 border-gray-400 '>
            
                    <a href='/' className='w-[40%] h-[40%] flex items-center justify-center'> 
                     <div className='flex flex-row w-[100%]  h-[40%] items-center justify-center  space-x-2 ' > 
                    
                       
                         <div><p className='text-[14px] font-inter cursor-pointer text-gray-500 ' onClick={handleLogout}>Logout</p></div>
                         <div className=''><img src={Logout} className='cursor-pointer' onClick={handleLogout}/></div>
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