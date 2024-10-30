import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

import { FaInfo, FaLock } from 'react-icons/fa'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai'
import { IoLockClosed } from 'react-icons/io5'
const ApplicationsNav = ({ShowApplicationNavfun,lockedapplist,setlockedapplist,openappList,setopenappList,setshowApplicationNav,setShowPopup,showPopup1, setShowPopup1,googleaccountconnected,handleRemoveGoogleConnect,showPopup,handleGoogleConnect}) => {

    const handleclickoutside=(e)=>{
        if(appnavref.current && !appnavref.current.contains(e.target))
        {
            ShowApplicationNavfun(false)
        }
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleclickoutside);
        return () => {
          document.removeEventListener('mousedown', handleclickoutside);
        };
      }, []);


    const appnavref=useRef(null)

    
    
    
    
    const handleopenedapps=(name,active)=>{
        if(name.toLowerCase()=='google' && !active ){
            setShowPopup(true); 
            setShowPopup1(false);
        }
        if(name.toLowerCase()=='google' && active)
        {
            setShowPopup1(true); 
            setShowPopup(false);
        }
    }

  return (
    <div ref={appnavref} className='flex font-inter flex-col  shadow-lg h-[100%] w-[100%]'>
        
        <div className='w-[100%] space-x-2 pt-[10px] flex flex-row items-center justify-start h-[70px] bg-gray-100'>
            <div onClick={()=>{ShowApplicationNavfun(false)}} className=' cursor-pointer ml-3 text-gray-700 w-[16px] h-[20px] flex items-center justify-center'>
                <IoIosArrowBack size={16} />
            </div>
            <div className='h-[20px] tracking-wider flex items-center justify-center text-[15px]'>
                <p>App event</p>
            </div>
        </div>

        <div className='text-gray-700 flex flex-col mt-[10%] ml-[3%] space-y-4 select-none '>
            {openappList?.map(app=>
                <div key={app.id} className='flex flex-row relative group'>
                    <div onClick={()=>handleopenedapps(app.name,app.active)}  className='border-r-[2px] border-white hover:border-r-[2px] cursor-pointer hover:border-gray-400 w-[100%] h-[35px] flex flex-row space-x-2 items-center p-2'>
                        <div className='h-[30px] flex items-center justify-center w-[30px]'>
                            <img src={app.image}/>
                        </div>
                        <div  className='font-inter w-[60%] text-[15px] tracking-wider'>
                            <p>{app.name}</p>
                        </div>
                        {app.active?
                        <div className='w-[30%] flex items-center justify-end'>
                        <div className='bg-green-600 w-[7px] rounded-full h-[7px]'>
                            </div>
                        </div>
                        :
                        <div className='w-[30%] flex items-center justify-end'>
                            <div className='bg-red-600 w-[7px] rounded-full h-[7px]'>
                            </div>
                        </div>}
                    </div>
                    <div className='w-[160px] hidden group-hover:flex items-center justify-center space-x-3 text-[13px] absolute right-0 left-[105%] shadow-lg bg-gray-100 rounded-md h-[40px]'>
                        <div><FaInfo/></div>
                        {
                            app.active?
                            <div><p>connected</p></div>
                            :
                            <div><p>not connected</p></div>
                        }
                    </div>
                </div>
                )
            }
            {
                lockedapplist.map(app=>
                    <div key={app.id} className='flex flex-row relative group'>
                    <div onClick={()=>handleopenedapps(app.name,app.active)}  className='border-r-[2px] border-white hover:border-r-[2px] cursor-pointer hover:border-gray-400 w-[100%] h-[35px] flex flex-row space-x-2 items-center p-2'>
                        <div className='h-[30px] flex items-center justify-center w-[30px]'>
                            <img src={app.image}/>
                        </div>
                        <div  className='font-inter w-[60%] text-[15px] tracking-wider'>
                            <p>{app.name}</p>
                        </div>
                        {/*lockl */}
                        <div className='w-[30%] flex items-center justify-end text-yellow-300'>
                            <IoLockClosed />
                        </div>
                    </div>
                    <div className='w-[160px] hidden group-hover:flex items-center justify-center space-x-3 text-[13px] absolute right-0 left-[105%] shadow-lg bg-gray-100 rounded-md h-[40px]'>
                        <div><FaInfo/></div>
                           
                            <div><p>paid version</p></div> 
                    </div>
                </div>
                )
            }
        </div>
    </div>
  )
}

export default ApplicationsNav