import React, { useEffect, useState } from 'react';
import GridTemplate from '../GridTemplate/GridTemplate';
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from 'axios';
import { Bars } from 'react-loader-spinner';

function Unassigned({filter,setSelectedTab, selectedTab,fetchCompanyData,setActiveField }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [compData,setcompData]=useState([])
  const totalPages = Math.ceil(compData.length / itemsPerPage);
  const [loading,setloading]=useState(true)
  useEffect(()=>{
    const fetchcompanydata=async()=>{
      const response = await axios.get('http://localhost:8999/getDealpipelineCompany');
      setcompData(response.data.data)
    }
    fetchcompanydata()
    setTimeout(()=>{  
      setloading(false)
    },1000)
  },[])

  const handlePageChange = (page) => {
    if (page <= 0) {
      page = 1;
    }
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => (prevPage <= 1 ? 1 : prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage >= totalPages ? totalPages : prevPage + 1));
  };

  const currentData = compData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const check = (company) => {
    if(localStorage.getItem('role')=='admin'||localStorage.getItem('role')=='super admin')
    {
      return true
    }
    return filter.includes(company.title);
  };

  return (
    <div>
      {
      loading ? (
        <div className='w-[100%] h-[450px]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Bars color="#8884d8" height={80} width={80} />
          
        </div>
      ):
    <div>
      <div className='overflow-y-auto grid grid-cols-1 gap-y-2 md:ml-5 md:grid md:grid-cols-3 md:gap-x-1 md:gap-y-5 md:h-[449px] h-[354px] '>
        {
          localStorage.getItem('role')=='team lead' || localStorage.getItem('role')=='user'?
          currentData.map(company => ( 

            company.TeamLead_status === 'Unassigned' && check(company) && company.completed!='completed' ?
            <GridTemplate setSelectedTab={setSelectedTab} selectedTab={selectedTab} key={company._id} setActiveField={setActiveField} Title={company.title} description={company.Description} logo={company.photolink} status={company.status} TeamLead_status={company.TeamLead_status}/>
            :
            <></>
          ))
          :
          currentData.map(company => ( 

            company.status === 'Unassigned' && check(company) && company.completed!='completed'?
            <GridTemplate setSelectedTab={setSelectedTab} selectedTab={selectedTab} key={company._id} setActiveField={setActiveField} Title={company.title} description={company.Description} logo={company.photolink} status={company.status} TeamLead_status={company.TeamLead_status}/>
            :
            <></>
          ))
        }
        
      </div>
      {
      <div className='cursor-pointer flex flex-row w-[100%] h-[40px] mt-[35px] items-center justify-center space-x-2'>
        <div className='md:w-[30px] md:h-[35px] flex justify-center rounded-md items-center hover:bg-white md:hover:shadow-md' onClick={() => { setCurrentPage(1) }}>
          <IoPlaySkipBackOutline size={17} className='md:w-[30px]' />
        </div>
        <div className='md:w-[30px] md:h-[35px] flex justify-center rounded-md items-center hover:shadow-md hover:bg-white' onClick={handlePreviousPage}>
          <FiChevronLeft size={17} />
        </div>
        {
        
        Array.from({ length: totalPages }, (_, index) => (
          <div key={index} onClick={() => handlePageChange(index + 1)} className={`md:w-[30px] ${currentPage === index + 1 ? 'bg-gray-100' : 'hover:shadow-md'} md:h-[35px] rounded-md md:flex md:items-center md:justify-center`}>
            <p>{index + 1}</p>
          </div>
        ))
        
        
        
        }
        <div className='md:w-[30px] md:h-[35px] flex justify-center rounded-md items-center hover:shadow-md hover:bg-white' onClick={handleNextPage}>
          <FiChevronRight size={17} className='md:w-[30px]' />
        </div>
        <div className='md:w-[30px] md:h-[35px] flex justify-center rounded-md items-center hover:shadow-md hover:bg-white' onClick={() => { setCurrentPage(totalPages) }}>
          <IoPlaySkipForwardOutline size={17} className='md:w-[30px]' />
        </div>
      </div>
      }
    </div>
  }
  </div>
  );
}

export default Unassigned;
