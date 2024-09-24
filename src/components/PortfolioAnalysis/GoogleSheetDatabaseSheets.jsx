import React, { useState } from 'react'
import { BsDatabaseFill } from 'react-icons/bs'

const GoogleSheetDatabaseSheets = ({setgooglesheetimagepopup,id,setshowHistory,setsheetmethod,setsheetname,showimagepopup,setshowimagePopup,sheetKeys,selectedImageFiled,setselectedImageField,sheetname,setselectedSheetId,setportfolioHistory}) => {
    const [hover,sethover]=useState(false)
    
    
    const handleImageField=()=>{
        setselectedSheetId(id)
        setshowimagePopup(true)
        setsheetname(sheetname)
        setsheetmethod('Google Sheet')
        setselectedImageField(sheetKeys[0])
    }
    
  return (
    <div  className=' text-gray-600 w-[100%] select-none relative h-[55px] p-2 space-y-2  font-roboto  bg-white flex flex-row '>
            <div onMouseEnter={()=>sethover(!hover)} onMouseLeave={()=>sethover(!hover)} onClick={handleImageField} className='cursor-pointer  p-2 w-[100%] h-[100%] flex flex-row hover:bg-blue-400 hover:text-white'>
                {
                    hover?
                    <div className='absolute right-[0]  top-0 p-2 h-[20px]'>
                        <p className='text-[12px] '>{sheetname}</p>
                    </div>
                    :
                    <></>
                }
                <div className='w-[50px] flex items-center'>
                    <BsDatabaseFill className='text-green-600' size={20}/>
                </div>
                <div className='h-[100%] overflow-y-auto w-[100%] flex items-center justify-start'>
                    <p className='text-[14px]  flex items-center px-5'>{sheetname}</p>
                </div>
            </div>

            
            
    </div>
  )
}

export default GoogleSheetDatabaseSheets