<<<<<<< Updated upstream
import React from 'react'
import { FaImages } from 'react-icons/fa'
import { IoMdImage } from 'react-icons/io'
import { IoArrowBackSharp } from 'react-icons/io5'
=======
import React, { useState, useEffect, useRef } from 'react';
import { IoMdImage } from 'react-icons/io';
import { RiFilter3Line } from "react-icons/ri";
import { BsBuildings } from "react-icons/bs";

const PortfolioHistory = ({ setportfolioHistory, sheetKeys, sheetJson, selectedImageFiled }) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false); // Filter menu state
  const [showSortMenu, setShowSortMenu] = useState(false); // Sorting menu state
  const [selectedFilter, setSelectedFilter] = useState('Amount Invested'); // Default selected filter
  const [sorting, setSorting] = useState('Ascending'); // Sorting order
  const [sortedData, setSortedData] = useState(sheetJson || []); // To store sorted data

  const filterMenuRef = useRef(null);  // Reference for the filter menu
  const sortMenuRef = useRef(null);    // Reference for the sort menu

  // Function to toggle filter menu visibility
  const toggleFilterMenu = () => setShowFilterMenu(!showFilterMenu);
  const toggleSortMenu = () => setShowSortMenu(!showSortMenu);

  // Function to handle sorting selection
  const handleSortSelection = (sort) => {
    setSorting(sort);
    setShowSortMenu(false); // Close sorting menu after selection
  };

  // Sort functions for different fields
  
  
  // Effect hook to recompute sortedData based on selected filter and sorting order
 
  // Close filter and sort menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setShowFilterMenu(false);  
      }
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setShowSortMenu(false);  
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
>>>>>>> Stashed changes

const PortfolioHistory = ({setportfolioHistory,sheetKeys,sheetJson,selectedImageFiled}) => {
  return (
    <div className='h-[140px] w-[100%] flex flex-col space-y-2'>
        
        <div className='flex flex-row space-x-2 text-[14px] text-gray-600 '>
                {
                    <table>
                        
                        <tr className=''>
                            {sheetKeys.map((k,index)=>
                                <td key={k._id} colSpan={index==0?'2':'1'} className={`text-[14px]  w-[200px] text-gray-500 ${index==0?'':''}`}>
                                    <div className='flex flex-row space-x-4 items-center'>
                                        {index==0?
                                            <td className='w-[35px] h-[35px] flex items-center justify-center '><IoMdImage size={25}/></td>
                                            :
                                            <></>
                                        }
                                        <p className='w-[200px] tracking-wide'>{k}</p>
                                    </div>
                                </td>)   
                            }
                             
                        </tr>
                        
                            {
                                (sheetJson||[]).map((val,index)=>
                                    <tr key={val._id} className={` h-[70px] ${index==0?'':''}`}>
                                        {
                                            
                                            sheetKeys.map((k,index)=>
                                                
                                                <td className='' colSpan={index=='0'?'2':'1'} key={k._id}>
                                                   <div className='flex flex-row space-x-4 items-center'>
                                                    {index==0?
                                                            <td className='w-[35px] rounded-md h-[35px] flex items-center justify-center'><img className='w-[25px] rounded-md h-[25px] object-fit' src={val[selectedImageFiled]}/></td>
                                                            :
                                                            <></>
                                                        }
                                                    <p className='w-[200px] overflow-auto scrollbar-hide text-[14px] text-gray-700 tracking-wide'>{val[k]}</p> 
                                                   </div>
                                                    
                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                        
                        
                        
                    </table>
                    
                }
            </div>
        <div>
            
        </div>

    </div>
  )
}

export default PortfolioHistory