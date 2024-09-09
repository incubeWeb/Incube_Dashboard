import React, { useEffect, useRef, useState } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import { BsFileEarmarkExcelFill } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import axios from 'axios';
import HyperFormula from 'hyperformula';

const Createsheet = ({ createSheet, setcreateSheet, hidenavbar }) => {
  const hotRef = useRef(null);
  const [saveFilename, setsavefileName] = useState('');
  const [data, setData] = useState(Array.from({ length: 5 }, () => Array(5).fill(''))); // Initialize data state

  const handleFilename = (e) => {
    setsavefileName(e.target.value);
  };

  // Function to check if the last column or row is filled and add a new column or row
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
    }
  };

  const handleGetUpdatedJson = async () => {
    const hotInstance = hotRef.current.hotInstance;
    const data = hotInstance.getData();

    // Extract headers (first row)
    const headers = data[0];

    // Filter out empty rows and build JSON
    const filteredData = data
      .slice(1) // Skip the header row
      .filter(row => row.some(cell => cell !== null && cell !== undefined && cell !== '')) // Exclude completely empty rows
      .map(row => {
        return headers.reduce((acc, header, colIndex) => {
          if (header && row[colIndex] !== null && row[colIndex] !== undefined && row[colIndex] !== '') { // Only include non-empty columns
            acc[header] = row[colIndex];
          }
          return acc;
        }, {});
      });

    let fileName = '';
    // Display the filtered JSON data
    if (saveFilename === '') {
      fileName = `${Date.now()}_Untitled.xlsx`;
    } else {
      fileName = `${Date.now()}_${saveFilename}.xlsx`;
    }
    //alert(JSON.stringify(filteredData, null, 2)); // Display JSON data of the filled rows only
    const response = await axios.post('http://localhost:8999/convert-to-sheet', {
      jsonData: JSON.stringify(filteredData, null, 2),
      organization: localStorage.getItem('organization'),
      uploadedBy: localStorage.getItem('email'),
      fileName: fileName
    });
    if (response.data.status === 200) {
      alert("sheet created successfully");
      setcreateSheet(!createSheet);
    } else {
      alert("unable to create sheet");
    }
  };

  const hyperFormulaInstance = HyperFormula.buildEmpty();
  const [colwidth, setcolwidth] = useState('220%');

  useEffect(() => {
    if (!hidenavbar) {
      setcolwidth('220%');
    } else {
      setcolwidth('280%');
    }
  }, [hidenavbar]);

  return (
    <div className={`${hidenavbar ? 'ml-[3%] w-[98%]' : 'ml-[20%] w-[80%]'} pl-[2%] pr-[5%] h-screen`}>
      <div className='bg-green-600 mr-2 pl-2 rounded-t-md w-[100%] h-[50px] items-center flex flex-row space-x-4'>
        <div className='flex w-[50%] flex-row space-x-2 items-center'>
          <BsFileEarmarkExcelFill size={20} className='text-green-300' />
          <input onChange={handleFilename} type='text' className='w-[200px] outline-none bg-green-600 h-[25px] text-white placeholder:text-white text-[14px] font-roboto' placeholder='Untitled' />
        </div>
        <div className='w-[50%] text-white h-[100%] space-x-2 items-center justify-end flex pr-4'>
          <TiTick size={20} onClick={handleGetUpdatedJson} className='cursor-pointer hover:h-[24px] w-[24px]' />
          <div className='w-[40px] h-[100%] flex items-center pt-[2px]'>
            <ImCross size={11} onClick={() => setcreateSheet(!createSheet)} className='cursor-pointer hover:h-[14px] w-[14px]' />
          </div>
        </div>
      </div>
      {/* Handsontable component */}
      <HotTable
        ref={hotRef}              // Reference to access the table instance
        data={data}               // Use data state
        colHeaders={true}         // Enable column headers (A, B, C, ...)
        rowHeaders={true}         // Enable row headers (1, 2, 3, ...)
        height="auto"             // Auto height for the table
        width="100%"              // Full width
        licenseKey="non-commercial-and-evaluation" // Free license key
        formulas={{ engine: hyperFormulaInstance }}
        // Additional settings to allow adding rows and columns dynamically
        minSpareRows={1}          // Always have one spare row for new data entry
        minSpareCols={1}          // Always have one spare column for new data entry
        manualRowMove={true}      // Allow users to move rows manually
        manualColumnResize={true} // Allow users to resize columns
        contextMenu={true}        // Enable right-click context menu
        afterChange={handleAfterChange} // Custom function to handle changes
        colWidths={colwidth}
        // Ensure navigation and keyboard shortcuts are enabled
        enterMoves={{ row: 0, col: 1 }} // Pressing enter moves to the right cell
        tabMoves={{ row: 0, col: 1 }}   // Pressing tab moves to the right cell
      />
    </div>
  );
};

export default Createsheet;
