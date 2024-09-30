import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const PortfolioLineChart = ({ chartDatatypeX, chartDatatypeY, sheetJson, sheetfieldselectedX, sheetfieldselectedY }) => {
    const [data, setData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // State to 
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
}

export default PortfolioLineChart;
