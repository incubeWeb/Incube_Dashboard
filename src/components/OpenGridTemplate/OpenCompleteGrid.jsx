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
import { Link } from 'react-router-dom';


function OpenCompleteGrid({hidenavbar,setActiveField,companyName,description,handleOpenGrid}) {
    const [AddNewWindow,setAddnewWindow]=useState(false)
    const [TotalCards,setTotalCards]=useState([])
    const [Tabs,setTabs]=useState([{id:1,Tab:"Tab1"}])
    const [currentTab,setCurrentTab]=useState(1)
    const [TabCount,setTabCount]=useState(1)
    const [OpenSubbar,setSubbar]=useState(false)
    const [pushComplete,setpushComplete]=useState(false)

    const openAddNewWindow=()=>{
        setAddnewWindow(!AddNewWindow)
    }
    const handleTotalCards=(data)=>{
        setTotalCards(data)
    }

    useEffect(()=>{
        const fun=async()=>{
           const data= await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getOpenedTabs',{organization:localStorage.getItem('organization')})
           data.data.data.map((tabVal)=>{
             let tabs=JSON.parse(tabVal.tabs)
             setTabCount(parseInt(tabVal.TabsCount))
             setTabs(tabs)
           })
        }
        try{
        fun()
        }catch(e)
        {
            setTabCount([])
            setTabs([])
        }
    },[])

    useEffect(()=>{
        const InitialVal=async()=>{
            const doc=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getNewDetails',{
                CompanyName:companyName,
                Tab:`Tab${currentTab}`,
                organization:localStorage.getItem('organization')
              })
            setTotalCards(doc.data.data)
        }
        InitialVal()
    },[TotalCards])

    useEffect(()=>{
        const fun=async()=>{
            console.log(Tabs)
            await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/setopenedTabs',{count:"uniqueIdentifier",tabs:JSON.stringify(Tabs),TabsCount:TabCount,organization:localStorage.getItem('organization')})
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
    <div className={`${hidenavbar?'ml-[2%] w-[100%]':'ml-[20%] w-[80%]'} pt-[45px] h-screen z-50 space-y-7 bg-white absolute top-0 right-0 overflow-hidden p-[23px] flex flex-col cursor-default`} onClick={handleBubbling}>
        <div ref={MainDiv} className='bg-white w-[100%] h-screen  fixed'></div>
        <div className='flex flex-row h-[40px] w-[100%] mt-[20px]'>
            <div className='flex flex-row items-center justify-center'>
            <p className='text-gray-500 text-[14px] cursor-pointer hover:text-gray-600 hover:underline hover:underline-offset-2' onClick={handleOpenGrid}>Deal Pipeline</p><CgFormatSlash className='text-gray-300' size={30}/><p className='text-gray-600 text-[14px]'>{companyName}</p>
            </div>
        </div>
        <div className='w-[100%] flex flex-col items-center'>
            
            <div className='w-[100%] md:h-[85px] flex flex-col'>
                    <div className='flex flex-row w-[100%]'>
                        <p className='md:text-[31px] text-[25px] w-[50%]'>{companyName}</p>
                        
                    </div>
                    <div><p className='md:text-[14px] text-[13px]'>{description}</p></div>
            </div>
            <div className='flex flex-row w-[100%] h-[40px] space-x-2'>
                    <div className='w-[100%] h-[100%] bg-gray-300 rounded-md flex flex-row items-center pl-2 space-x-5'>
                        <div className='w-[100%] h-[75%] rounded-md flex items-center justify-start flex-row space-x-2'>
                            {(Tabs||[]).map((Tab)=>
                                {
                                <div key={Tab.Tab} className={` md:w-[55px] w-[55px] h-[75%] rounded-md ${currentTab==Tab.id?'bg-gray-300':'bg-white shadow-md'} flex items-center justify-center `}>
                                    <div onClick={()=>setCurrentTab(Tab.id)} className='w-[100%] h-[100%] flex items-center justify-center'>
                                        <p className='text-[12px] font-semibold'>Tab {Tab.id}</p>
                                    </div>
                                    
                                </div>
                                }
                                
                            )}
                            
                            
                            
                        </div>
                        
                    </div> 
                    
            </div>
        </div>
        {AddNewWindow?<AddNewDetails openAddNewWindow={openAddNewWindow} CompanyName={companyName} handleTotalCards={handleTotalCards} openedTab={currentTab}/>:<></>}
        <div className='w-[100%] h-[100%] flex space-x-2 md:flex-row '>
           
           
            <div className='md:w-[60%] h-[420px] overflow-y-auto md:space-y-7'>
                {
                    (TotalCards||[]).map((item)=>
                    {
                    <Card key={item._id} id={item._id} CompanyName={item.CompanyName} Title={item.Title} Description={item.Description} Tab={item.Tab}/>
                    }
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
                    
                        <ChatCard currentTab={currentTab} CompanyName={companyName}/>
                
                }
                </div>
                <div className='w-[100%] h-[50%]'>
                {
                    
                        <FilesDoc CompanyName={companyName} currentTab={currentTab}/>
                
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
                    
                        <ChatCard currentTab={currentTab} CompanyName={companyName}/>
                
                }
                </div>
                <div className='w-[100%] h-[50%]'>
                {
                    
                        <FilesDoc CompanyName={companyName} currentTab={currentTab}/>
                
                }
                </div>
            

            </div>
        </div>


    </div>
  )
}

export default OpenCompleteGrid