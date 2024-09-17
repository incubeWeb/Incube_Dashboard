import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";

function EditUser({ handleEdit,email,password,role,edit,setAllusers}) {
 const [option,setOption]=useState('super admin')

 useEffect(()=>{
   const fun=()=>{
    document.getElementById('email').value=email
    document.getElementById('password').value=password
    document.getElementById('role').value=role
   }
   fun()
 },[edit])


 const handleUpdate=async()=>{
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value
    const role=option
    let organization=localStorage.getItem('organization')
    const response=await axios.post('http://localhost:8999/updateuser',{
        email:email,
        password:password,
        role:role,
        doneBy:localStorage.getItem('email'),
        organization:organization
    })
    if(response.data.status==200)
    {
        const response=await axios.post('http://localhost:8999/fetchallusers',{organization:organization})
        setAllusers(response.data.data)
        handleEdit()
    }
 }

 
 const getOptions=(e)=>{
  setOption(e.target.value)
 }
  return (
    <div className='font-noto justify-center flex flex-col fixed top-0 left-[20%] right-0 bg-white w-[80%] h-[100%] z-40 p-[34px]'>
      <div className=' rounded-md space-y-4 w-[100%] h-[500px] p-[13px] md:p-[23px] flex flex-col' style={{ boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.3)' }}>
        <div className='w-[100%] flex justify-end'>
          <RxCross2 onClick={handleEdit} size={23} className='cursor-pointer bg-gray-100 rounded-full' />
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
          <select onChange={(e)=>getOptions(e)} id='role' className='text-[14px] border-gray-600 hover:border-blue-600 focus:border-blue-600 border-[1px] outline-none rounded-md h-[40px]'>  
            <option>super admin</option>
            <option>admin</option>
            <option>team lead</option>
            <option>user</option>
          </select>
        </div>
        <div className='flex flex-col items-center h-[60px] justify-center'>
          <button className='bg-blue-600 w-[95px] text-[14px] rounded-md  font-inter h-[35px] text-white' onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
