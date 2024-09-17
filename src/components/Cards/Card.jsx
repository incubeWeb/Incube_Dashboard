import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {gsap} from 'gsap'
import EditCard from './EditCard'
import { GoPencil } from "react-icons/go";



function Card({id,CompanyName,Title,Description,Tab}) {
  const mycard=useRef()
  const [edit,setEdit]=useState(false)

  const handleEdit=()=>{
    setEdit(!edit)
  }

  const handleDelete=async()=>{
    let organization=localStorage.getItem('organization')
    await axios.post('http://localhost:8999/deleteNewDetails',{id:id,organization:organization})
  }
  return (
    <div ref={mycard} className='flex space-y-4 flex-col p-[24px] border-[1px] border-gray-300 h-[290px] rounded-md shadow-md '>
        <div className='flex flex-row border-b-[1px] items-center h-[13%]'>
            <div className='basis-1/2'><p className='text-[18px] text-gray-800 pb-5 font-sans font-bold'>{Title}</p></div>
            <div className='basis-1/2 flex justify-end space-x-3' onClick={handleEdit}> <p className='text-[14px] text-blue-600 cursor-pointer font-inter font-semibold pb-5'>Edit</p><p className='text-[14px] text-red-600 pb-5 font-inter font-semibold cursor-pointer' onClick={handleDelete}>Delete</p></div>
           
        </div>
        <div className='h-[87%] w-[100%] overflow-x-auto'>
            <p className='text-[14px]'>{Description}</p>
        </div>

        {edit?<EditCard handleClose={handleEdit} id={id}/>:<></>}
    </div>
  )
}

export default Card