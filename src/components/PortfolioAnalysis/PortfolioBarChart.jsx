import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const PortfolioBarChart = ({chartDatatypeX,chartDatatypeY,sheetJson,sheetfieldselectedX,sheetfieldselectedY}) => {
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
            sheetJson.map(val=>{
                mydata.push({name:val[sheetfieldselectedX],uv:val[sheetfieldselectedY]})
            })
           
            const converteddata=convertDataTypes(mydata, fieldConversions);
           
            setdata(converteddata)
    }
    try{
        settingValuesofData()
    }catch(e){
        settingValuesofData()
    }
    },[sheetJson,sheetfieldselectedX,sheetfieldselectedY,chartDatatypeX,chartDatatypeY])

    useEffect(()=>{
        const settingValuesofData=async()=>{
                const mydata=[]
                sheetJson.map(val=>{
                    mydata.push({name:val[sheetfieldselectedX],uv:val[sheetfieldselectedY]})
                })
             
                const converteddata=convertDataTypes(mydata, fieldConversions);
            
                setdata(converteddata)
        }
        try{
            settingValuesofData()
        }catch(e){
            settingValuesofData()
        }
    },[])

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

        return newObj;
    });
}

const fieldConversions = {
    name: chartDatatypeX,  // Convert 'name' field to number
    uv: chartDatatypeY  // Convert 'value' field to string
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
        return index === hoveredIndex ? '#FF8042' : '#2970FF';  // Change color on hover
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
                    <XAxis dataKey="name" 
                        tick={{ fontSize: 16, fontFamily: 'Inter', fill: 'black' }}
                    />
                    <YAxis dataKey='uv' tickCount={4} tickMargin={-1}
                        tick={{ fontSize: 14, fontFamily: 'Inter', fill: 'black' }}
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
                                onMouseEnter={() => handleMouseEnter(index)}  
                                onMouseLeave={handleMouseLeave}  
                            
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
                        <XAxis type="number" tick={{ fontSize: 16, fontFamily: 'Inter', fill: 'black'}}  />
                        <YAxis dataKey="uv" type="category" tick={{ fontSize: 14, fontFamily: 'Inter', fill: 'black'}} />
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
                        <XAxis dataKey="name"  tick={{ fontSize: 16, fontFamily: 'Inter', fill: 'black'}}  />
                        <YAxis dataKey='uv'   tick={{ fontSize: 14, fontFamily: 'Inter', fill: 'black'}} tickCount={4} tickMargin={-1} />
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