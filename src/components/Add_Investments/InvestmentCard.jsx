import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {gsap} from 'gsap'
function InvestmentCard({id,CompanyName,Title,Description}) {
  const mycard=useRef()
  const [edit,setEdit]=useState(false)

  const handleEdit=()=>{
    setEdit(!edit)
  }
  

  const handleDelete=async()=>{
    console.log('ok')
    let organization=localStorage.getItem('organization')
    await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/deleteNewInvestment',{id:id,organization:organization})
  }
  return (
    <div ref={mycard} className='flex space-y-4 flex-col p-[24px] border-[1px] border-gray-300 h-[90px] rounded-md '>
        <div className='flex flex-row items-center h-[100%]'>
            <div className='basis-1/2'><p className='text-[15px] text-gray-800'>{Title}</p></div>
          { /* <div className='basis-1/2 flex justify-end space-x-3' onClick={handleEdit}><p className='text-[14px] text-blue-600 cursor-pointer'>Edit</p><p className='text-[14px] text-red-600 cursor-pointer' onClick={handleDelete}>Delete</p></div>*/}
          <p className='text-[14px]'>{Description}</p>
        </div>
        <div>
          <p className='cursor-pointer text-red-500 text-[14px] flex items-end justify-end w-[100%]' onClick={handleDelete}>Delete</p>
        </div>

        {edit?<EditCard handleClose={handleEdit} id={id}/>:<></>}
    </div>
  )
}

export default InvestmentCard