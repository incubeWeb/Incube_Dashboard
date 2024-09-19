import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaGithub } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { LuUserSquare2 } from "react-icons/lu";
import axios from 'axios';
import { FaPlus } from "react-icons/fa";

 export const   ZomatoData = {
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


console.log("John"+Similar_Names)

const processedData = Similar_Names.map(item => {
  return {
    // companyName: item.name.toUpperCase(), // Transform: example converting name to uppercase
   
  };
});

// Find the number of data items using length
console.log("Number of items:", processedData.length);




const CompanyTemplate2 = ({name,description,photolink}) => {
  return (
    <div className='font-roboto w-[100%] h-[70%] rounded-md space-x-3 shadow-md border-gray-300 border-[1px] flex flex-row p-[23px]'>
        <div className=' w-[20%] h-[100%] rounded-md'>
        <img
          src={Company_Info.image_url}
                                alt="Company Logo"
 />


        </div>
        
        <div className='w-[80%] h-[100%] flex flex-col space-y-4 text-gray-700'>
            <div className='w-[100%] h-[30%] flex flex-row'>
                  <div className='flex flex-col basis-3/4 '>
                      {/* <p className='text-[14px] font-inter'>{description}</p> */}
                      <p className='text-[15px] font-bold font-inter'>{LinkedIn.jsonLD.name}</p>
                  </div>
                  <div className='flex flex-row basis-1/4 items-center justify-end'>
                      <div className='w-[45px] h-[90%] rounded-md border-blue-600 border-[1px] flex flex-col items-center justify-center'><FaRegHeart size={16} className='text-blue-600'/></div>
                  </div>
            </div>
            <div className='w-[100%] h-[40%] flex flex-row'>
                <div className='basis-3/4 flex font-inter flex-col space-y-3 text-[#475467]'>

                {Company_Info.recent_funding.length > 0 && (
    <p className='font-inter text-[14px]'>Funding Amount {Company_Info.recent_funding[0]['Funding Amount']}</p>
        )}
                          
                        


                          
                      <div className='flex flex-row text-[15px] space-x-4'>
                        <div className='flex flex-row space-x-1 items-center'>
                          <IoLocationOutline size={16} />
                          <p className='font-inter text-[14px]'> {LinkedIn.jsonLD.address.addressLocality},{LinkedIn.jsonLD.address.addressRegion}, {LinkedIn.jsonLD.address.addressCountry}</p>


                        </div>
                        <div className='flex flex-row space-x-2 items-center'>
                          <LuUserSquare2 size={16}/>
                          <p className='text-[14px]'>Aloke Bajpai</p>
                        </div>
                        <div className='flex flex-row space-x-2 items-center'>
                          <CiCalendar size={16}/>
                          <p className='text-[14px]'>Founded in 2014</p>
                        </div>
                      </div>
                </div>
                <div className=' mt-10  space-x-2'>
                <a href={LinkedIn.jsonLD.url}>  <TiSocialLinkedin size={24} className='bg-[#0077B5] rounded text-white'/></a>
                  
                </div>
            </div>
            <div className='w-[100%] h-[40%] flex flex-row justify-end items-center border-t border-gray-300 mr-2 space-x-2'>
            <FaPlus  className='mt-3 pl-1'/><p className=' mt-3 font-inter font-semibold text-[14px]'>{processedData.length+" "+"Similar Companies"}</p>
               
                <div className='border-[1px] border-gray-300 w-[120px] h-[80%] mt-4  rounded-md flex items-center justify-center'>
                    <p className='text-[14px] font-inter font-semibold'>Financials</p>
                </div>
                <div className='border-[1px] border-gray-300 w-[190px] h-[80%] mt-4 rounded-md flex items-center justify-center'>
                    <p className='text-[14px] font-inter font-semibold'>Download company data</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CompanyTemplate2