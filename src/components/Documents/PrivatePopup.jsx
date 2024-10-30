import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { IoRefresh } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { MdGroupRemove } from 'react-icons/md'

const PrivatePopup = ({hidenavbar,setfileprivate,docId}) => {
  const handlecancel=()=>{
    setfileprivate(false)
  }
  const [organziationUsers,setorganizationusers]=useState([])
  const [checkedUsers,setcheckedUsers]=useState([])
  const [searchUser,setsearchuser]=useState('')
  const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const [userList,setUserList]=useState(false)

  const handlesharenow=async()=>{
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/insert-private-Visibility`,{
      emails:JSON.stringify(checkedUsers),
      organization:Logorganization,
      Document_id:docId
    },{
      headers:{
        "Authorization":`Bearer ${token}`
      }
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
        organization:Logorganization
      },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      setorganizationusers(response.data.data)
     }
    }
    setSearchedUsers()
  },[searchUser])
  

  const setUsers=async()=>{
    let organization=Logorganization
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/fetchallusers`,{
      organization:organization
    },{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    setorganizationusers(response.data.data)
    response.data.data.map(val=>{
      if(val.email==Logemail)
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
    <div className={`${hidenavbar?'ml-[2%] w-[90%]':'ml-[20%] w-[80%] '} font-inter h-screen pt-[5%] flex flex-col p-4 items-center justify-center space-y-4  `}>
        <div className='space-y-2 flex flex-col w-[430px] h-[470px] rounded-md bg-white p-4 border-[1px] border-gray-100'>
          <div className='w-[100%] h-[40px] flex items-center justify-end' >
                <div className='w-[16px] h-[16px] cursor-pointer' onClick={handlecancel}>
                  <RxCross2 size={16} className='text-black'/>
                </div>
          </div> 
          <div className='flex items-center text-[18px] font-inter  font-semibold  text-gray-900 relative' > <p>Share your documents</p><MdGroupRemove size={22} className='ml-4'/> </div>
         
          <div className='w-[100%] h-[40px] flex flex-row items-center space-x-2'>
          {/* <div>
    <label className="block text-gray-700 text-[14px] mb-2">Invite team members</label>
    <input
      type="text"
      placeholder="Search"
      value=''
     
      onFocus={() => {
       
        
        // Reset remove list
      }}
      className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-sm focus:outline-none"
    />
  </div> */}
            
              <input value={searchUser} onChange={(e)=>setsearchuser(e.target.value)}  onFocus={() => {
    setsearchuser(''); 
    setUserList(true); 
    setUsers();  
  }}  className=' h-[100%] text-[14px] w-full border rounded-lg px-3 py-2 bg-gray-50 text-sm focus:outline-none ' placeholder='Search Users'/>
              <div className='w-[16px] h-[16px] cursor-pointer'>
                <IoRefresh size={16} onClick={()=>handleRefreshUsers()}/>
              </div>
          </div>

          {userList && (
  <div className='w-[100%] h-[80%] overflow-y-auto space-y-1 scrollbar-hide'>
    { 
      organziationUsers.map(val => 
        val.email !== Logemail ? (
          <div key={val._id} className='w-[100%] p-2 h-[40px] flex flex-row space-x-2'>
            <div className='flex w-[50%] items-center justify-start'>
              <p className='text-[14px] font-inter font-semibold mb-2'>{val.email}</p>
            </div>
            <div className='w-[50%] flex items-center justify-end'>
            <input 
  type='checkbox' 
  onChange={() => handleCheckboxchange(val._id)} 
  checked={checkedUsers[val._id]} 
  
/>
            </div>
          </div>
        ) : null
      )
    }
  </div>
)}


<div className='flex-grow'></div> 
          <div className=' w-[100%] h-[40px] flex justify-center space-x-2'>
              <div onClick={handlesharenow} className='w-[130px] cursor-pointer select-none h-[35px] bg-gradient-to-r from-blue-500 text-white flex items-center justify-center rounded-md to-sky-400'>
                  <p className='text-[12px] font-inter font-bold'> Share with selected </p>
              </div>
              <div onClick={handlesharenow} className='w-[170px] cursor-pointer select-none h-[35px] bg-gradient-to-r from-gray-300 text-blue-500 flex items-center justify-center rounded-md to-gray-100'>
                  <p className='text-[13px] font-inter font-bold'>show only me  </p>
                
              </div>
             
          </div>
          
        </div>
    </div>
  )
}

export default PrivatePopup