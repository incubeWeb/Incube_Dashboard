import React, { useEffect, useRef, useState } from 'react';
import { VscArrowDown, VscArrowUp } from 'react-icons/vsc';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';

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
        name: chartDatatypeX,
        value: chartDatatypeY
    };

    const [activeIndex, setActiveIndex] = useState(null); // Track the clicked segment
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hovered segment
    const [scrollPosition, setScrollPosition] = useState(0); // Track the scroll position
    const legendRef = useRef(null); // Ref to track the legend container


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
    const BASE_BLUE = '#528BFF';
    const GRADIENT_BLUE = ['#528BFF', '#85AFFF', '#A1C2FF', '#C3D6FF']; // Gradient shades


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
}

export default PortfolioPieChart;
