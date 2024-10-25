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
<<<<<<< Updated upstream
=======
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false); 
      
    useEffect(()=>
    {
        const checkGoogleLogin=async()=>{
           const response= await axios.post('http://localhost:1222/check-login-google',{
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
               const response= await axios.post('http://localhost:1222/check-login-google',{
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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
            <div className='flex flex-col space-y-2 w-[100%] h-[80%] pt-2'>

                <Link to='/dashboard'>
<<<<<<< Updated upstream
                    <div className={`${activeField=='/dashboard'?'bg-blue-600 text-white':'select-none hover:bg-gray-300 cursor-pointer hover:text-white'} flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`}  onClick={()=>setActiveField('/dashboard')}>
                        <div><LuHome size={20}/></div>
                    <div className='text-[14px]'><p>Dashboard</p></div>
                    </div>
=======
                <div
  className={`${
    activeField == '/dashboard'
      ? 'bg-blue-600 text-white'
      : 'select-none hover:bg-gray-300 cursor-pointer hover:text-white'
  } flex flex-row h-[20px] w-[80px] items-center space-x-2 rounded-md 
  sm:h-[30px] sm:w-[90px] sm:pl-1 md:h-[40px] md:w-[150px]  md:pl-2  lg:h-[40px] lg:w-[165px]  lg:pl-2`} 
  onClick={() => setActiveField('/dashboard')}
>
  {/* Icon with responsive sizing */}
  <div>
    <RiHome6Line
      size={24}
      className={`${
        activeField == '/dashboard' ? 'text-white' : 'text-[#667085]'
      } sm:text-[20px] md:text-[22px] lg:text-[24px]`}
    />
  </div>

  {/* Text with responsive sizing */}
  <div className="text-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px] font-inter font-semibold">
    <p>Dashboard</p>
  </div>
</div>
>>>>>>> Stashed changes
=======
            <div className=' flex flex-col space-y-2 w-[100%] h-[80%] pt-2'>
                
                <Link to='/dashboard'>
                <div onClick={()=>{ShowApplicationNavfun(false)}}>
                        <div      className={`${activeField=='/dashboard'?'bg-blue-600 text-white':'select-none hover:bg-gray-300 cursor-pointer hover:text-white'} flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`}  onClick={()=>setActiveField('/dashboard')}>
                        <div><RiHome6Line  size={24}  className={`${activeField=='/dashboard'?' text-white ':'text-[#667085]'} `}/> </div>
                    <div  className='text-[14px] font-inter font-semibold'><p>Dashboard</p></div>
                    
                    </div>
                    </div>
>>>>>>> Stashed changes
                </Link>
                <Link to='/dealpipeline'>
                <div onClick={()=>{ShowApplicationNavfun(false)}}>
                <div className={`${activeField=='/dealpipeline'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/dealpipeline')}>
                    <div><VscGraph size={20}/></div>
                    <div className='text-[14px]'><p>Deal pipeline</p></div>
                </div>
                </div>
                </Link>
                <Link to='/dealsourcing'>
                <div onClick={()=>{ShowApplicationNavfun(false)}}>
                <div className={`${activeField=='/dealsourcing'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/dealsourcing')}>
                    <div><BsStack size={20}/></div>
                    <div className='text-[14px]'><p>Deal sourcing</p></div>
                </div>
                </div>
                </Link>
                <Link to='/portfolio'>
                <div onClick={()=>{ShowApplicationNavfun(false)}}>
                <div className={`${activeField=='/portfolio'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/portfolio')}>
                    <div><HiMiniSquare2Stack size={20}/></div>
                    <div className='text-[14px]'><p>Portfolio analysis</p></div>
                </div>
                </div>
                </Link>
                <Link to='/adduser'>
                <div onClick={()=>{ShowApplicationNavfun(false)}}>
                <div className={`${activeField=='/adduser'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/adduser')}>
                    <div><FaUserPlus size={20} /></div>
                    <div className='text-[14px]'><p>Add Users</p></div>
                </div>
                </div>
                </Link>
                <Link to='/allDocs'>
                <div onClick={()=>{ShowApplicationNavfun(false)}}>
                <div className={`${activeField=='/allDocs'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/allDocs')}>
<<<<<<< Updated upstream
                    <div><IoIosDocument size={20}/></div>
                    <div className='text-[14px]'><p>Documents</p></div>
=======
                    <div><IoDocumentOutline  className={`${activeField=='/allDocs'?' text-white ':'text-[#667085]'} `} size={24}/></div>
                    <div className='text-[14px] font-inter font-semibold'><p>Documents</p></div>
                </div>
                </div>
                </Link>
                <Link to='/keys'>
                <div onClick={()=>{ShowApplicationNavfun(false)}}>
                <div className={`${activeField=='/keys'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/keys')}>
                    <div><IoKeyOutline   className={`${activeField=='/keys'?' text-white ':'text-[#667085]'} `} size={24}/></div>
                    <div className='text-[14px] font-inter font-semibold'><p>Api Keys</p></div>
>>>>>>> Stashed changes
                </div>
</div>
                </Link>
<<<<<<< Updated upstream

=======
                
                <Link to='/AI'>
                <div onClick={()=>{ShowApplicationNavfun(false)}}>
                <div className={`${activeField=='/AI'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/AI')}>
                    <div> <PiStarFourBold  className={`${activeField=='/AI'?' text-white ':'text-[#667085]'} `} size={24}/></div>
                    <div className='text-[14px] font-inter font-semibold'><p>AI</p></div>
                </div>
                </div>
                </Link>

                <div className={` flex flex-row h-[40px] items-center space-x-2 hover:text-white hover:bg-gray-300 cursor-pointer rounded-md pl-2`} onClick={()=>{ShowApplicationNavfun(true)}}>
                    <div className='w-[24px] flex justify-center text-[#667085] items-center'><FaPlus size={16}/></div>
                    <div className='text-[14px] font-inter font-semibold'><p>Connect an Application</p></div>
                </div>
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
            <div className='w-[100%] h-[20%] flex items-center justify-center'>
=======
            <div className='w-[100%] h-[60px] flex items-center justify-center'>
            {
                loading?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Bars color="#8884d8" height={30} width={80} />
                </div>
                :
                <div className='w-[100%] h-[100%] '>
                    {
                        showgoogleconnected?
                        <div onClick={()=>handleRemoveGoogleConnect()} className='w-[90%] cursor-pointer flex items-center justify-center h-[80%] '>
                        <button onClick={() => setShowPopup(!showPopup1)}  className="w-[90%] flex items-center justify-between bg-white  shadow-md rounded-md p-2 hover:bg-gray-100 transition duration-200">
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
            <span class="text-gray-700 font-inter font-bold pr-3">Remove google connection</span>
            </div>
            
            </button>
                        </div>
                        :
                        <div>
                          <div className='w-[120%] cursor-pointer  flex items-center justify-center h-[100%] '>
                            
                            
                            {/* <p className='text-white text-[16px] font-inter font-semibold'>Connect to Google<img  src={google} className='h-[30px] w-[30px] ml-36 -mt-7'></img></p> */}
                          
                                
            
  

                          
                            <button onClick={() => setShowPopup(!showPopup)}  className="-mt-2 flex items-center justify-between bg-white  shadow-md rounded-md p-2 hover:bg-gray-100 transition duration-200">
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
            <span class="text-gray-700 font-inter font-bold pr-2">Connect to google</span>
            </div>
            
            </button>
 
           

                            </div> 

                            {showPopup && (
  <div className="ml-80 w-[100%] bg-white shadow-md p-8 rounded-lg -mt-40 relative">
    {/* Close icon positioned at the top-right */}
    <AiOutlineClose
      size={20}
      className="cursor-pointer text-black absolute top-4 right-2"
      onClick={() => setShowPopup(false)}
    />

    <div className="flex justify-between items-center">
      <p className="text-[14px] font-inter font-semibold mt-4">
        Are you sure you want to connect with Google?
        <br />
        <br />
        <span 
          className="ml-20 font-inter text-[18px] px-6 py-2 bg-white rounded-md hover:bg-gray-100 hover:text-black cursor-pointer inline-block"
          onClick={() => handleGoogleConnect()}
        >
          Ok
        </span>
      </p>
    </div>
  </div>
)}
{showPopup1 && (
  <div className="ml-80 w-[100%] bg-white shadow-md p-8 rounded-lg -mt-40 relative">
    {/* Close icon positioned at the top-right */}
    <AiOutlineClose
      size={20}
      className="cursor-pointer text-black absolute top-4 right-2"
      onClick={() => setShowPopup1(false)}
    />

    <div className="flex justify-between items-center">
      <p className="text-[14px] font-inter font-semibold mt-4">
        Are you sure you want to connect with Google?
        <br />
        <br />
        <span 
          className="ml-20 font-inter text-[18px] px-6 py-2 bg-white rounded-md hover:bg-gray-100 hover:text-black cursor-pointer inline-block"
          onClick={() => handleRemoveGoogleConnect()}
        >
          Ok
        </span>
      </p>
    </div>
  </div>
)}
                            
                            </div>
                        } 
                           

           
                    
                </div>
            }
                
            </div>
           

<<<<<<< Updated upstream
            <div className='w-[100%] h-[20%] flex items-center justify-center border-t mb-10 border-gray-400 '>
            
>>>>>>> Stashed changes
                    <a href='/' className='w-[70%] h-[100%] flex items-center justify-center'> 
                     <div className='flex flex-row w-[100%]  h-[40%] items-center justify-center space-x-2 ' > 
                    
                         <div><IoLogOut size={20} className='cursor-pointer' onClick={handleLogout}/></div>
                         <div><p className='text-[14px] cursor-pointer text-gray-500' onClick={handleLogout}>Logout</p></div>
=======
            <div className='w-[100%] h-[20%]  items-center justify-center border-t mt-5 border-gray-400 '>
            
            <div>
                       <p className='pr-3 font-inter font-bold text-[16px]'>{localStorage.getItem('email')}</p>
                       </div>
                    <a href='/' className='w-[40%] h-[40%] flex items-center justify-center'> 
                     <div className='flex flex-row w-[100%]  h-[40%] items-center justify-center  space-x-2 ' > 
                    
                         <div><p className='text-[14px] font-inter cursor-pointer text-gray-500 ' onClick={handleLogout}>Logout</p></div>
                         <div className=''><img src={Logout} className='cursor-pointer' onClick={handleLogout}/></div>
>>>>>>> Stashed changes
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