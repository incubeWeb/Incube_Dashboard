import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Bars } from 'react-loader-spinner'; // Correct import for the loader component
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';
import { jwtDecode } from 'jwt-decode';


const RenderBarChart = ({investmentchange,setdashboardbotdata,id,data01,clickedBar,setClickedBar,fromApi,setFromApi,chartDatatypeX,chartDatatypeY,chartDatatypeFromApiX, chartDatatypeFromApiY,setBoxes,boxes}) => {
  const [thissheetname,setthissheetname]=useState('')
  const [mydata,setmydata]=useState([]);
  const [itsfromDatabase,setitsfromdatabase]=useState(false);
  const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

  const [mydatatypex,setmydatatypex]=useState(chartDatatypeX)
  const [mydatatypey,setmydatatypey]=useState(chartDatatypeY)

  const [isitfromDrive,setisitfromdrive]=useState(false)

  function extractValue(input) {
    const continuousDigitsPattern = /^\D*(\d+)\D*$/;
    const str=String(input);
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
    setdashboardbotdata(prevData => {
      return prevData.filter(item => !Object.keys(item).includes(`Barchart_${id}`));
    });
    if(boxes.length===0)
    {
      await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`,{email:email,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      setBoxes([]);
    }
    else{
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updatedashboard`,{email:email,position:position,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      if(response.data.status==200)
      {
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

  const fieldConversionsNormal = {
    name: mydatatypex,
    uv: mydatatypey
  };
  const fieldConversionsApi={
    name:chartDatatypeFromApiX,
    uv:chartDatatypeFromApiY
  };

  useEffect(() => {
    const fun=async()=>{
      const dashboard_response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDashboardData`,{email:Logemail,organization:Logorganization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      const entireData=JSON.parse(dashboard_response.data.data.positions);
      let selectedYaxis='';
      let selectedXaxis='';
      let isSheetchart='';
      let clickedsheetname='';
      let chartdatatypex='';
      let chartdatatypey='';
      let dbCompanyName='';
      let fromdrive='';
      let selectedsheetidfordrive=''
      let selectedsheetfromdbname=''
      let barchartcount=[]
      let sheetdbdata=[]
      
      entireData.map((m,index)=>{
        if(index==id)
        {
          selectedYaxis=m?.selectedYAxis || "";
          selectedXaxis=m?.selectedXAxis || "";
          isSheetchart=m?.isSheetChart || "";
          clickedsheetname=m?.clickedsheetname || "";
          setthissheetname(clickedsheetname)
          chartdatatypex=m?.chartDatatypeX || "string";
          setmydatatypex(chartdatatypex)
          chartdatatypey=m?.chartDatatypeY || "number";
          setmydatatypey(chartdatatypey)
          dbCompanyName=m?.dbCompanyName || "";
          fromdrive=m?.fromdrive || ""
          setisitfromdrive(fromdrive)
          selectedsheetidfordrive=m?.selectedsheetfromdbname || ""
          selectedsheetfromdbname=m?.selectedsheetfromdbname || ""
          barchartcount=m?.barchartCount || []
          sheetdbdata=m?.sheetdbdata || []
        }
      });

      if(barchartcount.length>0)
        {
          const convertedData= convertDataTypes(barchartcount, {name:chartdatatypex,uv:chartdatatypey});
          setmydata(convertedData)
        }
        else if(sheetdbdata.length>0 && selectedsheetfromdbname.length<=0)
          {
            let filteredDt = [];
            sheetdbdata.map(d => filteredDt.push({ name: d[selectedXaxis], uv: d[selectedYaxis] }));
              
            const convertedData= convertDataTypes(filteredDt, {name:chartdatatypex,uv:chartdatatypey});
           
            
            setmydata(convertedData)
          }
      
      else if(fromApi && !isSheetchart) { 
       
        const convertedData = convertDataTypes(data01[0], {
          name:chartdatatypex,
          uv:chartdatatypey
        });
        setmydata(convertedData);
        setFromApi(false);
      }
      else if(fromApi && isSheetchart && clickedsheetname.length > 0) {
       
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
              dt.map(d => filteredDt.push({ name: d[selectedXaxis], uv: d[selectedYaxis] }));
  
              const convertedData = convertDataTypes(filteredDt, {
                name:chartdatatypex,
                uv:chartdatatypey
              });
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
        let dt=JSON.parse(response.data.data); 
        let filteredDt = [];
        dt.map(d => filteredDt.push({name: d[selectedXaxis], uv: d[selectedYaxis]}));
        const convertedData = convertDataTypes(filteredDt, {
          name:chartdatatypex,
          uv:chartdatatypey
        });
        setmydata(convertedData);
        setFromApi(false);
          }
      }
      else if (isSheetchart && clickedsheetname.length > 0) {
  
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
              dt.map(d => filteredDt.push({ name: d[selectedXaxis], uv: d[selectedYaxis] }));
  
              const convertedData = convertDataTypes(filteredDt, {
                name:chartdatatypex,
                uv:chartdatatypey
              });
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
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], uv: d[selectedYaxis] }));
        const convertedData = convertDataTypes(filteredDt, {
          name:chartdatatypex,
          uv:chartdatatypey
        });
        setmydata(convertedData);
        setFromApi(false);
          }
      }
      else if(isSheetchart && clickedsheetname.length <= 0) {
     
        const convertedData = convertDataTypes(data01[0], {name: chartdatatypex, uv: chartdatatypey});
        setmydata(convertedData);
      }
      else {
        const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
      
        setmydata(convertedData);
      }
    };
    setTimeout(()=>{
      fun();
    },1000)
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState(null); 

  const yAxisTickFormatter = (value) => value; 

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);  // Set the hovered bar
};

const handleMouseLeave = () => {
    setHoveredIndex(null);  // Reset the hovered bar when the mouse leaves
};
const COLORS = ['#0d47a1', '#42a5f5',];
const barColor = (index) => {
    return index === hoveredIndex ? '#FF8042' : COLORS[index % COLORS.length];  // Change color on hover
};


useEffect(()=>{
  setdashboardbotdata(prevData => {
    const keyExists = prevData.some(item => Object.keys(item).includes(`Barchart_${id}`));
    if (keyExists) {
        // Update the value for the existing key
        return prevData.map(item =>
            Object.keys(item).includes(`Barchart_${id}`)
                ? { ...item, [`Barchart_${id}`]: {data:mydata} }
                : item
        );
    } else {
        // Insert a new object with the key-value pair
        return [...prevData, { [`Barchart_${id}`]: {data:mydata} }];
    }
});
  },[mydata])


  return (
    <div style={{ width: '100%', height: '95%' ,paddingBottom:'15px'}} className='mt-8  pr-0'>
      
      <div style={{ width: '100%', height: '90%' }} className='mt-2 pr-5 ml-[-20px]'>
    {mydatatypex === 'string' && mydatatypey === 'number' ?
        <div className='' style={{ paddingBottom: '20px' }}>
            <p className='text-[16px] font-semibold font-inter -mt-4 ml-6'>{thissheetname.replace(/^\d+_/, "")}</p>
        </div>
        :
        <div className=' -pt-4' style={{ paddingBottom: '20px' }}>
            <p className='text-[16px] font-semibold font-inter -mt-4 ml-6'>{thissheetname.replace(/^\d+_/, "")}</p>
        </div>
    }

    <div style={{ width: '100%', height: '90%' }}>
        {mydatatypex === 'string' && mydatatypey === 'number' ?
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mydata}>
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
                        {mydata.map((entry, index) => (
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
            mydatatypex === 'number' && mydatatypey === 'string' ?
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={mydata} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <XAxis type="number" tick={true} stroke="#8884d8" />
                        <YAxis dataKey="uv" type="category" tick={true} />
                        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                        <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                        <Bar dataKey="name" barSize={30}>
                            {mydata.map((entry, index) => (
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
                    <BarChart data={mydata}>
                        <XAxis dataKey="name" tick={true} stroke="#8884d8" />
                        <YAxis dataKey='uv' tick={true} tickCount={4} tickMargin={-1} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#333', borderRadius: '10px', border: '1px solid #ccc', color: '#fff' }}
                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                            labelStyle={{ color: '#ccc' }}
                        />
                        <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                        <Bar dataKey="uv" barSize={30}>
                            {mydata.map((entry, index) => (
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
</div>

      {
              itsfromDatabase &&!isitfromDrive?
                <div className='flex flex-row space-x-2 fixed left-5 top-3 items-center'>
                  <div className='w-[10px] h-[10px] bg-green-600 rounded-[50%] mt-[2px]'></div> 
                  <p className='text-[13px] text-gray-07 font-noto text-gray-700'>Database</p>
                  {/* <p className='text-[14px] text-gray-600 font-noto'> {thissheetname.replace(/^\d+_/, "")}</p> */}
                </div>:
                <></>
            }

{
              itsfromDatabase &&isitfromDrive?
                <div className='flex flex-row space-x-2 fixed left-5 top-3 items-center'>
                  <div className='w-[10px] h-[10px] bg-orange-600 rounded-[50%] mt-[2px]'></div> 
                  <p className='text-[13px] text-gray-07 font-noto text-gray-700'>Google Drive</p>
                  {/* <p className='text-[14px] text-gray-600 font-noto'> {thissheetname.replace(/^\d+_/, "")}</p> */}
                </div>:
                <></>
            }

      <div className='z-[10] cursor-pointer flex pl-[1px] items-center justify-center w-[20px] rounded-xl h-[20px] bg-gray-100 fixed right-[-10px] top-[-15px] mt-4 mr-3' onClick={deleteWidgit}>
        <RxCross2 size={14} className='text-black'/>

      </div>
    </div>
  );
};

export default RenderBarChart;
