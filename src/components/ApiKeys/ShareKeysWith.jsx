import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaMinus } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'

const ShareKeysWith = ({realtimecheckAPikeys,hidenavbar,setsharedwithpopup,Api_value,Type}) => {
    
    const [organziationUsers,setorganizationusers]=useState([])
    
    useEffect(()=>{
        const getMember=async()=>{
            
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-members-of-apikey`,{
                organization:localStorage.getItem('organization'),
                Api_value:Api_value,
                Type:Type,
                Creator:localStorage.getItem('email')
            })
            if(response.data.status==200)
            {
                setorganizationusers(response.data.data)
            }
        }
        getMember()
    },[])

    useEffect(()=>{
        const getMember=async()=>{
            
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-members-of-apikey`,{
                organization:localStorage.getItem('organization'),
                Api_value:Api_value,
                Type:Type,
                Creator:localStorage.getItem('email')
            })
            if(response.data.status==200)
            {
                setorganizationusers(response.data.data)
            }
        }
        getMember()
    },[realtimecheckAPikeys])
  

    const handlecancel=()=>{
        setsharedwithpopup(false)
    }
    const handleremoveUser=async(email)=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/delete-member-of-apikey`,{
            organization:localStorage.getItem('organization'),
            Api_value:Api_value,
            Type:Type,
            Creator:localStorage.getItem('email'),
            Member:email  
        })
        if(response.data.status==200)
        {
            alert('removed key access')
            //setsharedwithpopup(false)
        }
    }
    
  return (
   <div className={`${hidenavbar?'ml-[2%] w-[90%]':'ml-[20%] w-[80%] '} font-inter h-screen pt-[5%] flex flex-col p-4 items-center justify-center space-y-4 font-sans `}>
        <div className='space-y-2 flex flex-col w-[430px] h-[470px] rounded-md bg-white p-4 border-[1px] border-gray-100'>
        <div className='w-[100%] h-[40px] flex items-center justify-end' >
                <div className='w-[16px] h-[16px] cursor-pointer' onClick={handlecancel}>
                  <RxCross2 size={16} className='text-black'/>
                </div>
          </div>
          <div className='w-[100%] h-[80%] overflow-y-auto space-y-1 font-inter  mb-2'>
              
            {
              organziationUsers.length>0?
              organziationUsers.filter(val=>val.Member!=localStorage.getItem('email')).map(val=>
                
                <div key={val._id} className='w-[100%] p-2 h-[40px] border-[1px] border-gray-200 flex flex-row space-x-2'>
                    <div className='flex w-[50%] items-center justify-start'><p className='text-[14px] font-inter font-semibold mb-2'>{val.Member}</p></div>
                    <div className='w-[50%] flex items-center justify-end'>
                        <div className='w-[20px] h-[20px] cursor-pointer' onClick={()=>handleremoveUser(val.Member)}>
                            <FaMinus size={18} />
                        </div>
                    </div>
                </div>
                
              )
              :
              <div>
                No user added in this
              </div>
            }
                            
          </div>
        </div>
    </div>
  )
}

export default ShareKeysWith