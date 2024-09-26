import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const PortfolioLineChart = ({ chartDatatypeX, chartDatatypeY, sheetJson, sheetfieldselectedX, sheetfieldselectedY }) => {
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

    return (
        <div style={{ width: '100%', height: '100%' }} className='mt-8 pr-10'>
            <div style={{ width: '100%', height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    {chartDatatypeX === 'string' && chartDatatypeY === 'integer' ? (
                        // Standard layout: String on X-axis, Integer on Y-axis
                        <AreaChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                            <XAxis dataKey="pv" tickCount={4}/>
                            <YAxis tickCount={4} />
                            <Tooltip />
                            <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                            <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                        </AreaChart>
                    ) : (
                        // Horizontal layout: Integer on X-axis, String on Y-axis
                        <AreaChart
                            layout="vertical"
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                             <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                            <XAxis type="number" dataKey="pv" />
                            <YAxis type="category" dataKey="uv"  tickCount={4}/>
                            <Tooltip />
                            <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                            <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PortfolioLineChart;
