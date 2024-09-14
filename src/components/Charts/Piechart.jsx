import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer ,Tooltip} from 'recharts';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';

const Piechart = ({investmentchange, id, outerRadius, data01, clickedPie, setClickedPie, fromApi, setFromApi, chartDatatypeX, chartDatatypeY, chartDatatypeFromApiX, chartDatatypeFromApiY,setBoxes,boxes}) => {
  const [loading, setLoading] = useState(true);
  const [mydata, setmydata] = useState([]);
  const [selectedValueAxis,setselectedvalueaxis]=useState('');
  const [itsfromDatabase,setitsfromdatabase]=useState(false);

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

  const deleteWidgit=async()=>{
    const email=localStorage.getItem('email');
    const organization=localStorage.getItem('organization');
    const position=JSON.stringify(boxes.filter((box,index)=>index!=id));
    if(boxes.length===0) {
      await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/deletedashboard',{email:email,organization:organization});
      setBoxes([]);
    }
    else {
      const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/updatedashboard',{email:email,position:position,organization:organization});
      if(response.data.status==200) {
        setBoxes(boxes.filter((box,index)=>index!=id));
      }
    }
  };

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
              newObj[field] = obj[field]; 
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
      const dashboard_response = await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getDashboardData', { email: localStorage.getItem('email'),organization:localStorage.getItem('organization') });
      const entireData = JSON.parse(dashboard_response.data.data.positions);
      let selectedYaxis = '';
      let isSheetchart = '';
      let selectedXaxis='';
      let clickedsheetname='';
      let chartdatatypex='';
      let chartdatatypey='';
      let dbCompanyName='';

      entireData.map((m, index) => {
        if (index === id) {
          selectedYaxis = m.selectedYAxis;
          selectedXaxis = m.selectedXAxis;
          isSheetchart = m.isSheetChart;
          clickedsheetname = m.clickedsheetname;
          chartdatatypex = m.chartDatatypeX;
          chartdatatypey = m.chartDatatypeY;
          dbCompanyName = m.dbCompanyName;
        }
      });

      setselectedvalueaxis(selectedYaxis);
      const Sheet_response = await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/investmentsheetfromdb',{organization:localStorage.getItem('organization'),CompanyName:dbCompanyName});
      if (fromApi && !isSheetchart) {
        const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (fromApi && isSheetchart && clickedsheetname.length > 0) {
        setitsfromdatabase(true);
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));
        
        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (isSheetchart && clickedsheetname.length > 0) {
        setitsfromdatabase(true);
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));

        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (isSheetchart && clickedsheetname.length <= 0) {
        const convertedData = convertDataTypes(data01[0], {name:chartdatatypex,value:chartdatatypey});
        setmydata(convertedData);
      } else {
        const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
        setmydata(convertedData);
      }
      setLoading(false);
    };
    fun();
  }, []);

  useEffect(() => {
    const fun = async () => {
      const dashboard_response = await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getDashboardData', { email: localStorage.getItem('email') ,organization:localStorage.getItem('organization')});
      const entireData = JSON.parse(dashboard_response.data.data.positions);
      let selectedYaxis = '';
      let isSheetchart = '';
      let selectedXaxis='';
      let clickedsheetname='';
      let chartdatatypex='';
      let chartdatatypey='';
      let dbCompanyName='';

      entireData.map((m, index) => {
        if (index === id) {
          selectedYaxis = m.selectedYAxis;
          isSheetchart = m.isSheetChart;
          selectedXaxis = m.selectedXAxis;
          clickedsheetname = m.clickedsheetname;
          chartdatatypex = m.chartDatatypeX;
          chartdatatypey = m.chartDatatypeY;
          dbCompanyName = m.dbCompanyName;
        }
      });

      setselectedvalueaxis(selectedYaxis);
      const Sheet_response = await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/investmentsheetfromdb',{organization:localStorage.getItem('organization'),CompanyName:dbCompanyName});
      if (fromApi && !isSheetchart) {
        const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (fromApi && isSheetchart && clickedsheetname.length > 0) {
        setitsfromdatabase(true);
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));

        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (isSheetchart && clickedsheetname.length > 0) {
        setitsfromdatabase(true);
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));

        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      } else if (isSheetchart && clickedsheetname.length <= 0) {
        const convertedData = convertDataTypes(data01[0], {name:chartdatatypex,value:chartdatatypey});
        setmydata(convertedData);
      } else {
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
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}  />
                <stop offset="50%" stopColor="#007AFF"   stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={mydata}
              cx="50%"
              cy="50%"
              outerRadius={outerRadius}
              fill="url(#blueGradient)" // Apply the gradient
              label={renderCustomLabel} // Use custom label function
            />
            <Tooltip />
       
          </PieChart>
          {/* <div className='fixed right-5 top-3 flex flex-row items-center space-x-2'>
            <div className='w-[10px] h-[10px] bg-violet-600 mt-3'></div> 
            <p className='text-[13px] text-gray-07 font-noto text-gray-700'>{selectedValueAxis}</p>
          </div> */}
          {itsfromDatabase ? (
            <div className='flex flex-row space-x-2 fixed left-5 top-3 items-center'>
              <div className='w-[10px] h-[10px] bg-green-600 rounded-[50%] mt-[2px]'></div> 
              <p className='text-[13px] text-gray-07 font-noto text-gray-700'>Database</p>
            </div>
          ) : null}
          <div className='z-[10] cursor-pointer flex pl-[1px] items-center justify-center w-[20px] rounded-xl h-[20px] bg-gray-100 mt-3 mr-3 fixed right-[-10px] top-[-15px]' onClick={deleteWidgit}>
            <RxCross2 size={14} className='text-black z-[10]' onClick={deleteWidgit}/>
          </div>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Piechart;
