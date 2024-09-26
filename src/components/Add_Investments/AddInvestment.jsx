import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import axios from 'axios'
import { IoPlaySkipBackOutline, IoPlaySkipForwardOutline } from 'react-icons/io5'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import GridTemplate from '../GridTemplate/GridTemplate'
import GridDatabase from './GridDatabase'
const AddInvestment = ({hidenavbar}) => {
  const Drawerref=useRef()
  const DbRef=useRef()
  const ManualRef=useRef()
  const [currentView,setCurrentView]=useState('Database')
  const [companyData,setcompanyData]=useState([])
 
  const handleManualClick=(target)=>{
    setCurrentView('Manual')
    gsap.to(Drawerref.current,{
      x:target.offsetLeft-17,
      ease:'power2.out',
      duration:0.4
    })
  }
  const handleDbClick=(target)=>{
    setCurrentView('Database')
    gsap.to(Drawerref.current,{
      x:target.offsetLeft-17,
      ease:'power2.out',
      duration:0.4
    })
  }

  useEffect(()=>{
    const fetchcompanydata=async()=>{
      let organization=localStorage.getItem('organization')
      const response = await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getDealpipelineCompany',{organization:organization});
      setcompanyData(response.data.data)
    }
    fetchcompanydata()
  },[])

  useEffect(()=>{
    const fetchcompanydata=async()=>{
      let organization=localStorage.getItem('organization')
      const response = await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getDealpipelineCompany',{organization:organization});
    
      setcompanyData(response.data.data)
    }
    if(currentView=='Database')
    {
      fetchcompanydata()
    }
  },[currentView])
  const sortedData = companyData.sort((a, b) => (a.completed === 'completed' ? -1 : 1));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const fileteredData=sortedData.filter((item)=>item.status!='Unassigned')
  const currentData = fileteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
 
  const totalPages = Math.ceil(currentData.length / itemsPerPage);

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
   return (
    <div className={`${hidenavbar?'ml-[2%] w-[98%]':'ml-[20%] w-[80%]'} font-noto h-screen flex flex-col`}>
      <div className='flex flex-row w-[100%] space-x-2 h-[15%] p-[20px]'>
        <div className='relative w-[260px] space-x-2 items-center flex text-white  h-[45px] bg-gray-200 rounded-md p-2'>
            <div ref={Drawerref} className='absolute w-[120px] h-[70%] bg-white rounded-md flex items-center justify-center'><p className='text-gray-700 text-[14px] '>{currentView}</p></div>
            <div onClick={()=>handleDbClick(DbRef.current)}  ref={DbRef} className='w-[120px] cursor-pointer rounded-md flex items-center justify-center h-[100%] text-gray-500'>
              <p className='text-[14px]'> Database</p>
            </div>
            <div onClick={()=>handleManualClick(ManualRef.current)} ref={ManualRef} className='cursor-pointer w-[120px] rounded-md flex items-center justify-center h-[100%] text-gray-500'>
              <p className='text-[14px]'> Manual</p>
            </div>
        </div>
      </div>
      {currentView=='Database'?
      <div className='w-[100%] h-[90%] pr-4 font-noto'>
      <div className=' overflow-y-auto grid grid-cols-1 gap-y-2 md:pl-5 md:grid md:grid-cols-3 md:gap-x-1 md:gap-y-0 md:h-[504px] h-[334px]'>
        {(currentData||[]).map(company => 
          <GridDatabase hidenavbar={hidenavbar} completed={company.completed} key={company._id} Title={company.title} description={company.Description} logo={company.photolink} status={company.status} TeamLead_status={company.TeamLead_status}/>
        
        )}
      </div>
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
      
    </div>:
    <></>}

    </div>
  )
}

export default AddInvestment