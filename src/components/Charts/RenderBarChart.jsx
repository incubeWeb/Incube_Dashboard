import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Bars } from 'react-loader-spinner'; // Correct import for the loader component
import axios from 'axios';
import { RxCross2 } from 'react-icons/rx';


const RenderBarChart = ({investmentchange,id,data01,clickedBar,setClickedBar,fromApi,setFromApi,chartDatatypeX,chartDatatypeY,chartDatatypeFromApiX, chartDatatypeFromApiY,setBoxes,boxes}) => {

  const [mydata,setmydata]=useState([]);
  const [itsfromDatabase,setitsfromdatabase]=useState(false);

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
    const email=localStorage.getItem('email');
    const organization=localStorage.getItem('organization');
    const position=JSON.stringify(boxes.filter((box,index)=>index!=id));
    console.log(boxes);
    console.log("id",id);
    if(boxes.length===0)
    {
      await axios.post('http://localhost:8999/deletedashboard',{email:email,organization:organization});
      setBoxes([]);
    }
    else{
      const response=await axios.post('http://localhost:8999/updatedashboard',{email:email,position:position,organization:organization});
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
    name: chartDatatypeX,
    uv: chartDatatypeY
  };
  const fieldConversionsApi={
    name:chartDatatypeFromApiX,
    uv:chartDatatypeFromApiY
  };

  useEffect(() => {
    const fun=async()=>{
      const dashboard_response=await axios.post('http://localhost:8999/getDashboardData',{email:localStorage.getItem('email'),organization:localStorage.getItem('organization')});
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
      
      entireData.map((m,index)=>{
        if(index==id)
        {
          selectedYaxis=m.selectedYAxis;
          selectedXaxis=m.selectedXAxis;
          isSheetchart=m.isSheetChart;
          clickedsheetname=m.clickedsheetname;
          chartdatatypex=m.chartDatatypeX;
          setmydatatypex(chartdatatypex)
          chartdatatypey=m.chartDatatypeY;
          setmydatatypey(chartdatatypey)
          dbCompanyName=m.dbCompanyName;
          fromdrive=m.fromdrive
          setisitfromdrive(fromdrive)
          selectedsheetidfordrive=m.selectedsheetfromdbname
        }
      });

      const Sheet_response=await axios.post('http://localhost:8999/investmentsheetfromdb',{organization:localStorage.getItem('organization'),CompanyName:dbCompanyName});
      
      if(fromApi && !isSheetchart) { 
        console.log("1")
        const convertedData = convertDataTypes(data01[0], fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
      }
      else if(fromApi && isSheetchart && clickedsheetname.length > 0) {
        console.log("2bar")
        if(fromdrive)
          {
            setitsfromdatabase(true)
            const response=await axios.post('http://localhost:1222/get-google-sheet-json',{sheetId:selectedsheetidfordrive,email:localStorage.getItem('email'),organization:localStorage.getItem('organization')})
              console.log(response,"mysterious")
  
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
  
              const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
              setmydata(convertedData);
              setFromApi(false);
            }
          }
          else{
        setitsfromdatabase(true);
        let dt=JSON.parse(Sheet_response.data.data); 
        let filteredDt = [];
        dt.map(d => filteredDt.push({name: d[selectedXaxis], uv: d[selectedYaxis]}));
        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
          }
      }
      else if (isSheetchart && clickedsheetname.length > 0) {
        console.log("3d")
        if(fromdrive)
          {
            setitsfromdatabase(true)
            const response=await axios.post('http://localhost:1222/get-google-sheet-json',{sheetId:selectedsheetidfordrive,email:localStorage.getItem('email'),organization:localStorage.getItem('organization')})
              console.log(response,"mysterious")
  
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
  
              const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
              setmydata(convertedData);
              setFromApi(false);
            }
          }
          else{
        setitsfromdatabase(true);
        let dt = JSON.parse(Sheet_response.data.data);
        let filteredDt = [];
        dt.map(d => filteredDt.push({ name: d[selectedXaxis], uv: d[selectedYaxis] }));
        const convertedData = convertDataTypes(filteredDt, fieldConversionsApi);
        setmydata(convertedData);
        setFromApi(false);
          }
      }
      else if(isSheetchart && clickedsheetname.length <= 0) {
        console.log("4")
        const convertedData = convertDataTypes(data01[0], {name: chartdatatypex, uv: chartdatatypey});
        setmydata(convertedData);
      }
      else {
        const convertedData = convertDataTypes(data01[0], fieldConversionsNormal);
        console.log("5")
        setmydata(convertedData);
      }
    };
    fun();
  }, [investmentchange]);

  const yAxisTickFormatter = (value) => value; 
  return (
    <div style={{ width: '100%', height: '95%' ,paddingBottom:'15px'}} className='mt-8  pr-10'>
      
      <div style={{ width: '100%', height: '100%' }}>
      {
          mydatatypex=='string' && mydatatypey=='integer'?
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mydata}>
              <XAxis dataKey="name" tick={true} stroke="#8884d8" />
              <YAxis dataKey='uv' tick={true}  tickCount={4}/>
            
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
              
           
              <CartesianGrid stroke="#ccc"   horizontal={true} vertical={false}  />
              <Bar dataKey="uv" fill="#2970FF" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
          :
          mydatatypex=='integer' && mydatatypey=='string'?
          <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={mydata} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        {/* XAxis now handles the 'uv' values (which are numerical) */}
                        <XAxis type="number" tick={true} stroke="#8884d8" />
                        {/* YAxis now handles the 'name' values (which are categorical/strings) */}
                        <YAxis dataKey="uv" type="category" tickFormatter={yAxisTickFormatter} tick={true} />
                        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                        <CartesianGrid stroke="#ccc" horizontal={true} vertical={false} />
                        <Bar dataKey="name" fill="#2970FF" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
          :
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mydata}>
              <XAxis dataKey="name" tick={true} stroke="#8884d8" />
              <YAxis dataKey='uv' tick={true}  tickCount={4}/>
            
              <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
              
           
              <CartesianGrid stroke="#ccc"   horizontal={true} vertical={false}  />
              <Bar dataKey="uv" fill="#2970FF" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
          }
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

      <div className='z-[10] cursor-pointer flex pl-[1px] items-center justify-center w-[20px] rounded-xl h-[20px] bg-gray-100 fixed right-[-10px] top-[-15px] mt-4 mr-3' onClick={deleteWidgit}>
        <RxCross2 size={14} className='text-black'/>
      </div>
    </div>
  );
};

export default RenderBarChart;
