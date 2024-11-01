import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState,useRef } from 'react'
import { FaMinus } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'

const ShareKeysWith = ({realtimecheckAPikeys,hidenavbar,setsharedwithpopup,Api_value,Type}) => {
    
    const [organziationUsers,setorganizationusers]=useState([])
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const popupRef = useRef(null); 
    const [userDeleted, setUserDeleted] = useState(false);
    useEffect(()=>{
        const getMember=async()=>{
            
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-members-of-apikey`,{
                organization:Logorganization,
                Api_value:Api_value,
                Type:Type,
                Creator:Logemail
            },{
            headers:{
            "Authorization":`Bearer ${token}`
            }
        })
            if(response.data.status==200)
            {
                setorganizationusers(response.data.data)
            }
        }
        getMember()
    },[realtimecheckAPikeys, userDeleted])



    useEffect(()=>{
        const getMember=async()=>{
            
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/api-keys/get-members-of-apikey`,{
                organization:Logorganization,
                Api_value:Api_value,
                Type:Type,
                Creator:Logemail
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
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
            organization:Logorganization,
            Api_value:Api_value,
            Type:Type,
            Creator:Logemail,
            Member:email  
        },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
        if(response.data.status==200)
        {
          
        
            setUserDeleted(!userDeleted); // Toggle userDeleted state to trigger useEffect
        
        }
    }
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          handlecancel();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    
  return (
   <div className={`${hidenavbar?'ml-[2%] w-[90%]':'ml-[20%] w-[80%] '} font-inter h-screen pt-[5%] flex flex-col p-4 items-center justify-center space-y-4 font-sans `}>
        <div  ref={popupRef} className='space-y-2 flex flex-col w-[430px] h-[470px] rounded-md bg-white p-4 border-[1px] border-gray-100'>
        <div className='w-[100%] h-[40px] flex items-center justify-end' >
                <div className='w-[16px] h-[16px] cursor-pointer' onClick={handlecancel}>
                  <RxCross2 size={16} className='text-black'/>
                </div>
          </div>
          <div className='font-semibold font-inter text-gray-600 text-[18px] '><p>Shared With</p></div>
          <div className='w-[100%] h-[80%] overflow-y-auto space-y-1 font-inter  mb-2'>
              
           
          
            {
              organziationUsers.length>0?
              organziationUsers.filter(val=>val.Member!=Logemail).map(val=>
                
                <div key={val._id} className='w-[100%] p-2 h-[40px]  flex flex-row space-x-2'>
<span className='bg-blue-200 flex-wrap  text-blue-500 px-2 py-1 rounded-full text-sm flex items-center whitespace-nowrap'>

                    <p className='text-[14px] font-semibold'>{val.Member}</p>
                    <div className='ml-2 cursor-pointer' onClick={() => handleremoveUser(val.Member)}>
                        <RxCross2 size={18} className='text-white'/>
                    </div>
                </span>

                </div>
                
              )
              :
              <div className='text-gray-500 text-[16px] mt-4 font-semibold'>
                No user added 
              </div>
            }
            
                            
          </div>
        </div>
    </div>
  )
}

export default ShareKeysWith