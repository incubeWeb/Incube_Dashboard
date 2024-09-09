import React, { useEffect, useState } from 'react';
import { CiStar } from 'react-icons/ci';
import Calendar from 'react-calendar';
import '../../../node_modules/react-calendar/dist/Calendar.css'; // Ensure this import is included
import { CiCalendar } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineFilterList } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import CompanyTemplate from './CompanyTemplate';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';

const Dealsourcing = ({hidenavbar}) => {
  const [value, onChange] = useState([new Date()]);
  const [showCalendar,setShowCalendar]=useState(false)
  const [fundingRounds,setFundingRounds]=useState(false)
  const [moreFilters,setMoreFilters]=useState(false)
  const [searchValue,setSearchVal]=useState('')

  const [companies,setCompanies]=useState([])
  const handleSearchInputChange=(e)=>{
      setSearchVal(e.target.value)
  }

  useEffect(()=>{
   const setCompany=async()=>{
    const res=await axios.post('http://localhost:8999/getdealsourcingFiles',{organization:localStorage.getItem('organization')})
    const data=res.data.data
    setCompanies(data)
   }
   setCompany()
  },[])

  useEffect(()=>{
    handleSearch()
  },[searchValue])

  const ClearInput=()=>{
    document.getElementById('search').value=''
    setSearchVal('')
  }

  const handleSearch=async()=>{
    const search=document.getElementById('search').value
    const res=await axios.post('http://localhost:8999/searchdealsourcingfiles',{search:search,organization:localStorage.getItem('organization')})
    const data=res.data.data
    setCompanies(data)
  }


  useEffect(()=>{
    console.log(JSON.stringify(value+1).split(" ")[1]+" "+JSON.stringify(value+1).split(" ")[2]+" "+JSON.stringify(value+1).split(" ")[3])
  },[value])

  const handleShowCalendar=()=>{
    setShowCalendar(!showCalendar)
  }
  const handleFundingRounds=()=>{
    setFundingRounds(!fundingRounds)
  }
  const handleMorefilters=()=>{
    setMoreFilters(!moreFilters)
  }
  return (
    <div className={`${hidenavbar?'ml-[0%] w-[100%]':'ml-[20%] w-[80%]'}select-none text-gray-800 flex flex-col p-[63px] pt-[30px] h-screen font-roboto`}>
      <div className='flex flex-col w-[100%] h-[20%] justify-center'>
        <div className='w-[100%] h-[30%] flex flex-row items-center'>
          <p className='basis-1/2 text-[17px]'>232 Startups in Gurugram</p>
          <div className='basis-1/2 flex justify-end w-[100%] h-[100%] space-x-2'>
            <div className='w-[80px] h-[100%] shadow-md border-gray-300 border-[1px] flex rounded-md items-center justify-center'>
              <p className='text-[14px]'>Share</p>
            </div>
            <div className='w-[150px] shadow-gray-400 shadow-md h-[100%] flex flex-row text-white bg-blue-600 space-x-2 items-center justify-center rounded-md'>
              <CiStar size={17} />
              <p className='text-[14px]'>Save search</p>
            </div>
          </div>
        </div>
        <div>
          <p className='text-[14px]'>Search or go through startups based on funding round, net worth and whole lot of other metrics</p>
        </div>
      </div>
      <div className='w-[100%] h-[20%] flex flex-col'>
        <div className='basis-1/2 flex flex-row space-x-3'>
          <div className='basis-1/2 flex flex-row space-x-2'>
          <div className='cursor-pointer w-[190px] rounded-md h-[60%] border-gray-300 border-[1px]'>
            {
                showCalendar?
                <div className='w-[20%] top-[190px] h-[30%] fixed z-40'>
                    <Calendar
                      className={`rounded-md shadow-md text-gray-600`}
                      onChange={onChange}
                      
                      value={value}
                      // Optional: to ensure month/year navigation is visible
                      next2Label={null}
                      prev2Label={null}
                      onClickDay={handleShowCalendar}
                      />
                </div>
                :
                <div className='w-[100%] h-[100%] rounded-md flex flex-row items-center justify-center space-x-2' onClick={handleShowCalendar}>
                        <div>
                            <CiCalendar size={16}/>
                        </div>
                        <div>
                            <p className='text-[14px]'>{JSON.stringify(value+1).split(" ")[1]+" "+JSON.stringify(value+1).split(" ")[2]+" "+JSON.stringify(value+1).split(" ")[3]}</p>
                        </div>
                </div>
            }
          </div>
          <div className='w-[190px] cursor-pointer items-center justify-center space-x-4 rounded-md h-[60%] border-gray-300 border-[1px] flex flex-row' onClick={handleFundingRounds} >
                <div className=' flex flex-row items-center justify-center space-x-1' >
                    <FiDollarSign size={15}/>
                    <p className='text-[15px] pt-[2px] '>Funding Rounds</p>
                </div>
                <div className='pt-[3px]'><FaChevronDown size={16}/></div>
          </div>
          {
                      fundingRounds?
                      <div className='cursor-default w-[20%] top-[25%] h-[30%] left-[37%] overflow-y-auto bg-white absolute z-40 rounded-md flex flex-col shadow-md border-[1px] border-gray-300'>
                          <div className='flex flex-col w-[100%] h-[100%] p-4 space-y-4'>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-gray-300 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre seed</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-gray-300 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Seed</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-gray-300 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series A</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-gray-300 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series B</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-gray-300 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series C</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-gray-300 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series D</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-gray-300 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series E</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-gray-300 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series F</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-gray-300 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series G</p>
                              </div>

                          </div>
                      </div>
                      :
                      <></>
                    }
          </div>
          <div className='basis-1/2 flex flex-row justify-end items-start' >
                <div className='w-[150px] cursor-pointer h-[60%] items-center justify-center space-x-4 rounded-md border-gray-300 border-[1px] flex flex-row' onClick={handleMorefilters}>
                    <MdOutlineFilterList />
                    <p className='text-[14px]'>More filters</p>
                </div>
                {
                  moreFilters?
                  <div className='w-[40%] h-[100%] z-40 bg-white shadow-md border-[1px] border-gray-200 top-0 p-[23px] rounded-l-md right-0 fixed'>
                       <div className='flex flex-col w-[100%] h-[5%] justify-center items-end cursor-pointer'><RxCross2 onClick={handleMorefilters} size={20} /></div>
                  </div>
                  :<></>
                }
          </div>
        </div>
        <div className='basis-1/2 w-[100%] h-[60%] flex items-start flex-row space-x-2'>
          {/* Additional content here */}
            <div className='w-[90%] h-[55%] flex flex-row'>
              <div className='border-y-[1px] rounded-l-md border-gray-300 border-l-[1px] flex justify-center items-center w-[28px] text-gray-500'><FiSearch size={16} /></div>
                <input id='search' onChange={handleSearchInputChange} className='outline-none rounded-r-md border-gray-300 border-y-[1px] border-r-[1px] w-[100%] text-[14px] text-gray-500 placeholder:text-[15px]' placeholder='Search'/>
            </div>
            <div className='flex flex-row h-[55%] space-x-2'>
                  <div className='shadow-md border h-[100%] w-[70px] border-gray-300 rounded-md items-center flex justify-center cursor-pointer' onClick={ClearInput}>
                    <p className='text-[14px] text-gray-700'>Clear</p>
                  </div>
                  <div className='shadow-md border h-[100%] w-[90px] border-blue-600 rounded-md items-center flex justify-center bg-blue-600 cursor-pointer' onClick={handleSearch}>
                    <p className='text-[14px] text-white'>Search</p>
                  </div>
            </div>
        </div>
      </div>
      <div className='h-[65%] w-[100%] flex flex-col space-y-4 rounded-md'>
            <div className=' flex flex-row w-[190px] border-[1px] h-[10%] border-gray-400 rounded-md '>
                <div className='basis-1/2 flex rounded-l-[5px] border-r-[1px] bg-gray-300 items-center justify-center border-gray-400 h-[100%]'>
                    <p className='text-gray-800 text-[13px] '>Sort by Date</p>
                </div>
                <div className='basis-1/2 flex items-center justify-center h-[100%]'>
                    <p className='text-gray-800 text-[13px] '>Sort by Price</p>
                </div>
            </div>
            <div className='w-[100%] h-[90%] overflow-y-auto space-y-2 pr-6'>
               {
                companies.map(comp=>(
                    <CompanyTemplate key={comp._id} name={comp.title} description={comp.Description} photolink={comp.photolink}/>
                ))
               } 
                


            </div>
      </div>
    </div>
  );
};

export default Dealsourcing;
