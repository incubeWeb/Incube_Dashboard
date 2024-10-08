import React, { useEffect, useState } from 'react'
import OpenGrid from '../OpenGridTemplate/OpenGrid'
import OpenUnassignedGrid from '../OpenGridTemplate/OpenUnassignedGrid'
import OpenCompleteGrid from '../OpenGridTemplate/OpenCompleteGrid'
import OpenViewallGrid from '../OpenGridTemplate/OpenViewallGrid'
import axios from 'axios'
import { FaDownload } from "react-icons/fa6";
import { jwtDecode } from 'jwt-decode'

function GridTemplate({id,filesadded,realtimeDealpipelinetabs,realtimedealpipelinecompanyInfo,hidenavbar,realtimetabchats,setSelectedTab,selectedTab,setActiveField,Title,description,logo,status,TeamLead_status,pushedby,completed}) {
    const [openGrid,setOpenGrid]=useState(false)
    const [openUnassignedGrid,setopenUnassignedGrid]=useState(false)
    const [openCompleteGrid,setOpenCompleteGrid]=useState(false)
    const[openViewallGrid,setOpenViewallGrid]=useState(false)
    const [assignedList,setassignedList]=useState([])
    const [imgsrc,setimgsrc]=useState(logo)

    const [slowinternet,setslowinternet]=useState(false)
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

    useEffect(()=>{
        const getAssignedTeam=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getTeams`,{
                
                assignedBy:Logemail,
                mailorganization:Logorganization
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            setassignedList(response.data.data)
        }
        getAssignedTeam()
    },[])

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
        if(selectedTab=='View All')
            {
                setOpenViewallGrid(!openViewallGrid)
            }
    }
    const check=()=>{
        return Logrole=='team lead' || Logrole==='user'
    }

    const checkerforTeam=()=>{
        return assignedList.some(val=>val.mainorganization==Logorganization && val.organization==Title)
    }

    const handleImageError=()=>{
        setimgsrc('https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg')
    }
   
  return (
    <div className='shadow-md md:shadow-none  h-[200px]  md:h-[233px] border-[1px] border-gray-200 rounded-md flex flex-col md:hover:shadow-xl duration-75 md:hover:border-0 select-none cursor-pointer ml-2 md:ml-0 mr-2 md:mr-2' onClick={handleOpenGrid}>
    <div className="flex justify-end">
  
</div>
        <div className='flex flex-col w-[100%] h-[76%] pl-3 pr-3 pt-5 space-y-7'>
            <div className='flex flex-row w-[100%] h-[34%] space-x-3'>
                <div className='w-[15%] h-[100%] -mt-4 flex items-center'>
                    <img src={imgsrc} onError={handleImageError} className='rounded-md'/>
                </div>
         
                <div className='flex flex-col justify-center md:h-[100%]'>
                    <div className='text-[16px] font-inter font-semibold -mt-6'><p>{Title}</p></div>
                    
                </div>

              
     
            </div>
            
            <div className='md:flex md:w-[100%] md:h-[60px] overflow-y-hidden'>
                <div className='text-[13px] md:h-full font-inter'>
                    <p className='md:h-full'>{description}</p>
                </div>
            </div>
        </div>
        {
            selectedTab=='View All' && (Logrole=='admin' || Logrole=='super admin' && completed!='completed')?
            <div className={`${status=='Unassigned'?'text-red-500':'text-sky-500'} w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[14px] md:text-[14px]  font-roboto`}>
                <p className='cursor-pointer font-inter'>{status}</p>
            </div>
            :
            <></>
        }
        
        {
            selectedTab=='View All' && (Logrole=='admin' || Logrole=='super admin' && completed=='completed')?
            <div className={`text-green-500 w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[14px] md:text-[14px]  font-roboto`}>
                <p className='cursor-pointer font-inter'>Completed</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='View All'&&(Logrole=='team lead'|| Logrole=='user') && completed!='completed'?
            <div className={`${TeamLead_status=='Unassigned'?'text-red-500':'text-sky-500'} w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[14px] md:text-[14px]  font-roboto`}>
                <p className='cursor-pointer font-inter'>{TeamLead_status}</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='View All'&&(Logrole=='team lead'|| Logrole=='user') && completed=='completed'?
            <div className={` w-[100%] h-[24%] border-t-2 text-green-500 flex items-center pl-3 text-[14px] md:text-[14px]  font-roboto`}>
                <p className='cursor-pointer font-inter'>Completed</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='In Progress' && check()?
            <div className={`${TeamLead_status=='Unassigned'?'text-red-500':'text-sky-500'} w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[14px] md:text-[14px]  font-roboto`}>
                <p className='cursor-pointer font-inter'>{TeamLead_status}</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='In Progress' && (Logrole=='admin' || Logrole=='super admin')?
            <div className={`${status=='Unassigned'?'text-red-500':'text-sky-500'} w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[14px] md:text-[14px]  font-roboto`}>
                <p className='cursor-pointer font-inter'>{status}</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='Unassigned'?
            <div className={`${TeamLead_status=='Unassigned'?'text-red-500':'text-sky-500'} w-[100%] h-[24%] border-t-2 flex items-center pl-3 text-[14px] md:text-[14px]  font-roboto`}>
                <p className='cursor-pointer font-inter'>{TeamLead_status}</p>
            </div>
            :
            <></>
        }
        {
            selectedTab=='Completed'?
            <div className={` text-sky-500 w-[100%] h-[24%]  border-t-2 space-x-2 flex flex-row items-center pl-3 text-[15px] md:text-[14px]  font-roboto`}>
                {
                <p className={` cursor-pointer w-[50%] font-inter`}>
                      Pushed by {pushedby}
                </p>
                }
                <p className='text-green-500 w-[50%] flex justify-end text-[14px] pr-3'>Completed</p>
            </div>
            :
            <></>
        }

        {openGrid?
            <OpenGrid id={id} filesadded={filesadded} realtimeDealpipelinetabs={realtimeDealpipelinetabs}  realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} realtimetabchats={realtimetabchats} hidenavbar={hidenavbar} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :<></>}

        {openUnassignedGrid?
            <OpenUnassignedGrid id={id} hidenavbar={hidenavbar} setSelectedTab={setSelectedTab} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :<></>}

        {openCompleteGrid?
            <OpenCompleteGrid id={id} realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} hidenavbar={hidenavbar} setSelectedTab={setSelectedTab} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :<></>}

        {
            openViewallGrid &&checkerforTeam() && status=='In Progress' && completed=='incomplete' &&(Logrole=='super admin'||Logrole=='admin')?
            <OpenGrid id={id} filesadded={filesadded} realtimeDealpipelinetabs={realtimeDealpipelinetabs} realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} realtimetabchats={realtimetabchats} hidenavbar={hidenavbar} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :
            openViewallGrid && status=='In Progress' && completed=='incomplete' &&(Logrole=='super admin'||Logrole=='admin')?
            <OpenGrid id={id} filesadded={filesadded} realtimeDealpipelinetabs={realtimeDealpipelinetabs} realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} realtimetabchats={realtimetabchats} hidenavbar={hidenavbar} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :
            openViewallGrid && status=='In Progress' && completed=='completed' &&(Logrole=='super admin'||Logrole=='admin')?
            <OpenCompleteGrid id={id} realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} hidenavbar={hidenavbar} setSelectedTab={setSelectedTab} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :
            openViewallGrid && status=='Unassigned' && completed=='incomplete' && (Logrole=='super admin'||Logrole=='admin')?
            <OpenUnassignedGrid id={id} hidenavbar={hidenavbar} setSelectedTab={setSelectedTab} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :
        <></>
        }

        {
            openViewallGrid && status=='In Progress' && completed=='incomplete' && TeamLead_status=='In Progress' &&(Logrole=='team lead'||Logrole=='user')?
            <OpenGrid id={id} filesadded={filesadded} realtimeDealpipelinetabs={realtimeDealpipelinetabs} realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} realtimetabchats={realtimetabchats} hidenavbar={hidenavbar} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :
            openViewallGrid && status=='In Progress' && completed=='completed' && TeamLead_status=='In Progress' &&(Logrole=='team lead'||Logrole=='user')?
            <OpenCompleteGrid id={id} realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} hidenavbar={hidenavbar} setSelectedTab={setSelectedTab} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :
            openViewallGrid && status=='In Progress' && completed=='incomplete' && TeamLead_status=='Unassigned' &&(Logrole=='team lead'||Logrole=='user')?
            <OpenUnassignedGrid id={id} hidenavbar={hidenavbar} setSelectedTab={setSelectedTab} setActiveField={setActiveField} companyName={Title} description={description} handleOpenGrid={handleOpenGrid}/>
        :
            <></>
        }


    </div>
  )
}

export default GridTemplate