import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'; // Use different arrow icons
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';

const PortfolioPieChart = ({sheetclicked, chartDatatypeX, chartDatatypeY, sheetJson, sheetfieldselectedX, sheetfieldselectedY ,selectedSheetName}) => {
    const [data, setData] = useState([]);
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role




    const extractValue = (input) => {
        const continuousDigitsPattern = /^\D*(\d+)\D*$/;
        const str = String(input);
       

        const match = str.match(/\d+(\.\d+)?/)?str.match(/\d+(\.\d+)?/)[0]:'0'
  
        if (match!='0') {
        if(typeof(match)=='string'){
            
        return parseFloat(match)
        }else{
            return match
        }
        } else {
        return 0;
        }
        
        
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

            if (typeof newObj[[sheetfieldselectedX]] === 'string' && typeof newObj[[sheetfieldselectedY]] === 'string') {
                newObj[[sheetfieldselectedY]] = extractValue(newObj[[sheetfieldselectedY]]);
            }
            
            return newObj;
        });
    };

   

    

    useEffect(() => {
        const settingValuesofData = async () => {
            console.log(sheetclicked,"sheetclicked")
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:sheetclicked,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            const data=JSON.parse(response.data.data)
            console.log(data,sheetfieldselectedX)
            const myData = data.map(val => ({
                [sheetfieldselectedX]: val[sheetfieldselectedX],
                [sheetfieldselectedY]: val[sheetfieldselectedY]
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
        [sheetfieldselectedX]: chartDatatypeX,
        [sheetfieldselectedY]: chartDatatypeY
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
             <p className='pt-4 font-inter text-[18px] font-bold'>{selectedSheetName.replace(/^\d+-/, "")}</p>
            <div style={{ width: '100%', height: '100%', display: 'flex' }}>
               
                <div style={{ flex: 1 }} className='flex flex-row h-[90%]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey={`${sheetfieldselectedY}`}
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
                                formatter={(value,key) => {return [`${data[key][sheetfieldselectedX]} :${sheetfieldselectedY}:${value}`]}}
                                contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                labelStyle={{ color: '#ccc' }}
                            />
                        </PieChart>
                  
                    </ResponsiveContainer>
                    <div className='w-[100%] h-[100%] basis-3/12 text-[13px] flex items-center justify-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  }}>
                {isScrollable() && (
                    <button 
                    className='mt-4'
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
                        <MdKeyboardArrowUp size={24}  className=' mr-3'/>
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
                    {data.map((entry, index) => (
                        <li key={`item-${index}`} className='mt-4' style={{ color: '#8884d8', fontSize: '14px' }}>
                            {`${entry[sheetfieldselectedX]}: ${entry[sheetfieldselectedY]}`}
                        </li>
                    ))}
                </ul>
                {isScrollable() && (
                    <button 
                        className='mb-4'
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
                        <MdKeyboardArrowDown size={24} className=' mr-3' />
                    </button>
                )}
            </div>
                </div>
            </div>
        </div>
    );
}

export default PortfolioPieChart;