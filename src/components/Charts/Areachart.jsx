import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Areachart = ({investmentchange,id,data01,clickedArea,setClickedArea,fromApi,setFromApi,chartDatatypeX,chartDatatypeY,chartDatatypeFromApiX, chartDatatypeFromApiY}) => {
  const [mydata,setmydata]=useState([])

  function extractValue(input) {
    // Regex to match a string with continuous digits
    const continuousDigitsPattern = /^\D*(\d+)\D*$/;
    const str=String(input)
    const match = str.match(continuousDigitsPattern);
  
    if (match && !/[a-zA-Z]+/.test(input)) {
        // If input matches the pattern and does not contain interspersed letters, return the captured group
        return parseInt(match[1], 10);
    } else {
        // If input does not match the pattern or contains interspersed letters, return 0
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
                    newObj[field] = extractValue(obj[field]);
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
  pv: chartDatatypeX,  // Convert 'name' field to number
  uv: chartDatatypeY  // Convert 'value' field to string
};
const fieldConversionsApi={
  pv:chartDatatypeFromApiX,
  uv:chartDatatypeFromApiY
}


  useEffect(() => {
    const fun=async()=>{
      const Sheet_response=await axios.post('http://localhost:8999/investmentsheetfromdb')
        const dashboard_response=await axios.post('http://localhost:8999/getDashboardData',{email:localStorage.getItem('email')})
        const entireData=JSON.parse(dashboard_response.data.data.positions)
        let selectedYaxis=''
        let selectedXaxis=''
        let isSheetchart=''
        let clickedsheetname=''
        let chartdatatypex=''
        let chartdatatypey=''
        entireData.map((m,index)=>
        {
          if(index==id)
          {
            selectedYaxis=m.selectedYAxis
            selectedXaxis=m.selectedXAxis
            isSheetchart=m.isSheetChart
            clickedsheetname=m.clickedsheetname
            chartdatatypex=m.chartDatatypeX
            chartdatatypey=m.chartDatatypeY
          }
        }
        )
        
    if(fromApi&&!isSheetchart)
    { 
      console.log("chartdatatye",chartDatatypeFromApiX,chartDatatypeFromApiY)
        const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
        console.log("data01",convertedData)
        
        console.log('daat tyep',chartDatatypeX,chartDatatypeY)
        setmydata(convertedData)
        setFromApi(false)

    }
    else if(fromApi&&isSheetchart&&clickedsheetname=='Database Companies')
      {
       let dt=JSON.parse(Sheet_response.data.data) 
       let filteredDt=[]
       dt.map(d=>
        filteredDt.push({pv:d[selectedXaxis],uv:d[selectedYaxis]})
       )
      
        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
       
          setmydata(convertedData)
          setFromApi(false)
      }
      else if(isSheetchart&&clickedsheetname!='Database Companies')
        {
          const convertedData = convertDataTypes(data01[0], {pv:chartdatatypex,uv:chartdatatypey});
          console.log(convertedData)
          setmydata(convertedData);
        }
        else
        {
          const convertedData = convertDataTypes(data01, fieldConversionsNormal);
        
          setmydata(convertedData)
        }
    }
    fun()
}, []);

useEffect(() => {
  const fun=async()=>{
    const Sheet_response=await axios.post('http://localhost:8999/investmentsheetfromdb')
      const dashboard_response=await axios.post('http://localhost:8999/getDashboardData',{email:localStorage.getItem('email')})
      const entireData=JSON.parse(dashboard_response.data.data.positions)
      let selectedYaxis=''
      let selectedXaxis=''
      let isSheetchart=''
      let clickedsheetname=''
        let chartdatatypex=''
        let chartdatatypey=''
      entireData.map((m,index)=>
      {
        if(index==id)
        {
          selectedYaxis=m.selectedYAxis
          selectedXaxis=m.selectedXAxis
          isSheetchart=m.isSheetChart
          clickedsheetname=m.clickedsheetname
            chartdatatypex=m.chartDatatypeX
            chartdatatypey=m.chartDatatypeY
        }
      }
      )
      
  if(fromApi&&!isSheetchart)
  { 
    console.log("chartdatatye",chartDatatypeFromApiX,chartDatatypeFromApiY)
      const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
      console.log("data01",convertedData)
      
      console.log('daat tyep',chartDatatypeX,chartDatatypeY)
      setmydata(convertedData)
      setFromApi(false)

  }
  else if(fromApi&&isSheetchart&&clickedsheetname=='Database Companies')
    {
     let dt=JSON.parse(Sheet_response.data.data) 
     let filteredDt=[]
     dt.map(d=>
      filteredDt.push({pv:d[selectedXaxis],uv:d[selectedYaxis]})
     )
    
      const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
     
        setmydata(convertedData)
        setFromApi(false)
    }
    else if(isSheetchart&&clickedsheetname!='Database Companies')
    {
      const convertedData = convertDataTypes(data01[0], {pv:chartdatatypex,uv:chartdatatypey});
      console.log(convertedData)
      setmydata(convertedData);
    }
    else
    {
      const convertedData = convertDataTypes(data01, fieldConversionsNormal);
      setmydata(convertedData)
    }
  }
  fun()
}, [investmentchange]);


  return (
    <div className='w-[100%] h-[100%] mt-3 pr-14'>
      <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={300}
        data={mydata}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tick={false} />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}

export default Areachart;
