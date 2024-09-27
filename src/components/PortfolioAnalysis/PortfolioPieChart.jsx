import React, { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PortfolioPieChart = ({ chartDatatypeX, chartDatatypeY, sheetJson, sheetfieldselectedX, sheetfieldselectedY }) => {
    const [data, setData] = useState([]);

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
        const settingValuesofData = async () => {
            const myData = sheetJson.map(val => ({
                name: val[sheetfieldselectedX],
                value: val[sheetfieldselectedY]
            }));

            const convertedData = convertDataTypes(myData, fieldConversions);
            setData(convertedData);
        };
        settingValuesofData();
    }, [sheetJson, sheetfieldselectedX, sheetfieldselectedY]);

    const legendFormatter = (value, entry) => {
        const { name, value: val } = entry.payload;
        return `${name}: ${val}`;
    };

    const fieldConversions = {
        name: 'string',
        value: chartDatatypeY
    };

    return (
        
        <div style={{ width: '100%', height: '100%' }} className='-mt-10 pr-10'>
                    
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
            <p className='pt-8 pl-8 font-inter text-[18px] font-bold'>Pie Chart</p>  
                <div style={{ flex: 1 }}>
               
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius="85%"
                                fill="#528BFF"
                            />
                            <Tooltip />
                           
                            <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        formatter={legendFormatter}
                        wrapperStyle={{ paddingLeft: '20px', lineHeight: '60px' }}
                    />
                   
                            
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default PortfolioPieChart;
