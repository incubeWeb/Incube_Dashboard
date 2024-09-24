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
  const sortData = () => {
    let sortedArray = [...sheetJson];
  
    if (selectedFilter === 'Amount Invested') {
      sortedArray = sortedArray.sort((a, b) => {
        const amountA = parseFloat(a['amount invested'].replace(/[$,]/g, '')) || 0;
        const amountB = parseFloat(b['amount invested'].replace(/[$,]/g, '')) || 0;
        return sorting === 'Ascending' ? amountA - amountB : amountB - amountA;
      });
    } else if (selectedFilter === 'Total Invested Amount') {
      sortedArray = sortedArray.sort((a, b) => {
        const totalAmountA = parseFloat(a['Total Invested Amount'].replace(/[$,]/g, '')) || 0;
        const totalAmountB = parseFloat(b['Total Invested Amount'].replace(/[$,]/g, '')) || 0;
        return sorting === 'Ascending' ? totalAmountA - totalAmountB : totalAmountB - totalAmountA;
      });
    } else if (selectedFilter === 'Investor Name') {
      sortedArray = sortedArray.sort((a, b) => {
        const nameA = a.InvestorName.toLowerCase();
        const nameB = b.InvestorName.toLowerCase();
        return sorting === 'Ascending' ? (nameA < nameB ? -1 : 1) : (nameA > nameB ? -1 : 1);
      });
    }
  
    setSortedData(sortedArray);
  };
  
  // Effect hook to recompute sortedData based on selected filter and sorting order
  useEffect(() => {
    sortData();
  }, [selectedFilter, sorting, sheetJson]);

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

  return (
    <div className='min-h-[140px] w-[100%] flex flex-col space-y-2'>
      <div className='relative'>
        <div className='absolute top-0 right-0 w-[90px] text-[14px] rounded-md space-x-2 h-[30px] border-[1px] border-gray-300 items-center justify-center font-inter font-semibold flex flex-row justify-items-end cursor-pointer -mt-16 mr-3' onClick={toggleFilterMenu}>
          <RiFilter3Line size={15} />
          <p>Filters</p>
        </div>

        {/* Filter options pop-up */}
        {showFilterMenu && (
          <div ref={filterMenuRef} className='absolute right-0 mt-2 w-[200px] p-3 bg-white border-gray-300 border-[1px] rounded-md z-50'>
            <div className='p-1 hover:bg-blue-500 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer' onClick={() => setSelectedFilter('Investor Name')}>
              <p className='p-2'>Investor Name</p>
            </div>
            <div className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-inter font-semibold cursor-pointer' onClick={() => setSelectedFilter('Amount Invested')}>
              <p className='p-2'>Amount Invested</p>
            </div>
            <div className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-inter font-semibold cursor-pointer' onClick={() => setSelectedFilter('Total Invested Amount')}>
              <p className='p-2'>Total Invested Amount</p>
            </div>
          </div>
        )}

        {/* Sorting options pop-up */}
        <div className='absolute top-0 right-0 w-[90px] text-[14px] rounded-md space-x-2 h-[30px] border-[1px] border-gray-300 items-center justify-center font-inter font-semibold flex flex-row justify-items-end cursor-pointer -mt-16 mr-28' onClick={toggleSortMenu}>
          <RiFilter3Line size={15} />
          <p>Sort</p>
        </div>
        {showSortMenu && (
          <div ref={sortMenuRef} className='absolute right-0 mt-2 w-[200px] p-3 bg-white border-gray-300 border-[1px] rounded-md z-50'>
            <div className='p-1 hover:bg-blue-500 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer' onClick={() => handleSortSelection('Ascending')}>
              <p className='p-2'>Ascending</p>
            </div>
            <div className='p-1 hover:bg-blue-500 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer' onClick={() => handleSortSelection('Descending')}>
              <p className='p-2'>Descending</p>
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-row space-x-2 text-[14px] text-gray-600'>
        <table>
          <thead>
            <tr>
              {sheetKeys.map((k, index) => (
                <td key={index} className={`text-[14px] w-[200px] text-gray-500`}>
                  <div className='flex flex-row space-x-4 items-center'>
                    {index === 0 ? <IoMdImage size={25} /> : null}
                    <p className='w-[200px] tracking-wide'>{k}</p>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((val, index) => (
              <tr key={val._id} className={`h-[70px]`}>
                {sheetKeys.map((k, idx) => (
                  <td key={idx}>
                    <div className='flex flex-row space-x-4 items-center'>
                      {idx === 0 ? (
                        <td className='w-[35px] rounded-md h-[35px] flex items-center justify-center'>
                          {/* <img className='w-[25px] rounded-md h-[25px] object-fit' src={val[selectedImageFiled]} alt='Investor' /> */}
                          <BsBuildings size={20} />
                        </td>
                      ) : null}
                      <p className='w-[200px] overflow-auto scrollbar-hide text-[14px] text-gray-700 tracking-wide'>{val[k]}</p>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioHistory;
