import React, { useEffect, useState } from 'react'
import OpenGrid from '../OpenGridTemplate/OpenGrid'
import OpenUnassignedGrid from '../OpenGridTemplate/OpenUnassignedGrid'
import OpenCompleteGrid from '../OpenGridTemplate/OpenCompleteGrid'
import GridOpen from './GridOpen'

function GridDatabase({hidenavbar,setSelectedTab,selectedTab,setActiveField,Title,description,logo,status,TeamLead_status,pushedby,completed}) {
    const [openGrid,setOpenGrid]=useState(false)
    const [openUnassignedGrid,setopenUnassignedGrid]=useState(false)
    const [openCompleteGrid,setOpenCompleteGrid]=useState(false)
    const handleOpen=()=>{
        setOpenGrid(!openGrid)
    }
  return (
    <div className='shadow-md md:shadow-none  h-[200px]  md:h-[233px] border-[1px] border-gray-200 rounded-md flex flex-col md:hover:shadow-xl duration-75 md:hover:border-0 select-none cursor-pointer ml-2 md:ml-0 mr-2 md:mr-2' onClick={handleOpen}>
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
        <div className='w-[100%] text-[14px] flex items-center pl-2 h-[60px] border-t-[1px] border-gray-300'>
            {
                completed!='completed'?
                <p className='text-sky-500'>{status}</p>
                :
                <p className='text-green-500'>{completed}</p>
            }
        </div>
        {openGrid?
        <GridOpen hidenavbar={hidenavbar} companyName={Title} description={description} handleOpenGrid={handleOpen}/>:<></>
        }
    </div>
  )
}

export default GridDatabase