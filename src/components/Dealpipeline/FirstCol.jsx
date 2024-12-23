import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiPlus } from "react-icons/fi";
import { gsap } from 'gsap';
import axios from 'axios';
import Viewall from './Viewall';
import CreateNew from '../CreateNew/CreateNew';
import Inprogrss from './Inprogrss';
import Unassigned from './Unassigned';
import Completed from './Completed';

function FirstCol({setActiveField,hidenavbar}) {
  const [selectedTab, setSelectedTab] = useState("View All");
  const [companyData, setCompanyData] = useState([]);
  const [filter, setFilter] = useState([]);
  const bgRef = useRef(null);
  const viewRef = useRef(null);
  const inProgressRef = useRef(null);
  const unAssignedRef = useRef(null);
  const completedRef = useRef(null);
  const [createNew, setCreateNew] = useState(false);
  const [loading,setloading]=useState(true)

  useEffect(() => {
    showCompanies();
    const interval = setInterval(() => {
      showCompanies();
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  const showCompanies = async () => {
    const response = await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getUserfromTeam', {
      member: localStorage.getItem('email'),
      mainorganization:localStorage.getItem('organization')
    });
    const data = response.data.data;
    const uniqueOrganizations = [];
    try{
    data.forEach((d) => {
      if (!uniqueOrganizations.includes(d.organization)) {
        uniqueOrganizations.push(d.organization);
      }
    });
  }
  catch(e)
  {
    uniqueOrganizations.push([])
  }

    setFilter(uniqueOrganizations);
  }
  

  const fetchCompanyData = async () => {
    try {
      const response = await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getDealpipelineCompany',{organization:localStorage.getItem('organization')});
      setCompanyData(response.data.data);
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  useEffect(() => {
    fetchCompanyData();
    const interval = setInterval(() => {
      fetchCompanyData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    <div className={`${hidenavbar?'ml-[2%] w-[100%]':'ml-[20%] w-[80%]'}flex flex-col  font-roboto space-y-3 text-gray-700 pr-[47px]`}>
      
      <div className='w-[100%] h-[100%]'>
        
      <div className='flex flex-col space-y-2 md:space-y-0 md:flex md:flex-row md:w-[100%] md:h-[83px] md:items-center p-3 md:p-0'>
        <div className='flex flex-col md:flex md:flex-col md:pl-[20px] md:w-[721px] md:h-[38px] '>
          <p className='md:text-[26px] text-[17px]  text-sans text-semibold '>Deal Pipeline</p>
          <p className='md:text-[13px] text-[12px]  text-sans text-semibold  text-gray-500'>Search or go through startups looking to raise fresh rounds.</p>
        </div>
        <div className='md:w-[100%] md:h-[100%] md:flex md:items-center md:justify-end md:mr-[20px]'>
          <div className='flex flex-row w-[280px] h-[28px] items-center md:flex md:flex-row md:items-center md:w-[280px] md:h-[38px] rounded-md border-gray-400 border-2 border-solid space-x-3 hover:shadow-md hover:duration-150'>
            <FiSearch className='font-thin ml-3 text-gray-400' size={20} />
            <input type='text' placeholder='Search' className=' w-full text-[13px] h-full outline-none rounded-md border-l-0 md:text-[15px] text-gray-600' />
          </div>
        </div>
      </div>

      <div className='hidden md:flex md:flex-row md:p-[20px] md:pb-2'>
        <div className='md:flex md:flex-row w-[100%] md:h-[50px] md:bg-gray-100 rounded-md md:p-3 md:space-x-2 relative'>
          <div ref={bgRef} className="absolute bg-white shadow-md rounded-md flex items-center justify-center" style={{ pointerEvents: "none", zIndex: 1 }}>
            <p className="text-[14px]"></p>
          </div>
          <div ref={viewRef} className={`${selectedTab=='View All'?'text-gray-200':''}md:text-[14px] md:w-[110px] rounded-md cursor-pointer select-none`} onClick={() => { setSelectedTab("View All"); }}>
            <p className='md:flex md:items-center md:justify-center md:h-full md:text-[14px]'>View All</p>
          </div>
          <div ref={inProgressRef} className={`${selectedTab=='In Progress'?'text-gray-200':''} md:text-[14px] md:w-[120px] rounded-md cursor-pointer select-none`} onClick={() => { setSelectedTab("In Progress"); }}>
            <p className='md:flex md:items-center md:justify-center md:h-full md:text-[14px]'>In Progress</p>
          </div>
          <div ref={unAssignedRef} className={`${selectedTab=='Unassigned'?'text-gray-200':''} md:text-[14px] md:w-[120px] rounded-md cursor-pointer select-none`} onClick={() => { setSelectedTab("Unassigned"); }}>
            <p className='md:flex md:items-center md:justify-center md:h-full md:text-[14px]'>Unassigned</p>
          </div>
          <div ref={completedRef} className={`${selectedTab=='Completed'?'text-gray-200':''} md:text-[14px] md:w-[120px] rounded-md cursor-pointer select-none`} onClick={() => { setSelectedTab("Completed"); }}>
            <p className='md:flex md:items-center md:justify-center md:h-full md:text-[14px]'>Completed</p>
          </div>
          <div className='md:w-[100%] md:flex md:items-center md:justify-end'>
            {
              localStorage.getItem('role')!='admin'&&localStorage.getItem('role')!='super admin'?
            <></>
            :
            <div className='border-[1px] border-blue-600 w-[180px]  h-[100%] rounded-md md:flex md:items-center md:space-x-2 select-none cursor-pointer hover:bg-gray-300' onClick={() => { setCreateNew(!createNew) }}>
                <div className='basis-3/12 md:flex md:justify-end md:items-center h-[100%]'><FiPlus size={16} className='text-blue-600' /></div>
                <div className='md:flex md:items-center h-[100%]'><p className='md:h-[100%] md:flex md:items-center text-[14px]  text-blue-600 font-bold' >Add new</p></div>
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
        selectedTab === 'View All' ? <Viewall hidenavbar={hidenavbar} filter={filter} selectedTab={selectedTab} setActiveField={setActiveField} fetchCompanyData={fetchCompanyData} companyData={companyData} /> : null
      }
      {
        selectedTab === 'In Progress' ? <Inprogrss hidenavbar={hidenavbar} filter={filter} selectedTab={selectedTab} setActiveField={setActiveField} fetchCompanyData={fetchCompanyData} companyData={companyData} /> : null
      }
      {
        selectedTab === 'Unassigned' ? <Unassigned hidenavbar={hidenavbar} filter={filter} setSelectedTab={setSelectedTab} selectedTab={selectedTab} setActiveField={setActiveField} fetchCompanyData={fetchCompanyData} companyData={companyData} /> : null
      }
      {
        selectedTab === 'Completed' ? <Completed hidenavbar={hidenavbar} filter={filter} selectedTab={selectedTab} setActiveField={setActiveField} fetchCompanyData={fetchCompanyData} companyData={companyData} /> : null
      }
      {
        createNew ? <CreateNew  setCreateNew={setCreateNew} hidenavbar={hidenavbar} fetchCompanyData={fetchCompanyData} /> : null
      }
      
      </div>
    </div>
  );
}


export default FirstCol;
