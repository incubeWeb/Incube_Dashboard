<<<<<<< Updated upstream
<<<<<<< Updated upstream
import React from 'react'
=======
import React, { useEffect, useState ,useRef} from 'react'
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  return (
    <div className='h-[140px] w-[100%] flex flex-col space-y-2'>
=======
    
    const [imageUrls, setImageUrls] = useState({});
    const[showFilterMenu,setshowFilterMenu]=useState(false)
    const[showSortMenu,setshowSortMenu]=useState(false)
    const[value,setValue]=useState('');
    const[sortValue,setsortValue]=useState('');
    useEffect(() => {
        const initialImageUrls = {};
        (sheetJson || []).forEach((val,index) => {
            initialImageUrls[index] = val[selectedImageFiled] || ''; // Initialize state with image URL
        });
        setImageUrls(initialImageUrls);
    }, [sheetJson, selectedImageFiled]);

    const handleError = (e, id) => {
        // Update the specific image in the state when an error occurs
        setImageUrls(prev => ({
            ...prev,
            [id]: 'https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg' // Fallback image URL
        }));
    };
    const cleanValue = (val) => {
        if (typeof val === 'string') {
          // Remove symbols like & and $ from the string, keeping only numbers
          const cleaned = val.replace(/[&$,]/g, '').trim();
      
          // If it's numeric after cleaning, return as a number
          if (!isNaN(cleaned) && cleaned !== '') {
            return parseFloat(cleaned);
          }
        }
        return val;
      };
    
      // Sorting function that handles mixed types (string and numbers)
      const mixedTypeSort = (a, b) => {
        const aValue = cleanValue(a[value]);
        const bValue = cleanValue(b[value]);
      
        // If both are numbers, compare them numerically
        if (!isNaN(aValue) && !isNaN(bValue)) {
          return sortValue === 'Ascending' ? aValue - bValue : bValue - aValue;
        }
      
        // If one is a number and the other is a string, treat strings as larger (they come later)
        if (isNaN(aValue) && !isNaN(bValue)) {
          return sortValue === 'Ascending' ? 1 : -1;
        }
        if (!isNaN(aValue) && isNaN(bValue)) {
          return sortValue === 'Ascending' ? -1 : 1;
        }
      
        // If both are strings, compare them lexically
        return sortValue === 'Ascending'
          ? aValue.toString().localeCompare(bValue.toString())
          : bValue.toString().localeCompare(aValue.toString());
      };
      // Sort the data based on the selected key and sort order
      const sortedData = [...(sheetJson || [])].sort((a, b) => {
        if (!value) return 0; // No sorting key selected
        return mixedTypeSort(a, b);
      });
      const filterMenuRef = useRef(null);
      useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
                setshowFilterMenu(false); // Close the filter menu
            }
        };

        if (showFilterMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilterMenu]);

      const sortMenuRef = useRef(null);
      useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
                setshowSortMenu(false); 
                setshowFilterMenu(false)// Close the sort menu
            }
        };

        if (showSortMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSortMenu,showFilterMenu]);
    
    return (
    <div className=' w-[100%] flex flex-col '>
         <div className='w-[90px] text-[14px] rounded-md absolute right-6 -mt-16  h-[30px] border-[1px] border-gray-300 items-center justify-center font-inter font-semibold flex flex-row cursor-pointer'onClick={()=>{setshowFilterMenu(true)}}>
                                        <RiFilter3Line size={15} />
                                        <p  >Filters</p>
                                       
                                        </div>
                                        <div className='w-[90px] text-[14px] absolute -mt-16 right-32 rounded-md    h-[30px] border-[1px] border-gray-300 items-center justify-center font-inter font-semibold flex flex-row cursor-pointer'onClick={()=>{setshowSortMenu(true)}}>
                                        <RiFilter3Line size={15}  />
                                       <p >Sort</p> </div>
                                       
                                       {showFilterMenu  && (
        <div ref={sortMenuRef} className='absolute  right-20 z-50 -mt-6  w-[150px] bg-white p-3 border-gray-300 border-[1px] rounded-md'>
          <div className='cursor-pointer'>
            <RxCross2 size={22} onClick={() => { setshowFilterMenu(false) }} />
          </div>
          <div>
            {sheetKeys.map((k, index) =>
              <div key={index} className='p-1 hover:bg-gray-100 items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer' onClick={() => { setshowFilterMenu(false); setValue(k) }}>
                <p className='w-[200px] tracking-wide'>{k}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showSortMenu && (
        <div ref={sortMenuRef} className='absolute  right-36 z-50 w-[150px] -mt-6 mr-8 bg-white p-3 border-gray-300 border-[1px] rounded-md'>
          <div className='cursor-pointer'>
            <RxCross2 size={22} onClick={() => { setshowSortMenu(false) }} />
          </div>
          <div className='p-1 hover:bg-gray-100 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer' onClick={() => { setshowSortMenu(false); setsortValue('Ascending') }}>
            <p className='p-1'>Ascending</p>
          </div>
          <div className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer' onClick={() => { setshowSortMenu(false); setsortValue('Descending') }}>
            <p className='p-1'>Descending</p>
          </div>
        </div>
      )}
     
        <div className='flex flex-row space-x-2 text-[14px] text-gray-600 '>
>>>>>>> Stashed changes
        
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