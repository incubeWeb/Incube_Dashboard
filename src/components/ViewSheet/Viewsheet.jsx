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
import { jwtDecode } from 'jwt-decode';

const Viewsheet = ({ viewdDoc, jsonData, id, setclickedview, clickedview, hidenavbar }) => {
  const hotRef = useRef(null);
  const [hotInstance, setHotInstance] = useState(null);
  const initialData = [Object.keys(jsonData[0] || {}), ...jsonData.map((row) => Object.values(row))];
  const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
  const handleAfterChange = (changes, source) => {
    if (source === 'edit') {
      const hotInstance = hotRef.current.hotInstance;
      const data = hotInstance.getData(); // Get current table data

      // Determine the last row and column indices
      const lastRowIndex = data.length - 1;
      const lastColumnIndex = data[0].length - 1;

      // Check if any cell in the last row is filled
      const isLastRowFilled = data[lastRowIndex].some((cell) => cell !== '');
      
      // Check if any cell in the last column is filled
      const isLastColumnFilled = data.some((row) => row[lastColumnIndex] !== '');

      if (isLastRowFilled) {
        // Add a new empty row
        hotInstance.alter('insert_row', lastRowIndex + 1);
      }

      if (isLastColumnFilled) {
        // Add a new empty column
        hotInstance.alter('insert_col', lastColumnIndex + 1);
      }

      // Automatically update JSON data
      updateJsonData();
    }
  };

  const updateJsonData = () => {
  if (hotInstance) {
    const updatedData = hotInstance.getData(); // Retrieve the data from the spreadsheet
    const headers = updatedData[0]; // Get the column headers
    
    // Determine which columns are entirely empty
    const emptyColumns = headers.reduce((emptyCols, header, colIndex) => {
      const isColumnEmpty = updatedData.every(row => !row[colIndex] || row[colIndex] === '');
      if (isColumnEmpty) {
        emptyCols.push(header);
      }
      return emptyCols;
    }, []);

    // Filter out the empty rows and cells with no headers, create the updated JSON
    const updatedJson = updatedData.slice(1)
      .filter(row => row.some((cell, index) => headers[index] && cell !== null && cell !== '')) // Include rows that have at least one non-empty cell with a valid header
      .map(row =>
        headers.reduce((obj, header, colIndex) => {
          if (header && !emptyColumns.includes(header)) { // Only include cells with a valid header and non-empty column
            obj[header] = row[colIndex] || ''; // Assign empty string if cell is empty
          }
          return obj;
        }, {})
      );

    
  }
};

  useEffect(() => {
    // Initialize Handsontable
    const parentWidth = hotRef.current ? hotRef.current.clientWidth - 50 : 400; // Default to 400px if not available
    const numberOfColumns = Object.keys(jsonData[0] || {}).length;
    const columnWidth = parentWidth / numberOfColumns;

    const hot = new Handsontable(hotRef.current, {
      data: initialData,
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true,
      formulas: {
        engine: HyperFormula,
      },
      licenseKey: 'non-commercial-and-evaluation', // This license key is required for non-commercial use
      manualColumnResize: true,
      colWidths: columnWidth,
      rowHeights: 25,
      height: 'auto',
      className: 'font-roboto text-[14px]',
      afterChange: handleAfterChange,
      minSpareRows: 1, // Ensures there's always an empty row available for input
      minSpareCols: 1, // Ensures there's always an empty column available for input
    });

    setHotInstance(hot);

    return () => {
      if (hot) {
        hot.destroy();
      }
    };
  }, [jsonData, hidenavbar]);

  const handleGetUpdatedJson = async () => {
    if (hotInstance) {
      const updatedData = hotInstance.getData(); // Retrieve the data from the spreadsheet
      const headers = updatedData[0]; // Get the column headers

      // Filter out the empty rows and cells with no headers, create the updated JSON
      const updatedJson = updatedData.slice(1)
        .filter(row => row.some((cell, index) => headers[index] && cell !== null && cell !== '')) // Include rows that have at least one non-empty cell with a valid header
        .map(row =>
          headers.reduce((obj, header, colIndex) => {
            if (header) { // Only include cells with a valid header
              obj[header] = row[colIndex] || ''; // Assign empty string if cell is empty
            }
            return obj;
          }, {})
        );

      await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updateSheetFromJson`, {
        id: id,
        updatedJson: updatedJson,
        organization: Logorganization,
        editedby:Logemail,
        task:'updating sheet',

      },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });


      setclickedview(!clickedview);
    }
  };

  return (
    <div className={`${hidenavbar ? 'ml-[3%] w-[98%]' : 'ml-[23%] w-[80%]'} h-[100%] pr-[10%] font-roboto flex flex-col space-y-0`}>
      <div className='bg-green-600 mr-2 pl-2 rounded-t-md w-[100%] h-[50px] items-center flex flex-row space-x-4'>
        <div className='flex w-[50%] flex-row space-x-2 items-center'>
          <BsFileEarmarkExcelFill size={20} className='text-green-300' />
          <p className='text-white text-[16px]'>{viewdDoc}</p>
        </div>
        <div className='w-[50%] text-white h-[100%] space-x-2 items-center justify-end flex pr-4'>
          <TiTick size={20} onClick={handleGetUpdatedJson} className='cursor-pointer hover:h-[24px] w-[24px]' />
          <div className='w-[40px] h-[100%] flex items-center pt-[2px]'>
            <ImCross size={11} onClick={() => setclickedview(!clickedview)} className='cursor-pointer hover:h-[14px] w-[14px]' />
          </div>
        </div>
      </div>
      <div ref={hotRef} className='overflow-y-auto overflow-x-hidden w-[100%] h-[400px]' />
    </div>
  );
};

export default Viewsheet;
