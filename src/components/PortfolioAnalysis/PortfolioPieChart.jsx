import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'; // Use different arrow icons
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';

const PortfolioPieChart = ({ chartDatatypeX, chartDatatypeY, sheetJson, sheetfieldselectedX, sheetfieldselectedY ,selectedSheetName}) => {
    const [data, setData] = useState([]);

    const extractValue = (input) => {
        const continuousDigitsPattern = /^\D*(\d+)\D*$/;
        const str = String(input);
        const match = str.match(continuousDigitsPattern);
        
        return str.replace(/\D/g, '').length==0?0:parseInt(str.replace(/\D/g, ''))
    };

    const convertDataTypes = (array, fieldConversions) => {
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
    };

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

    const [activeIndex, setActiveIndex] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const legendRef = useRef(null);

    const onPieClick = (_, index) => setActiveIndex(index);
    const onPieMouseEnter = (_, index) => setHoveredIndex(index);
    const onPieMouseLeave = () => setHoveredIndex(null);

    const scrollLegend = (direction) => {
        if (legendRef.current) {
            const scrollAmount = direction === 'up' ? -30 : 30;
            legendRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    };

    const isScrollable = () => {
        if (legendRef.current) {
            return legendRef.current.scrollHeight > legendRef.current.clientHeight;
        }
        return false;
    };

    const BASE_BLUE = '#0d47a1';
    const COLORS = ['#0d47a1', '#1976d2', '#42a5f5', '#90caf9', '#e3f2fd'];

    return (
        <div style={{ width: '90%', height: '90%' }} className='-mt-10 pr-10'>
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
                <p className='pt-4 font-inter text-[18px] font-bold'>{selectedSheetName}</p>
                <div style={{ flex: 1 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius="85%"
                                innerRadius="45%"
                                fill={BASE_BLUE}
                                activeIndex={activeIndex}
                                onClick={onPieClick}
                                onMouseEnter={onPieMouseEnter}
                                onMouseLeave={onPieMouseLeave}
                            >
                                {data.map((entry, index) => {
                                    const fillColor =
                                        hoveredIndex === index || activeIndex === index
                                            ? '#FF8042'
                                            : COLORS[index % COLORS.length];

                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={fillColor}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            style={{ transition: 'fill 0.2s ease-out' }}
                                        />
                                    );
                                })}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `${value}`}
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
                {isScrollable() && (
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'black',
                            fontSize: '20px',
                            marginBottom: '5px', // Space between the up arrow and the legend
                        }}
                        onClick={() => scrollLegend('up')}
                    >
                        <MdKeyboardArrowUp size={24}  className='mb-2 mr-3'/>
                    </button>
                )}
                <ul
                    ref={legendRef}
                    style={{
                        listStyleType: 'none',
                        paddingLeft: 0,
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        maxHeight: '200px',
                        overflowY: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        position: 'relative',
                        margin: '0', // Remove default margin
                        marginBottom: '10px', // Space between the legend items and the down arrow
                    }}
                    className="hide-scrollbar"
                >
                    {payload.map((entry, index) => (
                        <li key={`item-${index}`} style={{ color: '#8884d8', fontSize: '14px' }}>
                            {`${entry.value}: ${entry.payload.value}`}
                        </li>
                    ))}
                </ul>
                {isScrollable() && (
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'black',
                            fontSize: '20px',
                            marginTop: '5px', // Space above the down arrow
                        }}
                        onClick={() => scrollLegend('down')}
                    >
                        <MdKeyboardArrowDown size={24} className='mt-2 mr-3' />
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