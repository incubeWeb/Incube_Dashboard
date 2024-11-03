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
import { Bars } from 'react-loader-spinner';
import { FaDownload } from "react-icons/fa6";
import { jwtDecode } from 'jwt-decode';
import ChatBot from '../GenaiBox/ChatBot';

function OpenCompleteGrid({id,realtimedealpipelinecompanyInfo,hidenavbar,setActiveField,companyName,description,handleOpenGrid}) {
    const [AddNewWindow,setAddnewWindow]=useState(false)
    const [TotalCards,setTotalCards]=useState([])
    const [Tabs,setTabs]=useState([{id:1,Tab:"Tab1"}])
    const [currentTab,setCurrentTab]=useState(1)
    const [TabCount,setTabCount]=useState(1)
    const [OpenSubbar,setSubbar]=useState(false)
    const [loading,setloading]=useState(true)

    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

    const handleDownloadDealsourcefile=async(e)=>{
        e.stopPropagation();
        try{
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/createpdf/create-pdf`, {
                companyname: companyName,
                id:id,
               
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
            a.download = `${companyName}.pdf`;
           // Set the file name
            document.body.appendChild(a);
            a.click(); // Trigger the download
            a.remove();
            window.URL.revokeObjectURL(url); // Clean up URL object
        }catch(e)
        {
            alert("error downloading pdf")
        }
    }

//     useEffect(()=>{

// console.log(err.e)
//         handleDownloadDealsourcefile()
//     },[])


    const openAddNewWindow=()=>{
        setAddnewWindow(!AddNewWindow)
    }
    const handleTotalCards=(data)=>{
        setTotalCards(data)
    }


    const [chatdata,setchatdata]=useState([])
    

    useEffect(()=>{
      const fun=async()=>{
        let organization=Logorganization
            const doc=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getTabChats`,{id:id,CompanyName:companyName,tab:`Tab${currentTab}`,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
     
        
            if(doc.data.data.length>0){
                doc.data.data.map(d=>
                  {
                  let chat=JSON.parse(d.chats)
                  
                  setchatdata(chat)
                 
                  }
              )
             
            }else{
              setchatdata([])
             
            }
      }
      fun()
    },[currentTab])

    
    useEffect(()=>{
        const fun=async()=>{
          let organization=Logorganization
              const doc=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getTabChats`,{id:id,CompanyName:companyName,tab:`Tab${currentTab}`,organization:organization},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
       
          
              if(doc.data.data.length>0){
                  doc.data.data.map(d=>
                    {
                    let chat=JSON.parse(d.chats)
                    
                    setchatdata(chat)
                   
                    }
                )
               
              }else{
                setchatdata([])
               
              }
        }
        fun()
      },[])


    
    useEffect(()=>{
        const fun=async()=>{
           const data= await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getOpenedTabs`,{id:id,companyname:companyName,organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
           
           let count=1
           data.data.data.map(tabVal =>{
             count=tabVal.count
             setTabCount(count)
             
           })
           for(let i=2;i<=count;i++)
            {
                setTabs(prev=>[...prev,{id:i,Tab:`Tab${i}`}])
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

    useEffect(()=>{
        const fun=async()=>{
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setopenedTabs`,{id:id,companyname:companyName,count:TabCount,organization:Logorganization},{
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

    const [allcompanyuploadedfile,setcompanyuploadedfile]=useState([])
    const fetchUploadedFiles = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getfiles`, {id:id, CompanyName:companyName,tab: `Tab${currentTab}`,organization:Logorganization },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
            setcompanyuploadedfile(response.data.data);

           
        } catch (error) {
            console.error('Error fetching uploaded files', error);
        }
    };

    useEffect(() => {
        fetchUploadedFiles();
    }, [currentTab]);
   

    useEffect(()=>{
        const mergedData={
            CompanyInfo:{
              Chats:chatdata,
              uploadedFiles:allcompanyuploadedfile,
              companyName:companyName,
              companydescription:description
            }}
          sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
    },[chatdata,allcompanyuploadedfile])

  return (
    <div className={` ${hidenavbar?'ml-[4%] w-[96%]':'ml-[22%] w-[78%]'} h-screen z-50 space-y-7 bg-white absolute top-0 right-0 overflow-hidden p-[23px] pt-[17px] md:flex md:flex-col cursor-default`} onClick={handleBubbling}>
        <div ref={MainDiv} className='bg-white w-[100%] h-screen  fixed'></div>
        <div className='flex flex-row h-[40px] w-[100%] mt-[20px]'>
            <div className='flex flex-row items-center justify-center'>
            <p className='text-gray-500 text-[16px] font-inter font-semibold cursor-pointer hover:text-gray-600 hover:underline hover:underline-offset-2' onClick={handleOpenGrid}>Deal Pipeline</p><CgFormatSlash className='text-gray-300' size={30}/><p className='text-gray-600 text-[16px] font-inter font-semibold'>{companyName}</p>
            </div>
        </div>
        <div className='w-[100%] flex flex-col items-center'>
            
            <div className='w-[100%] md:h-[85px] flex flex-col'>
                    <div className='flex flex-row w-[100%]'>
                        <p className='md:text-[30px] text-[25px] w-[50%] font-inter font-semibold'>{companyName}</p>
                        <div className='cursor-pointer flex flex-row space-x-10 absalute right-3 absolute  mr-4 bg-gradient-to-r from-blue-600 to-blue-800 w-[150px] h-[35px] rounded-md items-center justify-center text-white border-blue-600 border-[1px] shadow-gray-300 shadow-md' onClick={(e)=>handleDownloadDealsourcefile(e)}>
                                <p className='text-[13px] font-inter font-semibold  tracking-wider'>Download</p>
                                <FaDownload size={15} />
                            </div>
                    </div>
                  
                    <div><p className='md:text-[14px] overflow-y-auto scrollbar-hide h-[40px] w-[82%]  text-[14px] font-inter font-semibold'>{description}</p></div>
            </div>
            <div className='flex flex-row w-[100%] h-[40px] space-x-2'>
                    <div className='w-[100%] mt-2 h-[100%] z-[10] bg-gray-100 rounded-md flex flex-row items-center pl-2 space-x-5'>
                        <div className='w-[100%] h-[75%] rounded-md flex items-center justify-start flex-row space-x-2'>
                            {(Tabs||[]).map(Tab=>
                                
                                <div key={Tab.Tab} className={` md:w-[55px] w-[55px] h-[75%] rounded-md ${currentTab==Tab.id?'bg-gray-300':'bg-white shadow-md'} flex items-center justify-center `}>
                                    <div onClick={()=>{setCurrentTab(Tab.id)}} className='w-[100%] h-[100%] flex items-center justify-center'>
                                        <p className='text-[12px] font-semibold'>Tab {Tab.id}</p>
                                    </div>
                                    
                                </div>
                                
                                
                            )}
                            
                            
                            
                        </div>
                        
                    </div> 
                    
            </div>
        </div>
        {AddNewWindow?<AddNewDetails id={id} openAddNewWindow={openAddNewWindow} CompanyName={companyName} handleTotalCards={handleTotalCards} openedTab={currentTab}/>:<></>}
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
                    
                        <ChatCard id={id} chatdata={chatdata} hidenavbar={hidenavbar} itsfrom='completed' currentTab={currentTab} CompanyName={companyName}/>
                
                }
                </div>
                <div className='w-[100%] h-[50%]'>
                {
                    
                        <FilesDoc id={id} allcompanyuploadedfile={allcompanyuploadedfile} itsfrom='completed' CompanyName={companyName} currentTab={currentTab}/>
                
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
                    
                        <ChatCard id={id} chatdata={chatdata} hidenavbar={hidenavbar} itsfrom='completed' currentTab={currentTab} CompanyName={companyName}/>
                
                }
                </div>
                <div className='w-[100%] h-[50%]'>
                {
                    
                        <FilesDoc id={id} itsfrom='completed' allcompanyuploadedfile={allcompanyuploadedfile} CompanyName={companyName} currentTab={currentTab}/>
                
                }
                </div>
            

            </div>
        </div>

        
    </div>
  )
}

export default OpenCompleteGrid