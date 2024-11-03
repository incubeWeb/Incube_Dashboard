import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiPlus } from "react-icons/fi";
import { gsap } from 'gsap';
import axios from 'axios';
import Viewall from './Viewall';
import CreateNew from '../CreateNew/CreateNew';
import Inprogrss from './Inprogrss';
import Unassigned from './Unassigned';
import Completed from './Completed';
import { jwtDecode } from 'jwt-decode';
import { Bars } from 'react-loader-spinner';

function FirstCol({filesadded,setdealpipelinefromdashboardcompany,dealpipelinefromdashboardcompany,realtimedealpipelinecompanyInfo,setActiveField,hidenavbar,realtimetabchats,realtimeDealpipelinetabs,realtimedealpipelinecompany}) {
  const [selectedTab, setSelectedTab] = useState("View All");
  const [companyData, setCompanyData] = useState([]);
  const[company,setcompany]=useState([]);
  const [filter, setFilter] = useState([]);
  const bgRef = useRef(null);
  const viewRef = useRef(null);
  const inProgressRef = useRef(null);
  const unAssignedRef = useRef(null);
  const completedRef = useRef(null);
  const [createNew, setCreateNew] = useState(false);
  const [loading,setloading]=useState(true)
  const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role


    const fetchCompanyData = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDealpipelineCompany`,{organization:Logorganization},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
        
        const filteredData=response.data.data
        
        setCompanyData(filteredData);
        setcompany(response.data.data)
        setloading(false)

        const mergedData={
          CompanyDetails:{
            filteredData
          }}
        sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))


      } catch (error) {
       
        setCompanyData([])
        setcompany([])
        setloading(false)
        const mergedData={
          CompanyDetails:{
            "message":"no company present"
          }}
        sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
      }
    };
  
    useEffect(() => {
      fetchCompanyData();
    }, [realtimedealpipelinecompany]);

  useEffect(() => {

    fetchCompanyData();

  },[]);

  
  useEffect(()=>{
    
    const mergedData={
      CompanyDetails:{
        company
      }}
    sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
  },[company])

  useEffect(() => {
    if (selectedTab === "View All") moveBackground(viewRef.current, "View All");
    if (selectedTab === "In Progress") moveBackground(inProgressRef.current, "In Progress");
    if (selectedTab === "Unassigned") moveBackground(unAssignedRef.current, "Unassigned");
    if (selectedTab === "Completed") moveBackground(completedRef.current, "Completed");
  }, [selectedTab]);

  const moveBackground = (target, text) => {
    gsap.to(bgRef.current, {
      x: target.offsetLeft - 15,
      width: target.offsetWidth,
      height: target.offsetHeight,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        bgRef.current.querySelector("p").textContent = text;
      },
    });
  };

 


  return (
    <div className={`${hidenavbar?'ml-[4%] w-[100%]':'ml-[22%] w-[78%]'}flex flex-col pt-[17px]  font-roboto space-y-3 text-gray-700 pr-[47px]`}>
      
      <div className='w-[100%] h-[100%]'>
        
      <div className='flex flex-col space-y-2 md:space-y-0 md:flex md:flex-row md:w-[100%] md:h-[83px] md:items-center p-3 md:p-0'>
        <div className='flex flex-col md:flex md:flex-col md:pl-[20px] md:w-[721px] md:h-[38px] '>
          <p className='md:text-[28px]  text-[17px]  text-inter font-bold '>Deal pipeline</p>
          <p className='md:text-[14px] text-[12px]  text-inter   text-[#475467]'>Search or go through startups looking to raise fresh rounds.</p>
        </div>
        <div className='md:w-[100%] md:h-[100%] md:flex md:items-center md:justify-end md:mr-[20px]'>
          {/* <div className='mt-[17px] flex flex-row w-[280px] h-[28px] items-center md:flex md:flex-row md:items-center md:w-[280px] md:h-[38px] rounded-md border-gray-400 border-2 border-solid space-x-3 hover:shadow-md hover:duration-150'>
            <FiSearch className='font-thin ml-3 text-gray-400' size={20} />
            <input type='text' placeholder='Search' className=' w-full text-[13px]  h-full outline-none rounded-md border-l-0 md:text-[15px] text-gray-600' />
          </div> */}
        </div>
      </div>

      <div className='hidden md:flex md:flex-row md:p-[20px] md:pb-2'>
        <div className='md:flex md:flex-row w-[100%] md:h-[50px] md:bg-[#EAECF0] font-inter font-semibold rounded-md md:p-3 md:space-x-2 relative'>
          <div ref={bgRef} className="absolute  bg-white shadow-md rounded-md flex items-center justify-center" style={{ pointerEvents: "none", zIndex: 1 }}>
            <p className="text-[14px]"></p>
          </div>
          <div ref={viewRef} className={`${selectedTab=='View All'?'text-gray-200':''}md:text-[14px] md:w-[150px]  rounded-md cursor-pointer select-none`} onClick={() => { setSelectedTab("View All"); }}>
            <p className='md:flex md:items-center md:justify-center md:h-full  md:text-[13px]'>View All</p>
          </div>
          <div ref={inProgressRef} className={`${selectedTab=='In Progress'?'text-gray-200':''} md:text-[14px] md:w-[150px] rounded-md cursor-pointer select-none`} onClick={() => { setSelectedTab("In Progress"); }}>
            <p className='md:flex md:items-center md:justify-center md:h-full md:text-[13px]'>In Progress</p>
          </div>
          {
            Logrole!='user'?
            <div ref={unAssignedRef} className={`${selectedTab=='Unassigned'?'text-gray-200':''} md:text-[14px] md:w-[150px] rounded-md cursor-pointer select-none`} onClick={() => { setSelectedTab("Unassigned"); }}>
              <p className='md:flex md:items-center md:justify-center md:h-full md:text-[13px]'>Unassigned</p>
            </div>
            :
            <></>
          }
          <div ref={completedRef} className={`${selectedTab=='Completed'?'text-gray-200':''} md:text-[14px] md:w-[150px] rounded-md cursor-pointer select-none`} onClick={() => { setSelectedTab("Completed"); }}>
            <p className='md:flex md:items-center md:justify-center md:h-full md:text-[13px]'>Completed</p>
          </div>
          <div className='md:w-[100%] md:flex md:items-center md:justify-end'>
            {
              Logrole!='admin' && Logrole!='super admin'?
            <></>
            :
            <div className='border-[1px] border-blue-200 w-[140px] hover:border-0  h-[35px] rounded-md md:flex md:items-center md:space-x-2 select-none cursor-pointer hover:bg-gray-300' onClick={() => { setCreateNew(!createNew) }}>
                <div className='basis-3/12 md:flex md:justify-end md:items-center h-[100%]'><FiPlus size={16} className='text-blue-600' /></div>
                <div className='md:flex md:items-center h-[100%]'><p className=' flex items-center text-[14px]  text-blue-600 font-bold' >Add new</p></div>
              </div>
            }
          </div>
        </div>
      </div>

      <div className='md:hidden flex flex-row w-[100%] h-[30px]  '>
        <div className='flex flex-row w-[100%] h-[100%] md:bg-gray-200 rounded-md space-x-3 justify-center pl-3 pr-3'>
          <div className='flex flex-row w-[100%] h-[100%] space-x-2'>
            <p className={`${selectedTab=='View All'?'font-bold text-[11px]':'text-[12px]'}   flex items-center justify-center`} onClick={() => { setSelectedTab("View All"); }}>View All</p>
            <p className={`${selectedTab=='In Progress'?'font-bold text-[11px]':'text-[12px]'} flex items-center justify-center`} onClick={() => { setSelectedTab("In Progress"); }}>In Progress</p>
            <p className={`${selectedTab=='Unassigned'?'font-bold text-[11px]':'text-[12px]'} flex items-center justify-center`} onClick={() => { setSelectedTab("Unassigned"); }}>Unassigned</p>
            <p className={`${selectedTab=='Completed'?'font-bold text-[11px]':'text-[12px]'} flex items-center justify-center`} onClick={() => { setSelectedTab("Completed"); }}>Completed</p>
           <div  className='flex items-center justify-center text-white flex-row border-[1px] bg-blue-500 rounded-md p-2' onClick={() => { setCreateNew(!createNew) }}> <FiPlus/><p className='text-[12px] text-white'>Add new</p></div>
          </div>
        </div>
      </div>
        {
          !loading?
          <div>
      {
        selectedTab === 'View All' ? <Viewall setdealpipelinefromdashboardcompany={setdealpipelinefromdashboardcompany} dealpipelinefromdashboardcompany={dealpipelinefromdashboardcompany} realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} filesadded={filesadded} realtimeDealpipelinetabs={realtimeDealpipelinetabs} realtimetabchats={realtimetabchats} realtimedealpipelinecompany={realtimedealpipelinecompany} hidenavbar={hidenavbar} filter={filter} selectedTab={selectedTab} setActiveField={setActiveField} fetchCompanyData={fetchCompanyData} companyData={companyData} /> : null
      }
      {
        selectedTab === 'In Progress' ? <Inprogrss realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} filesadded={filesadded} realtimeDealpipelinetabs={realtimeDealpipelinetabs} realtimetabchats={realtimetabchats}  realtimedealpipelinecompany={realtimedealpipelinecompany} hidenavbar={hidenavbar} filter={filter} selectedTab={selectedTab} setActiveField={setActiveField} fetchCompanyData={fetchCompanyData} companyData={companyData} /> : null
      }
      {
        selectedTab === 'Unassigned' ? <Unassigned  realtimedealpipelinecompany={realtimedealpipelinecompany} hidenavbar={hidenavbar} filter={filter} setSelectedTab={setSelectedTab} selectedTab={selectedTab} setActiveField={setActiveField} fetchCompanyData={fetchCompanyData} companyData={companyData} /> : null
      }
      {
        selectedTab === 'Completed' ? <Completed  realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} realtimedealpipelinecompany={realtimedealpipelinecompany} hidenavbar={hidenavbar} filter={filter} selectedTab={selectedTab} setActiveField={setActiveField} fetchCompanyData={fetchCompanyData} companyData={companyData} /> : null
      }
      {
        createNew ? <CreateNew  setCreateNew={setCreateNew} hidenavbar={hidenavbar} fetchCompanyData={fetchCompanyData} /> : null
      }

</div>
:
<div className='w-[100%] h-[450px]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
<Bars color="#8884d8" height={80} width={80} /> </div>
        }
      
      </div>
      
    </div>
  );
}


export default FirstCol;
