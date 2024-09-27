import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import GridOpen from '../Add_Investments/GridOpen'
import OpenGrid from '../OpenGridTemplate/OpenGrid'
import OpenCompleteGrid from '../OpenGridTemplate/OpenCompleteGrid'
import OpenUnassignedGrid from '../OpenGridTemplate/OpenUnassignedGrid'


const AssignedDeals = ({id,setActiveField,setTeamLead_status,setstatus,setcompleted,setOpenViewallGrid,setCompanyName,setcompanyDiscription,openViewallGrid,status,TeamLead_status,completed,setassigneddealclicked,setBoxes,boxes,hidenavbar,realtimetabchats,realtimedealpipelinecompanyInfo}) => {
  const [asignedDeals,setassignedDeals]=useState([])
  
  const [clickedCompany,setclickedCompany]=useState(false)
  const [selectedTab, setSelectedTab] = useState("View All");
  
  const [assingedtodeals,setassignedtodeals]=useState([])


 
  useEffect(()=>{
    const getAllDeals=async()=>{
      const response= await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getTeams`,{
         assignedBy:localStorage.getItem('email'),
         mainorganization:localStorage.getItem("organization")
       })
       const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getUserfromTeam`,{
        member:localStorage.getItem('email'),
        mainorganization:localStorage.getItem("organization")
      })
      const filteredArray = response2.data.data.filter(
        obj1 => !response.data.data.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2))
      );
      setassignedtodeals(filteredArray)
      setassignedDeals(response.data.data)
     }

    getAllDeals()
    
  },[])
  useEffect(()=>{
    console.log(asignedDeals)
  },[asignedDeals])

  const handleCompany=async(companyname)=>{
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/searchdealsourcingfiles`,{
      search:companyname,
      organization:localStorage.getItem('organization')
    })

    setOpenViewallGrid(true)
    
    
    setCompanyName(response.data.data[0].title)
    setcompanyDiscription(response.data.data[0].Description)
    setcompleted(response.data.data[0].completed)
    setstatus(response.data.data[0].status)
    setTeamLead_status(response.data.data[0].TeamLead_status)
    setassigneddealclicked(true)
  }

  

  const deleteWidgit=async()=>{
    const email=localStorage.getItem('email')
    const organization=localStorage.getItem('organization')
    const position=JSON.stringify(boxes.filter((box,index)=>index!=id))
    
 
    if(boxes.length===0)
    {
      await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`,{email:email,organization:organization})
      setBoxes([])
    }
    else{const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updatedashboard`,{email:email,position:position,organization:organization})
    if(response.data.status==200)
    {
      setBoxes(boxes.filter((box,index)=>index!=id))
    }
  }
  }

  const convertTime=(time)=>{
    const T=new Date(Number(time))

    return T.toLocaleTimeString()
  }
  return (
    <div className=' flex flex-col h-[100%] w-[100%] font-inter p-4'>
        <div className='z-[10] mt-3 mr-2 cursor-pointer flex items-center justify-center w-[20px] rounded-xl h-[20px]  bg-gray-100 fixed right-[-2px] top-[-8px] ' onClick={deleteWidgit}>
              <RxCross2 size={14} className='text-black' />
        </div> 
        <div className=' w-[100%] space-y-2 select-noneflex flex-col overflow-y-auto h-[100%]'>
           {
            localStorage.getItem('role')=='admin' || localStorage.getItem('role')=='super admin' ?
            <div className='flex flex-col'>
                <p className='text-[16px]  font-semibold'>Deals Assigned by You:</p>
                <p className='text-[14px] mb-4'>You have assigned total {asignedDeals.length} deals</p>
            </div>
            :
            <></>
           }
           { localStorage.getItem('role')=='team lead' || localStorage.getItem('role')=='user'?
            <div className='flex flex-col'>
                <p className='text-[16px]  font-semibold'>Related Deals:</p>
                <p className='text-[14px] mb-4'>Your have total {[...assingedtodeals,...asignedDeals].filter(val=>val.member!=localStorage.getItem('email')).length} deals</p>
            </div>
            :
            <></>
           }
           {
            localStorage.getItem('role')=='admin' || localStorage.getItem('role')=='super admin' || localStorage.getItem('role')=='team lead'?
            (asignedDeals||[]).map(doc=>
              doc.member!=localStorage.getItem('email')?
              <div onClick={()=>{handleCompany(doc.organization)}} key={doc._id} className='cursor-pointer w-[100%] h-[18%] flex flex-row border-[1px] border-gray-300 rounded-md items-center pl-2'>
                <p className='text-[14px] w-[80%] tracking-wide '> You have assinged <span className='font-bold'>{doc.organization}</span> to {doc.member} at {convertTime(doc.time)} </p>
                <div className='w-[20%] pr-2 flex items-center justify-end'>
                  <div className='w-[16px] h-[16px] c'>
                    <FaExternalLinkAlt size={16} className='text-gray-500'/>
                  </div>
                </div>
                
            </div>
            :
            <></>
            )
            :
            <></> 
           }

{
            localStorage.getItem('role')=='team lead' || localStorage.getItem('role')=='user'?
            (assingedtodeals||[]).map(doc=>
              <div onClick={()=>{handleCompany(doc.organization)}} key={doc._id} className='cursor-pointer w-[100%] h-[18%] flex flex-row border-[1px] border-gray-300 rounded-md items-center pl-2'>
                <p className='text-[14px] w-[80%] tracking-wide '><span className='font-bold'>{doc.organization}</span> has been assigned to you at {convertTime(doc.time)} </p>
                <div className='w-[20%] pr-2 flex items-center justify-end'>
                  <div className='w-[16px] h-[16px] c'>
                    <FaExternalLinkAlt size={16} className='text-gray-500'/>
                  </div>
                </div>
            </div>

            )
            :
            <></> 
           }
        </div>
    <div>
        
        </div>
    </div>

  )
}

export default AssignedDeals