import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';

const Piechart = ({investmentchange,id,outerRadius, data01,clickedPie,setClickedPie, fromApi, setFromApi ,chartDatatypeX,chartDatatypeY, chartDatatypeFromApiX, chartDatatypeFromApiY}) => {
  const [loading, setLoading] = useState(true);
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
                    newObj[field] = extractValue(obj[field]);
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
  value: chartDatatypeY  // Convert 'value' field to string
};
const fieldConversionsApi={
  name:chartDatatypeFromApiX,
  value:chartDatatypeFromApiY
}

  useEffect(() => {
      const fun=async()=>{
        const Sheet_response=await axios.post('http://localhost:8999/investmentsheetfromdb')
        const dashboard_response=await axios.post('http://localhost:8999/getDashboardData',{email:localStorage.getItem('email')})
        const entireData=JSON.parse(dashboard_response.data.data.positions)
        console.log("gd",id)
        let selectedYaxis=''
        
        let isSheetchart=''
        entireData.map((m,index)=>{
          if(index==id)
          {selectedYaxis=m.selectedYAxis
            isSheetchart=m.isSheetChart
          }
        })

        if(fromApi&&!isSheetchart)
          {
            const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
            setmydata(convertedData)
            setFromApi(false)
          }
        else if(fromApi&&isSheetchart)
        {
         let dt=JSON.parse(Sheet_response.data.data) 
         let filteredDt=[]
         dt.map(d=>
          filteredDt.push({name:d.Company,value:d[selectedYaxis]})
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
            filteredDt.push({name:d.Company,value:d[selectedYaxis]})
           )
          
            const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
           
              setmydata(convertedData)
              setFromApi(false)
          }
          else
          {
            console.log(data01)
            console.log('hi')
            const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
          
            setmydata(convertedData)
          }
          setLoading(false);
      }
      fun()
  }, []);

  useEffect(() => {
    const fun=async()=>{
      const Sheet_response=await axios.post('http://localhost:8999/investmentsheetfromdb')
      const dashboard_response=await axios.post('http://localhost:8999/getDashboardData',{email:localStorage.getItem('email')})
      const entireData=JSON.parse(dashboard_response.data.data.positions)
      console.log("gd",id)
      let selectedYaxis=''
      
      let isSheetchart=''
      entireData.map((m,index)=>{
        if(index==id)
        {selectedYaxis=m.selectedYAxis
          isSheetchart=m.isSheetChart
        }
      })

      if(fromApi&&!isSheetchart)
        {
          const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
          setmydata(convertedData)
          setFromApi(false)
        }
      else if(fromApi&&isSheetchart)
      {
       let dt=JSON.parse(Sheet_response.data.data) 
       let filteredDt=[]
       dt.map(d=>
        filteredDt.push({name:d.Company,value:d[selectedYaxis]})
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
          filteredDt.push({name:d.Company,value:d[selectedYaxis]})
         )
        
          const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
         
            setmydata(convertedData)
            setFromApi(false)
        }
        else
        {
          console.log(data01)
          console.log('hi')
          const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
        
          setmydata(convertedData)
        }
        setLoading(false);
    }
    fun()
}, [investmentchange]);

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
              label
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Piechart;
