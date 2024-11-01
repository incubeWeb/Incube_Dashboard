import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import GridOpen from '../Add_Investments/GridOpen'
import OpenGrid from '../OpenGridTemplate/OpenGrid'
import OpenCompleteGrid from '../OpenGridTemplate/OpenCompleteGrid'
import OpenUnassignedGrid from '../OpenGridTemplate/OpenUnassignedGrid'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'


const AssignedDeals = ({id,setdealpipelinefromdashboardcompany,setActiveField,setTeamLead_status,setstatus,setcompleted,setOpenViewallGrid,setCompanyName,setcompanyDiscription,openViewallGrid,status,TeamLead_status,completed,setassigneddealclicked,setBoxes,boxes,hidenavbar,realtimetabchats,realtimedealpipelinecompanyInfo}) => {
  const [asignedDeals,setassignedDeals]=useState([])
  const Navigate=useNavigate()
  const [clickedCompany,setclickedCompany]=useState(false)
  const [selectedTab, setSelectedTab] = useState("View All");
  const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
  
  const [assingedtodeals,setassignedtodeals]=useState([])


 
  useEffect(()=>{
    const getAllDeals=async()=>{
      const response= await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getTeams`,{
         assignedBy:Logemail,
         mainorganization:Logorganization
       },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })

       const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getUserfromTeam`,{
        member:Logemail,
        mainorganization:Logorganization
      },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })

      
      
      const filteredArray = response2.data.data.filter(
        obj1 => !response.data.data.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2))
      );
      setassignedtodeals(filteredArray)
      setassignedDeals(response.data.data)
      
     }

    getAllDeals()
    
  },[])
 

  const handleCompany=async(id,companyname)=>{
    
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getdealsourcingcompany`,{
      id:id
    },{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })

    //setOpenViewallGrid(true)
    
    setdealpipelinefromdashboardcompany([{id:response.data.data[0]._id,Title:response.data.data[0].title,description:response.data.data[0].Description,completed:response.data.data[0].completed,status:response.data.data[0].status,TeamLead_status:response.data.data[0].TeamLead_status}])
    localStorage.setItem('activeField','/dealpipeline')
    setActiveField('/dealpipeline')
    Navigate('/dealpipeline')
    
    //setassigneddealclicked(true)
   
  }

  

  const deleteWidgit=async()=>{
    const email=Logemail
    const organization=Logorganization
    const position=JSON.stringify(boxes.filter((box,index)=>index!=id))
    
 
    if(boxes.length===0)
    {
      await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`,{email:email,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      setBoxes([])
    }
    else{const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updatedashboard`,{email:email,position:position,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
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

useEffect(()=>{
const mergedData=[
  ...asignedDeals,
  ...assingedtodeals
 ]
 sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
},[asignedDeals,assingedtodeals])

const convertDate=(time)=>{
  const T=new Date(Number(time))

    return T.toLocaleDateString();

}


  return (
    <div className=' flex flex-col h-[100%] w-[100%] font-inter p-4'>
        <div className='z-[10] mt-3 mr-2 cursor-pointer flex items-center justify-center w-[20px] rounded-xl h-[20px]  bg-gray-100 fixed right-[-2px] top-[-8px] ' onClick={deleteWidgit}>
              <RxCross2 size={14} className='text-black' />
        </div> 
        <div className=' w-[100%] space-y-2 select-noneflex flex-col overflow-y-auto h-[100%]'>
           {
            Logrole=='admin' || Logrole=='super admin' ?
            <div className='flex flex-col'>
                <p className='text-[16px]  font-semibold'>Deals Assigned by You:</p>
                <p className='text-[14px] mb-4'>You have assigned total {asignedDeals.length} deals</p>
            </div>
            :
            <></>
           }
           { Logrole=='team lead' || Logrole=='user'?
            <div className='flex flex-col'>
                <p className='text-[16px]  font-semibold'>Related Deals:</p>
                <p className='text-[14px] mb-4'>Your have total {[...assingedtodeals,...asignedDeals].filter(val=>val.member!=Logemail).length} deals</p>
            </div>
            :
            <></>
           }
           {
            Logrole=='admin' || Logrole=='super admin' || Logrole=='team lead'?
            (asignedDeals||[]).map(doc=>
              doc.member!=Logemail?
              <div onClick={()=>{handleCompany(doc._id,doc.organization)}} key={doc._id} className='cursor-pointer w-[100%] h-[18%] flex flex-row border-[1px] border-gray-300 rounded-md items-center pl-2'>
                <p className='text-[14px] w-[80%] tracking-wide '> You have assinged <span className='font-bold'>{doc.organization}</span> to {doc.member} at {convertTime(doc.time)} on {convertDate(doc.time)} </p>
                <div className='w-[20%] pr-2 flex items-center justify-end'>
                  <div className='w-[16px] h-[16px] c'>
                    <FaExternalLinkAlt size={16} className='text-gray-500'/>
                  </div>
                </div>
                
            </div>
            :
            
              <div key={doc._id} onClick={()=>{handleCompany(doc._id,doc.organization)}} className='cursor-pointer w-[100%] h-[18%] flex flex-row border-[1px] border-gray-300 rounded-md items-center pl-2'>
                  <p className='text-[14px] w-[80%] tracking-wide '> You have assinged <span className='font-bold'>{doc.organization}</span> to Yourself at {convertTime(doc.time)} on {convertDate(doc.time)} </p>
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

{
            Logrole=='team lead' || Logrole=='user'?
            (assingedtodeals||[]).map(doc=>
              <div onClick={()=>{handleCompany(doc._id,doc.organization)}} key={doc._id} className='cursor-pointer w-[100%] h-[18%] flex flex-row border-[1px] border-gray-300 rounded-md items-center pl-2'>
                <p className='text-[14px] w-[80%] tracking-wide '><span className='font-bold'>{doc.organization}</span> has been assigned to you at {convertTime(doc.time)} on {convertDate(doc.time)}</p>
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