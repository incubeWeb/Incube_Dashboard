import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useRef, useState } from 'react'
import Succesalert from '../Alerts/Succesalert'

const ConfimDealAddition = ({Getimageurl,setshowerroralert,showsuccessalert,setshowsuccessalert, Getcompanytitle, Getdescription,setshowAddConfirmation}) => {
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const popupfield=useRef(null)

    const [Title,setTitle]=useState(Getcompanytitle)
    const [description,setdescription]=useState(Getdescription)
    const [profilelink,setimage]=useState(Getimageurl)

    
    
    useEffect(()=>{
     const handleoutsideclick=(event)=>{
       if(popupfield.current && !popupfield.current.contains(event.target))
       {
        setshowAddConfirmation(false)
       }
     }
     document.addEventListener('mousedown',handleoutsideclick)

     return ()=>{
        document.removeEventListener('mousedown',handleoutsideclick)
     }
    },[])
    



    const handleDealpipelineadd=async()=>{
        
        const res = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/dealpipeline`, {
          title: Title,
          piclink: profilelink,
          Description: description,
          organization:Logorganization
        },{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
       
    
        if (res.data.status === 200) {
          setshowAddConfirmation(false)
          setshowsuccessalert(true)
        }else{
            setshowerroralert(true)
            setshowAddConfirmation(false)
        }
      };
  return (
    <div className='fixed font-inter top-[-2%] left-0 z-[1000] bg-black h-[100%] flex items-center justify-center bg-opacity-50 w-[100%]'>
        <div ref={popupfield} className='w-[50%] space-y-2 items-center justify-center p-4 h-[450px] rounded-md bg-white flex flex-col'>
            <div className='flex flex-row space-x-2 w-[100%] items-center'>
                <p className='text-[16px] w-[15%]'>Title</p>
                <input value={Title} placeholder='eg: Incubes' onChange={(e)=>{setTitle(e.target.value)}} className='w-[80%] outline-blue-200 outline-1 text-gray-700 text-[15px] pl-2 h-[40px] border-[1px] border-gray-300 rounded-md'/>
            </div>
            <div className='flex flex-row space-x-2 w-[100%] items-center'>
                <p className='text-[16px] w-[15%]'>Image url</p>
                <input value={profilelink} placeholder="eg: http://image-url.com" onChange={(e)=>{setimage(e.target.value)}} className='w-[80%] outline-blue-200 outline-1 text-gray-700 text-[15px] pl-2 h-[40px] border-[1px] border-gray-300 rounded-md'/>
            </div>
            <div className='flex flex-row space-x-2 w-[100%] items-center'>
                <p className='text-[16px] w-[15%]'>Description</p>
                <textarea value={description} placeholder='eg: a Tech startup' onChange={(e)=>{setdescription(e.target.value)}} className='w-[80%] resize-none outline-blue-200 outline-1 text-gray-700 text-[15px] pl-2 h-[120px] border-[1px] border-gray-300 rounded-md'/>
            </div>
            <div className='flex flex-row space-x-2 w-[100%] items-center justify-center'>
                {
                    Title.length<=0 || description.length<=0 || profilelink.length <=0?
                    <div className='text-[16px] text-white w-[30%] rounded-md items-center justify-center  flex h-[40px] bg-gradient-to-r from-gray-500 to-gray-500'>
                      <p>Empty fields present</p>
                    </div>
                :
                    <div onClick={handleDealpipelineadd} className='text-[16px] text-white w-[30%] rounded-md items-center justify-center  flex h-[40px] bg-gradient-to-r from-blue-500 to-sky-500'>
                       <p>Confirm</p>
                    </div>
                }
                
            </div>

            
        </div>
        
    </div>
  )
}

export default ConfimDealAddition