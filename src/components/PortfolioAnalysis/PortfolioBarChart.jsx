import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const PortfolioBarChart = ({chartDatatypeX,chartDatatypeY,sheetJson,sheetfieldselectedX,sheetfieldselectedY}) => {
    const [data,setdata]=useState([])

  
    useEffect(()=>{
      const settingValuesofData=async()=>{
            const mydata=[]
            sheetJson.map(val=>{
                mydata.push({name:val[sheetfieldselectedX],uv:val[sheetfieldselectedY]})
            })
           
            const converteddata=convertDataTypes(mydata, fieldConversions);
           
            setdata(converteddata)
    }
    settingValuesofData()
    },[sheetJson,sheetfieldselectedX,sheetfieldselectedY,chartDatatypeX,chartDatatypeY])

    useEffect(()=>{
        const settingValuesofData=async()=>{
                const mydata=[]
                sheetJson.map(val=>{
                    mydata.push({name:val[sheetfieldselectedX],uv:val[sheetfieldselectedY]})
                })
             
                const converteddata=convertDataTypes(mydata, fieldConversions);
            
                setdata(converteddata)
        }
        settingValuesofData()
    },[])

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

const fieldConversions = {
    name: chartDatatypeX,  // Convert 'name' field to number
    uv: chartDatatypeY  // Convert 'value' field to string
  };

    const sampledata = [
        {
          name: 'Page A',
          uv: 4000,
          
        },
        {
          name: 'Page B',
          uv: 3000,
          
        },
        {
          name: 'Page C',
          uv: 2000,
         
        },
        {
          name: 'Page D',
          uv: 2780,
         
        },
        {
          name: 'Page E',
          uv: 1890,
        
        },
        {
          name: 'Page F',
          uv: 2390,
        
        },
        {
          name: 'Page G',
          uv: 3490,
          
        },
      ];
      const yAxisTickFormatter = (value) => value; 
  return (
    <div style={{ width: '100%', height: '100%' }} className='mt-8 pr-10 '>
        <div style={{ width: '100%', height: '100%' }}>

        {
          chartDatatypeX=='string' && chartDatatypeY=='integer'?
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" tick={true} stroke="#8884d8" />
              <YAxis dataKey='uv' tick={true}  tickCount={4}/>
            
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
              
           
              <CartesianGrid stroke="#ccc"   horizontal={true} vertical={false}  />
              <Bar dataKey="uv" fill="#2970FF" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
          :
          chartDatatypeX=='integer' && chartDatatypeY=='string'?
          <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        {/* XAxis now handles the 'uv' values (which are numerical) */}
                        <XAxis type="number" tick={true} stroke="#8884d8" />
                        {/* YAxis now handles the 'name' values (which are categorical/strings) */}
                        <YAxis dataKey="uv" type="category" tickFormatter={yAxisTickFormatter} tick={true} />
                        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                        <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                        <Bar dataKey="name" fill="#2970FF" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
          :
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" tick={true} stroke="#8884d8" />
              <YAxis dataKey='uv' tick={true}  tickCount={4}/>
            
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
              
           
              <CartesianGrid stroke="#ccc"   horizontal={true} vertical={false}  />
              <Bar dataKey="uv" fill="#2970FF" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
          }
          
        </div>
    </div>
  )
}

export default PortfolioBarChart