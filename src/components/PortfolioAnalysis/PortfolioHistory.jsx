import React, { useEffect, useState } from 'react'
import { FaImages } from 'react-icons/fa'
import { IoMdImage } from 'react-icons/io'
import { IoArrowBackSharp } from 'react-icons/io5'
import { BsBuildings } from "react-icons/bs";

const PortfolioHistory = ({setportfolioHistory,sheetKeys,sheetJson,selectedImageFiled}) => {
    
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const initialImageUrls = {};
        (sheetJson || []).forEach((val) => {
            initialImageUrls[val._id] = val[selectedImageFiled] || ''; // Initialize state with image URL
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
    return (
    <div className=' w-[100%] flex flex-col space-y-2'>
        
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
                                                            <td className='w-[35px] rounded-md h-[35px] flex items-center justify-center'> 
                                                            <img
                                                            onError={(e) => handleError(e, val._id)} // Pass the id to handleError
                                                            className='w-[25px] rounded-md h-[25px] object-fit'
                                                            src={imageUrls[val._id]} // Use the image URL from state
                                                            alt='Portfolio'
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