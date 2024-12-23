import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import {  Area,  Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart }  from 'recharts';
import { IoMdClose } from "react-icons/io";



const Areachart = ({investmentchange,id,data01,clickedArea,setClickedArea,fromApi,setFromApi,chartDatatypeX,chartDatatypeY,chartDatatypeFromApiX, chartDatatypeFromApiY,setBoxes,boxes}) => {
  const [mydata,setmydata]=useState([])
  const [itsfromDatabase,setitsfromdatabase]=useState(false)
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

  const deleteWidgit=async()=>{
    const email=localStorage.getItem('email')
    const organization=localStorage.getItem('organization')
    const position=JSON.stringify(boxes.filter((box,index)=>index!=id))
    console.log(boxes)
    console.log("id",id)
    if(boxes.length===0)
    {
      await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/deletedashboard',{email:email,organization:organization})
      setBoxes([])
    }
    else{const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/updatedashboard',{email:email,position:position,organization:organization})
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


const fieldConversionsNormal = {
  pv: chartDatatypeX,  // Convert 'name' field to number
  uv: chartDatatypeY  // Convert 'value' field to string
};
const fieldConversionsApi={
  pv:chartDatatypeFromApiX,
  uv:chartDatatypeFromApiY
}


  useEffect(() => {
    const fun=async()=>{
      let organization=localStorage.getItem('organization')
      
        const dashboard_response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getDashboardData',{email:localStorage.getItem('email'),organization:organization})
        const entireData=JSON.parse(dashboard_response.data.data.positions)
        let selectedYaxis=''
        let selectedXaxis=''
        let isSheetchart=''
        let clickedsheetname=''
        let chartdatatypex=''
        let chartdatatypey=''
         let dbCompanyName=''
        entireData.map((m,index)=>
        {
          if(index==id)
          {
            selectedYaxis=m.selectedYAxis
            selectedXaxis=m.selectedXAxis
            isSheetchart=m.isSheetChart
            clickedsheetname=m.clickedsheetname
            chartdatatypex=m.chartDatatypeX
            chartdatatypey=m.chartDatatypeY
            dbCompanyName=m.dbCompanyName
          }
        }
        )
    const Sheet_response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/investmentsheetfromdb',{organization:organization,CompanyName:dbCompanyName})  
    if(fromApi&&!isSheetchart)
    { 
      console.log("chartdatatye",chartDatatypeFromApiX,chartDatatypeFromApiY)
        const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
        console.log("data01",convertedData)
        
        console.log('daat tyep',chartDatatypeX,chartDatatypeY)
        setmydata(convertedData)
        setFromApi(false)

    }
    else if(fromApi&&isSheetchart&&clickedsheetname.length>0)
      {
        setitsfromdatabase(true)
       let dt=JSON.parse(Sheet_response.data.data) 
       let filteredDt=[]
       dt.map(d=>
        filteredDt.push({pv:d[selectedXaxis],uv:d[selectedYaxis]})
       )
      
        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
       
          setmydata(convertedData)
          setFromApi(false)
      }
      else if (isSheetchart&&clickedsheetname.length>0) 
        {
          console.log("8")
          setitsfromdatabase(true)
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ pv: d[selectedXaxis], uv: d[selectedYaxis] }));
  
        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      }
      else if(isSheetchart&&clickedsheetname.length<=0)
        {
          const convertedData = convertDataTypes(data01[0], {pv:chartdatatypex,uv:chartdatatypey});
          console.log(convertedData)
          setmydata(convertedData);
        }
        else
        {
          const convertedData = convertDataTypes(data01, fieldConversionsNormal);
        
          setmydata(convertedData)
        }
    }
    fun()
}, []);

useEffect(() => {
  const fun=async()=>{
    let organization=localStorage.getItem('organization')
    
      const dashboard_response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getDashboardData',{email:localStorage.getItem('email'),organization:organization})
      const entireData=JSON.parse(dashboard_response.data.data.positions)
      let selectedYaxis=''
      let selectedXaxis=''
      let isSheetchart=''
      let clickedsheetname=''
        let chartdatatypex=''
        let chartdatatypey=''
         let dbCompanyName=''
      entireData.map((m,index)=>
      {
        if(index==id)
        {
          selectedYaxis=m.selectedYAxis
          selectedXaxis=m.selectedXAxis
          isSheetchart=m.isSheetChart
          clickedsheetname=m.clickedsheetname
            chartdatatypex=m.chartDatatypeX
            chartdatatypey=m.chartDatatypeY
            dbCompanyName=m.dbCompanyName
        }
      }
      )
      const Sheet_response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/investmentsheetfromdb',{organization:organization,CompanyName:dbCompanyName})
  if(fromApi&&!isSheetchart)
  { 
    console.log("chartdatatye",chartDatatypeFromApiX,chartDatatypeFromApiY)
      const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
      console.log("data01",convertedData)
      
      console.log('daat tyep',chartDatatypeX,chartDatatypeY)
      setmydata(convertedData)
      setFromApi(false)

  }
  else if(fromApi&&isSheetchart&&clickedsheetname.length>0)
    {
      setitsfromdatabase(true)
     let dt=JSON.parse(Sheet_response.data.data) 
     let filteredDt=[]
     dt.map(d=>
      filteredDt.push({pv:d[selectedXaxis],uv:d[selectedYaxis]})
     )
    
      const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
     
        setmydata(convertedData)
        setFromApi(false)
    }
    else if (isSheetchart&&clickedsheetname.length>0) 
      {
        console.log("8")
        setitsfromdatabase(true)
      let dt = JSON.parse(Sheet_response.data.data);
      let filteredDt = [];
      dt.map(d => filteredDt.push({ pv: d[selectedXaxis], uv: d[selectedYaxis] }));

      const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
      setmydata(convertedData);
      setFromApi(false);
    }
    else if(isSheetchart&&clickedsheetname.length<=0)
    {
      const convertedData = convertDataTypes(data01[0], {pv:chartdatatypex,uv:chartdatatypey});
      console.log(convertedData)
      setmydata(convertedData);
    }
    else
    {
      const convertedData = convertDataTypes(data01, fieldConversionsNormal);
      setmydata(convertedData)
    }
  }
  fun()
}, [investmentchange]);


  return (
    <div style={{ width: '100%', height: '90%' }} className='mt-8  pr-10'>
    <div className='w-[100%] h-[100%] mt-3 pr-14'>
      <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={300}
        data={mydata}




        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >

            <defs>
          
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="3%" stopColor="#007BFF" stopOpacity={0.4} />
              <stop offset="37%" stopColor="#007BFF" stopOpacity={0.2} />
              <stop offset="60%" stopColor="	#ffffff" stopOpacity={0.0} />
            </linearGradient>
          </defs>


          <CartesianGrid stroke="#ccc"  horizontal={true} vertical={false} />
        <XAxis dataKey="pv" tick={true}     tickMargin={10} padding={{ left: 10, right: 10 }}  />
        
        <YAxis tick={true}   tickCount={4} padding={{ top: 10, bottom: 10 }} />
        <Tooltip />
       
      
       
            

    <Area type="monotone" dataKey="uv" stroke="#007BFF" fill="url(#blueGradient)" strokeWidth={3}/>

        
      </AreaChart>
    </ResponsiveContainer>
    
    </div>
    {
              itsfromDatabase?
                <div className='flex flex-row space-x-2 fixed left-5 top-3 items-center'>
                  <div className='w-[10px] h-[10px] bg-green-600 rounded-[50%] mt-[2px]'></div> 
                  <p className='text-[13px] text-gray-07 font-noto text-gray-700'>Database</p>

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
