import React, { useEffect, useRef, useState } from 'react'
import { Link,  useLocation, useNavigate } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";
import {gsap} from 'gsap'
import Incubelogo from '../Icons/Incubelogo.svg'
import { HiOutlineUserAdd } from "react-icons/hi";
import { IoDocumentOutline, IoKeyOutline, IoKeySharp } from "react-icons/io5";
import Logout from '../Icons/Logout.svg'
import { RiHome6Line } from "react-icons/ri";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { SlSocialDropbox } from "react-icons/sl";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { AiOutlineClose } from 'react-icons/ai';  // Close icon
import { jwtDecode } from 'jwt-decode';
import ChatBot from '../GenaiBox/ChatBot';
import { FaPlus } from 'react-icons/fa';
import ApplicationsNav from './ApplicationsNav';
import googleLogo from '../../Assets/googleLogo.png'
import github from '../../Assets/github.png'
import outlook from '../../Assets/outlook.png'
import airtable from '../../Assets/airtable.png'
import { PiStarFourBold } from 'react-icons/pi';



const Navigation = ({navbarref,showsmallnav,setshowsmallnav,setlogin,googleaccountconnected,activeField,setActiveField,hidenavbar,sethidenavbar}) => {
  
    
    const location=useLocation()
    const Navigate=useNavigate()
    const [openappList,setopenappList]=useState([{"id":1,"image":googleLogo,"name":"Google","active":false}])
    const [lockedapplist,setlockedapplist]=useState([{"id":1,"name":"Airtable","image":airtable},{"id":2,"name":"GitHub","image":github},{"id":3,"name":"Microsoft Outlook","image":outlook}])

    

    const [showApplicationNav,setshowApplicationNav]=useState(false)

    const [showgoogleconnected,setshowgoogleconnected]=useState(false)
    const [loading,setloading]=useState(false)

    const handleLogout=()=>{
          setlogin(false)
          localStorage.clear() 
    }
    const NavbarRef=navbarref
    const settingBtnRef=useRef(null)
    const [showPopup, setShowPopup] = useState(false); 
    const [showPopup1, setShowPopup1] = useState(false); 
    const token=localStorage.getItem('token') || ""
        const userdata=jwtDecode(token) || ""
        const Logemail=userdata.userdetails.email || ""
        const Logorganization=userdata.userdetails.organization || ""
        const Logrole=userdata.userdetails.role || ""
        if(Logemail=="")
        {
            return
        }
    const applicationNavRef=useRef(null)

    useEffect(()=>{
        const settingApplicationNav=()=>{
            gsap.to(applicationNavRef.current,{
                x:"-100%",
                duration:0.4
            })
        }
        settingApplicationNav()
    },[])
    

    const ShowApplicationNavfun=(val)=>{
        
        if(val){
            setshowApplicationNav(true)
            if(hidenavbar){
                gsap.to(applicationNavRef.current,{
                    x:"18%",
                    duration:0.4
                })    
            }
            else{
                gsap.to(applicationNavRef.current,{
                    x:"100%",
                    duration:0.4
                })    
            }
        }else{
            setshowApplicationNav(false)
            gsap.to(applicationNavRef.current,{
                x:"-100%",
                duration:0.4
            })
        }
    }
    
   
    const hideNav=()=>{
        ShowApplicationNavfun(false)
        if(!hidenavbar)
        {
            setshowsmallnav(true)
            if(showApplicationNav){
                gsap.to(applicationNavRef.current,{
                    x:"-100%",
                    
                    duration:0.4,
                    onComplete:()=>{
                        setshowApplicationNav(false)
                    }
                })
            }
            gsap.to(NavbarRef.current,{
                x:"-100%",
                
                duration:0.4,
                
            })
            gsap.to(settingBtnRef.current,{
                x:'-100%',
                
                duration:0.4,
                onComplete:()=>{
                    sethidenavbar(true)
                }
            })
        }
        else{
            setshowsmallnav(false)
            gsap.to(NavbarRef.current,{
                x:"0%",
                duration:0.4
            })
            gsap.to(settingBtnRef.current,{
                x:'0%',
                
                duration:0.4,
                onComplete:()=>{
                    sethidenavbar(false)
                }
            })
        }
        
    }

    useEffect(()=>{
       
        const conditionFun=()=>{
            
            if(location.pathname!="/")
                {
                    setActiveField(location.pathname)
                    Navigate(location.pathname)
                }
                else{
                    Navigate(activeField)
                }
        }
        conditionFun()

    },[activeField,location.pathname])

    useEffect(()=>
        {
            const checkGoogleLogin=async()=>{
            
            const token=localStorage.getItem('token') || ""
            const userdata=jwtDecode(token) || ""
            const Logemail=userdata.userdetails.email || ""
            const Logorganization=userdata.userdetails.organization || ""
            const Logrole=userdata.userdetails.role || ""
            if(Logemail=="")
            {
                return
            }
               const response= await axios.post(`${import.meta.env.VITE_HOST_URL}1222/check-login-google`,{
                    email:Logemail,
                    organization:Logorganization
                },{
                    headers:{
                      "Authorization":`Bearer ${token}`
                    }
                 })
                
                if(response.data.status==200 &&response.data.msg=="Valid Refresh token")
                {
                    setopenappList(prevApps => prevApps.map(app => {
                        if (app.name === "Google") {
                          return { ...app, active: true };
                        }
                        return app;
                      }));
                      setShowPopup(false)
                }
                else if(response.data.status==400)
                {
                    setopenappList(prevApps => prevApps.map(app => {
                        if (app.name === "Google") {
                          return { ...app, active: false };
                        }
                        return app;
                      }));
                      setShowPopup(false)
                }
                else if(response.data.status==-200)
                {
                    setopenappList(prevApps => prevApps.map(app => {
                        if (app.name === "Google") {
                          return { ...app, active: false };
                        }
                        return app;
                      }));
                      setShowPopup(false)
                }
            }
            checkGoogleLogin()
            
        },[googleaccountconnected])
    
        useEffect(()=>
            {
               
                const checkGoogleLogin=async()=>{
                    const token=localStorage.getItem('token') || ""
                    const userdata=jwtDecode(token) || ""
                    const Logemail=userdata.userdetails.email || ""
                    const Logorganization=userdata.userdetails.organization || ""
                    const Logrole=userdata.userdetails.role || ""
                    if(Logemail=="")
                    {
                        return
                    }
                   const response= await axios.post(`${import.meta.env.VITE_HOST_URL}1222/check-login-google`,{
                        email:Logemail,
                        organization:Logorganization
                    },{
                        headers:{
                          "Authorization":`Bearer ${token}`
                        }
                      })
                    if(response.data.status==200 &&response.data.msg=="Valid Refresh token")
                    {
                        setopenappList(prevApps => prevApps.map(app => {
                            if (app.name === "Google") {
                              return { ...app, active: true };
                            }
                            return app;
                          }));
                          setShowPopup(false)
                    }
                    else if(response.data.status==400)
                    {
                        setopenappList(prevApps => prevApps.map(app => {
                            if (app.name === "Google") {
                              return { ...app, active: false };
                            }
                            return app;
                          }));
                          setShowPopup(false)
                    }
                    else{
                        setopenappList(prevApps => prevApps.map(app => {
                            if (app.name === "Google") {
                              return { ...app, active: false };
                            }
                            return app;
                          }));
                          setShowPopup(false)
                    }
                }
                checkGoogleLogin()
            },[])
    


   


    const handleRemoveGoogleConnect=async()=>{
        setloading(true)
        const email=Logemail
        const organization=Logorganization
        const response= await axios.post(`${import.meta.env.VITE_HOST_URL}1222/logout-google`,{
            email:email
            ,organization:organization
        },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
        if(response.data.status==200)
        {
            setShowPopup1(false)
            setopenappList(prevApps => prevApps.map(app => {
                if (app.name === "Google") {
                  return { ...app, active: false };
                }
                return app;
              }));
            
        }
    }

    const handleGoogleConnect=async()=>
    {
        setloading(true)
        const email=Logemail
        const organization=Logorganization
        
        const response= await axios.post(`${import.meta.env.VITE_HOST_URL}1222/generate-link`,{
            email:email
            ,organization:organization
        },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
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
        <div className='w-[100%] flex flex-row '>
        <div ref={NavbarRef} className=' text-gray-700 select-none font-roboto w-[21%] shadow-lg z-[90] fixed h-[100%] bg-white p-[40px] pt-[10px] flex flex-col '>
       <div className='flex flex-col items-start justify-start h-[100%] w-[100%]'>
            <div className='w-[100%] h-[13%] flex justify-start items-center'>
            <img src={Incubelogo} className='h-[67px]] w-[24px] ml-1'/>   <p className='text-[24px] ml-1 font-kadwa font-bold'> InCube</p>
                
            </div>
            <div className=' flex flex-col space-y-2 w-[100%] h-[80%] pt-2'>

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
                <Link to='/keys'>
                <div className={`${activeField=='/keys'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/keys')}>
                    <div><IoKeyOutline   className={`${activeField=='/keys'?' text-white ':'text-[#667085]'} `} size={24}/></div>
                    <div className='text-[14px] font-inter font-semibold'><p>Api Keys</p></div>
                </div>
                </Link>

                <Link to='/AI'>
                <div className={`${activeField=='/AI'?'bg-blue-600 text-white ':' select-none hover:bg-gray-300 cursor-pointer hover:text-white'}  flex flex-row h-[40px] items-center space-x-2  rounded-md pl-2`} onClick={()=>setActiveField('/AI')}>
                    <div> <PiStarFourBold  className={`${activeField=='/AI'?' text-white ':'text-[#667085]'} `} size={24}/></div>
                    <div className='text-[14px] font-inter font-semibold'><p>AI</p></div>
                </div>
                </Link>

                <div className={` flex flex-row h-[40px] items-center space-x-2 hover:text-white hover:bg-gray-300 cursor-pointer rounded-md pl-2`} onClick={()=>{ShowApplicationNavfun(true)}}>
                    <div className='w-[24px] flex justify-center text-[#667085] items-center'><FaPlus size={16}/></div>
                    <div className='text-[14px] font-inter font-semibold'><p>Connect an Application</p></div>
                </div>
            </div>

        
            <div className='w-[100%] h-[20%] flex flex-col items-center justify-center border-t mt-5 border-gray-400 '>
                    <div className='text-[14px] text-gray-500'>
                        <p className='font-bold'>{Logemail}</p>
                    </div>
                    <a href='/' className='w-[50%] h-[40%] flex items-center justify-center'> 
                     <div className='flex flex-row w-[120%]  h-[40%] items-center justify-center  space-x-2 ' > 
                        <div className='font-bold text-[20px] rounded-[100%] items-center bg-gray-100  flex justify-center border-gray-300 border-[1px] w-[40px] h-[30px]'>
                            <p className='mt-[-3px]'>{Logemail?.[0]}</p>
                        </div>
                        
                         <div><p className='text-[14px] font-inter cursor-pointer text-gray-500 font-semibold' onClick={handleLogout}>  Logout</p></div>
                         <div className=''><img src={Logout  } className='cursor-pointer h-[25px] w-[25px]' onClick={handleLogout}/></div>
                    </div>
                    </a>
            </div>
       </div>
       
    </div>

    
        <div ref={applicationNavRef} className='w-[21%] h-[100%] z-[80] bg-white fixed' >
            <ApplicationsNav ShowApplicationNavfun={ShowApplicationNavfun} lockedapplist={lockedapplist} setlockedapplist={setlockedapplist} openappList={openappList} setopenappList={setopenappList} setshowApplicationNav={setshowApplicationNav} setShowPopup={setShowPopup} showPopup1={showPopup1} setShowPopup1={setShowPopup1} googleaccountconnected={googleaccountconnected} handleRemoveGoogleConnect={handleRemoveGoogleConnect} showPopup={showPopup} handleGoogleConnect={handleGoogleConnect}/>
        </div>
       
    {showPopup1 && (
                <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
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

                {showPopup && (
                    <div className="z-[100] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
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

        <div  ref={settingBtnRef} className={`${showsmallnav?'w-[16%]  z-[90] bg-white shadow-lg h-[100%] pr-4':'w-[16%] h-[40px]'} ml-[4%] flex fixed flex-col items-end  z-[90]  pt-[30px]  `}>
                <div className='cursor-pointer'>
                    <FiAlignJustify  className='text-gray-500' size={20} onClick={hideNav}/>
                </div>
                
                    <div className={`${showsmallnav?'opacity-100 w-[100%] h-[100%]':'opacity-0 w-[0px] h-[0px]'} transition-all  relative  flex flex-col items-end space-y-6 mt-[49px]`}>
                    <Link to="/dashboard">
                        <RiHome6Line size={24} className={`mx-auto ${activeField === '/dashboard' ? 'text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveField('/dashboard')} />
                    </Link>
                    <Link to="/dealpipeline">
                        <HiOutlineChartBarSquare size={24} className={`mx-auto ${activeField === '/dealpipeline' ? 'text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveField('/dealpipeline')} />
                    </Link>
                    <Link to="/dealsourcing">
                        <SlSocialDropbox size={24} className={`mx-auto ${activeField === '/dealsourcing' ? 'text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveField('/dealsourcing')} />
                    </Link>
                    <Link to="/portfolio">
                        <RiCheckboxMultipleLine size={24} className={`mx-auto ${activeField === '/portfolio' ? 'text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveField('/portfolio')} />
                    </Link>
                    <Link to="/adduser">
                        <HiOutlineUserAdd size={24} className={`mx-auto ${activeField === '/adduser' ? 'text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveField('/adduser')} />
                    </Link>
                    <Link to="/allDocs">
                        <IoDocumentOutline size={24} className={`mx-auto ${activeField === '/allDocs' ? 'text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveField('/allDocs')} />
                    </Link>
                    <Link to="/keys">
                        <IoKeyOutline size={24} className={`mx-auto ${activeField === '/keys' ? 'text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveField('/keys')} />
                    </Link>
                    
                    <Link to="/AI">
                        <PiStarFourBold size={24} className={`mx-auto ${activeField === '/AI' ? 'text-blue-600' : 'text-gray-500'}`} onClick={() => setActiveField('/AI')} />
                    </Link>
                    <div className={` flex flex-row h-[40px] items-center space-x-2 hover:text-white cursor-pointer rounded-md pl-2`} onClick={()=>{ShowApplicationNavfun(true)}}>
                        <div className='w-[24px] flex justify-center text-[#667085] items-center'><FaPlus size={18}/></div>  
                    </div>
                </div>
                
                
        </div>
     

        

    </div>

  )
}

export default Navigation