import React from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { jwtDecode } from 'jwt-decode';
import ChatBot from '../GenaiBox/ChatBot';

function CreateNew({ setCreateNew, fetchCompanyData,hidenavbar }) {
  const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
  const saveDetails = async () => {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let profilelink = document.getElementById('profilelink').value;
  
    const res = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/dealpipeline`, {
      title: title,
      piclink: profilelink,
      Description: description,
      organization:Logorganization
    },{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
   

    if (res.data.status === 200) {
      alert("Data Saved");
      fetchCompanyData(); // Fetch the updated data
      setCreateNew(false); // Close the form
    }
  };

  return (
    <div className={`${hidenavbar?'pl-[52px] w-[100%]':'ml-[20%] w-[80%]'} flex flex-col fixed top-0  right-0 bg-white h-[100%] z-40 p-[34px]`}>
      <div className=' rounded-md space-y-4 w-[100%] h-[500px] p-[13px] md:p-[23px] flex flex-col' style={{ boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.3)' }}>
        <div className='w-[100%] flex justify-end'>
          <RxCross2 onClick={() => setCreateNew(false)} size={23} className='cursor-pointer bg-gray-100 rounded-full' />
        </div>
        <div className='flex flex-col space-y-2'>
          <p className='text-[14px] select-none font-inter font-semibold'>Title</p>
          <input id='title' className='outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[40px] rounded-md border-gray-500 border-[1px] ' />
        </div>
        <div className='flex flex-col space-y-2'>
          <p className='text-[14px] select-none font-inter font-semibold'>Profile Photo link</p>
          <input id='profilelink' className='outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[40px] rounded-md border-gray-500 border-[1px]' />
        </div>
        <div className='flex flex-col space-y-2'>
          <p className='text-[14px] select-none  font-inter font-semibold'>Description</p>
          <textarea id='description' className='outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[140px] overflow-x-auto resize-none rounded-md border-gray-500 border-[1px] ' />
        </div>
        <div className='flex flex-col items-center h-[60px] justify-center'>
          <button className='bg-blue-600 w-[95px] text-[14px] rounded-md font-inter font-semibold h-[35px] text-white' onClick={saveDetails}>Save</button>
        </div>
      </div>
      <ChatBot/>
    </div>
  );
}

export default CreateNew;
