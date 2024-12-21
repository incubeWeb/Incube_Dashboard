import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import {  Area,  Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart }  from 'recharts';
import { IoMdClose } from "react-icons/io";
import { jwtDecode } from 'jwt-decode';



const Areachart = ({boxid,setdashboardbotdata,id,data01,clickedArea,setClickedArea,fromApi,setFromApi,chartDatatypeX,chartDatatypeY,chartDatatypeFromApiX, chartDatatypeFromApiY,setBoxes,boxes}) => {
  const [mydata,setmydata]=useState([])
  const [thissheetname,setthissheetname]=useState('')
  const [itsfromDatabase,setitsfromdatabase]=useState(false)
  const [mydatatypex,setmydatatypex]=useState(chartDatatypeX)
  const [mydatatypey,setmydatatypey]=useState(chartDatatypeY)
  const [isitfromDrive,setisitfromdrive]=useState(false)
  const [selectedxaxis,setselectedxaxis]=useState('')
  const [selectedyaxis,setselectedyaxis]=useState('')

  const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
  function extractValue(input) {
    // Regex to match a string with continuous digits
    const continuousDigitsPattern = /^\D*(\d+)\D*$/;
    const str=String(input)
    const match = str.match(/\d+(\.\d+)?/)?str.match(/\d+(\.\d+)?/)[0]:'0'
  
    if (match!='0') {
      
          return match
        
    } else {
        // If input does not match the pattern or contains interspersed letters, return 0
        return 0;
    }
  }

  const deleteWidgit=async()=>{
    const email=Logemail
    const organization=Logorganization
    const position=JSON.stringify(boxes.filter((box,index)=>index!=id))
   
    console.log("id is",boxid)
    setdashboardbotdata(prevData => {
      return prevData.filter(item => !Object.keys(item).includes(`Linechart_${id}`));
    });

    if(boxes.length===0)
    {
      await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`,{email:email,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      setBoxes([])
    }
    else{ 
      
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard-single`,{email:email,boxid:boxid,organization:organization},{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    if(response.data.status==200)
    {
      setBoxes(boxes.filter((box,index)=>index!=id))
     
    }
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

        if (typeof newObj.pv === 'string' && typeof newObj.uv === 'string') {
          let prev=newObj.uv
          let newv = extractValue(newObj.uv);
          if(newv==0){
            newObj.uv=prev
          }else{
            newObj.uv=newv
          }
      }

        return newObj;
    });
}


const fieldConversionsNormal = {
  pv: mydatatypex,  // Convert 'name' field to number
  uv: mydatatypey  // Convert 'value' field to string
};
const fieldConversionsApi={
  pv:chartDatatypeFromApiX,
  uv:chartDatatypeFromApiY
}

const testdata=[{pv:"anme",uv:"0.45"},{pv:"adnme",uv:"0.95"}]


  useEffect(() => {
    
    const fun=async()=>{
      let organization=Logorganization
      
        const dashboard_response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDashboardData`,{email:Logemail,organization:organization},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        let constructbox=[]
      dashboard_response.data.data.map(myval=>{
          let value=JSON.parse(myval.positions)
          constructbox.push(value)
        })

      const entireData=constructbox
        let selectedYaxis=''
        let selectedXaxis=''
        let isSheetchart=''
        let clickedsheetname=''
        let chartdatatypex=''
        let chartdatatypey=''
         let dbCompanyName=''
         let fromdrive='';
      let selectedsheetidfordrive=''
      let selectedsheetfromdbname=''
      let areachartcount=[]
      let sheetdbdata=[]
        entireData.map((m,index)=>
        {
          if(index==id)
          {
            
            selectedYaxis=m?.selectedYAxis || ""
            setselectedyaxis(selectedYaxis)
            selectedXaxis=m?.selectedXAxis || ""
            setselectedxaxis(selectedXaxis)
            isSheetchart=m?.isSheetChart || ""
            clickedsheetname=m?.clickedsheetname || ""
            setthissheetname(clickedsheetname)
            chartdatatypex=m?.chartDatatypeX || "number"
            setmydatatypex(chartdatatypex)
            chartdatatypey=m?.chartDatatypeY || "number"
            setmydatatypey(chartdatatypey)
            dbCompanyName=m?.dbCompanyName || ""
            fromdrive=m?.fromdrive || ""
            setisitfromdrive(fromdrive)
          selectedsheetidfordrive=m?.selectedsheetfromdbname || ""
          selectedsheetfromdbname=m?.selectedsheetfromdbname || ""
          areachartcount=m?.areachartCount || []
          sheetdbdata=m?.sheetdbdata||[]
           
          }
        }
        )
   // const Sheet_response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/ `,{organization:organization,CompanyName:dbCompanyName})  
    
   if(areachartcount.length>0)
    {
      
      const convertedData= convertDataTypes(areachartcount, {pv:chartdatatypex,uv:chartdatatypey});
      setmydata(convertedData)
    }
   else if(sheetdbdata.length>0 && selectedsheetfromdbname.length<=0)
      {
        let filteredDt = [];
        sheetdbdata.map(d => filteredDt.push({ pv: d[selectedXaxis], uv: d[selectedYaxis] }));
          
        const convertedData= convertDataTypes(filteredDt, {pv:chartdatatypex,uv:chartdatatypey});
       
        setmydata(convertedData)
      }
    else if(fromApi&&!isSheetchart)
    { 
      
        const convertedData = convertDataTypes(data01[0], {
          pv:chartdatatypex,
          uv:chartdatatypey
        });
       
        setmydata(convertedData)
        setFromApi(false)

    }
    else if(fromApi&&isSheetchart&&clickedsheetname.length>0)
      {
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
              dt.map(d => filteredDt.push({ pv: d[selectedXaxis], uv: d[selectedYaxis] }));
  
              const convertedData = convertDataTypes(filteredDt, {
                pv:chartdatatypex,
                uv:chartdatatypey
              });
              setmydata(convertedData);
              setFromApi(false);
            }
          }else{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:selectedsheetfromdbname,organization:Logorganization},{
              headers:{
                "Authorization":`Bearer ${token}`
              }
            });
        setitsfromdatabase(true)
       let dt=JSON.parse(response.data.data) 
       let filteredDt=[]
       dt.map(d=>
        filteredDt.push({pv:d[selectedXaxis],uv:d[selectedYaxis]})
       )
      
        const convertedData = convertDataTypes(filteredDt, {
          pv:chartdatatypex,
          uv:chartdatatypey
        });
       
          setmydata(convertedData)
          setFromApi(false)
      }
      }
      else if (isSheetchart&&clickedsheetname.length>0) 
        {
         
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
                dt.map(d => filteredDt.push({ pv: d[selectedXaxis], uv: d[selectedYaxis] }));
    
                const convertedData = convertDataTypes(filteredDt, {
                  pv:chartdatatypex,
                  uv:chartdatatypey
                });
                setmydata(convertedData);
                setFromApi(false);
              }
            }else{
              const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:selectedsheetfromdbname,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
          setitsfromdatabase(true)
        let dt = JSON.parse(response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ pv: d[selectedXaxis], uv: d[selectedYaxis] }));
  
        const convertedData = convertDataTypes(filteredDt, {
          pv:chartdatatypex,
          uv:chartdatatypey
        });
        setmydata(convertedData);
        setFromApi(false);
            }
      }
      
      else if(isSheetchart&&clickedsheetname.length<=0)
        {
          const convertedData = convertDataTypes(data01[0], {pv:chartdatatypex,uv:chartdatatypey});
         
          setmydata(convertedData);
        }
        else
        {
          const convertedData = convertDataTypes(data01, fieldConversionsNormal);
          
          setmydata(convertedData)
          
        }
    }
    setTimeout(()=>{
      fun()
    },1000)
    
}, []);

useEffect(()=>{
  setdashboardbotdata(prevData => {
    const keyExists = prevData.some(item => Object.keys(item).includes(`Linechart_${id}`));
    if (keyExists) {
        // Update the value for the existing key
        return prevData.map(item =>
            Object.keys(item).includes(`Linechart_${id}`)
                ? { ...item, [`Linechart_${id}`]: {data:mydata} }
                : item
        );
    } else {
        // Insert a new object with the key-value pair
        return [...prevData, { [`Linechart_${id}`]: {data:mydata} }];
    }
});
  },[mydata])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const uvEntry = payload.find((entry) => entry.dataKey === 'uv');
        return (
            <div className="custom-tooltip" style={{ background: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <p className="label">{`${selectedxaxis}: ${label}`}</p>
                {uvEntry && (
                    <p >
                        {`${selectedyaxis}: ${uvEntry.value}`}
                    </p>
                )}
                
            </div>
        );
    }

    return null;
};

const CustomTooltipHorizontal = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const uvEntry = payload.find((entry) => entry.dataKey === 'pv');
      return (
          <div className="custom-tooltip" style={{ background: '#fff', padding: '10px', border: '1px solid #ccc' }}>
              <p className="label">{`${selectedyaxis}: ${label}`}</p>
              {uvEntry && (
                  <p style={{ color: uvEntry.color }}>
                      {`${selectedxaxis}: ${uvEntry.value}`}
                  </p>
              )}
              
          </div>
      );
  }

  return null;
}

const maxY = Math.max(...mydata.map(item => item.uv));
  const maxX=Math.max(...mydata.map(item=>item.pv))


  return (
    <div style={{ width: '100%', height: '90%' }} className='mt-4  pr-10'>
   <p className='font-inter font-semibold text-[16px] ml-1 -mt-4'>  {thissheetname.replace(/^\d+-/, "")}
   </p>    <div className='w-[100%] h-[100%] mt-3 pr-0'>
    <ResponsiveContainer width="100%" height="100%">
                    {mydatatypex === 'string' && mydatatypey === 'number' ? (
                        // Standard layout: String on X-axis, number on Y-axis
                        <AreaChart
                            data={mydata}
                            margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
                        >
                            <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                            <XAxis dataKey="pv" tickCount={4} domain={[0, maxY]}/>
                            <YAxis tickCount={4} domain={[0, maxY]}/>
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                            <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                        </AreaChart>
                    ) :  
                      mydatatypex === 'number' && mydatatypey === 'string'?
                      (
                        // Horizontal layout: number on X-axis, String on Y-axis
                        <AreaChart
                            layout="vertical"
                            data={mydata}
                            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                        >
                             <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                            <XAxis type="number" domain={[0, maxX]}/>
                            <YAxis type="category" dataKey="uv" tickCount={4} domain={[0, maxX]}/>
                            <Tooltip content={<CustomTooltipHorizontal />} />
                            <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                            <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                        </AreaChart>
                    )
                    :
                    (<AreaChart
                      data={mydata}
                      margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
                  >
                      <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                      <XAxis dataKey="pv" tickCount={4} domain={[0, maxY]}/>
                      <YAxis tickCount={4} domain={[0, maxY]}/>
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  </AreaChart>)
                    }
                </ResponsiveContainer>
    
    </div>
    {
              itsfromDatabase &&!isitfromDrive?
                <div className='flex flex-row space-x-2 fixed left-5 top-3 items-center'>
                  <div className='w-[10px] h-[10px] bg-green-600 rounded-[50%] mt-[2px]'></div> 
                  <p className='text-[13px] text-gray-07 font-noto text-gray-700'>Database</p>
                  
                </div>:
                <></>
            }

{
              itsfromDatabase &&isitfromDrive?
                <div className='flex flex-row space-x-2 fixed left-5 top-3 items-center'>
                  <div className='w-[10px] h-[10px] bg-orange-600 rounded-[50%] mt-[2px]'></div> 
                  <p className='text-[13px] text-gray-07 font-noto text-gray-700'>Google Drive</p>
                  
                </div>:
                <></>
            }
             <div className='z-[10] cursor-pointer flex pl-[1px] items-center justify-center w-[20px] rounded-xl h-[20px] bg-gray-100 fixed right-[-10px] top-[-15px]    mt-4 mr-3 '  onClick={deleteWidgit}>
             <IoMdClose size={15}  />
            </div>
    </div>
    
  );
}

export default Areachart;
