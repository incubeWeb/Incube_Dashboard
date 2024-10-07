import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const PortfolioShared = ({realtimeportfoliostate,setsharedwithusers,setclickedPortfolioShared,hidenavbar}) => {
    const [organziationUsers,setorganizationusers]=useState([])
    const [checkedUsers,setcheckedUsers]=useState([])
    const handlecancel=()=>{
        setclickedPortfolioShared(false)
    }
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
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
        setcheckedUsers(prev=>[...prev,{email:val.email,value:false}])
      })
   
  
    }
    useEffect(()=>{
      try{
      setUsers()
      }catch(e)
      {
        setUsers()
      }
    },[])

    useEffect(()=>{
      try{
        setUsers()
        }catch(e)
        {
          setUsers()
        }
    },[realtimeportfoliostate])
  
   
  
    const handleCheckboxchange=(id)=>{
      
      const new_list=checkedUsers.filter(val=>val.email==id)
      let temp_val=false
      new_list.map(val=>{
        temp_val=val.value
      })
      const new_temp_val=!temp_val
      const new2_list=checkedUsers.filter(val=>val.email!=id)
      const new3_list=[{email:id,value:new_temp_val}]
      const val=[...new2_list,...new3_list]
      setcheckedUsers(val)
    }
    const handlesharenow=()=>{
        setsharedwithusers(checkedUsers.filter(val=>val.value==true))
        setclickedPortfolioShared(false)
    }
  
    return (
      <div className={`${hidenavbar?'ml-[2%] w-[90%]':'ml-[20%] w-[80%] '} font-inter h-screen pt-[5%] flex flex-col p-4 items-center justify-center space-y-4 font-sans `}>
        <div className='space-y-2 flex flex-col w-[430px] h-[470px] rounded-md bg-white p-4 border-[1px] border-gray-100'>
            <div className='w-[100%] h-[40px] flex items-center justify-end' >
                  <div className='w-[16px] h-[16px] cursor-pointer' onClick={handlecancel}>
                    <RxCross2 size={18} className='text-black'/>
                  </div>
            </div>
            <div className='w-[100%] h-[80%] overflow-y-auto space-y-1 font-inter font-semibold mb-2'>
                
              {
                organziationUsers.map(val=>
                  val.email!=Logemail?
                  <div key={val._id} className='w-[100%] p-2 h-[40px] border-[1px] border-gray-200 flex flex-row space-x-2'>
                      <div className='flex w-[50%] items-center justify-start '><p className='text-[14px]'>{val.email}</p></div>
                      <div className='w-[50%] flex items-center justify-end font-inter '>
                          <input type='checkbox' onChange={()=>handleCheckboxchange(val.email)} checked={checkedUsers[val.email]}/>
                      </div>
                  </div>
                  :
                  <></>
                )
              }
                              
            </div>
  
            <div className='w-[100%] h-[40px] flex space-x-2 justify-center'>
                <div onClick={handlesharenow} className='w-[130px] cursor-pointer select-none h-[35px] bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center rounded-md '>
                    <p className='text-[13px] font-inter font-bold cursor-pointer'>Done</p>
                </div>
            </div>
        </div>
      </div>
    )
  }


export default PortfolioShared