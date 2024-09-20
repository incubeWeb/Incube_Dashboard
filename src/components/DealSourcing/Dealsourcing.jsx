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

const   ZomatoData = {
  "status": 200,
  "data": [
      {
          "Similar_Names": [
              {
                  "companyname": "ZOMATO MEDIA PRIVATE LIMITED",
                  "cin": "U93030DL2010PLC198141"
              },
              {
                  "companyname": "ZOMATO INTERNET PRIVATE LIMITED",
                  "cin": "U74900DL2015PTC286208"
              },
              {
                  "companyname": "ZOMATO ENTERTAINMENT PRIVATE LIMITED",
                  "cin": "U74999DL2018PTC342569"
              },
              {
                  "companyname": "ZOMATO CULINARY SERVICES PRIVATE LIMITED",
                  "cin": "U15549DL2019PTC351669"
              },
              {
                  "companyname": "ZOMATO LOCAL SERVICES PRIVATE LIMITED",
                  "cin": "U74900DL2019PTC351669"
              },
              {
                  "companyname": "ZOMATO PRIVATE LIMITED",
                  "cin": "U93030DL2010PLC198141"
              }
          ]
      },
      {
          "Company_Info": {
              "name": " Zomato",
              "image_url": "https://i.tracxn.com/logo/company/zom_f1819c9a-9f51-49a7-b02d-4ea0f7d04118.jpg?height=120&width=120",
              "discription": [
                  {
                      "Total Funding": "$1.69Bin 18 rounds"
                  },
                  {
                      "Latest Funding Round": "$252MSeries J, Feb 04, 2021"
                  },
                  {
                      "Post Money Valuation": "$1Bas on Jun 29, 2021"
                  },
                  {
                      "Investors": "Info Edge Ventures& 47 more"
                  },
                  {
                      "Ranked": "1stamong 384 active competitors"
                  },
                  {
                      "Annual Revenue": "₹13,000Cr ($1.57B)as on Mar 31, 2024"
                  },
                  {
                      "Employee Count": "5,760as on Jul 31, 2024 "
                  },
                  {
                      "Investment & Acquisitions": "Omninet Technologies& 32 more"
                  },
                  {
                      "Similar Companies": "DoorDash& 3681 more"
                  }
              ],
              "associated_companies": [
                  {
                      "Legal Entity Name": "FIRST LAP LLP ",
                      "Date of incorporation": "Jun 07, 2021",
                      "Revenue": "-",
                      "Net Profit": "-",
                      "Employee Count": "272"
                  },
                  {
                      "Legal Entity Name": "ZOMATO LOCAL SERVICES PRIVATE LIMITED",
                      "Date of incorporation": "Jun 20, 2019",
                      "Revenue": "$8.31K (as on Mar 31, 2022)",
                      "Net Profit": "$3.76K (as on Mar 31, 2022)",
                      "Employee Count": "517"
                  },
                  {
                      "Legal Entity Name": "ZOMATO ENTERTAINMENT PRIVATE LIMITED",
                      "Date of incorporation": "Dec 03, 2018",
                      "Revenue": "$6.62M (as on Mar 31, 2023)",
                      "Net Profit": "-$638K (as on Mar 31, 2023)",
                      "Employee Count": "503"
                  },
                  {
                      "Legal Entity Name": "ZOMATO FINANCIAL SERVICES LIMITED",
                      "Date of incorporation": "Feb 24, 2022",
                      "Revenue": "-",
                      "Net Profit": "-",
                      "Employee Count": "155"
                  },
                  {
                      "Legal Entity Name": "ZOMATO PAYMENTS PRIVATE LIMITED",
                      "Date of incorporation": "Aug 03, 2021",
                      "Revenue": "-",
                      "Net Profit": "-",
                      "Employee Count": "789"
                  },
                  {
                      "Legal Entity Name": "ZOMATO LIMITED",
                      "Date of incorporation": "Jan 17, 2010",
                      "Revenue": "$1.57B (as on Mar 31, 2024)",
                      "Net Profit": "$42.4M (as on Mar 31, 2024)",
                      "Employee Count": "572"
                  }
              ],
              "recent_funding": [
                  {
                      "Date of funding": "Feb 04, 2021",
                      "Funding Amount": "$252M",
                      "Round Name": "Series J",
                      "Post money valuation": "$5.44B",
                      "Revenue multiple": "18.3x",
                      "Investors": "Kora, Fidelity Investments, Tiger Global Management, Bow Wave Capital Management, Dragoneer Investment Group, Manoj Kumar Kundalia, Anshoo Sharma, Variable Insurance Products Fund III, Mirae Asset Global Investments, DF International Partners, ASP India"
                  },
                  {
                      "Date of funding": "Aug 31, 2020",
                      "Funding Amount": "$660M",
                      "Round Name": "Series J",
                      "Post money valuation": "$3.93B",
                      "Revenue multiple": "11.6x",
                      "Investors": "Kora, Tiger Global Management, Fidelity Investments, Baillie Gifford, Steadview, Luxor Capital Group, Mirae Asset Venture Investments, Temasek, Bow Wave Capital Management, D1 Capital Partners, Manoj Kumar Kundalia, Anshoo Sharma"
                  },
                  {
                      "Date of funding": "Mar 24, 2020",
                      "Funding Amount": "$5M",
                      "Round Name": "Series J",
                      "Post money valuation": "$3.26B",
                      "Revenue multiple": "8.5x",
                      "Investors": "pacifichorizon.co.uk"
                  }
              ]
          }
      },
      {
          "LinkedIn": {
              "title": "Zomato | LinkedIn",
              "metaDescription": "Zomato | 1,688,064 followers on LinkedIn. Vision - better food for more people | Zomato’s mission statement is “better food for more people.” Since our inception in 2010, we have grown tremendously, both in scope and scale - and emerged as India’s most trusted brand during the pandemic, along with being one of the largest hyperlocal delivery networks in the country.\n\nToday, Zomato represents a wide range of cultures through its diversified 5000+ team members, 3.5 lakh+ delivery partners, and our biggest collective of the finest restaurant partners.",
              "jsonLD": {
                  "@context": "http://schema.org",
                  "@type": "Organization",
                  "name": "Zomato",
                  "url": "https://in.linkedin.com/company/zomato",
                  "address": {
                      "type": "PostalAddress",
                      "streetAddress": "Pioneer Square",
                      "addressLocality": "Gurugram",
                      "addressRegion": "Haryana",
                      "postalCode": "122101",
                      "addressCountry": "IN"
                  },
                  "description": "Zomato’s mission statement is “better food for more people.” Since our inception in 2010, we have grown tremendously, both in scope and scale - and emerged as India’s most trusted brand during the pandemic, along with being one of the largest hyperlocal delivery networks in the country.\n\nToday, Zomato represents a wide range of cultures through its diversified 5000+ team members, 3.5 lakh+ delivery partners, and our biggest collective of the finest restaurant partners. We are grateful that our business is able to provide upward social and economic movement for millions of households – of our delivery partners, as well as restaurant staff. We think of all of us as one big family!\n\nOur passion is driven by purpose and we take immense pride in our initiative ‘Feeding India’, one of India’s largest not-for-profits working to ensure that nobody in India goes to bed hungry. As of now, Feeding India provides over 150,000 nutritious meals to the underprivileged every day.\n\nIn April 2020, Feeding India ran one of the largest food distribution drives in the world during the first wave of COVID, and distributed 78 million meals to daily wagers across the length and breadth of the country.\n\nDuring the second wave of COVID-19, Feeding India was again the first to act. We were able to source over 9,000 oxygen concentrators and distributed them for free to government hospitals across the country. This helped save millions of lives during one of the worst humanitarian crises faced by India in the recent times.\n\nWe’re innovating hard to make last-mile delivery carbon neutral, to eliminate the use of plastic packaging, create meaningful opportunities in the gig economy, and to feed our country’s ever-growing appetite for high-quality, affordable, and hygienic food, one delivery at a time!",
                  "numberOfEmployees": {
                      "value": 14940,
                      "@type": "QuantitativeValue"
                  },
                  "logo": {
                      "contentUrl": "https://media.licdn.com/dms/image/v2/D4D0BAQGmF6yqRQAgCw/company-logo_200_200/company-logo_200_200/0/1700453963264/zomato_logo?e=2147483647&v=beta&t=WAAoVhEV3uASKu23KqJkO-B4_JNJIkvjKm3_j5yi1A0",
                      "description": "Zomato",
                      "@type": "ImageObject"
                  },
                  "slogan": "Vision - better food for more people",
                  "sameAs": "https://www.zomato.com/"
              }
          }
       }
    ]
}





const { Similar_Names } = ZomatoData.data[0];
const { Company_Info } = ZomatoData.data[1];
const { LinkedIn } = ZomatoData.data[2];
const [companyDatas, setCompanyData] = useState([]);

const processedData = Similar_Names.map(item => {
  return {
    // companyName: item.name.toUpperCase(), // Transform: example converting name to uppercase
   
  };
});


const Dealsourcing = ({hidenavbar}) => {
  const [value, onChange] = useState([new Date()]);
  const [showCalendar,setShowCalendar]=useState(false)
  const [fundingRounds,setFundingRounds]=useState(false)
  const [moreFilters,setMoreFilters]=useState(false)
  const [searchValue,setSearchVal]=useState('')
  const [submittedValue, setSubmittedValue] = useState('');



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

  // useEffect(()=>{
  //   handleSearch()
  // },[searchValue])

  const ClearInput=()=>{
    document.getElementById('search').value=''
    setSearchVal('')
  }

  
  const handleSearch=async()=>{
    const search=document.getElementById('search').value
    setSubmittedValue(search)
   
    const res = await axios.post('http://localhost:8999/scrape/companyData', {
  
      company:searchValue,
    });
    console.log(JSON.stringify(res.data));
    setCompanyData(res.data.data)
   
  
  }
useEffect(()=>{
console.log(companyDatas)

},[companyDatas])

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
                <input id='search'  onChange={handleSearchInputChange} className='outline-none rounded-r-md border-gray-300 border-y-[1px] border-r-[1px] w-[100%] text-[14px] text-gray-500 placeholder:text-[15px]' placeholder='Search'/>
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


            <div className='w-[100%] h-[90%] space-y-2 pr-6 font-inter'>
  {Similar_Names.length > 0 && (
    <CompanyTemplate2
      key={Similar_Names[0]._id} 
      name={Similar_Names[0].companyname} 
      description={Similar_Names[0].Description} 
      photolink={Similar_Names[0].photolink} 
    />
  )}
</div>
 <div className='grid w-[100%] h-[90%]  pr-6  grid-cols-3  p-6 gap-8 font-inter'>
  {Similar_Names.map (v=>(
    <CompanyTemplate 
      key={v._id} 
      name={v.companyname} 
      description={Similar_Names.Description} 
      photolink={Similar_Names[0].photolink} 
    />
  ))}
</div>
</div>
<div>
        <p className='flex justify-center w-[95%] h-[10%]  pt-5   -mt-32 font-inter font-semibold '>  <FaPlus  className='mt-1 mr-1'/>{processedData.length+" "+"Similar Companies"}</p>
      </div>
      </div>
      
    </div>
  );
};

export default Dealsourcing;
