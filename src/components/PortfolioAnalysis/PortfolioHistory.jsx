import React from 'react'
import { FaImages } from 'react-icons/fa'
import { IoMdImage } from 'react-icons/io'
import { IoArrowBackSharp } from 'react-icons/io5'
import { BsBuildings } from "react-icons/bs";

const PortfolioHistory = ({setportfolioHistory,sheetKeys,sheetJson,selectedImageFiled}) => {
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
                                                            <td className='w-[35px] rounded-md h-[35px] flex items-center justify-center'> <BsBuildings size={24} /></td>
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