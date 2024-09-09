import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Bars } from 'react-loader-spinner'; // Correct import for the loader component
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';


const RenderBarChart = ({investmentchange,id,data01,clickedBar,setClickedBar,fromApi,setFromApi,chartDatatypeX,chartDatatypeY,chartDatatypeFromApiX, chartDatatypeFromApiY,setBoxes,boxes}) => {

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
      await axios.post('http://localhost:8999/deletedashboard',{email:email,organization:organization})
      setBoxes([])
    }
    else{const response=await axios.post('http://localhost:8999/updatedashboard',{email:email,position:position,organization:organization})
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
  name: chartDatatypeX,  // Convert 'name' field to number
  uv: chartDatatypeY  // Convert 'value' field to string
};
const fieldConversionsApi={
  name:chartDatatypeFromApiX,
  uv:chartDatatypeFromApiY
}


  useEffect(() => {
    const fun=async()=>{
        const dashboard_response=await axios.post('http://localhost:8999/getDashboardData',{email:localStorage.getItem('email'),organization:localStorage.getItem('organization')})
        const entireData=JSON.parse(dashboard_response.data.data.positions)
        let selectedYaxis=''
        let selectedXaxis=''
        let isSheetchart=''
        let clickedsheetname=''
        let chartdatatypex=''
        let chartdatatypey=''
         let dbCompanyName=''
        
        console.log("id",id)
        entireData.map((m,index)=>{
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
        console.log(dbCompanyName)
        console.log(isSheetchart)
        const Sheet_response=await axios.post('http://localhost:8999/investmentsheetfromdb',{organization:localStorage.getItem('organization'),CompanyName:dbCompanyName})
      if(fromApi&&!isSheetchart)
        { 
          console.log('b1')
            const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
            console.log("data01",convertedData)
            
            setmydata(convertedData)
            setFromApi(false)
    
        }
        else if(fromApi&&isSheetchart&&clickedsheetname.length>0)
          {
            setitsfromdatabase(true)
            console.log('b2')
           let dt=JSON.parse(Sheet_response.data.data) 
           let filteredDt=[]
           dt.map(d=>
            filteredDt.push({name:d[selectedXaxis],uv:d[selectedYaxis]})
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
            dt.map(d => filteredDt.push({ name: d[selectedXaxis], uv: d[selectedYaxis] }));
    
            const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
            setmydata(convertedData);
            setFromApi(false);
          }
        else if(isSheetchart&&clickedsheetname.length<=0)
          {
            console.log('b3')
            const convertedData = convertDataTypes(data01[0], {name:chartdatatypex,uv:chartdatatypey});
            console.log("bar",convertedData)
            setmydata(convertedData);
          }
        else{
          console.log('b4')
          const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
            console.log("data01N",convertedData)
            console.log('daat tyep',chartDatatypeX,chartDatatypeY)
            setmydata(convertedData)
        }
    }
    fun()
    
}, []);
useEffect(() => {
  const fun=async()=>{

      const dashboard_response=await axios.post('http://localhost:8999/getDashboardData',{email:localStorage.getItem('email'),organization:localStorage.getItem('organization')})
      const entireData=JSON.parse(dashboard_response.data.data.positions)
      let selectedYaxis=''
      let selectedXaxis=''
      let isSheetchart=''
      let clickedsheetname=''
        let chartdatatypex=''
        let chartdatatypey=''
        let dbCompanyName=''
      console.log("id",id)
      entireData.map((m,index)=>{
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
      console.log(dbCompanyName)
      console.log(isSheetchart)
      const Sheet_response=await axios.post('http://localhost:8999/investmentsheetfromdb',{organization:localStorage.getItem('organization'),CompanyName:dbCompanyName})
    if(fromApi&&!isSheetchart)
      { 
        console.log('b5')
          const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
          console.log("data01",convertedData)
          
          setmydata(convertedData)
          setFromApi(false)
  
      }
      else if(fromApi&&isSheetchart&&clickedsheetname.length>0)
        {
          console.log('b6')
          setitsfromdatabase(true)
         let dt=JSON.parse(Sheet_response.data.data) 
         let filteredDt=[]
         dt.map(d=>
          filteredDt.push({name:d[selectedXaxis],uv:d[selectedYaxis]})
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
          dt.map(d => filteredDt.push({ name: d[selectedXaxis], uv: d[selectedYaxis] }));
  
          const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
          setmydata(convertedData);
          setFromApi(false);
        }
      else if(isSheetchart&&clickedsheetname.length<=0)
        {
          console.log('b7')
          const convertedData = convertDataTypes(data01[0], {name:chartdatatypex,uv:chartdatatypey});
          console.log("bar",convertedData)
          setmydata(convertedData);
        }
      else{
        console.log('b8')
        console.log("barhi",data01)
        const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
          console.log("data01N",convertedData)
          console.log('daat tyep',chartDatatypeX,chartDatatypeY)
          setmydata(convertedData)
      }
  }
  fun()
  
}, [investmentchange]);

  return (
    <div style={{ width: '100%', height: '100%' }} className='mt-8 pr-10'>
      
        <div style={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mydata}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
              <Legend
                width={100}
                wrapperStyle={{
                  top: 40,
                  right: 20,
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #d5d5d5',
                  borderRadius: 3,
                  lineHeight: '40px',
                }}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="uv" fill="#8884d8" barSize={30} />
            </BarChart>
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
             <div className='z-[10] cursor-pointer flex pl-[1px] items-center justify-center w-[20px] rounded-xl h-[20px] bg-red-500 fixed right-[-10px] top-[-15px]' onClick={deleteWidgit}>
              <RxCross2 size={14} className='text-white'/>
            </div>
    </div>
  );
};

export default RenderBarChart;
