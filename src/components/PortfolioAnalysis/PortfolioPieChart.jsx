import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const PortfolioPieChart = ({chartDatatypeX,chartDatatypeY,sheetJson,sheetfieldselectedX,sheetfieldselectedY}) => {
    const [data,setdata]=useState([])

    useEffect(()=>{
        const settingValuesofData=async()=>{
                const mydata=[]
                sheetJson.map(val=>{
                    mydata.push({name:val[sheetfieldselectedX],value:val[sheetfieldselectedY]})
                })
                console.log("final my data",mydata)
                const converteddata=convertDataTypes(mydata, fieldConversions);
                console.log("converteddata",converteddata)
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
    name: chartDatatypeX,
    value: chartDatatypeY
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
      const renderCustomLabel = ({ name, value }) => `${name}: ${value}`;
  return (
    <div style={{ width: '100%', height: '100%' }} className='mt-8 pr-10 '>
        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius="85%"
                fill="#8884d8"
                label={renderCustomLabel} // Use custom label function
                />
            </PieChart>
          </ResponsiveContainer>
        </div>
    </div>
  )
}

export default PortfolioPieChart