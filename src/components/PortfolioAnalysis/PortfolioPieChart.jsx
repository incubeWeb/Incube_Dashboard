import React, { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

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



    const fieldConversions = {
        name: 'string',
        value: chartDatatypeY
    };

    const renderCustomLabel = ({ name, value }) => `${name}: ${value}`;

    return (
        <div style={{ width: '100%', height: '100%' }} className='mt-8 pr-10'>
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
                             
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PortfolioPieChart;
