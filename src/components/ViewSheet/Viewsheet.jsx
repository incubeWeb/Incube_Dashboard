import React, { useRef, useEffect, useState } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import axios from 'axios';
import { IoMdArrowBack } from 'react-icons/io';
import { BsFileEarmarkExcelFill } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import { ImCross } from 'react-icons/im';
import { HyperFormula } from 'hyperformula';
const Viewsheet = ({viewdDoc, jsonData,id,setclickedview,clickedview}) => {
  const hotRef = useRef(null);
  const [hotInstance, setHotInstance] = useState(null);
  
  useEffect(() => {
    // Initialize Handsontable
    const parentWidth = hotRef.current ? hotRef.current.clientWidth-50 : 400; // Default to 800px if not available
    const numberOfColumns = Object.keys(jsonData[0] || {}).length;
    const columnWidth = parentWidth / numberOfColumns;
   /* const hyperformulaInstance = HyperFormula.buildEmpty({
      licenseKey: 'agpl-v3', // Make sure to use the appropriate license for your use case
    });
    */

    const hot = new Handsontable(hotRef.current, {
      data: jsonData,
      rowHeaders: true,
      colHeaders: Object.keys(jsonData[0] || {}),
      contextMenu: true,
      formulas: {
        engine: HyperFormula,
      },
      licenseKey: 'non-commercial-and-evaluation', // This license key is required for non-commercial use
      manualColumnResize: true,
      colWidths: columnWidth,
      rowHeights:10,
      height:'auto',
      //minSpareRows: 5, // Add 5 empty rows at the bottom
      className:'font-roboto text-[14px]',
      
      
    });

    setHotInstance(hot);

    return () => {
      if (hot) {
        hot.destroy();
      }
    };
  }, [jsonData]);

  const handleGetUpdatedJson = async () => {
    if (hotInstance) {
      const updatedData = hotInstance.getData(); // Retrieve the data from the spreadsheet
      const headers = hotInstance.getColHeader(); // Get the column headers

      // Filter out the empty rows and cells with no headers, create the updated JSON
      const updatedJson = updatedData
        .filter(row => row.some((cell, index) => headers[index] && cell !== null && cell !== '')) // Include rows that have at least one non-empty cell with a valid header
        .map(row =>
          headers.reduce((obj, header, colIndex) => {
            if (header) { // Only include cells with a valid header
              obj[header] = row[colIndex] || ''; // Assign empty string if cell is empty
            }
            return obj;
          }, {})
        );

      //console.log('Updated JSON:', updatedJson);
      await axios.post('http://localhost:8999/updateSheetFromJson',{
        id:id, updatedJson:updatedJson
      })
      //alert(JSON.stringify(updatedJson, null, 2)); // Display the updated JSON in an alert
      setclickedview(!clickedview)
    }
  };

  return (
    <div className=' ml-[25%] w-[80%] h-[100%] pr-[10%] font-roboto flex flex-col space-y-0 '>
      <div className='bg-green-600 mr-2 pl-2 rounded-t-md w-[100%] h-[50px] items-center  flex flex-row space-x-4'>
        <div className='flex w-[50%] flex-row space-x-2 items-center'>
          <BsFileEarmarkExcelFill size={20}  className='text-green-300'/>
          <p className='text-white text-[16px]'>{viewdDoc}.xlsx</p>
        </div>
        <div className='w-[50%] text-white h-[100%] space-x-2 items-center justify-end flex pr-4'>
            <TiTick size={20} onClick={handleGetUpdatedJson} className='cursor-pointer hover:h-[24px] w-[24px]'/>
            <div className='w-[40px] h-[100%] flex items-center pt-[2px]'>
            <ImCross size={11} onClick={()=>setclickedview(!clickedview)} className='cursor-pointer hover:h-[14px] w-[14px]' />
            </div>
          
        </div>
        
      </div>
      <div ref={hotRef} className=' overflow-y-auto overflow-x-hidden w-[100%] h-[400px]' />
      
    </div>
  );
};

export default Viewsheet;
