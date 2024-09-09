import React, { useEffect, useState } from 'react'
import OpenGrid from '../OpenGridTemplate/OpenGrid'
import OpenUnassignedGrid from '../OpenGridTemplate/OpenUnassignedGrid'
import OpenCompleteGrid from '../OpenGridTemplate/OpenCompleteGrid'

function GridTemplate({hidenavbar,setSelectedTab,selectedTab,setActiveField,Title,description,logo,status,TeamLead_status,pushedby,completed}) {
    const [openGrid,setOpenGrid]=useState(false)
    const [openUnassignedGrid,setopenUnassignedGrid]=useState(false)
    const [openCompleteGrid,setOpenCompleteGrid]=useState(false)
    const handleOpenGrid=async()=>{
        if(selectedTab=='In Progress')
        {
                setOpenGrid(!openGrid)
        }
        if(selectedTab=='Unassigned')
        {
            setopenUnassignedGrid(!openUnassignedGrid)
        }
        if(selectedTab=='Completed')
        {
            setOpenCompleteGrid(!openCompleteGrid)
        }
    }
    const check=()=>{
        return localStorage.getItem('role')=='team lead'
    }

  return (
    <div className='shadow-md md:shadow-none  h-[200px]  md:h-[233px] border-[1px] border-gray-200 rounded-md flex flex-col md:hover:shadow-xl duration-75 md:hover:border-0 select-none cursor-pointer ml-2 md:ml-0 mr-2 md:mr-2' onClick={handleOpenGrid}>
        <div className='flex flex-col w-[100%] h-[76%] pl-3 pr-3 pt-5 space-y-7'>
            <div className='flex flex-row w-[100%] h-[34%] space-x-3'>
                <div className='w-[15%] h-[100%] flex items-center'>
                    <img src={logo} className='rounded-md'/>
                </div>
                <div className='flex flex-col justify-center md:h-[100%]'>
                    <div className='text-[16px] font-semibold'><p>{Title}</p></div>
                    <div className='text-[13px]'><p>Raising 50m</p></div>
                </div>
            </div>
            <div className='md:flex md:w-[100%] md:h-[60px] overflow-y-hidden'>
                <div className='text-[13px] md:h-full'>
                    <p className='md:h-full'>{description}</p>
                </div>
            </div>
        </div>
        {
            selectedTab=='View All' && (localStorage.getItem('role')=='admin' || localStorage.getItem('role')=='super admin' && completed!='completed')?
            <div className={`${status=='Unassigned'?'text-red-500':'text-sky-500'} w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[15px] md:text-[15px]  font-roboto`}>
                <p className='cursor-pointer'>{status}</p>
            </div>
            :
            <></>
        }
        
        {
            selectedTab=='View All' && (localStorage.getItem('role')=='admin' || localStorage.getItem('role')=='super admin' && completed=='completed')?
            <div className={`text-green-500 w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[15px] md:text-[15px]  font-roboto`}>
                <p className='cursor-pointer'>Completed</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='View All'&&(localStorage.getItem('role')=='team lead'|| localStorage.getItem('role')=='user' && completed!='completed')?
            <div className={`${TeamLead_status=='Unassigned'?'text-red-500':'text-sky-500'} w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[15px] md:text-[15px]  font-roboto`}>
                <p className='cursor-pointer'>{TeamLead_status}</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='View All'&&(localStorage.getItem('role')=='team lead'|| localStorage.getItem('role')=='user' && completed=='completed')?
            <div className={` w-[100%] h-[24%] border-t-2 text-green-500 flex items-center pl-3 text-[15px] md:text-[15px]  font-roboto`}>
                <p className='cursor-pointer'>Completed</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='In Progress' && check()?
            <div className={`${TeamLead_status=='Unassigned'?'text-red-500':'text-sky-500'} w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[15px] md:text-[15px]  font-roboto`}>
                <p className='cursor-pointer'>{TeamLead_status}</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='In Progress' && (localStorage.getItem('role')=='admin' || localStorage.getItem('role')=='super admin')?
            <div className={`${status=='Unassigned'?'text-red-500':'text-sky-500'} w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[15px] md:text-[15px]  font-roboto`}>
                <p className='cursor-pointer'>{status}</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='Unassigned'?
            <div className={`${TeamLead_status=='Unassigned'?'text-red-500':'text-sky-500'} w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[15px] md:text-[15px]  font-roboto`}>
                <p className='cursor-pointer'>{TeamLead_status}</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='Completed'?
            <div className={` text-sky-500 w-[100%] h-[24%]  border-t-2 space-x-2 flex flex-row items-center pl-3 text-[15px] md:text-[15px]  font-roboto`}>
                {
                <p className={` cursor-pointer w-[50%]`}>
                        Pushed by {pushedby}
                </p>
                }
                <p className='text-green-500 w-[50%] flex justify-end pr-3'>Completed</p>
            </div>
            :
            <></>
        }

        {openGrid?
        <OpenGrid hidenavbar={hidenavbar} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :<></>}

        {openUnassignedGrid?
            <OpenUnassignedGrid hidenavbar={hidenavbar} setSelectedTab={setSelectedTab} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :<></>}

        {openCompleteGrid?
            <OpenCompleteGrid hidenavbar={hidenavbar} setSelectedTab={setSelectedTab} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :<></>}

    </div>
  )
}

export default GridTemplate