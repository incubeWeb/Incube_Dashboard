<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const PortfolioLineChart = ({chartDatatypeX,chartDatatypeY,sheetJson,sheetfieldselectedX,sheetfieldselectedY}) => {
    const [data,setdata]=useState([])

    useEffect(()=>{
      const settingValuesofData=async()=>{
              const mydata=[]
              sheetJson.map(val=>{
                  mydata.push({pv:val[sheetfieldselectedX],uv:val[sheetfieldselectedY]})
              })
              console.log("final my data",mydata)
              const converteddata=convertDataTypes(mydata, fieldConversions);
              console.log("converteddata",converteddata)
              setdata(converteddata)
      }
      settingValuesofData()
  },[sheetJson])

    useEffect(()=>{
        const settingValuesofData=async()=>{
                const mydata=[]
                sheetJson.map(val=>{
                    mydata.push({pv:val[sheetfieldselectedX],uv:val[sheetfieldselectedY]})
                })
                console.log("final my data",mydata)
                const converteddata=convertDataTypes(mydata, fieldConversions);
                console.log("converteddata",converteddata)
                setdata(converteddata)
        }
        settingValuesofData()
    },[])
=======
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';

const PortfolioLineChart = ({ chartDatatypeX, chartDatatypeY, sheetJson, sheetfieldselectedX, sheetfieldselectedY }) => {
    const [data, setData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // State to track the hovered data point
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
        return newObj;
    });
=======
    useEffect(() => {
        const setValuesForData = async () => {
            const myData = sheetJson.map(val => ({
                pv: val[sheetfieldselectedX],
                uv: val[sheetfieldselectedY]
            }));

            const convertedData = convertDataTypes(myData, fieldConversions);
            setData(convertedData);
        };
        setValuesForData();
    }, [sheetJson, sheetfieldselectedX, sheetfieldselectedY]);

    const fieldConversions = {
        pv: chartDatatypeX === 'integer' ? 'integer' : 'string',  // X-axis field
        uv: chartDatatypeY === 'integer' ? 'integer' : 'string'   // Y-axis field
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);  // Set the hovered point
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);  // Reset the hovered point when the mouse leaves
    };

    const areaColor = (index) => {
        return index === hoveredIndex ? '#FF8042' : '#82ca9d';  // Change color on hover
    };

    return (
        <div style={{ width: '95%', height: '90%' }} className='mt-8 pr-10'>
            { chartDatatypeX === 'string' && chartDatatypeY === 'integer' ?   
                <div className='pl-8' style={{ paddingBottom: '30px' }}>
                    <p className='text-[18px] font-bold font-inter -mt-8'>Vertical Line Chart</p>
                </div> 
                : 
                <div className='pl-8 -pt-4' style={{ paddingBottom: '30px' }}>
                    <p className='text-[18px] font-bold font-inter -mt-8'>Horizontal Line Chart</p>
                </div>
            }

            <div style={{ width: '100%', height: '90%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    {chartDatatypeX === 'string' && chartDatatypeY === 'integer' ? (
                        <AreaChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                            <XAxis dataKey="pv" tickCount={4}
                                tick={{ fontSize: 16, fontFamily: 'Inter', fill: '#8884d8' }}
                            />
                            <YAxis tickCount={4}
                                tick={{ fontSize: 14, fontFamily: 'Inter', fill: '#8884d8' }} 
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                labelStyle={{ color: '#ccc' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="uv"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.3}
                                activeDot={{ r: 8 }}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={areaColor(index)}
                                        onMouseEnter={() => handleMouseEnter(index)}  // Set hovered data point on mouse enter
                                        onMouseLeave={handleMouseLeave}  // Reset hover on mouse leave
                                    />
                                ))}
                            </Area>
                        </AreaChart>
                    ) : (
                        <AreaChart
                            layout="vertical"
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                            <XAxis type="number" dataKey="pv" />
                            <YAxis type="category" dataKey="uv" tickCount={4} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                labelStyle={{ color: '#ccc' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="uv"
                                stroke="#82ca9d"
                                fill="#82ca9d"
                                fillOpacity={0.3}
                                activeDot={{ r: 8 }}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={areaColor(index)}
                                        onMouseEnter={() => handleMouseEnter(index)}  // Set hovered data point on mouse enter
                                        onMouseLeave={handleMouseLeave}  // Reset hover on mouse leave
                                    />
                                ))}
                            </Area>
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
>>>>>>> Stashed changes
}

const fieldConversions = {
    pv: chartDatatypeX,  // Convert 'name' field to number
    uv: chartDatatypeY  // Convert 'value' field to string
  };

    const sampledata = [
        {
          pv: 'Page A',
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
      
  return (
    <div style={{ width: '100%', height: '100%' }} className='mt-8 pr-10 '>
        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart
                width={500}
                height={300}
                data={data}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="pv" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
    </div>
  )
}

export default PortfolioLineChart