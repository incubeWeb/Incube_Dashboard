import React, { useEffect, useRef, useState } from 'react'
import { RiHome3Line } from "react-icons/ri";
import { CgFormatSlash } from "react-icons/cg";
import { gsap } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';
import AddNewDetails from '../CreateNew/AddNewDetails';
import Card from '../Cards/Card';
import axios from 'axios';
import ChatCard from '../Chat/ChatCard';
import FilesDoc from '../FileDocument/FilesDoc';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { BiSolidSend } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ChatBot from '../GenaiBox/ChatBot';



function OpenViewallGrid({id,realtimedealpipelinecompanyInfo,hidenavbar,setActiveField,companyName,description,handleOpenGrid}) {
    const [AddNewWindow,setAddnewWindow]=useState(false)
    const [TotalCards,setTotalCards]=useState([])
    const [Tabs,setTabs]=useState([{id:1,Tab:"Tab1"}])
    const [currentTab,setCurrentTab]=useState(1)
    const [TabCount,setTabCount]=useState(1)
    const [OpenSubbar,setSubbar]=useState(false)
    const [pushComplete,setpushComplete]=useState(false)
    const [assignedList,setassignedList]=useState([])
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const openAddNewWindow=()=>{
        setAddnewWindow(!AddNewWindow)
    }
    const handleTotalCards=(data)=>{
        setTotalCards(data)
    }
    
    

    useEffect(()=>{
        const fun=async()=>{
           const data= await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getOpenedTabs`,{id:id,organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
           data.data.data||[].map(tabVal=>{
             let tabs=JSON.parse(tabVal.tabs)
             setTabCount(parseInt(tabVal.TabsCount))
             setTabs(tabs)
           })
        }
        fun()
    },[])

   

    useEffect(()=>{
        const InitialVal=async()=>{
            const doc=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getNewDetails`,{
                id:id,
                CompanyName:companyName,
                Tab:`Tab${currentTab}`,
                organization:Logorganization
              },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            setTotalCards(doc.data.data)
        }
        InitialVal()
    },[realtimedealpipelinecompanyInfo])

    useEffect(()=>{
        const fun=async()=>{
            
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setopenedTabs`,{id:id,count:"uniqueIdentifier",tabs:JSON.stringify(Tabs),TabsCount:TabCount,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
        }
        fun()
    },[TabCount])

    const handleBubbling=(e)=>{
        e.stopPropagation()
    }

    const addTabs=async()=>{
        setTabs(tabs=>[...tabs,{id:TabCount+1,Tab:`Tab${TabCount+1}`}])
        setCurrentTab(currentTab)
        setTabCount(TabCount+1)
    }
    const handlePushComplete=async()=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updateCompanyCompleteStatus`,{
            id:id,
            completed:'completed',
            title:companyName,
            pushedby:Logemail,
            organization:Logorganization
        },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
        if(response.data.status==200)
        {
            alert('pushed')
            handleOpenGrid()
        }
        setpushComplete(!pushComplete)
    }
    

    const MainDiv=useRef(null)
    useGSAP(()=>{
        gsap.to(MainDiv.current,{
            x:-1900,
            duration:1,
            delay:0.2,
            overflow:'hidden',
            opacity:0
        })
    })


  return (
    <div className={` ${hidenavbar?'ml-[2%] w-[97%]':'ml-[20%] w-[80%]'} h-screen z-50 space-y-7 bg-white absolute top-0 right-0 overflow-hidden p-[23px] pt-[17px] md:flex md:flex-col cursor-default`} onClick={handleBubbling}>
        <div ref={MainDiv} className='bg-white w-[100%] h-screen  fixed'></div>
        <div className='flex flex-row h-[40px] w-[100%] mt-[20px]'>
            <div className='flex flex-row items-center justify-center'>
            <p className='text-gray-500 text-[16px] cursor-pointer hover:text-gray-600 hover:underline hover:underline-offset-2 font-inter font-semibold ' onClick={handleOpenGrid}>Deal Pipeline</p><CgFormatSlash className='text-gray-300' size={30}/><p className='text-gray-600 text-[16px] font-inter font-semibold'>{companyName}</p>
            </div>
        </div>
        <div className='w-[100%] flex flex-col items-center'>
            
            <div className='w-[100%] md:h-[85px] flex flex-col'>
                    <div className='flex flex-row w-[100%]'>
                        <p className='md:text-[31px] text-[30px] w-[50%] font-inter font-semibold'>{companyName}</p>
                        <div className='flex flex-row h-[100%] justify-end w-[48%] pl-4 pt-2'>
                            <div className='cursor-pointer flex flex-row space-x-3 bg-gradient-to-r from-blue-600 to-blue-800 w-[30%] h-[100%] rounded-md items-center justify-center text-white border-blue-600 border-[1px] shadow-gray-300 shadow-md' onClick={handlePushComplete}>
                                <p className='text-[13px] font-inter font-semibold'>Push to complete</p>
                                <BiSolidSend size={15} />
                            </div>
                        </div>
                    </div>
                    <div><p className='md:text-[14px] text-[14px] font-inter'>{description}</p></div>
            </div>
            <div className='flex flex-row w-[100%] h-[50px] space-x-2'>
                    <div className='w-[85%] h-[100%] bg-gray-100 rounded-md flex flex-row items-center pl-2 space-x-5'>
                        <div className='w-[100%] h-[75%] rounded-md flex items-center justify-start flex-row space-x-2'>
                            {(Tabs||[]).map(Tab=>
                                
                                <div key={Tab.Tab} className={` md:w-[55px] w-[55px] h-[80%] rounded-md ${currentTab==Tab.id?'bg-white':'bg-white shadow-lg'} flex items-center justify-center `}>
                                    <div onClick={()=>setCurrentTab(Tab.id)} className='w-[100%] h-[100%] flex items-center justify-center'>
                                        <p className='text-[12px] font-semibold font-inter'>Tab {Tab.id}</p>
                                    </div>
                                    
                                </div>
                                
                                
                            )}
                            
                            <div className='md:w-[75px] w-[60px] h-[80%] text-blue-600 rounded-md bg-white flex items-center justify-center shadow-lg' onClick={addTabs} >
                                <p className='text-[12px] font-semibold font-inter'>Add new</p>
                            </div>
                            
                        </div>
                        
                    </div> 
                    <div className='flex flex-row h-[100%] justify-end w-[12%] md:space-x-2' onClick={openAddNewWindow}>
                        <div className='w-[130px] border-sky-600 border-[1px] h-[80%] flex items-center justify-center rounded-md cursor-pointer'><p className='md:text-[13px] text-[9px] font-bold text-blue-600 font-inter'>Add details</p></div>
                    </div>   
            </div>
        </div>
        {AddNewWindow?<AddNewDetails id={id} hidenavbar={hidenavbar} openAddNewWindow={openAddNewWindow} CompanyName={companyName} handleTotalCards={handleTotalCards} openedTab={currentTab}/>:<></>}
        <div className='w-[100%] h-[100%] flex space-x-2 md:flex-row '>
           
           
            <div className='md:w-[60%] h-[420px] overflow-y-auto md:space-y-7'>
                {
                    (TotalCards||[]).map(item=>
                    <Card key={item._id} id={item._id} CompanyName={item.CompanyName} Title={item.Title} Description={item.Description} Tab={item.Tab}/>
                )
                }
                
            </div>
            <div className='md:hidden'>
                    <div>{OpenSubbar?<FaAngleDoubleRight  onClick={()=>{setSubbar(!OpenSubbar)}}/>:<FaAngleDoubleLeft  onClick={()=>{setSubbar(!OpenSubbar)}}/>}</div>
                    {
                        OpenSubbar?
                        <div className='overflow-y-auto w-[450px] bg-white z-40 h-[100%]'>
                                 <div className='overflow-y-auto w-[60%] h-[420px] flex flex-col space-y-2'>
                
                
                
                <div className='w-[100%] h-[50%] '>
                {
                    
                        <ChatCard id={id} currentTab={currentTab} CompanyName={companyName}/>
                
                }
                </div>
                <div className='w-[100%] h-[50%]'>
                {
                    
                        <FilesDoc id={id} CompanyName={companyName} currentTab={currentTab}/>
                
                }
                </div>
            

            </div>
                        </div>
                        
                        :<></>
                    }
            </div>
            <div className='hidden md:w-[40%] h-[420px] md:flex md:flex-col space-y-2'>
                
                
                
                <div className='w-[100%] h-[50%]'>
                {
                    
                        <ChatCard id={id} currentTab={currentTab} CompanyName={companyName}/>
                
                }
                </div>
                <div className='w-[100%] h-[50%]'>
                {
                    
                        <FilesDoc id={id} CompanyName={companyName} currentTab={currentTab}/>
                
                }
                </div>
            

            </div>
        </div>

        <ChatBot/>
    </div>
  )
}

export default OpenViewallGrid