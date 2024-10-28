import React, { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer ,Tooltip,Legend, Cell} from 'recharts';
import { Bars } from 'react-loader-spinner';
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';
import { VscArrowDown, VscArrowUp } from 'react-icons/vsc';
import { jwtDecode } from 'jwt-decode';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
const Piechart = ({investmentchange, id, outerRadius, data01, clickedPie, setClickedPie, fromApi, setFromApi, chartDatatypeX, chartDatatypeY, chartDatatypeFromApiX, chartDatatypeFromApiY,setBoxes,boxes}) => {
  const [loading, setLoading] = useState(true);
  const [mydata, setmydata] = useState([]);
  const [thissheetname,setthissheetname]=useState('')
  const [selectedValueAxis,setselectedvalueaxis]=useState('');
  const [itsfromDatabase,setitsfromdatabase]=useState(false);
  const [isitfromDrive,setisitfromdrive]=useState(false)
  const [datatypex,setdatatypex]=useState('')
  const [datatypey,setdatatypey]=useState('')
  const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

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

  const deleteWidgit=async()=>{
    const email=Logemail;
    const organization=Logorganization;
    const position=JSON.stringify(boxes.filter((box,index)=>index!=id));
    if(boxes.length===0) {
      await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`,{email:email,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      setBoxes([]);
    }
    else {
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updatedashboard`,{email:email,position:position,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      if(response.data.status==200) {
        setBoxes(boxes.filter((box,index)=>index!=id));
       
      }
    }
  };

  function convertDataTypes(array, fieldConversions) {
    return array.map(obj => {
      let newObj = { ...obj };

      Object.keys(fieldConversions).forEach(field => {
        const conversionType = fieldConversions[field];

        switch (conversionType) {
          case 'integer':
            if (field === 'value') {
              newObj[field] = extractValue(obj[field]);
            } else {
              newObj[field] = obj[field]; 
            }
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

  const fieldConversionsNormal = {
    name: chartDatatypeX,
    value: chartDatatypeY
  };
  
  const fieldConversionsApi = {
    name: datatypex,
    value: datatypey
  };

  useEffect(() => {
    const fun = async () => {
      const dashboard_response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDashboardData`, { email: Logemail,organization:Logorganization },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      const entireData = JSON.parse(dashboard_response.data.data.positions);
      let selectedYaxis = '';
      let isSheetchart = '';
      let selectedXaxis='';
      let clickedsheetname='';
      let chartdatatypex='';
      let chartdatatypey='';
      let dbCompanyName='';
      let fromdrive='';
      let selectedsheetidfordrive=''
      let selectedsheetfromdbname=''
      let piechartcount=[]

      entireData.map((m, index) => {
        if (index === id) {
          selectedYaxis = m?.selectedYAxis || "";
          selectedXaxis = m?.selectedXAxis || "";
          isSheetchart = m?.isSheetChart || "";
          clickedsheetname = m?.clickedsheetname || "";
          setthissheetname(clickedsheetname)
          chartdatatypex = m?.chartDatatypeX || "string";
          chartdatatypey = m?.chartDatatypeY || "integer";
          dbCompanyName = m?.dbCompanyName || "";
          fromdrive=m?.fromdrive || ""
          setisitfromdrive(fromdrive)
          selectedsheetidfordrive=m?.selectedsheetfromdbname || ""
          selectedsheetfromdbname=m?.selectedsheetfromdbname || ""
          piechartcount=m?.piechartCount || []
          
        }
      });

      setselectedvalueaxis(selectedYaxis);

      if(piechartcount.length>0)
        {
          const convertedData= convertDataTypes(piechartcount, {name:chartdatatypex,value:chartdatatypey});
          
          setmydata(convertedData)
        }
      
     else if (fromApi && !isSheetchart) {
      
        const convertedData = convertDataTypes(data01[0], {name: chartdatatypex,
          value: chartdatatypey});
        setmydata(convertedData);
        setFromApi(false);
      } else if (fromApi && isSheetchart && clickedsheetname.length > 0) {
      
        if(fromdrive)
          {
            setitsfromdatabase(true)
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-google-sheet-json`,{sheetId:selectedsheetidfordrive,email:Logemail,organization:Logorganization},{
              headers:{
                "Authorization":`Bearer ${token}`
              }
            })
           
              if(response.data.status==200)
              {
              const allJson=response.data.data
              
              const keys=allJson[0].data
              const finalJson=[]
              allJson.map(val=>{
                      if(val.rowIndex!=1)
                      {
                          const result=keys.reduce((obj,key,value)=>{obj[key]=val.data[value]; return obj},{})
                          finalJson.push(result)
                      }
                  })
  
              const data=finalJson
              let dt = data
              let filteredDt = [];
              dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));
  
              const convertedData = convertDataTypes(filteredDt, {name: chartdatatypex,
                value: chartdatatypey});
              setmydata(convertedData);
              setFromApi(false);
            }
          }
            else{
              const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:selectedsheetfromdbname,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
              setitsfromdatabase(true);
              let dt = JSON.parse(response.data.data);
              let filteredDt = [];
              dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));
              
              const convertedData = convertDataTypes(filteredDt, {name: chartdatatypex,
                value: chartdatatypey});
              setmydata(convertedData);
              setFromApi(false);
            }
      } else if (isSheetchart && clickedsheetname.length > 0) {
       
        if(fromdrive)
          {
            setitsfromdatabase(true)
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-google-sheet-json`,{sheetId:selectedsheetidfordrive,email:Logemail,organization:Logorganization},{
              headers:{
                "Authorization":`Bearer ${token}`
              }
            })
          
  
              if(response.data.status==200)
              {
              const allJson=response.data.data
              
              const keys=allJson[0].data
              const finalJson=[]
              allJson.map(val=>{
                      if(val.rowIndex!=1)
                      {
                          const result=keys.reduce((obj,key,value)=>{obj[key]=val.data[value]; return obj},{})
                          finalJson.push(result)
                      }
                  })
  
              const data=finalJson
              let dt = data
              let filteredDt = [];
              dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));
  
              const convertedData = convertDataTypes(filteredDt, {name: chartdatatypex,
                value: chartdatatypey});
              setmydata(convertedData);
              setFromApi(false);
            }
          }
            else{
            
              const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:selectedsheetfromdbname,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
        setitsfromdatabase(true);
        let dt = JSON.parse(response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], value: d[selectedYaxis] }));

        const convertedData = convertDataTypes(filteredDt, {name: chartdatatypex,
          value: chartdatatypey});
        setmydata(convertedData);
        setFromApi(false);
            }
      } else if (isSheetchart && clickedsheetname.length <= 0) {
        
        const convertedData = convertDataTypes(data01[0], {name:chartdatatypex,value:chartdatatypey});
        setmydata(convertedData);
      } else {
        
        const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
        setmydata(convertedData);
      }
      setLoading(false);
    };

    setTimeout(()=>{
      fun();
    },1000)
   
  }, []);


  const legendFormatter = (value, entry) => {
    const { name, value: val } = entry.payload;
    return `${name}: ${val}`;
};

  // Custom label function to display name and value
  const renderCustomLabel = ({ name, value }) => `${name}: ${value}`;

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
        const scrollLegend = (direction) => {
          if (legendRef.current) {
              const scrollAmount = direction === 'down' ? legendRef.current.scrollHeight : -legendRef.current.scrollHeight; // Use 30 for down, -30 for up
              legendRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
              
          } else {
              console.error('legendRef.current is not defined.');
          }
        };
        
   
        const isScrollable = () => {
          if (legendRef.current) {
              return legendRef.current.scrollHeight > legendRef.current.clientHeight;
          }
          return true;
        };
        
    const BASE_BLUE = '#528BFF';
    const GRADIENT_BLUE = ['#528BFF', '#85AFFF', '#A1C2FF', '#C3D6FF']; // Gradient shades
    const COLORS = ['#0d47a1', '#1976d2', '#42a5f5', '#90caf9', '#e3f2fd'];


useEffect(()=>{
const mergedData=[...mydata]
sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
},[mydata])


  return (
    <div style={{ width: '100%', height: '100%',paddingBottom:'15px' }}>
     <p className='mt-4 ml-7 font-inter font-semibold'>{thissheetname.replace(/^\d+_/, "")}</p>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Bars color="#8884d8" height={80} width={80} />
         
        </div>
      ) : (
        
        <ResponsiveContainer width="100%" height="95%" className="flex flex-row">
          <PieChart>
                        <Pie 
                            className='basis-9/12'
                            dataKey="value"
                            isAnimationActive={false}
                            data={mydata}
                            cx="50%"
                            cy="50%"
                            outerRadius="95%" // Outer radius for doughnut
                            innerRadius="55%" // Inner radius for the doughnut effect
                            fill={BASE_BLUE}
                            activeIndex={activeIndex}
                            onClick={onPieClick} // Trigger effect on click
                            onMouseEnter={onPieMouseEnter} // Trigger hover effect
                            onMouseLeave={onPieMouseLeave} // Reset hover effect
                        >
                            {mydata.map((entry, index) => {
                                const fillColor =
                                    hoveredIndex === index || activeIndex === index
                                        ? '#FF8042'  // Apply gradient on hover/click
                                          : COLORS[index % COLORS.length];
                                        // Default to base blue color

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
                        
                        
                    </PieChart>
          {/* <div className='fixed right-5 top-3 flex flex-row items-center space-x-2'>
            <div className='w-[10px] h-[10px] bg-violet-600 mt-3'></div> 
            <p className='text-[13px] text-gray-07 font-noto text-gray-700'>{selectedValueAxis}</p>
          </div> */}
           
          {
              itsfromDatabase &&!isitfromDrive?
                <div className='flex flex-row space-x-2 fixed left-5 top-3 items-center'>
                  <div className='w-[10px] h-[10px] bg-green-600 rounded-[50%] mt-[2px]'></div> 
                  <p className='text-[13px] text-gray-07 font-noto text-gray-700'>Database</p>
                  {/* <p className='text-[14px] text-gray-900 font-noto'> {thissheetname.replace(/^\d+_/, "")}</p> */}
                </div>:
                <></>
            }

{
              itsfromDatabase &&isitfromDrive?
                <div className='flex flex-row space-x-2 fixed left-5 top-3 items-center'>
                  <div className='w-[10px] h-[10px] bg-orange-600 rounded-[50%] mt-[2px]'></div> 
                  <p className='text-[13px] text-gray-07 font-noto text-gray-700'>Google Drive</p>
                  {/* <p className='text-[14px] text-gray-900 font-noto'> {thissheetname.replace(/^\d+_/, "")}</p> */}
                </div>:
                <></>
            }
          <div className='z-[10] cursor-pointer flex pl-[1px] items-center justify-center w-[20px] rounded-xl h-[20px] bg-gray-100 mt-3 mr-3 fixed right-[-10px] top-[-15px]' onClick={deleteWidgit}>
            <RxCross2 size={14} className='text-black z-[10]' onClick={deleteWidgit}/>
          </div>
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
                    {mydata.map((entry, index) => (
                        <li key={`item-${index}`} className='mt-4' style={{ color: '#8884d8', fontSize: '14px' }}>
                            {`${entry.name}: ${entry.value}`}
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
        </ResponsiveContainer>
        
      )}
    </div>
  );
};

export default Piechart;
