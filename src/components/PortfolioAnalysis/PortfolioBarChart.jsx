import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const PortfolioBarChart = ({sheetclicked,chartDatatypeX,chartDatatypeY,sheetJson,sheetfieldselectedX,sheetfieldselectedY,selectedSheetName}) => {
    const [data,setdata]=useState([])
    const [hoveredIndex, setHoveredIndex] = useState(null);  // State to 
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

    

  
    useEffect(()=>{
      const settingValuesofData=async()=>{
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
           
            const converteddata=convertDataTypes(mydata, fieldConversions);
           
            setdata(converteddata)
    }

        settingValuesofData()
    
    },[sheetJson,sheetfieldselectedX,sheetfieldselectedY])

    


    

    function extractValue(input) {
        // Regex to match a string with continuous digits
        const continuousDigitsPattern = /^\D*(\d+)\D*$/;
        const str=String(input)
        const match = str.match(/\d+(\.\d+)?/)?str.match(/\d+(\.\d+)?/)[0]:'0'
  
        if (match!='0') {
        
            return match
            
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

const fieldConversions = {
    [sheetfieldselectedX]: chartDatatypeX,  // Convert 'name' field to number
    [sheetfieldselectedY]: chartDatatypeY  // Convert 'value' field to string
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
      const yAxisTickFormatter = (value) => value; 

      const handleMouseEnter = (index) => {
        
        setHoveredIndex(index);  // Set the hovered bar
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);  // Reset the hovered bar when the mouse leaves
    };

    const barColor = (index) => {
        return index === hoveredIndex ? '#FF8042' :  COLORS[index % COLORS.length]; // Change color on hover
    };
    const COLORS = ['#0d47a1', '#42a5f5',];
  return (
    <div style={{ width: '95%', height: '90%' }} className='mt-2 pr-10 ml-8 '>
    {chartDatatypeX === 'string' && chartDatatypeY === 'number' ?
        <div className='pl-4' style={{ paddingBottom: '20px' }}>
            <p className='text-[18px] font-bold font-inter -mt-4'>{selectedSheetName}</p>
        </div>
        :
        <div className='pl-4 -pt-4' style={{ paddingBottom: '20px' }}>
            <p className='text-[18px] font-bold font-inter -mt-4'>{selectedSheetName}</p>
        </div>
    }

    <div style={{ width: '100%', height: '90%' }}>
        {chartDatatypeX === 'string' && chartDatatypeY === 'number' ?
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey={`${sheetfieldselectedX}`} 
                        tick={{ fontSize: 16, fontFamily: 'Inter', fill: 'black' }}
                    />
                    <YAxis dataKey={`${sheetfieldselectedY}`} tickCount={4} tickMargin={-1}
                        tick={{ fontSize: 14, fontFamily: 'Inter', fill: 'black' }}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        labelStyle={{ color: '#ccc' }}
                    />
                    <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                    <Bar dataKey={`${sheetfieldselectedY}`} barSize={30}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={barColor(index)}
                                onMouseEnter={() => handleMouseEnter(index)}  
                                onMouseLeave={handleMouseLeave}  
                            
                                radius={[10, 10, 0, 0]}
                                
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            :
            chartDatatypeX === 'number' && chartDatatypeY === 'string' ?
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" tick={{ fontSize: 16, fontFamily: 'Inter', fill: 'black'}}  />
                        <YAxis dataKey={`${sheetfieldselectedY}`} type="category" tick={{ fontSize: 14, fontFamily: 'Inter', fill: 'black'}} />
                        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                        <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                        <Bar dataKey={`${sheetfieldselectedX}`}  barSize={30}>
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
                        <XAxis dataKey={`${sheetfieldselectedX}`}   tick={{ fontSize: 16, fontFamily: 'Inter', fill: 'black'}}  />
                        <YAxis dataKey={`${sheetfieldselectedY}`}   tick={{ fontSize: 14, fontFamily: 'Inter', fill: 'black'}} tickCount={4} tickMargin={-1} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                            labelStyle={{ color: '#ccc' }}
                        />
                        <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                        <Bar dataKey={`${sheetfieldselectedY}`} barSize={30}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={barColor(index)}
                                    onMouseEnter={() => handleMouseEnter(index)}  
                                    onMouseLeave={handleMouseLeave} 
                                    radius={[0, 10, 0, 0]}

                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
        }
    </div>
</div>

  )
}

export default PortfolioBarChart