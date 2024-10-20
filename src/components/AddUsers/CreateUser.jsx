import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { jwtDecode } from 'jwt-decode';

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
    <div className={`${hidenavbar?' ml-[0%] w-[96%] ':'ml-[20%] w-[80%]'} font-noto justify-center flex flex-col fixed top-[-3%] right-0 bg-white h-[100%] z-40 p-[34px]`}>
      <div className=' rounded-md space-y-4 w-[100%] h-[500px] p-[13px] md:p-[23px] flex flex-col' style={{ boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.3)' }}>
        <div className='w-[100%] flex justify-end'>
          <RxCross2 onClick={handleAddUser} size={23} className='cursor-pointer bg-gray-100 rounded-full' />
        </div>
        <div className='flex flex-col space-y-2'>
          <p className='text-[14px] select-none'>Email</p>
          <input id='email' className='outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[40px] rounded-md border-gray-500 border-[1px] hover:border-blue-600 focus:border-blue-600' />
        </div>
        <div className='flex flex-col space-y-2'>
          <p className='text-[14px] select-none'>Password</p>
          <input id='password' className='outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[40px] rounded-md border-gray-500 border-[1px] hover:border-blue-600 focus:border-blue-600' />
        </div>
        <div className='flex flex-col space-y-2'>
          <p className='text-[14px] select-none '>Role</p>
          <select onChange={(e)=>getOptions(e)} className='text-[14px] border-gray-600 hover:border-blue-600 focus:border-blue-600 border-[1px] outline-none rounded-md h-[40px]'>  
            <option>super admin</option>
            <option>admin</option>
            <option>team lead</option>
            <option>user</option>
          </select>
        </div>
        
        <div className='flex flex-col items-center h-[60px] justify-center'>
          <button className='bg-blue-600 w-[95px] text-[14px] rounded-md  h-[35px] text-white' onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
