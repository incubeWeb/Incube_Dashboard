import React, { useEffect, useRef, useState } from 'react'
import { FaImages } from 'react-icons/fa'
import { IoMdImage } from 'react-icons/io'
import { IoArrowBackSharp } from 'react-icons/io5'
import { BsBuildings } from "react-icons/bs";
import { RiFilter3Line } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'

const PortfolioHistory = ({selectedTab,setportfolioHistory,sheetKeys,sheetJson,selectedImageFiled}) => {
    
    const [imageUrls, setImageUrls] = useState({});
    const[showFilterMenu,setshowFilterMenu]=useState(false)
    const[showSortMenu,setshowSortMenu]=useState(false)
    const[value,setValue]=useState('');
    const[sortValue,setsortValue]=useState('');

    const sortref=useRef(null)
    const filterref=useRef(null)

    

    const sortbtnref=useRef(null)
    const filterbtnref=useRef(null)

    

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sortbtnref.current && !sortbtnref.current.contains(event.target) && (sortref.current && !(sortref.current.contains(event.target)))) {
          setshowSortMenu(false);
          }
          if (filterbtnref.current && !filterbtnref.current.contains(event.target) && (filterref.current && !(filterref.current.contains(event.target)))) {
            setshowFilterMenu(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);



    useEffect(() => {
        const initialImageUrls = {};
        (sheetJson || []).forEach((val,index) => {
            initialImageUrls[index] = val[selectedImageFiled] || 'https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg'; // Initialize state with image URL
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


    
    return (
    <div className=' w-[100%] flex flex-col '>
         <div ref={filterref} className=' w-[90px] text-[14px] rounded-md absolute right-6 -mt-16  h-[30px] border-[1px] border-gray-300 items-center justify-center font-inter font-semibold flex flex-row cursor-pointer'onClick={()=>{setshowFilterMenu(!showFilterMenu)}}>
                                        <RiFilter3Line size={15} />
                                        <p  >Filters</p>
                                       
                                        </div>
                                        <div ref={sortref} className='w-[90px] text-[14px] absolute -mt-16 right-32 rounded-md    h-[30px] border-[1px] border-gray-300 items-center justify-center font-inter font-semibold flex flex-row cursor-pointer'onClick={()=>{setshowSortMenu(!showSortMenu)}}>
                                        <RiFilter3Line size={15}  />
                                       <p >Sort</p> </div>
                                       
                                       {showFilterMenu && (
        <div ref={filterbtnref} className='absolute  right-20 z-50 -mt-6  w-[150px] bg-white p-3 border-gray-300 border-[1px] rounded-md'>
          
          <div>
            {sheetKeys.map((k, index) =>
              <div key={index} className='p-1 hover:bg-blue-400 items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer' onClick={() => { setshowFilterMenu(false); setValue(k) }}>
                <p className='w-[200px] tracking-wide'>{k}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showSortMenu && (
        <div ref={sortbtnref} className='absolute  right-36 z-50 w-[150px] -mt-6 mr-8 bg-white p-3 border-gray-300 border-[1px] rounded-md'>
          
          <div className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer' onClick={() => { setshowSortMenu(false); setsortValue('Ascending') }}>
            <p className='p-1'>Ascending</p>
          </div>
          <div className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer' onClick={() => { setshowSortMenu(false); setsortValue('Descending') }}>
            <p className='p-1'>Descending</p>
          </div>
        </div>
      )}
     
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
                                (sortedData||[]).map((val,index)=>
                                    <tr key={val._id} className={` h-[70px] ${index==0?'':''}`}>
                                        {
                                            
                                            sheetKeys.map((k,i)=>
                                                
                                                <td className='' colSpan={i=='0'?'2':'1'} key={k._id}>
                                                   <div className='flex flex-row space-x-4 items-center'>
                                                    {i==0?
                                                            <td className='w-[35px] rounded-md h-[35px] flex items-center justify-center'> 
                                                            <img
                                                          
                                                            onError={(e) => handleError(e, index)} // Pass the id to handleError
                                                            className='w-[25px] rounded-md h-[25px] object-fit'
                                                            src={imageUrls[index]} // Use the image URL from state
                                                            alt='https://i.pinimg.com/originals/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg'
                                                        /></td>
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