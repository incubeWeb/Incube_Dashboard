import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const PortfolioLineChart = ({sheetclicked, chartDatatypeX, chartDatatypeY, sheetJson, sheetfieldselectedX, sheetfieldselectedY ,selectedSheetName}) => {
    const [data, setData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // State to 

    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

    function extractValue(input) {
        const continuousDigitsPattern = /^\D*(\d+)\D*$/;
        const str = String(input);
        const match = str.match(/\d+(\.\d+)?/)?str.match(/\d+(\.\d+)?/)[0]:'0'
  
        if (match!='0') {
        
            return match
            
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
                    case 'number':
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

    useEffect(() => {
        const setValuesForData = async () => {
            const mydata=[]
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:sheetclicked,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
                const data=JSON.parse(response.data.data)
            data.map(val=>{
                mydata.push({[sheetfieldselectedX]:val[sheetfieldselectedX],[sheetfieldselectedY]:val[sheetfieldselectedY]})
            })

            

            const convertedData = convertDataTypes(mydata, fieldConversions);
            setData(convertedData);
        };
        setValuesForData();
    }, [sheetJson, sheetfieldselectedX, sheetfieldselectedY]);

   

    const fieldConversions = {
        [sheetfieldselectedX]: chartDatatypeX,   // X-axis field
        [sheetfieldselectedY]: chartDatatypeY   // Y-axis field
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
        { chartDatatypeX === 'string' && chartDatatypeY === 'number' ?   
            <div className='pl-8' style={{ paddingBottom: '30px' }}>
                <p className='text-[18px] font-bold font-inter -mt-8'>{selectedSheetName}</p>
            </div> 
            : 
            <div className='pl-8 -pt-4' style={{ paddingBottom: '30px' }}>
                <p className='text-[18px] font-bold font-inter -mt-8'>{selectedSheetName}</p>
            </div>
        }

        <div style={{ width: '100%', height: '90%' }}>
            <ResponsiveContainer width="100%" height="100%">
                {chartDatatypeX === 'string' && chartDatatypeY === 'number' ? (
                    <AreaChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                    <XAxis  type="category" dataKey={`${sheetfieldselectedX}`} tickCount={4} tick={{ fontSize: 16, fontFamily: 'Inter', fill: 'black' }}
                    />
                    <YAxis  type="number" tickCount={4} dataKey={`${sheetfieldselectedY}`}
                        tick={{ fontSize: 14, fontFamily: 'Inter', fill: 'black' }} 
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        labelStyle={{ color: '#ccc' }}
                    />
                    <Area
                        type="monotone"
                        dataKey={`${sheetfieldselectedY}`}
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
                        <XAxis type="number" dataKey={`${sheetfieldselectedX}`} />
                        <YAxis type="category" dataKey={`${sheetfieldselectedY}`} tickCount={4} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                            labelStyle={{ color: '#ccc' }}
                        />
                        <Area
                            type="monotone"
                            dataKey={`${sheetfieldselectedX}`}
                         
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
}

export default PortfolioLineChart;