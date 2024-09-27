import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoRefresh } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

const PrivatePopup = ({hidenavbar,setfileprivate,docId}) => {
  const handlecancel=()=>{
    setfileprivate(false)
  }
  const [organziationUsers,setorganizationusers]=useState([])
  const [checkedUsers,setcheckedUsers]=useState([])
  const [searchUser,setsearchuser]=useState('')

  const handlesharenow=async()=>{
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/insert-private-Visibility`,{
      emails:JSON.stringify(checkedUsers),
      organization:localStorage.getItem('organization'),
      Document_id:docId
    })
    if(response.data.status==200)
    {
      setfileprivate(false)
      alert('Done,shared')
    }

  }
  
  useEffect(()=>
  {
    const setSearchedUsers=async()=>
    {
      if(searchUser=="")
      {
        setUsers()
      }
     else{
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/findUsers`,{
        user:searchUser,
        organization:localStorage.getItem('organization')
      })
      setorganizationusers(response.data.data)
     }
    }
    setSearchedUsers()
  },[searchUser])
  

  const setUsers=async()=>{
    let organization=localStorage.getItem('organization')
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/fetchallusers`,{
      organization:organization
    })
    setorganizationusers(response.data.data)
    response.data.data.map(val=>{
      if(val.email==localStorage.getItem('email'))
      {
        
      setcheckedUsers(prev=>[...prev,{id:val._id,value:true}])
      }
      else{
        
      setcheckedUsers(prev=>[...prev,{id:val._id,value:false}])
      }
    })
 

  }
  useEffect(()=>{
    setUsers()
  },[])

  const handleCheckboxchange=(id)=>{
    
    const new_list=checkedUsers.filter(val=>val.id==id)
    let temp_val=false
    new_list.map(val=>{
      temp_val=val.value
    })
    const new_temp_val=!temp_val
    const new2_list=checkedUsers.filter(val=>val.id!=id)
    const new3_list=[{id:id,value:new_temp_val}]
    const val=[...new2_list,...new3_list]
    setcheckedUsers(val)
  }

  const handleRefreshUsers=()=>{
    setUsers()
  }

  return (
    <div className={`${hidenavbar?'ml-[2%] w-[90%]':'ml-[20%] w-[80%] '} font-inter h-screen pt-[5%] flex flex-col p-4 items-center justify-center space-y-4 font-sans `}>
        <div className='space-y-2 flex flex-col w-[430px] h-[470px] rounded-md bg-white p-4 border-[1px] border-gray-100'>
          <div className='w-[100%] h-[40px] flex items-center justify-end' >
                <div className='w-[16px] h-[16px] cursor-pointer' onClick={handlecancel}>
                  <RxCross2 size={16} className='text-black'/>
                </div>
          </div> 
          <div className='w-[100%] h-[40px] flex flex-row items-center space-x-2'>
              <input value={searchUser} onChange={(e)=>setsearchuser(e.target.value)} className='w-[95%] h-[100%] text-[14px] border-gray-300 border-[1px] p-2 rounded-md ' placeholder='Search User'/>
              <div className='w-[16px] h-[16px] cursor-pointer'>
                <IoRefresh size={16} onClick={()=>handleRefreshUsers()}/>
              </div>
          </div>

          <div className='w-[100%] h-[80%] overflow-y-auto space-y-1'>
              
            {
              organziationUsers.map(val=>
                val.email!=localStorage.getItem('email')?
                <div key={val._id} className='w-[100%] p-2 h-[40px] border-[1px] border-gray-200 flex flex-row space-x-2'>
                    <div className='flex w-[50%] items-center justify-start'><p className='text-[14px]'>{val.email}</p></div>
                    <div className='w-[50%] flex items-center justify-end'>
                        <input type='checkbox' onChange={()=>handleCheckboxchange(val._id)} checked={checkedUsers[val._id]}/>
                    </div>
                </div>
                :
                <></>
              )
            }
                            
          </div>



          <div className='w-[100%] h-[40px] flex space-x-2'>
              <div onClick={handlesharenow} className='w-[130px] cursor-pointer select-none h-[35px] bg-gradient-to-r from-blue-400 text-white flex items-center justify-center rounded-md to-sky-500'>
                  <p className='text-[13px]'>Private Share </p>
              </div>
              <div onClick={handlesharenow} className='w-[170px] cursor-pointer select-none h-[35px] bg-gradient-to-r from-red-400 text-white flex items-center justify-center rounded-md to-red-500'>
                  <p className='text-[13px]'>Just make it private  </p>
              </div>
          </div>
          
        </div>
    </div>
  )
}

export default PrivatePopup