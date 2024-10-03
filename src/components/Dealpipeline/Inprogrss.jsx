import React, { useEffect, useState } from 'react';
import GridTemplate from '../GridTemplate/GridTemplate';
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { GrAlert } from 'react-icons/gr';

function Inprogrss({filesadded,realtimeDealpipelinetabs,realtimedealpipelinecompanyInfo,realtimedealpipelinecompany,realtimetabchats,hidenavbar, filter, selectedTab, fetchCompanyData, setActiveField }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [compData,setcompData]=useState([])
  const totalPages = Math.ceil(compData.length / itemsPerPage);
  const [loading,setloading]=useState(true)
  const [error,seterror]=useState(false)

  useEffect(()=>{
    const fetchcompanydata=async()=>{
      if(localStorage.getItem('role')=='admin' || localStorage.getItem('role')=='super admin')
        {
          const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDealpipelineCompany`,{organization:localStorage.getItem('organization')});
        
          const filteredData=response.data.data.filter(val=>val.status=='In Progress' && val.completed=='incomplete')
          setcompData(filteredData)
        }
        else{
          const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDealpipelineCompany`,{organization:localStorage.getItem('organization')});
          const Teamresponse = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getUserfromTeam`, {
            member: localStorage.getItem('email'),
            mainorganization:localStorage.getItem('organization')
          });
          const organizationNames=[]
          
          Teamresponse.data.data.map(val=>{
            organizationNames.push(val.organization)
          })
          
          const filteredData=response.data.data.filter(val=>organizationNames.includes(val.title))
        
          const morefilteredData=filteredData.filter(val=>val.TeamLead_status=='In Progress' && val.completed=='incomplete')
          setcompData(morefilteredData);
          
        }
        setTimeout(()=>{  
          setloading(false)
        },1000)

    }
    try{
    fetchcompanydata()
    }catch(e){
      seterror(!error)
    }
  },[error])


  useEffect(()=>{
    const fetchcompanydata=async()=>{
      if(localStorage.getItem('role')=='admin' || localStorage.getItem('role')=='super admin')
        {
          const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDealpipelineCompany`,{organization:localStorage.getItem('organization')});
        
          const filteredData=response.data.data.filter(val=>val.status=='In Progress' && val.completed=='incomplete')
          setcompData(filteredData)
        }
        else{
          const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDealpipelineCompany`,{organization:localStorage.getItem('organization')});
          const Teamresponse = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getUserfromTeam`, {
            member: localStorage.getItem('email'),
            mainorganization:localStorage.getItem('organization')
          });
          const organizationNames=[]
          
          Teamresponse.data.data.map(val=>{
            organizationNames.push(val.organization)
          })
          
          const filteredData=response.data.data.filter(val=>organizationNames.includes(val.title))
        
          const morefilteredData=filteredData.filter(val=>val.TeamLead_status=='In Progress' && val.completed=='incomplete')
          setcompData(morefilteredData);
          
        }

        setTimeout(()=>{  
          setloading(false)
        },1000)
    }
    try{
    fetchcompanydata()
  
    }catch(e)
    { 
      seterror(!error)
    }
  },[])


  useEffect(()=>{
    const fetchcompanydata=async()=>{
      if(localStorage.getItem('role')=='admin' || localStorage.getItem('role')=='super admin')
        {
          const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDealpipelineCompany`,{organization:localStorage.getItem('organization')});

          const filteredData=response.data.data.filter(val=>val.status=='In Progress' && val.completed=='incomplete')
          setcompData(filteredData)
        }
        else{
          const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDealpipelineCompany`,{organization:localStorage.getItem('organization')});
          const Teamresponse = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getUserfromTeam`, {
            member: localStorage.getItem('email'),
            mainorganization:localStorage.getItem('organization')
          });
          const organizationNames=[]
          
          Teamresponse.data.data.map(val=>{
            organizationNames.push(val.organization)
          })
          
          const filteredData=response.data.data.filter(val=>organizationNames.includes(val.title))

          const morefilteredData=filteredData.filter(val=>val.TeamLead_status=='In Progress' && val.completed=='incomplete')
          setcompData(morefilteredData);
        }

    }
    try{
    fetchcompanydata()
    }catch(e){
      seterror(!error)
    }
  },[realtimedealpipelinecompany])

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
        <div className='overflow-y-auto grid grid-cols-1 gap-y-2 md:ml-5 md:grid md:grid-cols-3 md:gap-x-1 md:gap-y-5 md:h-[449px] h-[354px]'>
        {
          currentData.map(company => 
            
              <GridTemplate
                key={company._id}
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
      <div className='cursor-pointer flex flex-row w-[100%] h-[40px] mt-[35px] items-center justify-center space-x-2'>
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
