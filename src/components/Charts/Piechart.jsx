import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';

const Piechart = ({ investmentchange, id, outerRadius, data01, clickedPie, setClickedPie, fromApi, setFromApi, chartDatatypeX, chartDatatypeY, chartDatatypeFromApiX, chartDatatypeFromApiY, setBoxes, boxes }) => {
  const [loading, setLoading] = useState(true);
  const [mydata, setmydata] = useState([]);
  const [selectedValueAxis, setselectedvalueaxis] = useState('');
  const [itsfromDatabase, setitsfromdatabase] = useState(false);

 
  function extractValue(input) {
    const continuousDigitsPattern = /^\D*(\d+)\D*$/;
    const str = String(input);
    const match = str.match(continuousDigitsPattern);
    return match && !/[a-zA-Z]+/.test(input) ? parseInt(match[1], 10) : 0;
  }

  
  const deleteWidgit = async () => {
    const email = localStorage.getItem('email');
    const organization = localStorage.getItem('organization');
    const position = JSON.stringify(boxes.filter((box, index) => index !== id));
    
    if (boxes.length === 0) {
      await axios.post('http://localhost:8999/deletedashboard', { email, organization });
      setBoxes([]);
    } else {
      const response = await axios.post('http://localhost:8999/updatedashboard', { email, position, organization });
      if (response.data.status === 200) {
        setBoxes(boxes.filter((box, index) => index !== id));
      }
    }
  };

 
  function convertDataTypes(array, fieldConversions) {
    return array.map(obj => {
      let newObj = { ...obj };
      Object.keys(fieldConversions).forEach(field => {
        const conversionType = fieldConversions[field];
        if (conversionType === 'integer' && field === 'value') {
          newObj[field] = extractValue(obj[field]);
        } else {
          newObj[field] = String(obj[field]);
        }
      });
      return newObj;
    });
  }

  const fieldConversionsNormal = {
    name: chartDatatypeX,
    value: chartDatatypeY
  };

  const fieldConversionsApi = {
    name: chartDatatypeFromApiX,
    value: chartDatatypeFromApiY
  };


  useEffect(() => {
    const fetchData = async () => {
      const dashboard_response = await axios.post('http://localhost:8999/getDashboardData', { email: localStorage.getItem('email'), organization: localStorage.getItem('organization') });
      const entireData = JSON.parse(dashboard_response.data.data.positions);
      
      let selectedYaxis = '';
      let isSheetchart = '';
      let selectedXaxis = '';
      let clickedsheetname = '';
      let dbCompanyName = '';

      entireData.forEach((m, index) => {
        if (index === id) {
          selectedYaxis = m.selectedYAxis;
          selectedXaxis = m.selectedXAxis;
          isSheetchart = m.isSheetChart;
          clickedsheetname = m.clickedsheetname;
          dbCompanyName = m.dbCompanyName;
        }
      });

      setselectedvalueaxis(selectedYaxis);
      const Sheet_response = await axios.post('http://localhost:8999/investmentsheetfromdb', { organization: localStorage.getItem('organization'), CompanyName: dbCompanyName });

      if (fromApi && !isSheetchart) {
        const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (fromApi && isSheetchart && clickedsheetname.length > 0) {
        setitsfromdatabase(true);
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = dt.map(d => ({ name: d[selectedXaxis], value: d[selectedYaxis] }));
        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (isSheetchart && clickedsheetname.length > 0) {
        setitsfromdatabase(true);
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = dt.map(d => ({ name: d[selectedXaxis], value: d[selectedYaxis] }));
        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (isSheetchart && clickedsheetname.length <= 0) {
        const convertedData = convertDataTypes(data01[0], { name: chartDatatypeX, value: chartDatatypeY });
        setmydata(convertedData);
      } else {
        const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
        setmydata(convertedData);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const randomColors = mydata.map(() => generateRandomColor());

  return (
    <div style={{ width: '100%', height: '100%',marginTop:'20px',marginBottom:'10px' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Bars color="#8884d8" height={80} width={80} />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={mydata}
              cx="50%"
              cy="50%"
              outerRadius={outerRadius}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}  // Custom label
            >
              {mydata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={randomColors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <div className='fixed right-5 top-3 flex flex-row items-center space-x-2 mt-3 mb-5'>
            <div className='w-[10px] h-[10px] bg-violet-600 mt-1 ' ></div> 
            <p className='text-[13px] text-gray-700 font-noto'>{selectedValueAxis}</p>
          </div>

          {itsfromDatabase && (
            <div className='flex flex-row space-x-2 fixed left-5 top-3 items-center'>
              <div className='w-[10px] h-[10px] bg-green-600 rounded-full mt-[2px]'></div> 
              <p className='text-[13px] text-gray-700 font-noto'>Database</p>
            </div>
          )}

          <div className='z-10 cursor-pointer flex pl-[1px] items-center justify-center w-[20px] rounded-xl h-[20px] bg-gray-100 fixed right-[-10px] top-[-15px]     mt-4 mr-3' onClick={deleteWidgit}>
            <RxCross2 size={15} className='text=black' />
          </div>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Piechart;
