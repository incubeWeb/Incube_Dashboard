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
import { Bars } from 'react-loader-spinner';
import { FaDownload } from "react-icons/fa6";
import { FiMinus } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';
import ChatBot from '../GenaiBox/ChatBot';
import { MdOutlineEdit } from 'react-icons/md';



function OpenGrid({id,filesadded,realtimeDealpipelinetabs,realtimedealpipelinecompanyInfo,hidenavbar,setActiveField,companyName,description,handleOpenGrid,realtimetabchats}) {
    const [AddNewWindow,setAddnewWindow]=useState(false)

    const [companyname,setcompanyname]=useState(companyName)
    const [editedname,seteditedname]=useState(companyName)

    const [companydescription,setcompanydescription]=useState(description)
    const [editedcompanydescription,seteditedcompanydescription]=useState(description)

    const [Editcompanyname,seteditcompanyname]=useState(false)
    const [Editcompanydescription,seteditcompanydescription]=useState(false)
    const [TotalCards,setTotalCards]=useState([])
    const [Tabs,setTabs]=useState([{id:1,Tab:"Tab1"}])
    const [currentTab,setCurrentTab]=useState(1)
    const [TabCount,setTabCount]=useState(1)
    const [OpenSubbar,setSubbar]=useState(false)
    const [pushComplete,setpushComplete]=useState(false)
    const [loading,setloading]=useState(true)
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const [nameload,setnameload]=useState(false)
    const [descriptionload,setdescriptionload]=useState(false)
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
            const data= await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getOpenedTabs`,{id:id,companyname:companyName,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            let count=1
            data.data.data.map(tabVal =>{
              count=parseInt(tabVal.count)
              
            })
            setTabCount(count) 
            for(let i=1;i<=count;i++)
             {
                setTabs(prev => {
                    const isIdPresent = prev.some(tab => tab.id === i); // Check if id already exists
                    if (isIdPresent) {
                      return prev; // Return the current state if id exists
                    }
                    return [...prev, { id: i, Tab: `Tab${i}` }]; // Add new tab if id doesn't exist
                  });
             }
         }
         fun()
    },[realtimeDealpipelinetabs])

    
    const handleDownloadDealsourcefile=async(e)=>{
        e.stopPropagation();
        try{
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/createpdf/create-pdf`, {
                id:id,
                companyname: companyName,
                organization: Logorganization,
            }, {
                
                    headers:{
                      "Authorization":`Bearer ${token}`
                    },
                  
                responseType: 'blob', // Important for handling binary data
            });
    
            // Create a download link for the blob
            const blob = new Blob([response.data], { type: 'application/pdf' }); // Specify the correct MIME type
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${companyname}.pdf`; // Set the file name
            document.body.appendChild(a);
            a.click(); // Trigger the download
            a.remove();
            window.URL.revokeObjectURL(url); // Clean up URL object
        }catch(e)
        {
            alert("error downloading pdf")
        }
    }

    useEffect(()=>{
        const fun=async()=>{
          
           const data= await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getOpenedTabs`,{id:id,companyname:companyName,organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
           let count=1
           data.data.data.map(tabVal =>{
             count=parseInt(tabVal.count)
           })
           setTabCount(count)
           for(let i=1;i<=count;i++)
            {
                
                setTabs(prev => {
                    const isIdPresent = prev.some(tab => tab.id === i); // Check if id already exists
                    if (isIdPresent) {
                      return prev; // Return the current state if id exists
                    }
                    return [...prev, { id: i, Tab: `Tab${i}` }]; // Add new tab if id doesn't exist
                  });
            }
           

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
            setTimeout(()=>{
                setloading(false)
            },1000)
            
        }
        InitialVal()
    },[realtimedealpipelinecompanyInfo,currentTab])

   

    const handleBubbling=(e)=>{
        e.stopPropagation()
    }
    

    const addTabs=async()=>{
        const tabis=parseInt(TabCount)+1
        setTabs(tabs=>[...tabs,{id:parseInt(TabCount)+1,Tab:`Tab${tabis}`}])
        setTabCount(prev=>parseInt(prev)+1)
        const tabscount=parseInt(TabCount)+1
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setopenedTabs`,{id:id,companyname:companyName,count:tabscount,organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
       
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

    const handleEditcompanyname=async()=>
    {   //function saves the value in db handler
        if(editedname.trim().length==0){
            return
        }else{
            setcompanyname(editedname.trim())
            setnameload(true)
        }
        if(editedname.trim()!=companyname.trim())
        {
            
        const resposne=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/change-companyname`,{
            id:id,
            newcompanyname:editedname.trim(),
            newcompanydescription:description
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            if(resposne.data.status==200)
            {
                seteditcompanyname(false)
                

                setnameload(false)
                

            }
        }
        else{
            seteditcompanyname(false)
           
            setnameload(false)
            
        }
        
    }

    const handleEditcompanydescription=async()=>
        {   //function saves the value in db handler
            if(editedcompanydescription.trim().length==0){
                return
            }else{
                setcompanydescription(editedcompanydescription.trim())
                setdescriptionload(true)
            }
            if(editedcompanydescription.trim()!=companydescription.trim())
            {
                
            const resposne=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/change-companyname`,{
                id:id,
                newcompanyname:companyName,
                newcompanydescription:editedcompanydescription.trim()
                },{
                    headers:{
                      "Authorization":`Bearer ${token}`
                    }
                  })

                
                if(resposne.data.status==200)
                {
                    seteditcompanydescription(false)
                   
    
                    setdescriptionload(false)
                    
    
                }
            }
            else{
               
                seteditcompanydescription(false)
               
                setdescriptionload(false)
            }
            
        }



  return (
    <div className={` ${hidenavbar?'ml-[4%] w-[96%]':'ml-[22%] w-[78%]'}  z-50 space-y-7 bg-white absolute top-0 right-0 overflow-hidden p-[23px] pt-[17px] md:flex md:flex-col cursor-default`} onClick={handleBubbling}>
        <div ref={MainDiv} className='bg-white w-[100%] h-screen  fixed'></div>
        <div className='flex flex-row h-[40px] w-[100%] mt-[20px]'>
            <div className='flex flex-row items-center justify-center'>
                <p className='text-gray-500 text-[16px] cursor-pointer hover:text-gray-600 hover:underline hover:underline-offset-2 font-inter font-semibold ' onClick={handleOpenGrid}>Deal Pipeline</p><CgFormatSlash className='text-gray-300' size={30}/><p className='text-gray-600 text-[16px] font-inter font-semibold'>{companyname}</p>
                
            </div>
           
        </div>
        <div className='w-[100%] flex flex-col items-center'>
            
            <div className='relative w-[100%] md:h-[85px] flex flex-col'>
                    <div className='flex flex-row w-[100%]'>
                        
                        {
                            nameload?
                            <div>
                                <p>Setting name ...</p>
                            </div>:
                            <div className=' w-[50%] flex flex-row items-center justify-start space-x-2'>
                        {
                            Editcompanyname?
                            <div>
                                <input value={editedname} className='w-[180px] h-[40px] border-[1px] border-gray-300 rounded-md pl-1 text-[14px] ' onChange={(e)=>seteditedname(e.target.value)} onKeyPress={(e)=>{e.key=='Enter'?handleEditcompanyname():<></>}}/>
                            </div>
                            :
                            <p className='md:text-[30px] text-[30px] font-inter font-semibold'>{companyname}</p>
                        }
                            <div className='w-[16px] h-[16px] cursor-pointer' onClick={()=>seteditcompanyname(!Editcompanyname)}>
                                <MdOutlineEdit size={16}/>
                            </div>
                        </div>
                        }
                        <div className='absolute right-0 flex flex-row h-[100%] justify-end w-[48%] pl-4 pt-2'>
                     
                            <div className=' cursor-pointer flex flex-row space-x-10 mr-4 bg-gradient-to-r from-blue-600 to-blue-800 w-[150px] h-[35px] rounded-md items-center justify-center text-white border-blue-600 border-[1px] shadow-gray-300 shadow-md' onClick={(e)=>handleDownloadDealsourcefile(e)}>
                                <p className='text-[13px] font-inter font-semibold'>Download</p>
                                <FaDownload size={15} />
                            </div>
                            <div className='cursor-pointer flex flex-row space-x-2 bg-gradient-to-r from-blue-600 to-blue-800 w-[150px] h-[35px] rounded-md items-center justify-center text-white border-blue-600 border-[1px] shadow-gray-300 shadow-md' onClick={handlePushComplete}>
                                <p className='text-[13px] font-inter font-semibold'>Push to complete</p>
                                <BiSolidSend size={15} />
                            </div>
                        </div>
                    </div>

                    
                    <div>
                    {
                            descriptionload?
                            <div>
                                <p>Setting Description ...</p>
                            </div>:
                            <div className=' w-[50%] flex flex-row items-center justify-start space-x-2'>
                        {
                            Editcompanydescription?
                            <div>
                                <input value={editedcompanydescription} className='w-[180px] h-[40px] border-[1px] border-gray-300 rounded-md pl-1 text-[14px] ' onChange={(e)=>seteditedcompanydescription(e.target.value)} onKeyPress={(e)=>{e.key=='Enter'?handleEditcompanydescription():<></>}}/>
                            </div>
                            :
                            <p className='md:text-[14px] text-[14px] font-inter font-semibold'>{companydescription}</p>
                        }
                            <div className='w-[16px] h-[16px] cursor-pointer' onClick={()=>seteditcompanydescription(!Editcompanydescription)}>
                                <MdOutlineEdit size={16}/>
                            </div>
                        </div>
                        }
                        
                    </div>
            </div>
            <div className='flex flex-row w-[100%] h-[50px] space-x-2'>
                    <div className='w-[85%] h-[100%] bg-gray-100 rounded-md flex flex-row items-center pl-2 space-x-5'>
                        <div className='w-[100%] h-[75%] rounded-md flex items-center justify-start flex-row space-x-2'>
                            {(Tabs||[]).map(Tab=>
                                
                                <div key={Tab.id} className={` md:w-[55px] w-[55px] h-[80%] rounded-md ${currentTab==Tab.id?'bg-white border border-blue-500 border-1px':'bg-white shadow-lg'} flex items-center justify-center `}>
                                    <div onClick={()=>setCurrentTab(Tab.id)} className=' w-[100%] h-[100%] flex items-center justify-center'>
                                        <p className='text-[12px] font-semibold font-inter'>Tab {Tab.id}</p>
                                    </div>
                                </div>
                                
                                
                            )}
                            
                            <div className='md:w-[75px] w-[60px] h-[80%] text-blue-600 rounded-md bg-white flex items-center justify-center shadow-lg' onClick={()=>addTabs()} >
                                <p className='text-[12px] font-semibold font-inter'>Add new</p>
                            </div>
                            
                        </div>
                        
                    </div> 
                    <div className='flex flex-row h-[100%] justify-end w-[12%] md:space-x-2' onClick={openAddNewWindow}>
                        <div className='w-[130px] border-sky-600 border-[1px] h-[80%] flex items-center justify-center rounded-md cursor-pointer'><p className='md:text-[13px] text-[9px] font-bold text-blue-600 font-inter'>Add details</p></div>
                    </div>   
            </div>
        </div>
        {AddNewWindow?<AddNewDetails id={id} hidenavbar={hidenavbar} openAddNewWindow={openAddNewWindow} CompanyName={companyname} handleTotalCards={handleTotalCards} openedTab={currentTab}/>:<></>}
        <div className='w-[100%] h-[100%] flex space-x-2 md:flex-row '>
           {
            loading?
            <div className='md:w-[60%] h-[420px] overflow-y-auto md:space-y-7'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Bars color="#8884d8" height={80} width={80} />
                </div>
            </div>
            :
           
           
            <div className='md:w-[60%] h-[420px] overflow-y-auto md:space-y-7'>
                {
                    (TotalCards||[]).map(item=>
                    <Card key={item._id} id={item._id} CompanyName={item.CompanyName} Title={item.Title} Description={item.Description} Tab={item.Tab}/>
                )
                }
                
            </div>
            }
            <div className='md:hidden'>
                    <div>{OpenSubbar?<FaAngleDoubleRight  onClick={()=>{setSubbar(!OpenSubbar)}}/>:<FaAngleDoubleLeft  onClick={()=>{setSubbar(!OpenSubbar)}}/>}</div>
                    {
                        OpenSubbar?
                        <div className='overflow-y-auto w-[450px] bg-white z-40 h-[100%]'>
                                 <div className='overflow-y-auto w-[60%] h-[420px] flex flex-col space-y-2'>
                
                
                
                <div className='w-[100%] h-[50%] '>
                {
                    
                        <ChatCard id={id} realtimetabchats={realtimetabchats} currentTab={currentTab} CompanyName={companyname}/>
                
                }
                </div>
                <div className='w-[100%] h-[50%]'>
                {
                    
                        <FilesDoc id={id} filesadded={filesadded} CompanyName={companyname} currentTab={currentTab}/>
                
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
                    
                        <ChatCard id={id} realtimetabchats={realtimetabchats} currentTab={currentTab} CompanyName={companyname}/>
                
                }
                </div>
                <div className='w-[100%] h-[50%]'>
                {
                    
                        <FilesDoc id={id} filesadded={filesadded} CompanyName={companyname} currentTab={currentTab}/>
                
                }
                </div>
            

            </div>
        </div>
        <ChatBot/>
    </div>
  )
}

export default OpenGrid