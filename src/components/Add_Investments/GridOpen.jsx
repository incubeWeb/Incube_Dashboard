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
import AddNewInvestment from './AddNewInvestment';
import InvestmentCard from './InvestmentCard';


function GridOpen({hidenavbar,companyName,description,handleOpenGrid}) {
    const [AddNewWindow,setAddnewWindow]=useState(false)
    const [TotalCards,setTotalCards]=useState([])
    const [currentTab,setCurrentTab]=useState(` add Investment`)
    const [TabCount,setTabCount]=useState(1)
    const [OpenSubbar,setSubbar]=useState(false)
    const [pushComplete,setpushComplete]=useState(false)
    const [search,setsearch]=useState('')

    const openAddNewWindow=()=>{
        setAddnewWindow(!AddNewWindow)
    }
    const handleTotalCards=(data)=>{
        setTotalCards(data)
    }
    

    const handleBubbling=(e)=>{
        e.stopPropagation()
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

    useEffect(()=>{
        const fun=async()=>{
            let organization=localStorage.getItem('organization')
            const data=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/findInvestmentDetail',{
                company:companyName,
                search:search,
                organization:organization
            })
            
            if(data.data.data.length!=0)
            {
            setTotalCards(data.data.data)
            }else{
                const doc=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getNewInvestment',{
                    company:companyName,
                    organization:organization
                  })
                setTotalCards(doc.data.data)
            }
        }
        fun()
    },[search,TotalCards])

    


  return (
    <div className={`${hidenavbar?'ml-[4%] w-[100%]':'ml-[22%] w-[80%]'} h-screen z-50 space-y-7 bg-white absolute top-0 right-0 pt-[45px] overflow-hidden p-[23px] md:flex md:flex-col cursor-default`} onClick={handleBubbling}>
        <div ref={MainDiv} className='bg-white w-[100%] h-screen  fixed'></div>
        <div className='flex flex-row h-[40px] w-[100%] mt-[20px]'>
            <div className='flex flex-row items-center justify-center'>
            <p className='text-gray-500 text-[14px] cursor-pointer hover:text-gray-600 hover:underline hover:underline-offset-2' onClick={handleOpenGrid}>Investment</p><CgFormatSlash className='text-gray-300' size={30}/><p className='text-gray-600 text-[14px]'>{companyName}</p>
            </div>
        </div>
        <div className='w-[100%] flex flex-col items-center'>
            
            <div className='w-[100%] md:h-[85px] flex flex-col'>
                    <div className='flex flex-row w-[100%]'>
                        <p className='md:text-[31px] text-[25px] w-[50%]'>{companyName}</p>
                        <div className='flex flex-row h-[100%] justify-end w-[48%] pl-4 pt-2'>
                            
                        </div>
                    </div>
                    <div><p className='md:text-[14px] text-[13px]'>{description}</p></div>
            </div>
            <div className='flex flex-row w-[100%] h-[40px]'> 
                    <div className='flex space-x-2 flex-row h-[100%] justify-start w-[100%]' >
                        <div className='w-[130px] border-sky-600 border-[1px] h-[80%] flex items-center justify-center rounded-md cursor-pointer' onClick={openAddNewWindow}><p className='md:text-[13px] text-[9px] font-bold text-blue-600'>Add new details</p></div>
                        <div><input className='border-gray-300 border-[1px] h-[80%] text-[14px] rounded-md pl-2' placeholder='search here' onChange={(e)=>setsearch(e.target.value)}/></div>
                    </div>   
            </div>
        </div>
        {AddNewWindow?<AddNewInvestment hidenavbar={hidenavbar} openAddNewWindow={openAddNewWindow} CompanyName={companyName} handleTotalCards={handleTotalCards}/>:<></>}
        <div className='w-[100%] h-[100%] flex space-x-4 md:flex-row '>
           
           
            <div className='md:w-[70%] h-[420px] overflow-y-auto space-y-1'>
                {
                    (TotalCards||[]).map(item=>
                    <InvestmentCard hidenavbar={hidenavbar} key={item._id} id={item._id} CompanyName={item.company} Title={item.field} Description={item.value} />
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
                <div className='w-[100%] h-[50%] '>
                {
                    
                        <FilesDoc CompanyName={companyName} currentTab={currentTab}/>
                
                }
                </div>
            

            </div>
        </div>


    </div>
  )
}

export default GridOpen