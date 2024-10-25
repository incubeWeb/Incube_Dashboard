import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';

const PortfolioBarChart = ({ chartDatatypeX, chartDatatypeY, sheetJson, sheetfieldselectedX, sheetfieldselectedY }) => {
    const [data, setData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);  // State to track the hovered bar

<<<<<<< Updated upstream
    useEffect(()=>{
      const settingValuesofData=async()=>{
            const mydata=[]
            sheetJson.map(val=>{
                mydata.push({name:val[sheetfieldselectedX],uv:val[sheetfieldselectedY]})
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
                    mydata.push({name:val[sheetfieldselectedX],uv:val[sheetfieldselectedY]})
                })
                console.log("final my data",mydata)
                const converteddata=convertDataTypes(mydata, fieldConversions);
                console.log("converteddata",converteddata)
                setdata(converteddata)
        }
        settingValuesofData()
    },[])
=======
    useEffect(() => {
        const settingValuesofData = async () => {
            const myData = sheetJson.map(val => ({
                name: val[sheetfieldselectedX],
                uv: val[sheetfieldselectedY]
            }));

            const convertedData = convertDataTypes(myData, fieldConversions);
            setData(convertedData);
        };
        settingValuesofData();
    }, [sheetJson, sheetfieldselectedX, sheetfieldselectedY, chartDatatypeX, chartDatatypeY]);
>>>>>>> Stashed changes

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

    const fieldConversions = {
        name: chartDatatypeX,
        uv: chartDatatypeY
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);  // Set the hovered bar
    };

<<<<<<< Updated upstream
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
  return (
    <div style={{ width: '100%', height: '100%' }} className='mt-8 pr-10 '>
        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" tick={true} stroke="#8884d8" />
              <YAxis dataKey='uv' tick={true} />
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
=======
    const handleMouseLeave = () => {
        setHoveredIndex(null);  // Reset the hovered bar when the mouse leaves
    };
    const COLORS = ['#1976d2', '#42a5f5',];
    const barColor = (index) => {
        return index === hoveredIndex ? '#FF8042' : COLORS[index % COLORS.length]; // Change color on hover
    };

    return (
        <div style={{ width: '95%', height: '90%' }} className='mt-2 pr-10 ml-8 '>
            {chartDatatypeX === 'string' && chartDatatypeY === 'integer' ?
                <div className='pl-4' style={{ paddingBottom: '20px' }}>
                    <p className='text-[18px] font-bold font-inter -mt-4'>Vertical Bar Chart</p>
                </div>
                :
                <div className='pl-4 -pt-4' style={{ paddingBottom: '20px' }}>
                    <p className='text-[18px] font-bold font-inter -mt-4'>Horizontal Bar Chart</p>
                </div>
            }

            <div style={{ width: '100%', height: '90%' }}>
                {chartDatatypeX === 'string' && chartDatatypeY === 'integer' ?
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#8884d8"
                                tick={{ fontSize: 16, fontFamily: 'Inter', fill: '#8884d8' }}
                            />
                            <YAxis dataKey='uv' tickCount={4} tickMargin={-1}
                                tick={{ fontSize: 14, fontFamily: 'Inter', fill: '#8884d8' }}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                labelStyle={{ color: '#ccc' }}
                            />
                            <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                            <Bar dataKey="uv" barSize={30}>
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={barColor(index)}
                                        onMouseEnter={() => handleMouseEnter(index)}  // Set hovered bar on mouse enter
                                        onMouseLeave={handleMouseLeave}  // Reset hover on mouse leave
                                    
                                        radius={[10, 10, 0, 0]}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    :
                    chartDatatypeX === 'integer' && chartDatatypeY === 'string' ?
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis type="number" tick={true} stroke="#8884d8" />
                                <YAxis dataKey="uv" type="category" tick={true} />
                                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                                <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                                <Bar dataKey="name" barSize={30}>
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={barColor(index)}
                                            onMouseEnter={() => handleMouseEnter(index)}  // Set hovered bar on mouse enter
                                            onMouseLeave={handleMouseLeave}  // Reset hover on mouse leave
                                            radius={[0, 10, 10, 0]}

                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        :
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis dataKey="name" tick={true} stroke="#8884d8" />
                                <YAxis dataKey='uv' tick={true} tickCount={4} tickMargin={-1} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    labelStyle={{ color: '#ccc' }}
                                />
                                <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                                <Bar dataKey="uv" barSize={30}>
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={barColor(index)}
                                            onMouseEnter={() => handleMouseEnter(index)}  // Set hovered bar on mouse enter
                                            onMouseLeave={handleMouseLeave}  // Reset hover on mouse leave
                                            radius={[0, 10, 0, 0]}

                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                }
            </div>
>>>>>>> Stashed changes
        </div>
    );
};

export default PortfolioBarChart;
