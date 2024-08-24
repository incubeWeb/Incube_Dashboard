import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { IoSettingsOutline } from "react-icons/io5";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setLoginIn }) => {
  const [showError, setShowError] = useState(false);
  const Navigate=useNavigate()

  const loginUser = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const response = await axios.post('http://localhost:8999/login', {
        email: email,
        password: password
      });
      console.log(response.data.status)
      const status = response.data.status;
      if (status == 200) {
        localStorage.setItem('login',true)
        localStorage.setItem("email", email);
        localStorage.setItem("role",response.data.role)
        
        setLoginIn(true);
        Navigate('/dashboard')
        window.location.reload()
      } 
      if(status==-200)
      {
          Navigate("/")
          setShowError(true);
        
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='font-roboto w-[100%] h-screen bg-gray-200 flex items-center justify-center'>
      <div className='flex relative flex-row w-[60%] h-[70%] bg-white rounded-xl border-gray-300 borddr-[1px] shadow-md'>
        <div className='space-y-3 z-40 flex-col absolute w-[50%] h-[100%] bg-blue-500 rounded-r-xl shadow-lg shadow-gray-400 border-r-[1px] border-gray-300 flex items-center justify-center text-white'>
          <p className='text-[25px] tracking-wider'>Incube Web Login</p>
          <div className='flex flex-row h-[5%] w-[100%] items-center justify-center'>
            <div className='text-[14px] w-[60px] h-[100%] flex items-center justify-center pt-[2px]'>
            </div>
          </div>
        </div>
        <div className='text-gray-600 flex flex-row space-y-2 w-[100%] h-[100%] items-center justify-center'>
          
            <div className='flex flex-col ml-[50%] h-[100%] w-[50%] items-center justify-center'>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Email</p>
                <input id='email' type='text' className='text-[14px] border-gray-400 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Email' />
              </div>
              <div className='flex flex-col w-[70%] h-[15%] space-y-3'>
                <p className='text-[14px] pl-1'>Password</p>
                <input id='password' type='password' className='text-[14px] border-gray-400 outline-none pl-2 border-[1px] rounded-md h-[50%]' placeholder='Password' />
              </div>
              <div className='flex flex-col space-y-2 w-[70%] h-[15%] items-center justify-center'>
                  <div className='bg-blue-600 h-[40px] rounded-md hover:bg-blue-800 select-none cursor-pointer flex items-center justify-center w-[80px]' onClick={loginUser}>
                  <p className='text-white text-[14px]'>Login</p>
                </div>
              </div>
              <div className='flex flex-col w-[100%] h-[10%] items-center justify-center'>
                {showError? <p className='text-[14px] text-red-400'>Incorrect email or password</p>:<></>}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
