<<<<<<< Updated upstream
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
  },[sheetJson])

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
=======
import React, { useEffect, useState, useRef } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { VscArrowUp } from "react-icons/vsc";
import { VscArrowDown } from "react-icons/vsc";


const PortfolioPieChart = ({ chartDatatypeX, chartDatatypeY, sheetJson, sheetfieldselectedX, sheetfieldselectedY }) => {
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null); // Track the clicked segment
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered segment
    const [scrollPosition, setScrollPosition] = useState(0); // Track the scroll position
    const legendRef = useRef(null); // Ref to track the legend container

    // Define base blue color and gradient colors
    const BASE_BLUE = '#528BFF';
    const GRADIENT_BLUE = ['#528BFF', '#85AFFF', '#A1C2FF', '#C3D6FF']; // Gradient shades
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
}
=======
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
        return `${entry.payload.name}: ${entry.payload.value}`;
    };

    const fieldConversions = {
        name: 'string',
        value: chartDatatypeY
    };

    // Handle pie segment click
    const onPieClick = (_, index) => {
        setActiveIndex(index);
    };

    // Handle hover state for each segment
    const onPieMouseEnter = (_, index) => {
        setHoveredIndex(index);
    };

    const onPieMouseLeave = () => {
        setHoveredIndex(null);
    };

    // Scroll handling for the legend
    const scrollLegend = (direction) => {
        if (legendRef.current) {
            const scrollAmount = direction === 'up' ? -30 : 30;
            legendRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            setScrollPosition(legendRef.current.scrollTop);
        }
    };

    // Check if legend content overflows
    const isScrollable = () => {
        if (legendRef.current) {
            return legendRef.current.scrollHeight > legendRef.current.clientHeight;
        }
        return false;
    };

    return (
        <div style={{ width: '90%', height: '90%' }} className='-mt-10 pr-10'>
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <p className='pt-4  font-inter text-[18px] font-bold'>Doughnut Chart</p>
                <div style={{ flex: 1 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                isAnimationActive={false}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius="85%" // Outer radius for doughnut
                                innerRadius="45%" // Inner radius for the doughnut effect
                                fill={BASE_BLUE}
                                activeIndex={activeIndex}
                                onClick={onPieClick} // Trigger effect on click
                                onMouseEnter={onPieMouseEnter} // Trigger hover effect
                                onMouseLeave={onPieMouseLeave} // Reset hover effect
                            >
                                {data.map((entry, index) => {
                                    const fillColor =
                                        hoveredIndex === index || activeIndex === index
                                            ? '#FF8042'  // Apply gradient on hover/click
                                            : '#528BFF';  // Default to base blue color

                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={fillColor}
                                            onMouseEnter={() => setHoveredIndex(index)} // Trigger hover effect on the segment
                                            onMouseLeave={() => setHoveredIndex(null)} // Reset hover effect when leaving segment
                                            style={{ transition: 'fill 0.2s ease-out' }} // Smooth color transition
                                        />
                                    );
                                })}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `${value}`} // Converts value to string for display
                                contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                labelStyle={{ color: '#ccc' }}
                            />
                            
                            <Legend
                                layout="vertical"
                                align="right"
                                verticalAlign="middle"
                                formatter={legendFormatter}
                                content={props => {
                                    const { payload } = props;
                                    return (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                                            {/* Scroll Up Arrow */}
                                            {isScrollable() && (
                                                <button
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: 'black',
                                                        fontSize: '20px',
                                                        marginBottom: '15px',
                                                        paddingRight:'10px'
                                                        
                                                    }}
                                                    onClick={() => scrollLegend('up')}
                                                >
                                                    <VscArrowUp size={24}/>

                                                </button>
                                            )}
                                            <ul
                                                ref={legendRef}
                                                style={{
                                                    listStyleType: 'none',
                                                    paddingLeft: 0,
                                                    fontFamily: 'Inter',
                                                    fontWeight: 600,
                                                    maxHeight: '150px', // Fixed height for scroll
                                                    overflowY: 'auto',
                                                    scrollbarWidth: 'none', // For Firefox
                                                    msOverflowStyle: 'none',
                                                    position: 'relative',
                                                }}
                                                className="hide-scrollbar"
                                            >
                                                {payload.map((entry, index) => (
                                                    <li key={`item-${index}`} style={{ color: '#8884d8', fontSize: '14px' }}>
                                                        {`${entry.value}: ${entry.payload.value}`}
                                                    </li>
                                                ))}
                                            </ul>
                                            {/* Scroll Down Arrow */}
                                            {isScrollable() && (
                                                <button
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: 'black',
                                                        fontSize: '20px',
                                                        marginTop: '10px',
                                                        paddingRight:'10px'
                                                        
                                                        
                                                    }}
                                                    onClick={() => scrollLegend('down')}
                                                 
                                                >
                                                    <VscArrowDown   size={24}/>

                                                </button>
                                            )}
                                        </div>
                                    );
                                }}
                                wrapperStyle={{ paddingLeft: '20px', lineHeight: '60px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
>>>>>>> Stashed changes

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