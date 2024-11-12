import React, { useEffect, useState } from 'react';
import GridTemplate from '../GridTemplate/GridTemplate';
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { GrAlert } from 'react-icons/gr';
import { jwtDecode } from 'jwt-decode';

function Inprogrss({filesadded,realtimeDealpipelinetabs,realtimedealpipelinecompanyInfo,realtimedealpipelinecompany,realtimetabchats,hidenavbar, filter, selectedTab, fetchCompanyData, setActiveField,companyData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [compData,setcompData]=useState([])
  const totalPages = Math.ceil(compData.length / itemsPerPage);
  const [loading,setloading]=useState(true)
  const [error,seterror]=useState(false)
  const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

  useEffect(()=>{
    const fetchcompanydata=async()=>{
      if(Logrole=='admin' || Logrole=='super admin')
        {
          
        
          const filteredData=companyData.filter(val=>val.status=='In Progress' && val.completed=='incomplete')
          setcompData(filteredData)
        }
        else{
          
         
        
          const morefilteredData=companyData.filter(val=>val.TeamLead_status=='In Progress' && val.completed=='incomplete')
          setcompData(morefilteredData);
          
        }
        
          setloading(false)
      

    }
    
    fetchcompanydata()
    
  },[companyData])


 

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

  

  return (
    <div>
      {
      loading ? (
        <div className='w-[100%] h-[450px]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Bars color="#8884d8" height={80} width={80} />
          
        </div>
      ):
    
    <div>
      {
        currentData?.length>0?
        <div className=' grid grid-cols-1 gap-y-2 md:ml-5 md:grid md:grid-cols-3 md:gap-x-1 md:gap-y-5 md:h-[449px] h-[354px]'>
        {
          currentData.map(company => 
            
              <GridTemplate
                key={company._id}
                companyData={companyData}
                id={company._id}
                selectedTab={selectedTab}
                setActiveField={setActiveField}
                Title={company.title}
                description={company.Description}
                logo={company.photolink}
                status={company.status}
                TeamLead_status={company.TeamLead_status}
                hidenavbar={hidenavbar}
                realtimetabchats={realtimetabchats}
                realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo}
                realtimeDealpipelinetabs={realtimeDealpipelinetabs}
                filesadded={filesadded}
              /> 
          )
        }
        

      </div>
      :
      <div className='overflow-y-auto flex flex-col md:h-[449px] h-[354px] w-[100%] '>
      <div className='w-[100%] space-y-3 h-[100%] flex flex-col items-center justify-center'>
          <div className='w-[100%] h-[10%] flex items-center justify-center'>
            <GrAlert size={60}/>
          </div>
          <div className='text-[15px] font-noto w-[100%] items-center justify-center flex'>
            <p>No New Company Present</p>
          </div>
      </div>
    </div>
      }
      <div className={`${hidenavbar?'left-0':'left-[10%]'} cursor-pointer fixed bottom-5  flex flex-row w-[100%] h-[40px] mt-[35px] items-center justify-center space-x-2`}>
        <div className='md:w-[30px] md:h-[35px] flex justify-center rounded-md items-center hover:bg-white md:hover:shadow-md' onClick={() => { setCurrentPage(1) }}>
          <IoPlaySkipBackOutline size={17} className='md:w-[30px]' />
        </div>
        <div className='md:w-[30px] md:h-[35px] flex justify-center rounded-md items-center hover:shadow-md hover:bg-white' onClick={handlePreviousPage}>
          <FiChevronLeft size={17} />
        </div>
        {Array.from({ length: totalPages }, (_, index) => (
          <div key={index} onClick={() => handlePageChange(index + 1)} className={`md:w-[30px] ${currentPage === index + 1 ? 'bg-gray-100' : 'hover:shadow-md'} md:h-[35px] rounded-md md:flex md:items-center md:justify-center`}>
            <p>{index + 1}</p>
          </div>
        ))}
        <div className='md:w-[30px] md:h-[35px] flex justify-center rounded-md items-center hover:shadow-md hover:bg-white' onClick={handleNextPage}>
          <FiChevronRight size={17} className='md:w-[30px]' />
        </div>
        <div className='md:w-[30px] md:h-[35px] flex justify-center rounded-md items-center hover:shadow-md hover:bg-white' onClick={() => { setCurrentPage(totalPages) }}>
          <IoPlaySkipForwardOutline size={17} className='md:w-[30px]' />
        </div>
      </div>
    </div>
    }
</div>
  );
}

export default Inprogrss;
