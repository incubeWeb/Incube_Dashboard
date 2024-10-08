import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { IoSettingsOutline } from "react-icons/io5";
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {jwtDecode} from 'jwt-decode'

const Login = ({ setLoginIn,login }) => {
  const [showError, setShowError] = useState(false);
  const [createorg,setcreateorg]=useState(false)
  const [org_name,setorg_name]=useState('')
  const [org_loc,setorg_loc]=useState('')
  const [org_enitity,setorg_entity]=useState('')
  const [org_email,setorg_email]=useState('')
  const [org_pass,setorg_pass]=useState('')
  const [org_web,setorg_web]=useState('')
  const Navigate=useNavigate()
  const location=useLocation()
  


  const setloginfun=()=>{
    setcreateorg(false)
    setorg_name('');
    setorg_loc('');
    setorg_entity('');
    setorg_email('');
    setorg_pass('');
    setorg_web('');
  }


  useEffect(()=>{
    if(!login){
      Navigate('/')
    }
  },[])

  const CreateOrganizationFun=async()=>{
    const name=org_name
    const location=org_loc
    const entity=org_enitity
    const email=org_email
    const website=org_web
    const password=org_pass

    if (!name || !email || !entity ||!location||!website||!password) {
      alert("Please enter all required fields");
      return; 
  }

    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/createOrganization`,{
      name:name,
      location:location,
      entity:entity,
      email:email,
      website:website,
      password:password
    })

    if(response.data.status==200)
    {
      localStorage.setItem('login',true)
      
      localStorage.setItem('token',response.data.token)
      
      
      setLoginIn(true);
      
      Navigate('/dashboard')
      
      setcreateorg(false)
    }
    else
    {
          Navigate("/")
          alert("something went wrong ...")
    }
  }

  const CreateOrganization=()=>{
    setcreateorg(true)
  }

  const loginUser = async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const organization=document.getElementById('organization').value.trim()

    if (!email || !password || !organization) {
      alert("Please enter all required fields");
      return; // Exit the function if validation fails
  }
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/login`, {
        email: email,
        password: password,
        organization:organization
      });
     
      const status = response.data.status;
      if (status == 200) {
        localStorage.setItem('login',true)
        
        
        localStorage.setItem('token',response.data.token)
        
        setLoginIn(true);
        Navigate('/dashboard')
       
      } 
      if(status==-200)
      {
          Navigate("/")
          setShowError(true);
          
          setTimeout(()=>{
            setShowError(false)
          },2000)
        
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='font-roboto w-[100%] h-screen bg-gray-200 flex items-center justify-center'>
                
      <div className='flex relative flex-row w-[70%] h-[90%] bg-white rounded-xl border-gray-300 borddr-[1px] shadow-md'>
        <div className='space-y-3 z-40 flex-col absolute w-[50%] h-[100%] bg-blue-500 rounded-r-xl shadow-lg shadow-gray-400 border-r-[1px] border-gray-300 flex items-center justify-center text-white'>
          <p className='text-[25px] tracking-wider font-inter font-bold  fade-in'>Incube Web Login</p>
          <div className='flex flex-row h-[5%] w-[100%] items-center justify-center'>
            <div className='text-[14px] w-[60px] h-[100%] flex items-center justify-center pt-[2px]'>
            </div>
          </div>
        </div>
        <div className='text-gray-600 flex flex-row space-y-2 w-[100%] h-[100%] items-center justify-center'>
          {!createorg?
            
            <div className='flex flex-col space-y-2 ml-[50%] h-[100%] w-[50%] items-center justify-center'>
              <p className='text-[16px] font-inter font-bold'>Login User</p>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1 font-inter font-semibold'>Email</p>
                <input id='email' type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Email' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1 font-semibold font-inter'>Password</p>
                <input id='password' type='password' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Password' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1 font-semibold font-inter'>Organization</p>
                <input id='organization' type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Organization name' />
              </div>
              <div className='flex flex-col w-[100%] items-center justify-center'>
                {showError? <p className='text-[14px] text-red-400'>Wrong Credentials</p>:<></>}
              </div>
              <div className='flex flex-row space-x-2 w-[70%] h-[15%] items-center justify-center'>
                  <div className='bg-gradient-to-r from-gray-100 to-gray-200 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[80px]' onClick={loginUser}>
                  <p className=' text-[14px] text-blue-500 font-inter font-bold'>Login</p>
                </div>
                <div className='bg-gradient-to-r from-sky-500 to-blue-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[180px]' 
          onClick={CreateOrganization}>
          <p className='text-white text-[14px] font-inter font-bold'>Create Organization</p>
          </div>

            </div>
              
            </div>
            :
            <div className='space-y-2 flex flex-col ml-[50%] h-[550px] overflow-y-auto w-[50%] items-center justify-center'>
            <div className='flex flex-col w-[70%] h-[15%] space-y-1'>
              <p className='text-[14px] pl-1 font-inter font-semibold'>Name</p>
              <input onChange={(e)=>setorg_name(e.target.value)} type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Name' />
            </div>
            <div className='flex flex-col w-[70%] h-[15%] space-y-1'>
              <p className='text-[14px] pl-1 font-inter font-semibold'>Email</p>
              <input onChange={(e)=>setorg_email(e.target.value)} type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='abc@incube.com' />
            </div>
            <div className='flex flex-col w-[70%] h-[15%] space-y-1'>
              <p className='text-[14px] pl-1 font-inter font-semibold'>Password</p>
              <input onChange={(e)=>setorg_pass(e.target.value)} type='password' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='********' />
            </div>
           
            <div className='flex flex-col w-[70%] h-[15%] space-y-1'>
              <p className='text-[14px] pl-1 font-inter font-semibold'>Location</p>
              <input onChange={(e)=>setorg_loc(e.target.value)} type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='eg.India' />
            </div>
            <div className='flex flex-col w-[70%] h-[15%] space-y-1'>
              <p className='text-[14px] pl-1 font-inter font-semibold'>Entity Type</p>
              <input onChange={(e)=>setorg_entity(e.target.value)} type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='pvt.' />
            </div>
            <div className='flex flex-col w-[70%] h-[15%] space-y-1'>
              <p className='text-[14px] pl-1 font-inter font-semibold'>Website</p>
              <input onChange={(e)=>setorg_web(e.target.value)} type='text' className='text-[14px] border-gray-300 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='incube.com' />
            </div>
            <div className='flex flex-row space-x-2 w-[70%] h-[15%] items-center justify-center'>
                <div className='bg-gradient-to-r from-sky-500 to-blue-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[80px]' onClick={setloginfun}>
                <p className='text-white text-[14px] font-inter font-bold'>Login</p>
              </div>
              
              <div className='bg-gradient-to-r from-gray-100 to-gray-200 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[180px]' onClick={CreateOrganizationFun}>
                <p className='text-blue-500 text-[14px] font-inter font-bold '>Create Organization</p>
              </div>
            </div>

          </div>   
      
      }
      </div>
    </div>
  </div>
);
};

export default Login;
