import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import axios from 'axios';

function EditCard({handleClose,id}) {

  useEffect(()=>{
    const FillField=async()=>{
      let organization=localStorage.getItem('organization')
        const RawData=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getSingleDetail`,{id:id,organization:organization})
        const data=RawData.data.data
        data.map((d)=>
            {document.getElementById('titleText').value=d.Title
            document.getElementById('descriptionText').value=d.Description})
        
    }
    FillField()
  },[])

  const handleUpdate=async()=>{
    const title=document.getElementById('titleText').value
    const des=document.getElementById('descriptionText').value
    let organization=localStorage.getItem('organization')
    const res=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/UpdateSingleDetail`,{id:id,title:title,description:des,organization:organization})
    if(res.data.status=='200')
    {
        alert("Updated Successfully")
        handleClose()
    }
  }
  
  return (
    <div className="flex flex-col fixed top-0 left-[20%] bg-white w-full h-screen z-[54] p-[34px]">

      <div
        className="rounded-md mb-[60px] md:space-y-4 w-[80%] h-[100%] md:p-[23px] flex flex-col overflow-auto"
        style={{ boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.3)' }}
      >
        <div className="w-[100%] flex justify-end">
          <RxCross2 size={23} className="cursor-pointer bg-gray-100 rounded-full ml-2 -mt-2" onClick={handleClose} />
        </div>

        <div
            className="w-[100%] h-[420px] border-gray-200 shadow-md border-[1px] p-[20px] rounded-md"
          >
            <div className="flex flex-col space-y-2">
              <p className="text-[14px] select-none font-inter font-semibold">Title</p>
              <input
                id='titleText' className="outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[40px] rounded-md border-gray-500 border-[1px]"
                
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-[14px] select-none font-inter font-semibold mt-2">Description</p>
              <textarea
                id='descriptionText' className="outline-none p-2 text-[14px] text-gray-600 w-[100%] h-[210px] overflow-x-auto resize-none rounded-md border-gray-500 border-[1px]"
              />
            </div>
          </div>

        <div className="flex flex-row items-center h-[60px] justify-center space-x-3">
          <div
            className="w-[75px] h-[40px] flex-shrink-0 bg-blue-600 rounded-md text-white flex items-center justify-center cursor-pointer"
            style={{ boxShadow: '0px 2px 5px rgba(0,0,0,0.6)' }}
            onClick={handleUpdate}
          >
            <p className="text-[14px] font-semibold font-inter">Update</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCard;
