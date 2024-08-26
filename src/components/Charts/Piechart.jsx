import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';

const Piechart = ({investmentchange, id, outerRadius, data01, clickedPie, setClickedPie, fromApi, setFromApi, chartDatatypeX, chartDatatypeY, chartDatatypeFromApiX, chartDatatypeFromApiY}) => {
  const [loading, setLoading] = useState(true);
  const [mydata, setmydata] = useState([]);
  const [selectedValueAxis,setselectedvalueaxis]=useState('')

  function extractValue(input) {
    const continuousDigitsPattern = /^\D*(\d+)\D*$/;
    const str = String(input);
    const match = str.match(continuousDigitsPattern);
  
    if (match && !/[a-zA-Z]+/.test(input)) {
      return parseInt(match[1], 10);
    } else {
      return 0;
    }
  }

  function convertDataTypes(array, fieldConversions) {
    return array.map(obj => {
      let newObj = { ...obj };

      Object.keys(fieldConversions).forEach(field => {
        const conversionType = fieldConversions[field];

        switch (conversionType) {
          case 'integer':
            if (field === 'value') {
              newObj[field] = extractValue(obj[field]);
            } else {
              newObj[field] = obj[field]; // Keep 'name' as it is
            }
            break;
          case 'string':
            newObj[field] = String(obj[field]);
            break;
          default:
            break;
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
    const fun = async () => {
      const Sheet_response = await axios.post('http://localhost:8999/investmentsheetfromdb');
      const dashboard_response = await axios.post('http://localhost:8999/getDashboardData', { email: localStorage.getItem('email') });
      const entireData = JSON.parse(dashboard_response.data.data.positions);
      console.log("gd", id);
      let selectedYaxis = '';
      let isSheetchart = '';
      let selectedXaxis='';

      entireData.map((m, index) => {
        if (index === id) {
          selectedYaxis = m.selectedYAxis;
          selectedXaxis = m.selectedXAxis
          isSheetchart = m.isSheetChart;
        }
      });
      setselectedvalueaxis(selectedYaxis)

      if (fromApi && !isSheetchart) {
        const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (fromApi && isSheetchart) {
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));
        
        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (isSheetchart) {
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));

        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else {
        console.log(data01);
        console.log('hi');
        const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
        setmydata(convertedData);
      }
      setLoading(false);
    };
    fun();
    console.log("-->",selectedValueAxis)
  }, []);

  useEffect(() => {
    const fun = async () => {
      const Sheet_response = await axios.post('http://localhost:8999/investmentsheetfromdb');
      const dashboard_response = await axios.post('http://localhost:8999/getDashboardData', { email: localStorage.getItem('email') });
      const entireData = JSON.parse(dashboard_response.data.data.positions);
      console.log("gd", id);
      let selectedYaxis = '';
      let isSheetchart = '';
      let selectedXaxis='';

      entireData.map((m, index) => {
        if (index === id) {
          selectedYaxis = m.selectedYAxis;
          isSheetchart = m.isSheetChart;
          selectedXaxis=m.selectedXAxis
        }
      });
      setselectedvalueaxis(selectedYaxis)
      if (fromApi && !isSheetchart) {
        const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (fromApi && isSheetchart) {
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));

        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (isSheetchart) {
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));

        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else {
        console.log(data01);
        console.log('hi');
        const convertedData = convertDataTypes(data01, fieldConversionsNormal);
        setmydata(convertedData);
      }
      setLoading(false);
    };
    fun();
  }, [investmentchange]);

  // Custom label function to display name and value
  const renderCustomLabel = ({ name, value }) => `${name}: ${value}`;

  return (
    <div style={{ width: '100%', height: '100%' }}>
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
              label={renderCustomLabel} // Use custom label function
            />
          </PieChart>
          <div className='fixed right-5 top-3 flex flex-row items-center space-x-2'>
            <div className='w-[10px] h-[10px] bg-violet-600 mt-1'></div> 
            <p className='text-[13px] text-gray-07 font-noto text-gray-700'>{selectedValueAxis}</p>
          </div>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Piechart;
