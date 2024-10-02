import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const Privatekeypopup = ({Type,uniqueid,apikeyvalue,hidenavbar,setpopup,realtimecheckAPikeys}) => {
  const [organziationUsers,setorganizationusers]=useState([])
  const [checkedUsers,setcheckedUsers]=useState([])
  const handlecancel=()=>{
    setpopup(false)
  }
  const handlesharenow=async()=>{

    const filteredData=checkedUsers.filter(val=>val.value==true)
    const organization=localStorage.getItem('organization')
        const Members=filteredData
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/save-apikeys`,{
            organization:organization,
            Members:Members,
            
        })
        if(response.data.status==200)
        {    
            
            if(response.data.status==200)
            {
                setpopup(false)
            }
            
        }

  }

  const setUsers=async()=>{
    let organization=localStorage.getItem('organization')
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/fetchallusers`,{
      organization:organization
    })
    setorganizationusers(response.data.data)
    response.data.data.map(val=>{  
      setcheckedUsers(prev=>[...prev,{id:val.email,uniqueid:uniqueid,Creator:localStorage.getItem('email'),member:val.email,security:'private',Api_value:apikeyvalue,Type:Type,active:'no',value:false}])
    })
 

  }
  useEffect(()=>{
    setUsers()
  },[])

  useEffect(()=>{
    setUsers()
  },[realtimecheckAPikeys])

  const handleCheckboxchange=(id)=>{
    
    const new_list=checkedUsers.filter(val=>val.email==id)
    let temp_val=false
    new_list.map(val=>{
      temp_val=val.value
    })
    const new_temp_val=!temp_val
    const new2_list=checkedUsers.filter(val=>val.email!=id)
    const new3_list=[{id:id,value:new_temp_val,uniqueid:uniqueid,Creator:localStorage.getItem('email'),member:id,security:'private',Api_value:apikeyvalue,Type:Type,active:'no'}]
    const val=[...new2_list,...new3_list]
    setcheckedUsers(val)
  }

  return (
    <div className={`${hidenavbar?'ml-[2%] w-[90%]':'ml-[20%] w-[80%] '} font-inter h-screen pt-[5%] flex flex-col p-4 items-center justify-center space-y-4 font-sans `}>
      <div className='space-y-2 flex flex-col w-[430px] h-[470px] rounded-md bg-white p-4 border-[1px] border-gray-100'>
          <div className='w-[100%] h-[40px] flex items-center justify-end' >
                <div className='w-[16px] h-[16px] cursor-pointer' onClick={handlecancel}>
                  <RxCross2 size={16} className='text-black'/>
                </div>
          </div>
          <div className='w-[100%] h-[80%] overflow-y-auto space-y-1'>
              
            {
              organziationUsers.map(val=>
                val.email!=localStorage.getItem('email')?
                <div key={val._id} className='w-[100%] p-2 h-[40px] border-[1px] border-gray-200 flex flex-row space-x-2'>
                    <div className='flex w-[50%] items-center justify-start'><p className='text-[14px]'>{val.email}</p></div>
                    <div className='w-[50%] flex items-center justify-end'>
                        <input type='checkbox' onChange={()=>handleCheckboxchange(val.email)} checked={checkedUsers[val.email]}/>
                    </div>
                </div>
                :
                <></>
              )
            }
                            
          </div>

          <div className='w-[100%] h-[40px] flex space-x-2'>
              <div onClick={handlesharenow} className='w-[130px] cursor-pointer select-none h-[35px] bg-gradient-to-r from-blue-400 text-white flex items-center justify-center rounded-md to-sky-500'>
                  <p className='text-[13px]'>Share now</p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Privatekeypopup