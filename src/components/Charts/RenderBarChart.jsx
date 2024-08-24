import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Bars } from 'react-loader-spinner'; // Correct import for the loader component
import axios from 'axios';


const RenderBarChart = ({investmentchange,id,data01,clickedBar,setClickedBar,fromApi,setFromApi,chartDatatypeX,chartDatatypeY,chartDatatypeFromApiX, chartDatatypeFromApiY}) => {

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
  name: chartDatatypeX,  // Convert 'name' field to number
  uv: chartDatatypeY  // Convert 'value' field to string
};
const fieldConversionsApi={
  name:chartDatatypeFromApiX,
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
        console.log("id",id)
        entireData.map((m,index)=>{
          if(index==id)
          {
            selectedYaxis=m.selectedYAxis
            selectedXaxis=m.selectedXAxis
            isSheetchart=m.isSheetChart
          }
          }
        )
        console.log(isSheetchart)
       
      if(fromApi&&!isSheetchart)
        { 
          console.log("chartdatatye",chartDatatypeFromApiX,chartDatatypeFromApiY)
            const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
            console.log("data01",convertedData)
            
            setmydata(convertedData)
            setFromApi(false)
    
        }
        else if(fromApi&&isSheetchart)
          {
           let dt=JSON.parse(Sheet_response.data.data) 
           let filteredDt=[]
           dt.map(d=>
            filteredDt.push({name:d[selectedXaxis],value:d[selectedYaxis]})
           )
          
            const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
           
              setmydata(convertedData)
              setFromApi(false)
          }
        if(isSheetchart)
          {
            let dt=JSON.parse(Sheet_response.data.data) 
           let filteredDt=[]
           dt.map(d=>
            filteredDt.push({name:d[selectedXaxis],uv:d[selectedYaxis]})
           )
          console.log(filteredDt)
            const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
           
              setmydata(convertedData)
              setFromApi(false)
          }
        else{
          console.log("barhi",data01)
          const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
            console.log("data01N",convertedData)
            console.log('daat tyep',chartDatatypeX,chartDatatypeY)
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
      console.log("id",id)
      entireData.map((m,index)=>{
        if(index==id)
        {
          selectedYaxis=m.selectedYAxis
          selectedXaxis=m.selectedXAxis
          isSheetchart=m.isSheetChart
        }
        }
      )
      console.log(isSheetchart)
     
    if(fromApi&&!isSheetchart)
      { 
        console.log("chartdatatye",chartDatatypeFromApiX,chartDatatypeFromApiY)
          const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
          console.log("data01",convertedData)
          
          setmydata(convertedData)
          setFromApi(false)
  
      }
      else if(fromApi&&isSheetchart)
        {
         let dt=JSON.parse(Sheet_response.data.data) 
         let filteredDt=[]
         dt.map(d=>
          filteredDt.push({name:d[selectedXaxis],value:d[selectedYaxis]})
         )
        
          const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
         
            setmydata(convertedData)
            setFromApi(false)
        }
      if(isSheetchart)
        {
          let dt=JSON.parse(Sheet_response.data.data) 
         let filteredDt=[]
         dt.map(d=>
          filteredDt.push({name:d[selectedXaxis],uv:d[selectedYaxis]})
         )
        console.log(filteredDt)
          const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
         
            setmydata(convertedData)
            setFromApi(false)
        }
      else{
        console.log("barhi",data01)
        const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
          console.log("data01N",convertedData)
          console.log('daat tyep',chartDatatypeX,chartDatatypeY)
          setmydata(convertedData)
      }
  }
  fun()
  
}, [investmentchange]);

  return (
    <div style={{ width: '100%', height: '100%' }} className='mt-8 pr-10'>
      
        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mydata}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
              <Legend
                width={100}
                wrapperStyle={{
                  top: 40,
                  right: 20,
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #d5d5d5',
                  borderRadius: 3,
                  lineHeight: '40px',
                }}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      
    </div>
  );
};

export default RenderBarChart;
