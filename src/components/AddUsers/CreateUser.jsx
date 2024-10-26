import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { jwtDecode } from 'jwt-decode';
import Mail from '../Icons/Mail.svg'
import Key from '../Icons/Key.svg'
import User from '../Icons/User_Role.svg'

function CreateUser({hidenavbar, handleAddUser,setAllusers }) {
 const [option,setOption]=useState('super admin')
 const [companies,setallcompanies]=useState([])
 const [company,setCompany]=useState('none')
 const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

 useEffect(()=>{
  const getCompanies=async()=>{
    let organization=Logorganization
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDealpipelineCompany`,{organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
    setallcompanies(response.data.data)
  }
  getCompanies()
 },[])

 const handleSave=async()=>{
  const email=document.getElementById('email').value.trim()
  const password=document.getElementById('password').value.trim()
  const role=option
  const team=company
  let organization=Logorganization
  const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/registerUser`,{
    email:email,
    password:password,
    role:role,
    organization:organization
  },{
    headers:{
      "Authorization":`Bearer ${token}`
    }
  })
  if(team!='none')
  {
    await axios.post(`${import.meta.env.VITE_HOST_URL}8999/addTeam`,{
      organization:team,
      member:email,
      position:role,
      mainorganization:organization
    },{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
  }
  
  if(response.data.data=="User Created")
  {
    setAllusers(prev=>[...prev,{email:email,password:password,role:role}])
    
  }
  if(response.data.status==200)
  {
    handleAddUser()
  }
 }
 
 const getOptions=(e)=>{
  setOption(e.target.value)
 }
 const getCompany=(e)=>{
  setCompany(e.target.value)
 }
  return (
    <div className={`${hidenavbar ? 'w-[100%]' : 'ml-[20%] w-[95%]'} font-noto flex justify-center items-center fixed top-0 right-0 bg-gray-100 h-full z-40 p-[34px]`}>
  <div className='rounded-md bg-white relative space-y-4 w-[32%] h-[450px] p-[13px] md:p-[23px] flex flex-col  ' style={{ boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.3)' }}>
   
    <div className='w-full flex justify-end absolute right-1 top-1 mb-10'>
      <RxCross2 onClick={handleAddUser} size={20} className='cursor-pointer  text-gray-700' />
    </div>
 <div className='font-semibold text-[18px] mb-4 font-inter text-gray-900'>
  <p>Add users</p>
 </div>
    <div className='flex flex-col space-y-2'>
    <div className='flex items-center relative'>
      <p className='text-[14px] select-none font-inter font-semibold'>Email</p>
      <img src={Mail} className='w-5 h-5 ml-4 absolute right-1' />
      </div>
      <input id='email' placeholder='Enter your Email'  className='outline-none p-2 text-[14px] text-gray-600 border-gray-400 w-full h-[40px] rounded-md  border-[1px] placeholder focus:outline-none text-sm font-inter' />
      
    </div>
    <div className='flex flex-col space-y-2 font-inter '>
    <div className='flex items-center relative '>
      <p className='text-[14px] select-none font-semibold'>Password</p>
      <img src={Key} className='w-5 h-5 ml-2 absolute right-1'/>
      </div>
      <input id='password' placeholder='Enter your Password' className='outline-none  font-normal p-2 text-[14px] text-gray-600 border-gray-400 w-full h-[40px] rounded-md  border-[1px] placeholder focus:outline-none text-sm font-inter' />
    </div>
    <div className='flex flex-col space-y-2 '>
    <div className='flex items-end relative'>
      <p className='text-[14px] select-none font-semibold'>Role</p>
      <img src={User} className='w-5 h-5 absolute right-1'/>
      </div>
      <select onChange={(e) => getOptions(e)} className='text-[14px] border-gray-600  text-gray-600 focus:outline-none text-sm font-normal border-[1px] outline-none rounded-md h-[40px]'>
        <option className='font-inter '>super admin</option>
        <option className='font-inter'>admin</option>
        <option className='font-inter'>team lead</option>
        <option className='font-inter'>user</option>
      </select>
    </div>
    
    <div className='flex flex-col items-center justify-center h-[60px] absolute bottom-4 left-1/2 transform -translate-x-1/2'>
  <button className='bg-blue-600 w-[95px] text-[14px] rounded-md h-[35px] text-white font-inter font-bold' onClick={handleSave}>
    Save
  </button>
</div>

  </div>
</div>

  );
}

export default CreateUser;
