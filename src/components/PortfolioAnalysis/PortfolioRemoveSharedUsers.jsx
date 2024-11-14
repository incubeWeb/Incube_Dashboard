import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { FaMinus } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

const PortfolioRemoveSharedUsers = ({setPortfolioSharedwithusers,setclickedportfolioremoveshared,PortfoliosharedWithUsers,mainportfoliosecurity,realtimeportfoliostate,setclickedPortfolioShared,setsharedwithusers,hidenavbar}) => {
    const [organziationUsers,setorganizationusers]=useState(PortfoliosharedWithUsers)
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

    


   
    useEffect(()=>{
      const settingusers=async()=>{
          setorganizationusers(PortfoliosharedWithUsers)
      }
      settingusers()
      
    },[PortfoliosharedWithUsers])
  

    const handlecancel=()=>{
        setclickedPortfolioShared(false)
        setclickedportfolioremoveshared(false)
    }
    const handleremoveUser=async(email)=>{
      const newsharedlist=organziationUsers.filter(item=>item.email!=email)
      setorganizationusers(organziationUsers.filter(item=>item.email!=email))
      setsharedwithusers(newsharedlist)
      setPortfolioSharedwithusers(newsharedlist)
    }
  
    const handledone=async()=>{
   
          const sharingusers='yes'
          const organization=`${Logorganization}_Topcards`
          const organization1=Logorganization
          const organization2=`${Logorganization}_ShownGraph`
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`, {
                email: Logemail,
                security: mainportfoliosecurity,
                sharedwith: JSON.stringify(organziationUsers), // Use selectedUsers instead of sharedwithusers
                sharingusers:sharingusers,
                organization1:organization1,
                organization2:organization2,
                organization:organization
                    
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if(response.data.status!=200){
            
              alert('server error!')
            }
      

      setclickedportfolioremoveshared(false)
    }

  const handleback=(e)=>{
    e.stopPropagation()
    setclickedportfolioremoveshared(false)
    setclickedPortfolioShared(true)
  }

  return (
   <div className={`${hidenavbar?'ml-[2%] w-[90%]':'ml-[20%] w-[80%] '} font-inter h-screen pt-[5%] flex flex-col p-4 items-center justify-center space-y-4 font-sans `}>
        <div className='space-y-2 flex flex-col w-[430px] h-[500px] rounded-md bg-white p-4 border-[1px] border-gray-100'>
        <div className='w-[100%] h-[40px] flex items-center justify-end relative' >
                <div className='w-[16px] h-[16px] cursor-pointer absolute left-0' onClick={handleback}>
                  <IoArrowBack size={16}/>
                </div>
                <div className='w-[16px] h-[16px] cursor-pointer' onClick={handlecancel}>
                  <RxCross2 size={16} className='text-black'/>
                </div>
                
          </div>
          <div className='w-[100%] h-[80%] overflow-y-auto space-y-1 font-inter  mb-2'>
              
            {
              organziationUsers.length>0?
              organziationUsers.filter(val=>val.Member!=Logemail).map(val=>
                
                <div key={val._id} className='w-[100%] p-2 h-[40px] border-[1px] border-gray-200 flex flex-row space-x-2'>
                    <div className='flex w-[50%] items-center justify-start'><p className='text-[14px] font-inter font-semibold mb-2'>{val.email}</p></div>
                    <div className='w-[50%] flex items-center justify-end'>
                        <div className='w-[20px] h-[20px] cursor-pointer' onClick={(e)=>{handleremoveUser(val.email); e.stopPropagation()}}>
                            <FaMinus size={13} />
                        </div>
                    </div>
                    
                </div>
                
              )
              :
              <div className='font-inter font-semibold'>
                No user added in this
              </div>
            }
                             
          </div>
          <div className='w-[100%] h-[40px] flex space-x-2 justify-center'>
              <div onClick={handledone} className='w-[130px] cursor-pointer select-none h-[35px] bg-gradient-to-r from-blue-500 text-white flex items-center justify-center rounded-md to-blue-700'>
                  <p className='text-[14px] font-inter font-bold'>Done</p>
              </div>
            </div> 
        </div>
        
    </div>
  )
}

export default PortfolioRemoveSharedUsers