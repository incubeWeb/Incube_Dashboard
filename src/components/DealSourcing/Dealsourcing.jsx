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

import CompanyTemplate2 from './CompanyTemplate2';
import { FaPlus } from "react-icons/fa";
import { Bars } from 'react-loader-spinner';




const Dealsourcing = ({hidenavbar}) => {
  const [value, onChange] = useState([new Date()]);
  const [showCalendar,setShowCalendar]=useState(false)
  const [fundingRounds,setFundingRounds]=useState(false)
  const [moreFilters,setMoreFilters]=useState(false)
  const [searchValue,setSearchVal]=useState('')
  const [submittedValue, setSubmittedValue] = useState('');

  const[Loading,setLoading]=useState(false)
  const [processDataLength, setProcessDataLength] = useState(0);


  const [companies,setCompanies]=useState([])

  const handleSearchInputChange=(e)=>{
      setSearchVal(e.target.value)   
      
  }

 

 

  // useEffect(()=>{
  //   handleSearch()
  // },[searchValue])

  const ClearInput=()=>{
    
    setSearchVal('')
  }

  
  // const handleSearch=async()=>{
  //   // alert("clicked")
  //       setLoading(true)
  //     const res=await axios.post('http://localhost:8999/scrape/companyData',{"company":`${searchValue}`})
  //     const data=res.data.data
  //    setLoading(false)
  //     setCompanies(data)
    
   
  
  // }


  const handleSearch = async () => {
 
    setLoading(true);   // Set loading to true when search is initiated
    setCompanies([]); 
    
    try {
     
      const res = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/scrape/companyData`,{"company": `${searchValue}`});
      const data = res.data.data;
     
    
      setCompanies(data); // Store fetched companies
    } catch (err) {
      console.log("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
      ClearInput()
       // Stop loading after fetching is complete
    }
  };

  useEffect(() => {
    try{
    if (companies[0]?.Similar_Names) {
      const ProcessData = companies[0].Similar_Names.map((v, index) => {

        // Further processing here
        return v;
      });

      // Set the length of ProcessData in state
      setProcessDataLength(ProcessData.length);
    }} catch {
      console.log("server error..")
    }
  }, [companies]); // This effect runs when 'companies' changes



  

  const handleShowCalendar=()=>{
    setShowCalendar(!showCalendar)
  }
  const handleFundingRounds=()=>{
    setFundingRounds(!fundingRounds)
  }
  const handleMorefilters=()=>{
    setMoreFilters(!moreFilters)
  }

  let name, photo, funding, LinkedIn_url, Locality, Country;

  try {
    name = companies[2].LinkedIn.jsonLD.name;
    photo = companies[1].Company_Info.image_url;
    funding = companies[1].Company_Info.discription[0]['Total Funding'];
    LinkedIn_url = companies[2].LinkedIn.jsonLD.url;
    Locality = companies[2].LinkedIn.jsonLD.address.addressLocality;
    Country = companies[2].LinkedIn.jsonLD.address.addressCountry;
  } catch (error) {
    console.error("Error accessing company data", error);
    // Provide default values or handle the error gracefully
    name = "Unknown Company";
    photo = "default_image_url";
    funding = "N/A";
    LinkedIn_url = "#";
    Locality = "Unknown";
    Country = "Unknown";
  }
  

  

  return (
    <div className={`${hidenavbar?'ml-[0%] w-[100%]':'ml-[20%] w-[80%]'}select-none text-gray-800 flex flex-col p-[63px] pt-[30px] h-screen`}>
      <div className='flex flex-col w-[100%] h-[20%] justify-center'>
        <div className='w-[100%] h-[30%] flex flex-row items-center'>
          <p className='basis-1/2 text-[28px] font-inter font-bold'>232 Startups in Gurugram</p>
          <div className='basis-1/2 flex justify-end w-[100%] h-[100%] space-x-2'>
            <div className='w-[80px] h-[100%] shadow-md border-gray-300 border-[1px] flex rounded-md items-center justify-center'>
              <p className='text-[14px] font-inter font-semibold'>Share</p>
            </div>
            <div className='w-[150px] shadow-gray-400 shadow-md h-[100%] flex flex-row text-white bg-blue-600 space-x-2 items-center justify-center rounded-md'>
              <CiStar size={17} />
              <p className='text-[14px] font-inter font-semibold'>Save search</p>
            </div>
          </div>
        </div>
        <div>
          <p className='text-[14px] mt-2 font-inter text-[#475467]'>Search or go through startups based on funding round, net worth and whole lot of other metrics</p>
        </div>
      </div>
      <div className='w-[100%] h-[20%] flex flex-col'>
        <div className='basis-1/2 flex flex-row space-x-3'>
          <div className='basis-1/2 flex flex-row space-x-2'>
          <div className='cursor-pointer w-[190px] rounded-md h-[60%] border-gray-300 border-[1px]'>
            {
                showCalendar?
                <div className='w-[20%] top-[190px] h-[30%] fixed z-40  '>
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
                <div className='w-[100%] h-[100%] rounded-md flex flex-row items-center font-inter justify-center space-x-2 font-semibold' onClick={handleShowCalendar}>
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
                    <p className='text-[15px] pt-[2px] font-inter font-semibold'>Funding rounds</p>
                </div>
                <div className='pt-[3px]'><FaChevronDown size={16}/></div>
          </div>
          {
                      fundingRounds?
                      <div className='cursor-default w-[20%] top-[25%] h-[30%] left-[37%] overflow-y-auto bg-white absolute z-40 rounded-md flex flex-col shadow-md border-[1px] border-gray-300'>
                          <div className='flex flex-col w-[100%] h-[100%] p-4 space-y-4 font-inter'>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-blue-400 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre seed</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-blue-400 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Seed</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-blue-400 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series A</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-blue-400 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series B</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-blue-400 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series C</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-blue-400 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series D</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-blue-400 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series E</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-blue-400 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
                                  <p className='text-[14px] text-gray-500'>Pre series F</p>
                              </div>
                              <div className='cursor-pointer w-[100%] h-[20%] flex justify-start items-center p-2 rounded-md hover:bg-blue-400 hover:shadow-md hover:border-gray-300 hover:border-b-[1px]'>
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
                    <MdOutlineFilterList  size={20}/>
                    <p className='text-[14px] font-inter font-semibold'>More filters</p>
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
            <div className='w-[90%] h-[65%] flex flex-row'>
              <div className='border-y-[1px] rounded-l-md border-gray-300 border-l-[1px] flex justify-center items-center w-[28px] text-gray-500'><FiSearch size={16} /></div>
                <input onKeyPress={(e)=>{if(e.key=='Enter'){handleSearch()}}}  value={searchValue}  onChange={handleSearchInputChange} className='outline-none rounded-r-md border-gray-300 border-y-[1px] border-r-[1px] w-[100%] text-[14px] text-gray-500 placeholder:text-[15px]' placeholder='Search'/>
            </div>
            <div className='flex flex-row h-[65%] space-x-2'>
                  <div className='shadow-md border h-[100%] w-[70px] border-gray-300 rounded-md items-center flex justify-center cursor-pointer' onClick={ClearInput}>
                    <p className='text-[14px] text-gray-700 font-inter font-semibold'>Clear</p>
                  </div>
                  <div className='shadow-md border h-[100%] w-[90px] border-blue-600 rounded-md items-center flex justify-center bg-blue-600 cursor-pointer' onClick={handleSearch}>
                    <p className='text-[14px] text-white font-inter font-semibold'>Search</p>
                  </div>
            </div>
        </div>
      </div>
      <div className='h-[65%] w-[100%] flex flex-col space-y-4 rounded-md'>
            <div className=' flex flex-row w-[190px] border-[1px] h-[10%] border-gray-400 rounded-md '>
                <div className='basis-1/2 flex rounded-l-[5px] border-r-[1px] bg-gray-300 items-center justify-center border-gray-400 h-[100%]'>
                    <p className='text-gray-800 text-[12px] font-inter font-semibold '>Sort by Date</p>
                </div>
                <div className='basis-1/2 flex items-center justify-center h-[100%]'>
                    <p className='text-gray-800 text-[12px] font-inter font-semibold '>Sort by Price</p>
                </div>
            </div>
            <div className='w-[100%] h-[90%]  space-y-2 pr-6 font-inter'>
            
           

   {  companies.length>0?  
     <CompanyTemplate2
     name={name}
     photo={photo}
     funding={funding}
     LinkedIn_url={LinkedIn_url}
     Locality={Locality}
     Country={Country}
     length={processDataLength}
   />
     :
     <>
     {Loading ? (
            
      <div className='w-[100%]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Bars color="#8884d8" height={80} width={80} />
          
        </div>

          ) : (
                
       <p className=' items-center text-[22px] font-inter font-semibold mt-5'> Search for Companies..</p>)}
   
     </>
   } 
  </div>
            <div className='w-[100%] h-[90%] space-y-2 pr-6 font-inter'>
            <div className='grid w-[100%] h-[90%]  pr-6  pt-6 grid-cols-3   gap-8 font-inter'>
 {
                   companies.length>0?
                  (companies[0].Similar_Names).map((val,index)=>
                    
                  <CompanyTemplate 
             key={index} 
             name={val.companyname} 
            
        
    />
                   )
                   :
                   <></>
               }
</div>
            </div>

    


</div>

</div>
);
};


            
          
export default Dealsourcing;
