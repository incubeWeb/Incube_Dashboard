import React, { useState } from 'react'

const PublicPopup = ({showconfirmpublicpopupid,handlepublicfun,setshowConfirmPublicPopup}) => {
  

  const handleClose = () => {
    setshowConfirmPublicPopup(false);
  };
  const handleYes=()=>{
    handlepublicfun(showconfirmpublicpopupid)
    setshowConfirmPublicPopup(false)
  }

  return (
    <>
     
        <div className="fixed inset-0 flex items-center justify-center top-[-20px] bg-black bg-opacity-50 backdrop-blur-sm z-[50]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[380px] h-[230px] flex items-center justify-center flex-col">
            <h2 className="text-[16px] font-semibold mb-4 font-inter">Do you want to make this file Public ?</h2>
         
            <div className="flex justify-center text-[14px]">
              <button
                onClick={handleYes}
                className="text-black font-bold font-inter px-4 py-2 rounded hover:bg-gray-200 focus:outline-none"
              >
              Yes</button>

              <button
                onClick={handleClose}
                className="text-black font-bold font-inter px-4 py-2 rounded hover:bg-gray-200 focus:outline-none"
              >
              No</button>
              
            </div>
          </div>
        </div>
     
    </>
  );
}

export default PublicPopup