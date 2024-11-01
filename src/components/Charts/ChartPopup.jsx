import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaChevronRight, FaGoogle, FaLessThan } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { FaChartPie } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { BiBorderAll, BiLineChart } from "react-icons/bi";
import { SiGooglesheets } from "react-icons/si";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // If you're using react-icons
import { jwtDecode } from "jwt-decode";
import Bar_Chart from '../Icons/Bar_Chart.svg'
import Pie_Chart from '../Icons/Pie_Chart.svg'
import Line_Chart from '../Icons/Line_Chart.svg'

import { useSheet } from "../SheetContext/SheetContext";


const ChartPopup = ({
  dashboardwidgitref,
  showlist,
  xAxis,
  yAxis,
  setXaxis,
  setYaxis,
  addComponent,
  xAxisValues,
  setXaxisValues,
  yAxisValues,
  setYaxisValues,
  clickedPie,
  setClickedPie,
  data01,
  setdata01,
  piechartCount,
  setpiechartcount,
  settypeofchart,
  boxes,
  setBoxes,
  setShowPopup,
  clickedArea,
  setClickedArea,
  areachartCount,
  setareachartcount,
  clickedBar,
  setClickedBar,
  barchartCount,
  setbarchartcount,
  setchatwidgit,
  chatwidgit,
  chatwidgitcount,
  setchatwidgitcount,
  settimelinewidgit,
  timelinewidget,
  settimelinewidgitcount,
  timelinewidgitcount,
  chartDatatypeY,
  setchartDatatypeY,
  chartDatatypeX,
  setchartDatatypeX,
  isSheetchart,
  setisSheetChart,
  portfoliocardwidgit,
  setportfoliocardwidgit,
  portfoliocardwidgitcount,
  setportfoliocardwidgitcount,
  portfoliocardicon,
  setportfoliocardicon
  
  
}) => {
  const containerStyle = {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    top: 0,
    zIndex: 50,
    backgroundColor: "rgba(247, 250, 252, 0.5)",
    alignItems: "center",
    justifyContent: "center"
  };
  const [clickedManual, setClickedManual] = useState(false);
  const [clickedDatabase,setClickedDatabase]=useState(false)
  const [createPieChart,setCreatepiechart]=useState(false)
  const [createAreaChart,setCreateareachart]=useState(false)
  const [createBarChart,setCreatebarchart]=useState(false)
  const [uploadSheetWindow,setUploadSheetwindow]=useState(false)
  const [SelectedFile,setSelectedFile]=useState(null)
  const [upload,setupload]=useState(false)
  const [showDbSheetRows,setdbsheetrows]=useState(false)
  const [clickedSheetName,setclickedSheetname]=useState('')
  const [dbCompanyName,setdbCompanyName]=useState('')
  const [clickedGoogle,setclickedGoogle]=useState(false)

  
  const [dbSheetIntRows,setDbSheetIntRows]=useState([])
  const [sheetdbdata,setdbsheetdata]=useState([])
  const [selectedSheetXaxis,setselectedSheetxAxis]=useState('')
  const [selectedSheetYaxis,setselectedSheetYaxis]=useState('')

  const [selectedDbSheet,setselectedDbsheet]=useState(false)
  const [presentSheets,setpresentSheets]=useState([])  
  const [selectedsheetfromdbname_orginal,setselectedsheetfromdbname_original]=useState('')
  const [selectedsheetfromdbname,setselectedsheetfromdbname]=useState('')
  const [Loading1,setLoading1]=useState(true);
  const[Loading2,setLoading2]=useState(true);
  
  const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

  
  const handleFileChange = (event) => {
    event.stopPropagation()
    const file = event.target.files[0];
   
    if (file) {
        setSelectedFile(file);
        setupload(!upload)
    }
};

  const handleCancel = (e) => {
    e.stopPropagation()
    setSelectedFile(null);
  };

  const convertPxToPercent = (px, parentPx) => (px / parentPx) * 100;

  const handleUpload = async (e,chart) => {
    e.stopPropagation()
    if (SelectedFile) {
        
        const formData = new FormData();
        formData.append('files', SelectedFile);
        formData.append('name',`${Date.now()}_${chart}`)
        formData.append('uploadedBy',Logemail)
        formData.append('organization',Logorganization)
        formData.append('CompanyName',`DB${Date.now()}_${chart}`)
        try {
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/uploadsheetFile`, formData,{
              headers:{
                "Authorization":`Bearer ${token}`
              }
            });

            const data=JSON.parse(response.data.data)
           // console.log("mydata1",data)
            setdbsheetdata(data)
            setDbSheetIntRows(Object.keys(data[0]))
         
            setSelectedFile(null);
        } catch (error) {
            console.error('Error uploading file', error);
        }
    }
    setdbsheetrows(!showDbSheetRows)
    
  };

  useEffect(()=>{
    
    setselectedSheetxAxis(dbSheetIntRows[0])
    setselectedSheetYaxis(dbSheetIntRows[0])
    setLoading2(false)
    
  },[dbSheetIntRows])

  
  

  const selectedSheetFromDatabase=async(e)=>{
    e.stopPropagation()
    setselectedDbsheet(!selectedDbSheet)
    //console.log('mydata2',selectedsheetfromdbname)
    
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:selectedsheetfromdbname,organization:Logorganization},{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
    if(response.data.status==200)
    {
      const data=JSON.parse(response.data.data)
      const name=response.data.fileName
      const dbcompanyname=response.data.CompanyName
      setclickedSheetname(name)
      setdbCompanyName(dbcompanyname)
     // console.log("mydata2",data)
      setdbsheetdata(data)
      setDbSheetIntRows(Object.keys(data[0]))
      setSelectedFile(null);
    }
    else{
      const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-google-sheet-json`,{sheetId:selectedsheetfromdbname,email:Logemail,organization:Logorganization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })  
            if(response2.data.status==200)
            {
                const allJson=response2.data.data
       
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
                const name=selectedsheetfromdbname_orginal
                const dbcompanyname='Google sheet'
                setclickedSheetname(name)
                setdbCompanyName(dbcompanyname)
               // console.log("mydata3",data)
                setdbsheetdata(data)
                setDbSheetIntRows(Object.keys(data[0]))
          
                setSelectedFile(null);    
            }
            else{
              const name=selectedsheetfromdbname_orginal
                const dbcompanyname='Google sheet'
                setclickedSheetname(name)
                setdbCompanyName(dbcompanyname)
                
                setdbsheetdata([])
                setDbSheetIntRows(['none'])
                setSelectedFile(null);  
            }
    }

  }

 

  const handleselectDatabase=async(e)=>{
    e.stopPropagation();
    
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/alluploadedFiles`,{organization:Logorganization},{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    const filteredData=response.data.data.filter(val=>val.fileType=='xlsx')
   // console.log("my fileted data",response.data.data)
    setpresentSheets(filteredData)
    setLoading1(false);
    setclickedGoogle(false)
    setClickedDatabase(true)
    setselectedsheetfromdbname(filteredData[0]._id)
    
   
  }

  const handleGoogleFunctionality=async(e)=>{
    e.stopPropagation();
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/check-login-google`,{
      email:Logemail,
      organization:Logorganization
    },{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })  
    if(response.data.status==400)
    {
        alert('Google Session Ended')
        return
    }
    else if(response.data.status==-200 && response.data.message=="no refresh token found")
    {
      alert('Google account not connected')
      return
    }
    else if(response.data.status==-200)
    {
      alert('Google account not connectd')
      return
    }
    setClickedDatabase(true)
    setclickedGoogle(true)
    const response3=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-drivesheets`,{
      email:Logemail,
      organization:Logorganization
  },{
    headers:{
      "Authorization":`Bearer ${token}`
    }
  })

  if(response3.data.status==200 && response3.data.message!="no refresh token found")
  {
      const files=response3.data.data
      setpresentSheets(files)
      console.log(files,"google files")
      setselectedsheetfromdbname_original(files[0].name)
  }
  else{
      setpresentSheets([])
  }
    setLoading1(false);
  
   


  }
  const handleSheetData=(e)=>{
    e.stopPropagation()
    setUploadSheetwindow(true)
  }

  const handleCreateBarchart=()=>{
    setXaxisValues([])
    setYaxisValues([])
    xAxisValues.map((val,index)=>setdata01(prev=>[...prev,{name:val,value:parseInt(yAxisValues[index])}]))
      try{
      setbarchartcount(prev=>[...prev,{values:[...data01,...xAxisValues.map((val,index)=>({ name:val,uv:parseInt(yAxisValues[index])}))]}])
      }catch(e)
      {
        setbarchartcount(prev=>[...prev,{values:[...data01,...xAxisValues.map((val,index)=>({name:val,uv:parseInt(yAxisValues[index])}))]}])
      }
      const lastBox = boxes[boxes.length - 1];
      
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 4,
        h: 4, // Add some space below the last box
      };
      try{
        setBoxes([...boxes, { ...newBox, type : "BarChart",selectedsheetfromdbname:selectedsheetfromdbname ,fromdrive:clickedGoogle, barchartCount:[...data01,...xAxisValues.map((val,index)=>({name:val,uv:parseInt(yAxisValues[index])}))] }]);
      }catch(e)
      {
        setBoxes([...boxes, { ...newBox, type : "BarChart",selectedsheetfromdbname:selectedsheetfromdbname ,fromdrive:clickedGoogle, barchartCount:[...data01,...xAxisValues.map((val,index)=>({name:val,uv:parseInt(yAxisValues[index])}))] }]);
      }
      setShowPopup(false);
      setdata01([])
     // setdata01(da) 
      setClickedBar(false)
      setCreatebarchart(!createBarChart)
      setClickedManual(false)
      settypeofchart("BarChart")
      setXaxis(0)
      setYaxis(0)
  }


  const handleCreateAreachart=()=>{
    xAxisValues.map((val,index)=>setdata01(prev=>[...prev,{name:val,value:parseInt(yAxisValues[index])}]))
      try{
      setareachartcount(prev=>[...prev,{values:[...data01,...xAxisValues.map((val,index)=>({ pv:parseInt(val),uv:parseInt(yAxisValues[index])}))]}])
      }catch(e)
      {
        setareachartcount(prev=>[...prev,{values:[...data01,...xAxisValues.map((val,index)=>({pv:val,uv:parseInt(yAxisValues[index])}))]}])
      }

      

      const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 4,
        h: 4, // Add some space below the last box // Add some space below the last box
      };
      try{
        setBoxes([...boxes, { ...newBox, type : "Areachart",selectedsheetfromdbname:selectedsheetfromdbname ,fromdrive:clickedGoogle, areachartCount:[...data01,...xAxisValues.map((val,index)=>({pv:parseInt(val),uv:parseInt(yAxisValues[index])}))] }]);
      }catch(e)
      {
        setBoxes([...boxes, { ...newBox, type : "Areachart" ,selectedsheetfromdbname:selectedsheetfromdbname,fromdrive:clickedGoogle, areachartCount:[...data01,...xAxisValues.map((val,index)=>({pv:val,uv:parseInt(yAxisValues[index])}))] }]);
      }
      setShowPopup(false);
      setdata01([])
     // setdata01(da) 
      setCreateareachart(!createAreaChart)
      setClickedManual(false)
      settypeofchart("Areachart")
      setXaxis(0)
      setClickedArea(false)
      setYaxis(0)
  }

  const handlesheetxAxis=(e,value)=>{
    e.stopPropagation()
    
  }
  const handlesheetyAxis=(e,value)=>{
    e.stopPropagation()
    
  }

  
 
  useEffect(()=>{
    
    if(clickedPie)
    {
      sheetdbdata.map((val)=>

        setdata01(prev=>[...prev,{name:val[selectedSheetXaxis],value:val[selectedSheetYaxis]}])
        )
    }
    if(clickedArea)
    {
      sheetdbdata.map((val)=>
      { 
        if(val[selectedSheetXaxis]!=undefined && val[selectedSheetYaxis]!=undefined)
        {
          setdata01(prev=>[...prev,{pv:val[selectedSheetXaxis],uv:val[selectedSheetYaxis]}])
        }
      })
    }
    if(clickedBar)
      {
        sheetdbdata.map((val)=>
        { 
          if(val[selectedSheetXaxis]!=undefined && val[selectedSheetYaxis]!=undefined)
          {
            setdata01(prev=>[...prev,{name:val[selectedSheetXaxis],uv:val[selectedSheetYaxis]}])
          }
        })
        
      }
      setdata01([]);
  },[selectedSheetXaxis,selectedSheetYaxis,sheetdbdata,setdata01,clickedPie,clickedArea,clickedBar])

  const handleSheetCreatePiechartDB=()=>{
    setisSheetChart(!isSheetchart)
    setpiechartcount([{values:data01}])
      const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 4,
        h: 4, // Add some space below the last box// Add some space below the last box
      };
      setBoxes([...boxes, { ...newBox, type : "Piechart",selectedsheetfromdbname:selectedsheetfromdbname ,fromdrive:clickedGoogle, piechartCount:data01,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,isSheetChart:true,selectedXAxis:selectedSheetXaxis,selectedYAxis:selectedSheetYaxis,clickedsheetname:clickedSheetName,dbCompanyName:dbCompanyName }]);
      setShowPopup(false);
      setdbCompanyName('')
      setdata01([])
     // setdata01(da) 
      setCreatepiechart(!createPieChart)
      setClickedManual(false) 
      settypeofchart("Piechart")
      setXaxis(0)
      setYaxis(0)
      setClickedPie(false)
      setchartDatatypeX('string')    
      setchartDatatypeY('string')  
 }

  const handleSheetCreatePiechart=()=>{

    setisSheetChart(!isSheetchart)
    setpiechartcount([{values:data01}])
      const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 4,
        h: 4, // Add some space below the last box// Add some space below the last box
      };
      setBoxes([...boxes, { ...newBox, type : "Piechart",selectedsheetfromdbname:selectedsheetfromdbname ,fromdrive:clickedGoogle, piechartCount:data01,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,isSheetchart:false,clickedsheetname:clickedSheetName,dbCompanyName:dbCompanyName,selectedXAxis:selectedSheetXaxis,selectedYAxis:selectedSheetYaxis, }]);
      setShowPopup(false);
      setdata01([])
      setdbCompanyName('')
     // setdata01(da) 
      setCreatepiechart(!createPieChart)
      setClickedManual(false) 
      settypeofchart("Piechart")
      setXaxis(0)
      setYaxis(0)
      setClickedPie(false)
      setchartDatatypeX('string')    
      setchartDatatypeY('string')  
 }
 const handleSheetCreateAreachartDB=()=>{

   
    setareachartcount([{values:data01}])
      const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 4,
        h: 4, // Add some space below the last box// Add some space below the last box
      };
      setBoxes([...boxes, { ...newBox, type : "Areachart",selectedsheetfromdbname:selectedsheetfromdbname ,fromdrive:clickedGoogle, areachartCount:data01 ,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,isSheetChart:true,selectedXAxis:selectedSheetXaxis,selectedYAxis:selectedSheetYaxis,clickedsheetname:clickedSheetName,dbCompanyName:dbCompanyName,}]);
      setShowPopup(false);
      setdata01([])
      setdbCompanyName('')
     // setdata01(da) 
      setCreateareachart(!createAreaChart)
      setClickedManual(false) 
      settypeofchart("Areachart")
      setXaxis(0)
      setYaxis(0)
      setClickedArea(false)
      setchartDatatypeX('string')    
      setchartDatatypeY('string')  
 }


 const handleSheetCreateAreachart=()=>{

    

    setareachartcount([{values:data01}])
      const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 4,
        h: 4, // Add some space below the last box// Add some space below the last box
      };
      setBoxes([...boxes, { ...newBox, type : "Areachart",selectedsheetfromdbname:selectedsheetfromdbname ,fromdrive:clickedGoogle, areachartCount:data01 ,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,isSheetChart:false,selectedXAxis:selectedSheetXaxis,selectedYAxis:selectedSheetYaxis,clickedsheetname:clickedSheetName,dbCompanyName:dbCompanyName}]);
      setShowPopup(false);
      setdata01([])
      setdbCompanyName('')
     // setdata01(da) 
      setCreateareachart(!createAreaChart)
      setClickedManual(false) 
      settypeofchart("Areachart")
      setXaxis(0)
      setYaxis(0)
      setClickedArea(false)
      setchartDatatypeX('string')    
      setchartDatatypeY('string')  
 }

 const handleSheetCreateBarchartDB=()=>{


  setbarchartcount([{values:data01}])
    const lastBox = boxes[boxes.length - 1];
    const newBox = {
      id: lastBox ? lastBox.id + 1 : 1,
      x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 4,
        h: 4, // Add some space below the last box// Add some space below the last box
    };
    setBoxes([...boxes, { ...newBox, type : "BarChart",selectedsheetfromdbname:selectedsheetfromdbname ,fromdrive:clickedGoogle, barchartCount:data01,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,isSheetChart:true,selectedXAxis:selectedSheetXaxis,selectedYAxis:selectedSheetYaxis,clickedsheetname:clickedSheetName,dbCompanyName:dbCompanyName }]);
    setShowPopup(false);
    setdata01([])
    setdbCompanyName('')
   // setdata01(da) 
    setCreatebarchart(!createBarChart)
    setClickedManual(false) 
    settypeofchart("BarChart")
    setXaxis(0)
    setYaxis(0)
    setClickedBar(false)
    setchartDatatypeX('string')    
    setchartDatatypeY('string')  
 }

 const handleSheetCreateBarchart=()=>{


  setbarchartcount([{values:data01}])
    const lastBox = boxes[boxes.length - 1];
    const newBox = {
      id: lastBox ? lastBox.id + 1 : 1,
      x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 4,
        h: 4, // Add some space below the last box// Add some space below the last box
    };
    setBoxes([...boxes, { ...newBox, type : "BarChart",selectedsheetfromdbname:selectedsheetfromdbname ,fromdrive:clickedGoogle, barchartCount:data01,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,isSheetChart:false,selectedXAxis:selectedSheetXaxis,selectedYAxis:selectedSheetYaxis,clickedsheetname:clickedSheetName,dbCompanyName:dbCompanyName }]);
    setShowPopup(false);
    setdata01([])
    setdbCompanyName('')
   // setdata01(da) 
    setCreatebarchart(!createBarChart)
    setClickedManual(false) 
    settypeofchart("BarChart")
    setXaxis(0)
    setYaxis(0)
    setClickedBar(false)
    setchartDatatypeX('string')    
    setchartDatatypeY('string')  
 }
 

  const handleCreatePiechart=()=>{
      xAxisValues.map((val,index)=>setdata01(prev=>[...prev,{name:val,value:parseInt(yAxisValues[index])}]))
    
      setpiechartcount(prev=>[...prev,{values:[...data01,...xAxisValues.map((val,index)=>({name:val,value:parseInt(yAxisValues[index])}))]}])
      const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 4,
        h: 4, // Add some space below the last box// Add some space below the last box
      };
      setBoxes([...boxes, { ...newBox, type : "Piechart",selectedsheetfromdbname:selectedsheetfromdbname ,fromdrive:clickedGoogle, piechartCount:[...data01,...xAxisValues.map((val,index)=>({name:val,value:parseInt(yAxisValues[index])}))]}]);
      setShowPopup(false);
      setdata01([])
     // setdata01(da) 
      setCreatepiechart(!createPieChart)
      setClickedManual(false) 
      settypeofchart("Piechart")
      setXaxis(0)
      setYaxis(0)
      setClickedPie(false)
   }
   const handleAssignedDealswidgit=(e)=>{
    e.stopPropagation()
    settypeofchart('AssignedDeals')
    setchatwidgit(false)
    const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 3,
        h: 4, // Add some space below the last box
      };
    setBoxes([...boxes, { ...newBox, type : "AssignedDeals" }]);
    setShowPopup(false); 
  } 

  const handlechatwidgit=(e)=>{
    e.stopPropagation()
    settypeofchart('chat')
    setchatwidgit(true)
    const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 3,
        h: 4, // Add some space below the last box // Add some space below the last box
      };
    setBoxes([...boxes, { ...newBox, type : "chat" }]);
    setShowPopup(false); 
  }

  const handlecalendarwidgit=(e)=>{
    e.stopPropagation()
    settypeofchart('calendarwidgit')
    setchatwidgit(false)
    const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 3,
        h: 3, // Add some space below the last box// Add some space below the last box
      };
    setBoxes([...boxes, { ...newBox, type : "calendarwidgit" }]);
    setShowPopup(false); 
  }

  const handletimelinewidgit=(e)=>{
    e.stopPropagation()
    settypeofchart('timeline')

    settimelinewidgit((prev)=>!prev)
    const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 4,
        h: 2, // Add some space below the last box
      };
    setBoxes([...boxes, { ...newBox, type : "timeline" }]);
    setShowPopup(false); 
  }

  const handleNewsWidgit=(e)=>{
    e.stopPropagation()
    settypeofchart('news')

    const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 3,
        h: 3, // Add some space below the last box // Add some space below the last box
      };
    setBoxes([...boxes, { ...newBox, type : "news" }]);
    setShowPopup(false); 
  }


  const handlePortfoliocardwidgit=(e)=>{
    e.stopPropagation()
    settypeofchart('portfoliocard')
    setportfoliocardwidgit(!portfoliocardwidgit)

    const lastBox = boxes[boxes.length - 1];
      const newBox = {
        id: lastBox ? lastBox.id + 1 : 1,
        x: (boxes.length * 2) % 12, // Adds in the next available position
        y: Math.floor(boxes.length / 6),
        w: 3,
        h: 2, // Add some space below the last box // Add some space below the last box
      };
      setBoxes([...boxes, { ...newBox, type : "portfoliocard" , portfoliowidgitcount:{id:boxes.length +1,labelname:"Enter Label",showValue:"0",currencyValue:"&"}}]);
      setShowPopup(false);
  }

  const handleClickedPie = (e) => {
    e.stopPropagation(); // Prevent triggering the outer div's onClick
    setClickedPie(true);
    setClickedManual(false)
    setClickedDatabase(false)
    setCreatepiechart(false)
    setCreateareachart(false)
    setCreatebarchart(false)
    setUploadSheetwindow(false)
    setSelectedFile(null)
    setupload(false)
    setdbsheetrows(false)
    setclickedSheetname('')
    setdbCompanyName('')
    setclickedGoogle(false)

  
    setDbSheetIntRows([])
  setdbsheetdata([])
  setselectedSheetxAxis('')
  setselectedSheetYaxis('')

  setselectedDbsheet(false)
  setpresentSheets([])  
  setselectedsheetfromdbname('')
  setselectedsheetfromdbname_original('')
  
  };
  const handleClickedArea = (e) => {
    e.stopPropagation(); // Prevent triggering the outer div's onClick
    setClickedArea(true);
    
    setClickedManual(false)
    setClickedDatabase(false)
    setCreatepiechart(false)
    setCreateareachart(false)
    setCreatebarchart(false)
    setUploadSheetwindow(false)
    setSelectedFile(null)
    setupload(false)
    setdbsheetrows(false)
    setclickedSheetname('')
    setdbCompanyName('')
    setclickedGoogle(false)

  
    setDbSheetIntRows([])
  setdbsheetdata([])
  setselectedSheetxAxis('')
  setselectedSheetYaxis('')

  setselectedDbsheet(false)
  setpresentSheets([])  
  setselectedsheetfromdbname('')
  setselectedsheetfromdbname_original('')
  };
  const handleClickedBar = (e) => {
    e.stopPropagation(); // Prevent triggering the outer div's onClick
    setClickedBar(true);
    setClickedManual(false)
    setClickedDatabase(false)
    setCreatepiechart(false)
    setCreateareachart(false)
    setCreatebarchart(false)
    setUploadSheetwindow(false)
    setSelectedFile(null)
    setupload(false)
    setdbsheetrows(false)
    setclickedSheetname('')
    setdbCompanyName('')
    setclickedGoogle(false)

  
    setDbSheetIntRows([])
  setdbsheetdata([])
  setselectedSheetxAxis('')
  setselectedSheetYaxis('')

  setselectedDbsheet(false)
  setpresentSheets([])  
  setselectedsheetfromdbname('')
  setselectedsheetfromdbname_original('')

  };

  const handleXaxisValues = (index, value) => {
    const newVal = [...xAxisValues];
    newVal[index] = value;
    setXaxisValues(newVal);
  };

  const handleYaxisValues = (index, value) => {
    const newVal = [...yAxisValues];
    newVal[index] = value;
    setYaxisValues(newVal);
  };

  useEffect(() => {

  }, [yAxis]);

  const handleManualCreation = (e) => {
    e.stopPropagation(); // Prevent triggering the outer div's onClick
    setClickedManual(true);
  };

  const handleXaxis = (e) => {
    e.stopPropagation();
  };

  const handleYaxis = (e) => {
    e.stopPropagation();
  };
  const handlesetselecteddbsheetname=(e)=>{
    e.stopPropagation()
    const raw=e.target.value
    const valueid=raw.split("seperator_~bhavesh")[0]
    const valuename=raw.split("seperator_~bhavesh")[1]
    setselectedsheetfromdbname(valueid)
    setselectedsheetfromdbname_original(valuename)
    
  }

  useEffect(()=>{
    const mergedData=[...dbSheetIntRows,
      ...sheetdbdata,
      ...presentSheets
    ]
    sessionStorage.setItem("Bot_Data",(JSON.stringify(mergedData)))
      },[dbSheetIntRows,sheetdbdata,presentSheets])

  return (
    <div 
      style={containerStyle}
      className=" font-sans  font-semibold  "
      onClick={showlist}
    >
      <div className="relative flex  bg-white rounded-lg   w-[30%] flex-col h-[70%] p-4" onClick={(e) => e.stopPropagation()}>
        {clickedPie && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] rounded-lg absolute bg-white shadow-lg top-0 left-0">
            <div className="w-[100%] flex justify-end">
              <div className="flex w-[80%]">
                <FaArrowLeftLong className="cursor-pointer absolute top-2 left-2" size={20} onClick={() => setClickedPie(false)} />
              </div>
              <div className="flex w-[20%] justify-end absolute top-2 right-2">
                <RxCross2 size={22} className="cursor-pointer  ml-15  rounded-full" onClick={showlist} />
              </div>
            </div>
            <div className="w-[100%] h-[100%] space-y-4 flex flex-col items-center justify-start mt-[10%]">

              <div className="w-[100%] h-[17%] text-[14px] relative flex flex-row items-center justify-start">
             
                <p className="w-[40%] text-[16px] font-inter font-semibold ">Select sheet</p>
                <div className="w-[30%] ">
                  <img src={Pie_Chart} className="w-5 h-5" />
               
                </div>
              </div>
             
              <div
                onClick={(e)=>handleManualCreation(e)}
                className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded-lg flex p-2 items-center border-[1px]"
              >
                <p className="w-[70%]">Manual chart creation</p>
                <div className="w-[30%] flex justify-end">
                  <FaChevronRight />
                </div>
              </div>
              <div onClick={(e)=>handleselectDatabase(e)} className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400  rounded-lg flex p-2 items-center border-[1px]">
                <p className="w-[70%]">Select Database</p>
                <div className="w-[30%] flex justify-end">
                  <FaChevronRight />
                </div>
              </div>
              <div
              onClick={(e)=>handleSheetData(e)}
              className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded-lg flex p-2 items-center border-[1px]"
            >
              <p className="w-[70%]">Upload Sheet data</p>
              <div className="w-[30%] flex justify-end text-green-500">
                <SiGooglesheets size={20}/>
              </div>
            </div>
            <div onClick={(e)=>handleGoogleFunctionality(e)} className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded-lg flex p-2 items-center border-[1px]">
              <p className="w-[70%]">Connect Google</p>
              <div className="w-[30%] flex justify-end text-red-600">
                <FaGoogle size={20}/>
              </div>
            </div>
            </div>
            </div>
         
        )}
        {clickedArea && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute rounded-xl bg-white top-0 left-0">
            <div className="w-[100%] flex  relative justify-end">
              <div className="flex w-[80%]">
                <FaArrowLeftLong className="cursor-pointer -mt-2" size={20} onClick={() => setClickedArea(false)} />
              </div>
              <div className="flex w-[20%] justify-end">
                <RxCross2 size={22} className="cursor-pointer  -mt-2  rounded-full" onClick={showlist} />
              </div>
            </div>
            <div className="w-[100%] h-[100%] space-y-4 flex flex-col items-center justify-start mt-[10%]">
              <div className="w-[100%] h-[17%] text-[14px] flex items-center justify-start">
                <p className="w-[40%] text-[16px] font-inter font-semibold">Select sheet</p>
                <div className="w-[30%] ">
                  <img src={Line_Chart} className="w-5 h-5" />
                </div>
              </div>
              <div
                onClick={(e)=>handleManualCreation(e)}
                className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded-lg flex p-2 items-center border-[1px]"
              >
                <p className="w-[70%]">Manual chart creation</p>
                <div className="w-[30%] flex justify-end">
                  <FaChevronRight />
                </div>
              </div>
              <div onClick={(e)=>handleselectDatabase(e)} className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded-lg flex p-2 items-center border-[1px]">
                <p className="w-[70%]">Select Database</p>
                <div className="w-[30%] flex justify-end">
                  <FaChevronRight />
                </div>
              </div>
              <div
              onClick={(e)=>handleSheetData(e)}
              className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded-lg flex p-2 items-center border-[1px]"
            >
              <p className="w-[70%]">Upload Sheet data</p>
              <div className="w-[30%] flex justify-end text-green-500">
                <SiGooglesheets size={20}/>
              </div>
            </div>
            <div onClick={(e)=>handleGoogleFunctionality(e)} className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded-lg flex p-2 items-center border-[1px]">
              <p className="w-[70%]">Connect Google</p>
              <div className="w-[30%] flex justify-end text-red-600">
                <FaGoogle size={20}/>
              </div>
            </div>
              
            </div>
          </div>
        )}
        {clickedBar && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute rounded-xl bg-white top-0 left-0">
            <div className="w-[100%] flex justify-end">
              <div className="flex w-[80%]">
                <FaArrowLeftLong className="cursor-pointer mt-2" size={20} onClick={() => setClickedBar(false)} />
              </div>
              <div className="flex w-[20%] justify-end">
                <RxCross2 size={22} className="cursor-pointer mt-2 " onClick={showlist} />
              </div>
            </div>
            <div className="w-[100%] h-[100%] space-y-4 flex flex-col items-center justify-start mt-[10%]">
              <div className="w-[100%] h-[17%] text-[14px] flex items-center justify-start">
                <p className="w-[40%] text-[16px] font-inter font-semibold">Select sheet</p>
                <div className="w-[30%]">
                   <img src={Bar_Chart} className="w-5 h-5"/>
                </div>
              </div>
              <div
                onClick={(e)=>handleManualCreation(e)}
                className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded-lg flex p-2 items-center border-[1px]"
              >
                <p className="w-[70%]">Manual chart creation</p>
                <div className="w-[30%] flex justify-end">
                  <FaChevronRight />
                </div>
              </div>
              <div onClick={(e)=>handleselectDatabase(e)} className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded flex p-2 items-center border-[1px]">
                <p className="w-[70%]">Select Database</p>
                <div className="w-[30%] flex justify-end">
                  <FaChevronRight />
                </div>
              </div>
              <div
              onClick={(e)=>handleSheetData(e)}
              className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded-lg flex p-2 items-center border-[1px]"
            >
              <p className="w-[70%]">Upload Sheet data</p>
              <div className="w-[30%] flex justify-end text-green-500">
                <SiGooglesheets size={20}/>
              </div>
            </div>
            <div onClick={(e)=>handleGoogleFunctionality(e)} className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-400 rounded-lg flex p-2 items-center border-[1px]">
              <p className="w-[70%]">Connect Google</p>
              <div className="w-[30%] flex justify-end text-red-600">
                <FaGoogle size={20}/>
              </div>
            </div>
            </div>
          </div>
        )}
        {clickedManual &&clickedPie && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white shadow-lg top-0 left-0">
            <div className="w-[100%] flex relative justify-end">
              <div className="flex w-[80%] absolute left-2 top-2">
                <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedManual(!clickedManual)} />
              </div>
              <div className="flex w-[20%] absolute right-2 top-2 justify-end">
                <RxCross2 size={20} className="cursor-pointer rounded-full" onClick={showlist} />
              </div>
            </div>
            <div className="w-[100%] h-[100%] space-y-4 flex flex-col items-center justify-start mt-[30%]">
              <div className="w-[100%] h-[17%] text-[14px] flex items-center justify-start">
                <p className="w-[70%] text-[16px] font-inter font-semibold">Chart values:</p>
              </div>
              <div
                className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-300 rounded-md flex p-2 items-center flex-col border-[1px]"
              >
                <div className="w-[100%] h-[100%] flex flex-row">
                  <p className="w-[70%] font-inter">X-Axis</p>
                  <div className="w-[30%] flex  items-center  justify-end">
                    <input
                      type="number"
                      className="pl-2 outline-none w-[60px] h-[25px] rounded-md flex border-[1px] border-gray-600"
                      onClick={(e)=>handleXaxis(e)}
                      onChange={(e) => {
                        setXaxis(e.target.value);
                        setYaxis(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              {xAxis > 0 && (
                <div
                  className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] text-[14px] border-gray-300 flex p-2 items-center flex-col border-[1px]"
                >
                  <div className="w-[100%] space-x-2 h-[100%] flex flex-row overflow-x-auto">
                    {Array.from({ length: xAxis }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        className="outline-none pl-2 text-[13px] w-[60px] h-[28px] rounded-md border-[1px] border-gray-600"
                        onClick={(e)=>handleXaxis(e)}
                        onChange={(e) => handleXaxisValues(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-300 flex p-2 items-center border-[1px]">
                <p className="w-[70%]">Y-Axis</p>
                <div className="w-[30%] flex justify-end">
                  <p
                    className="pl-2 outline-none w-[60px] h-[25px] rounded-md border-[1px] border-gray-600"
                    onClick={(e)=>handleYaxis(e)}
                    onChange={() => setYaxis(xAxis)}
                  >
                    {xAxis}
                  </p>
                </div>
              </div>
              {yAxis > 0 && (
                <div
                  className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] text-[14px] border-gray-300 flex p-2 items-center flex-col border-[1px]"
                >
                  <div className="w-[100%] space-x-2 h-[100%] flex flex-row overflow-x-auto">
                    {Array.from({ length: yAxis }).map((_, index) => (
                      <input
                        key={index}
                        type="number"
                        className="outline-none pl-2 text-[13px] w-[60px] h-[28px] rounded-md border-[1px] border-gray-600"
                        onClick={(e)=>handleYaxis(e)}
                        onChange={(e) => handleYaxisValues(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div
                onClick={(e)=>handleCreatePiechart(e)}
                className="hover:shadow-md hover:bg-sky-500 shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-300 flex p-2 items-center border-[1px]"
              >
                <p className="w-[70%]">Create Pie chart</p>
                <div className="w-[30%] flex justify-end pr-3">
                  <div>
                    <FaChartPie size={20}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {clickedDatabase &&clickedPie && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
          <div className="w-[100%] flex justify-end">
            <div className="flex w-[80%]">
              <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedDatabase(!clickedDatabase)} />
            </div>
            <div className="flex w-[20%] justify-end">
              <RxCross2 size={20} className="cursor-pointer  rounded-full" onClick={showlist} />
            </div>
          </div>
          <div className="w-[100%] h-[100%] space-y-2 flex flex-col items-center justify-start mt-[30%]">
            <div className="w-[100%] h-[17%] text-[14px] flex flex-row items-center justify-start">
              <p className="w-[60%] text-[16px] font-bold font-inter">Select your desired File:</p>
              <div className="w-[30%] ">
                <img src={Pie_Chart} className="w-5 h-5"/>
              </div>
            </div>
            <div className="w-[100%] flex h-[30%] items-center space-x-2">
              <select onChange={handlesetselecteddbsheetname} className="border-[1px] rounded-md border-gray-400 w-[80%] h-[40px] text-[14px]">
              {Loading1 ? (
    <option>
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
        Loading...
      </div>
    </option>
  ) : 
  clickedGoogle?
  (
    presentSheets.map(sheet=>
      
    <option key={sheet.id} value={sheet.id+"seperator_~bhavesh"+sheet.name} >{sheet.name}</option>
    
  )
):
(
  presentSheets.map(sheet => {
  const sheetName = sheet.name.replace(/^\d+_/, ""); // Remove any digits followed by an underscore
  return (
    <option key={sheet._id} value={sheet._id}>
      {sheetName}
    </option>
  );
})
)
  
  
  
  }
              </select>
              <div className="w-[120px] rounded-md cursor-pointer h-[40px] bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-center">  
              {Loading1 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : (
                <p className="text-[14px] " onClick={(e)=>selectedSheetFromDatabase(e)}>Confirm sheet</p>)}
              </div>
            </div>
            
          </div>
        </div>
        )}
        {selectedDbSheet&&clickedDatabase &&clickedPie && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
          <div className="w-[100%] flex justify-end">
            <div className="flex w-[80%]">
              <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedPie(false)} />
            </div>
            <div className="flex w-[20%] justify-end">
              <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
            </div>
          </div>
          <div className="flex flex-col w-[100%] h-[100%] items-center justify-center space-y-3">
           
            <div className=" w-[100%] h-[10%] items-center justify-center flex flex-row space-x-2">
                <div><p className="text-[14px]">Name field:</p></div>
                <select className="text-[14px] w-[60%] h-[100%] border-[1px] rounded-md border-gray-600 outline-none" onClick={(e)=>handlesheetxAxis(e,e.target.value)} onChange={(e)=>setselectedSheetxAxis(e.target.value)}>
                {Loading2 ? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
        Loading...
      </div>
    </option>
  ) : (
                    
                    dbSheetIntRows.map(val=>
                      <option value={val.id} key={val.id}>{val}</option>
                    )
         ) }
                </select>
             
       

                <select onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 rounded-md text-[14px] border-[1px] h-[100%] p-2">
                  <option>string</option>
                  <option >integer</option>
                </select>
              </div>
              <div className=" w-[100%] h-[10%] items-center justify-center flex flex-row space-x-2">
                <div><p className="text-[14px]">Value field:</p></div>
                <select className="text-[14px] w-[60%] h-[100%] border-[1px] rounded-md border-gray-600 outline-none" onClick={(e)=>handlesheetyAxis(e,e.target.value)} onChange={(e)=>setselectedSheetYaxis(e.target.value)}>
                {Loading2 ? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
        Loading...
      </div>
    </option>
  ) : (
                    dbSheetIntRows.map(val=>
                      <option key={val._id}>{val}</option>
                    )
                   ) }
                </select>
                <select onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 rounded-md text-[14px] border-[1px] h-[100%] p-2">
                  <option>string</option>
                  <option >integer</option>
                </select>
              </div>
              <div onClick={(e)=>handleSheetCreatePiechartDB(e)} className="cursor-pointer select-none w-[100%] h-[30px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">{Loading2 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : (
                  <p className="text-[14px] text-white">Create the Pie chart</p>
           )} </div>
          </div>
      </div>
        )}
        {uploadSheetWindow &&clickedPie && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
          <div className="w-[100%] flex justify-end">
            <div className="flex w-[80%]">
              <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setUploadSheetwindow(!uploadSheetWindow)} />
            </div>
            <div className="flex w-[20%] justify-end">
              <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
            </div>
          </div>
              { 
                upload&&!showDbSheetRows?
                <div className="flex flex-col items-center justify-center w-full h-[100%]">
                                <p className="text-sm text-gray-700">{SelectedFile.name}</p>
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        className="px-4 py-2 bg-blue-500 shadow-md border-sky-500 border-[1px] text-white rounded-md text-[12px]"
                                        onClick={(e)=>handleUpload(e,'Pie chart')}
                                    >
                                        Upload
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md text-[12px] border-red-500 border-[1px]"
                                        onClick={(e)=>handleCancel(e)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>:
                <div className="flex items-center justify-center w-full h-[100%] mt-4">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-[100%] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                          }
      </div>
        )}
        { 
                showDbSheetRows&&uploadSheetWindow &&clickedPie&&(
                <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
                                <div className="w-[100%] flex justify-end">
                                  <div className="flex w-[80%]">
                                    <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedPie(false)} />
                                  </div>
                                  <div className="flex w-[20%] justify-end">
                                    <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
                                  </div>
                                </div>
                                <div className="flex flex-col w-[100%] h-[100%] items-center justify-center space-y-3">
                                    
                                    <div className=" w-[100%] h-[10%] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">X-axis field:</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] rounded-md border-gray-600 outline-none" onClick={(e)=>handlesheetxAxis(e,e.target.value)} onChange={(e)=>setselectedSheetxAxis(e.target.value)}>
                                        {
                                          
                                          dbSheetIntRows.map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 rounded-md text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                    </div>
                                    <div className=" w-[100%] h-[7%] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">Value field:</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none rounded-md" onClick={(e)=>handlesheetyAxis(e,e.target.value)} onChange={(e)=>setselectedSheetYaxis(e.target.value)}>
                                        {
                                          dbSheetIntRows.map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 rounded-md text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                    </div>
                                    <div onClick={(e)=>handleSheetCreatePiechart(e)} className="cursor-pointer select-none w-[100%] h-[30px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">
                                        <p className="text-[14px] text-white">Create the Pie chart</p>
                                    </div>
                                </div>
                            </div>)
              }


            {/*Area Sheet Logic */}

            {clickedDatabase &&clickedArea && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
          <div className="w-[100%] flex justify-end">
            <div className="flex w-[80%]">
              <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedDatabase(!clickedDatabase)} />
            </div>
            <div className="flex w-[20%] justify-end">
              <RxCross2 size={20} className="cursor-pointer" onClick={showlist} />
            </div>
          </div>
          <div className="w-[100%] h-[100%] space-y-2 flex flex-col items-center justify-start mt-[30%]">
            <div className="w-[100%] h-[17%] text-[14px] flex flex-row items-center justify-start">
              <p className="w-[60%] text-[16px] font-inter font-semibold">Select your desired File:</p>
              <div className="w-[30%] pl-2">
                <img src={Line_Chart} className="w-5 h-5"/>
              </div>
            </div>
            <div className="w-[100%] flex h-[30%] items-center space-x-2">
              <select onChange={handlesetselecteddbsheetname} className="border-[1px] rounded-md border-gray-400 w-[80%] h-[40px] text-[14px]">
              {Loading1 ? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> {/* Spinner icon */}
        Loading...
      </div>
    </option>
  ) : 
  clickedGoogle?
  (
    presentSheets.map(sheet=>
      
    <option key={sheet.id} value={sheet.id+"seperator_~bhavesh"+sheet.name} >{sheet.name}</option>
    
  )
)
:
(
  presentSheets.map(sheet => {
  const sheetName = sheet.name.replace(/^\d+_/, ""); // Remove any digits followed by an underscore
  return (
    <option key={sheet._id} value={sheet._id}>
      {sheetName}
    </option>
  );
})
)
  }
              </select>
              <div className="w-[120px] h-[40px] cursor-pointer bg-gradient-to-r from-sky-500 to-blue-600 rounded-md text-white flex items-center justify-center"> {Loading1 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : (
                <p className="text-[14px]" onClick={(e)=>selectedSheetFromDatabase(e)}>Confirm sheet</p>)}
              </div>
            </div>
            
          </div>
        </div>
        )}
        {selectedDbSheet&&clickedDatabase &&clickedArea && (
         <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
         <div className="w-[100%] flex justify-end">
           <div className="flex w-[80%]">
             <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedArea(false)} />
           </div>
           <div className="flex w-[20%] justify-end">
             <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
           </div>
         </div>
         <div className="flex flex-col w-[100%] h-[100%] items-center justify-center space-y-3">
             <div className=" w-[100%] h-[10%] items-center justify-center flex flex-row space-x-2">
               <div><p className="text-[14px]">X-axis field:</p></div>
               <select className="text-[14px] w-[60%] h-[100%] border-[1px] rounded-md border-gray-600 outline-none" onClick={(e)=>handlesheetxAxis(e,e.target.value)} onChange={(e)=>setselectedSheetxAxis(e.target.value)}>
               {Loading2? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> {/* Spinner icon */}
        Loading...
      </div>
    </option>
  ) : (
                   
                   dbSheetIntRows.map(val=>
                     <option key={val.id}>{val}</option>
                   )
         ) }
               </select>
               <select onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 rounded-md text-[14px] border-[1px] h-[100%] p-2">
                 <option>string</option>
                 <option >integer</option>
               </select>
             </div>
             <div className=" w-[100%] h-[10%] items-center justify-center flex flex-row space-x-2">
               <div><p className="text-[14px]">Y-axis field:</p></div>
               <select className="text-[14px] w-[60%] h-[100%] border-[1px] rounded-md border-gray-600 outline-none" onClick={(e)=>handlesheetyAxis(e,e.target.value)} onChange={(e)=>setselectedSheetYaxis(e.target.value)}>
               {Loading2 ? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> {/* Spinner icon */}
        Loading...
      </div>
    </option>
  ) : (
                   dbSheetIntRows.map(val=>
                     <option key={val.id}>{val}</option>
                   )
         ) }
               </select>
               <select onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 rounded-md text-[14px] border-[1px] h-[100%] p-2">
                 <option>string</option>
                 <option >integer</option>
               </select>
             </div>
             <div onClick={(e)=>handleSheetCreateAreachartDB(e)} className="cursor-pointer select-none w-[100%] h-[30px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">{Loading2 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : (
                 <p className="text-[14px] text-white">Create the Line chart</p>)}
             </div>
         </div>
     </div>
        )}
        {uploadSheetWindow &&clickedArea && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
          <div className="w-[100%] flex justify-end">
            <div className="flex w-[80%]">
              <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setUploadSheetwindow(!uploadSheetWindow)} />
            </div>
            <div className="flex w-[20%] justify-end">
              <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
            </div>
          </div>
              { 
                upload&&!showDbSheetRows?
                <div className="flex flex-col items-center justify-center w-full h-[100%]">
                                <p className="text-sm text-gray-700">{SelectedFile.name}</p>
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        className="px-4 py-2 bg-blue-500 shadow-md border-sky-500 border-[1px] text-white rounded-md text-[12px]"
                                        onClick={(e)=>handleUpload(e,'Area chart')}
                                    >
                                        Upload
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md text-[12px] border-red-500 border-[1px]"
                                        onClick={(e)=>handleCancel(e)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>:
                <div className="flex items-center justify-center w-full h-[100%] mt-4">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-[100%] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                          }
      </div>
        )}
        { 
                showDbSheetRows&&uploadSheetWindow &&clickedArea&&(
                <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
                                <div className="w-[100%] flex justify-end">
                                  <div className="flex w-[80%]">
                                    <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedArea(false)} />
                                  </div>
                                  <div className="flex w-[20%] justify-end">
                                    <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
                                  </div>
                                </div>
                                <div className="flex flex-col w-[100%] h-[100%] items-center justify-center space-y-3">
                                    <div className=" w-[100%] h-[10%] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">X-axis field:</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onClick={(e)=>handlesheetxAxis(e,e.target.value)} onChange={(e)=>setselectedSheetxAxis(e.target.value)}>
                                        {
                                          
                                          dbSheetIntRows.map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                    </div>
                                    <div className=" w-[100%] h-[10%] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">Y-axis field:</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onClick={(e)=>handlesheetyAxis(e,e.target.value)} onChange={(e)=>setselectedSheetYaxis(e.target.value)}>
                                        {
                                          dbSheetIntRows.map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                    </div>
                                    <div onClick={(e)=>handleSheetCreateAreachart(e)} className="cursor-pointer select-none w-[100%] h-[30px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">
                                        <p className="text-[14px] text-white">Create the Line chart</p>
                                    </div>
                                </div>
                            </div>)
              }

         {/*Area Sheet Logic end */}

          


        {clickedManual && clickedArea && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
            <div className="w-[100%] flex justify-end">
              <div className="flex w-[80%]">
                <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedManual(!clickedManual)} />
              </div>
              <div className="flex w-[20%] justify-end">
                <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
              </div>
            </div>
            <div className="w-[100%] h-[100%] space-y-2 flex flex-col items-center justify-start mt-[30%]">
              <div className="w-[100%] h-[17%] text-[14px] flex flex-row items-center justify-start">
                <p className="w-[70%] text-[16px]">Chart values:</p>
                
              </div>
              <div
                className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[10%] text-[14px] border-gray-300 flex p-2 items-center flex-col border-[1px]"
              >
                <div className="w-[100%] h-[100%] flex flex-row">
                  <p className="w-[70%]">X-Axis</p>
                  <div className="w-[30%] flex justify-end">
                    <input
                      type="number"
                      className="pl-2 outline-none w-[60px] h-[25px] rounded-md border-[1px] border-gray-600"
                      onClick={(e)=>handleXaxis(e)}
                      onChange={(e) => {
                        setXaxis(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              {xAxis > 0 && (
                <div
                  className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] text-[14px] border-gray-300 flex p-2 items-center flex-col border-[1px]"
                >
                  <div className="w-[100%] space-x-2 h-[100%] flex flex-row overflow-x-auto">
                    {Array.from({ length: xAxis }).map((_, index) => (
                      <input
                        key={index}
                        type="number"
                        className="outline-none pl-2 text-[13px] w-[60px] h-[28px] rounded-md border-[1px] border-gray-600"
                        onClick={(e)=>handleXaxis(e)}
                        onChange={(e) => handleXaxisValues(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-300 flex p-2 items-center border-[1px]">
                <p className="w-[70%]">Y-Axis</p>
                <div className="w-[30%] flex justify-end">
                  <input
                    className="pl-2 outline-none w-[60px] h-[25px] rounded-md border-[1px] border-gray-600"
                    onClick={(e)=>handleYaxis(e)}
                    onChange={(e) => setYaxis(e.target.value)}
                  />
                  
                </div>
              </div>
              {yAxis > 0 && (
                <div
                  className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] text-[14px] border-gray-300 flex p-2 items-center flex-col border-[1px]"
                >
                  <div className="w-[100%] space-x-2 h-[100%] flex flex-row overflow-x-auto">
                    {Array.from({ length: yAxis }).map((_, index) => (
                      <input
                        key={index}
                        type="number"
                        className="outline-none pl-2 text-[13px] w-[60px] h-[28px] rounded-md border-[1px] border-gray-600"
                        onClick={(e)=>handleYaxis(e)}
                        onChange={(e) => handleYaxisValues(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div
                onClick={(e)=>handleCreateAreachart(e)}
                className="hover:shadow-md hover:bg-sky-500 shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-300 flex p-2 items-center border-[1px]"
              >
                <p className="w-[70%]">Create Line chart</p>
                <div className="w-[30%] flex justify-end pr-3">
                  <div>
                    <BiLineChart size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


      {/*Bar chart sheet start */}

      {clickedDatabase &&clickedBar && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
          <div className="w-[100%] flex justify-end">
            <div className="flex w-[80%]">
              <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedDatabase(!clickedDatabase)} />
            </div>
            <div className="flex w-[20%] justify-end">
              <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full"  onClick={showlist} />
            </div>
          </div>
          <div className="w-[100%] h-[100%] space-y-2 flex flex-col items-center justify-start mt-[30%]">
          
            <div className="w-[100%] h-[17%] text-[14px] flex flex-row items-center justify-start">
              <p className="w-[60%] text-[16px] font-inter font-semibold">Select your desired File:</p>
              <div className="w-[30%] ">
                <img src={Bar_Chart} className="w-5 h-5"/>
              </div>
            </div>
            <div className="w-[100%] flex h-[30%] items-center space-x-2">
              <select onChange={handlesetselecteddbsheetname} className="border-[1px] rounded-md border-gray-400 w-[80%] h-[40px] text-[14px]">
              {Loading1 ? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
        Loading...
      </div>
    </option>
  ) : 
  clickedGoogle?
  (
    presentSheets.map(sheet=>
      
    <option key={sheet.id} value={sheet.id+"seperator_~bhavesh"+sheet.name}>{sheet.name}</option>
    
  )
)
:
(
  presentSheets.map(sheet => {
  const sheetName = sheet.name.replace(/^\d+_/, ""); // Remove any digits followed by an underscore
  return (
    <option key={sheet._id} value={sheet._id}>
      {sheetName}
    </option>
  );
})
)
  
  }
              </select>
              <div className="w-[120px] h-[40px] cursor-pointer bg-gradient-to-r rounded-md from-sky-500 to-blue-600 text-white flex items-center justify-center">{Loading1? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : (
                <p className="text-[14px]" onClick={(e)=>selectedSheetFromDatabase(e)}>Confirm sheet</p>)}
              </div>
            </div>
            
          
            
          </div>
        </div>
        )}
        {selectedDbSheet&&clickedDatabase &&clickedBar && (
        <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
        <div className="w-[100%] flex justify-end">
          <div className="flex w-[80%]">
            <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedBar(false)} />
          </div>
          <div className="flex w-[20%] justify-end">
            <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
          </div>
        </div>
        <div className="flex flex-col w-[100%] h-[100%] items-center justify-center space-y-3">
            <div className=" w-[100%] h-[10%] items-center justify-center flex flex-row space-x-2">
              <div><p className="text-[14px]">X-axis field:</p></div>
              <select className="text-[14px] w-[60%] h-[100%] border-[1px] rounded-md border-gray-600 outline-none" onClick={(e)=>handlesheetxAxis(e,e.target.value)} onChange={(e)=>setselectedSheetxAxis(e.target.value)}>
              {Loading2 ? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> {/* Spinner icon */}
        Loading...
      </div>
    </option>
  ) : (
                  
                  dbSheetIntRows.map(val=>
                    <option key={val.id}>{val}</option>
                  )
         ) }
              </select>
              <select onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 rounded-md text-[14px] border-[1px] h-[100%] p-2">
                <option>string</option>
                <option >integer</option>
              </select>
             
            </div>
            <div className=" w-[100%] h-[%] items-center justify-center flex flex-row space-x-2">
              <div><p className="text-[14px]">Y-axis field:</p></div>
              <select className="text-[14px] w-[60%] h-[100%] border-[1px] rounded-md border-gray-600 outline-none" onClick={(e)=>handlesheetyAxis(e,e.target.value)} onChange={(e)=>setselectedSheetYaxis(e.target.value)}>
              {Loading2 ? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> {/* Spinner icon */}
        Loading...
      </div>
    </option>
  ) : (
                  dbSheetIntRows.map(val=>
                    <option key={val.id}>{val}</option>
                  )
        )}
              </select>
              <select onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 rounded-md text-[14px] border-[1px] h-[100%] p-2">
                <option>string</option>
                <option >integer</option>
              </select>
              
            </div>
            <div onClick={(e)=>handleSheetCreateBarchartDB(e)} className="cursor-pointer select-none w-[100%] h-[30px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">
            {Loading2 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : (
                <p className="text-[14px] text-white">Create the Bar chart</p>)}
            </div>
        </div>
    </div>
        )}
        
        {uploadSheetWindow &&clickedBar && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
          <div className="w-[100%] flex justify-end">
            <div className="flex w-[80%]">
              <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setUploadSheetwindow(!uploadSheetWindow)} />
            </div>
            <div className="flex w-[20%] justify-end">
              <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
            </div>
          </div>
              { 
                upload&&!showDbSheetRows?
                <div className="flex flex-col items-center justify-center w-full h-[100%]">
                                <p className="text-sm text-gray-700">{SelectedFile.name}</p>
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        className="px-4 py-2 bg-blue-500 shadow-md border-sky-500 border-[1px] text-white rounded-md text-[12px]"
                                        onClick={(e)=>handleUpload(e,'Bar chart')}
                                    >
                                        Upload
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md text-[12px] border-red-500 border-[1px]"
                                        onClick={(e)=>handleCancel(e)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>:
                <div className="flex items-center justify-center w-full h-[100%] mt-4">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-[100%] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                          }
      </div>
        )}
        { 
                showDbSheetRows&&uploadSheetWindow &&clickedBar&&(
                <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
                                <div className="w-[100%] flex justify-end">
                                  <div className="flex w-[80%]">
                                    <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedBar(false)} />
                                  </div>
                                  <div className="flex w-[20%] justify-end">
                                    <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
                                  </div>
                                </div>
                                <div className="flex flex-col w-[100%] h-[100%] items-center justify-center space-y-3">
                                    <div className=" w-[100%] h-[7%] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">X-axis field:</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] rounded-md border-gray-600 outline-none" onClick={(e)=>handlesheetxAxis(e,e.target.value)} onChange={(e)=>setselectedSheetxAxis(e.target.value)}>
                                        {
                                          
                                          dbSheetIntRows.map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 rounded-md text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                      {chartDatatypeX}
                                    </div>
                                    <div className=" w-[100%] h-[7%] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">Y-axis field:</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 rounded-md outline-none" onClick={(e)=>handlesheetyAxis(e,e.target.value)} onChange={(e)=>setselectedSheetYaxis(e.target.value)}>
                                        {
                                          dbSheetIntRows.map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 rounded-md text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                      {chartDatatypeY}
                                    </div>
                                    <div onClick={(e)=>handleSheetCreateBarchart(e)} className="cursor-pointer select-none w-[100%] h-[30px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">
                                        <p className="text-[14px] text-white">Create the Bar chart</p>
                                    </div>
                                </div>
                            </div>)
              }


      {/*Bar chart end */}
        
{clickedManual && clickedBar && (
          <div className="p-4 pl-8 pr-8 flex flex-col w-[100%] h-[100%] absolute bg-white top-0 left-0">
            <div className="w-[100%] flex justify-end">
              <div className="flex w-[80%]">
                <FaArrowLeftLong className="cursor-pointer" size={20} onClick={() => setClickedManual(!clickedManual)} />
              </div>
              <div className="flex w-[20%] justify-end">
                <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
              </div>
            </div>
            <div className="w-[100%] h-[100%] space-y-2 flex flex-col items-center justify-start mt-[30%]">
              <div className="w-[100%] h-[17%] text-[14px] flex items-center justify-start">
                <p className="w-[70%] text-[16px]">Chart values:</p>
              </div>
              <div
                className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-300 flex p-2 items-center flex-col border-[1px]"
              >
                <div className="w-[100%] h-[100%] flex flex-row">
                  <p className="w-[70%]">X-Axis</p>
                  <div className="w-[30%] flex justify-end">
                    <input
                      type="number"
                      className="pl-2 outline-none w-[60px] h-[25px] rounded-md border-[1px] rounded-md border-gray-600"
                      onClick={(e)=>handleXaxis(e)}
                      onChange={(e) => {
                        setXaxis(e.target.value);
                        setYaxis(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              {xAxis > 0 && (
                <div
                  className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] text-[14px] border-gray-300 flex p-2 items-center flex-col border-[1px]"
                >
                  <div className="w-[100%] space-x-2 h-[100%] flex flex-row overflow-x-auto">
                    {Array.from({ length: xAxis }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        className="outline-none pl-2 text-[13px] w-[60px] h-[28px] rounded-md border-[1px]  border-gray-600"
                        onClick={(e)=>handleXaxis(e)}
                        onChange={(e) => handleXaxisValues(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-300 flex p-2 items-center border-[1px]">
                <p className="w-[70%]">Y-Axis</p>
                <div className="w-[30%] flex justify-end">
                  <p
                    className="pl-2 outline-none w-[60px] h-[25px] rounded-md border-[1px] border-gray-600"
                    onClick={(e)=>handleYaxis(e)}
                    onChange={() => setYaxis(xAxis)}
                  >
                    {xAxis}
                  </p>
                </div>
              </div>
              {yAxis > 0 && (
                <div
                  className="hover:shadow-md shadow-gray-300 cursor-pointer w-[100%] text-[14px] border-gray-300 flex p-2 items-center flex-col border-[1px]"
                >
                  <div className="w-[100%] space-x-2 h-[100%] flex flex-row overflow-x-auto">
                    {Array.from({ length: yAxis }).map((_, index) => (
                      <input
                        key={index}
                        type="number"
                        className="outline-none pl-2 text-[13px] w-[60px] h-[28px] rounded-md border-[1px] border-gray-600"
                        onClick={(e)=>handleYaxis(e)}
                        onChange={(e) => handleYaxisValues(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div
                onClick={(e)=>handleCreateBarchart(e)}
                className="hover:shadow-md hover:bg-sky-500 shadow-gray-300 cursor-pointer w-[100%] h-[11%] text-[14px] border-gray-300 flex p-2 items-center border-[1px]"
              >
               
                <p className="w-[70%]">Create Bar chart</p>
                <div className="w-[30%] flex justify-end pr-3">
                  <div>
                    <IoBarChart size={20}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="w-[100%]  flex justify-end pr-3">
          <RxCross2 size={20} className="cursor-pointer bg-gray-100 rounded-full" onClick={showlist} />
        </div>
        <ul className="mt-10 font-inter space-y-3 p-4 overflow-y-auto ">
          <div
              onClick={handletimelinewidgit}
              className="hover:text-white w-[100%] flex hover:bg-sky-500 ease-in duration-150 cursor-pointer text-[15px] h-[15%] items-center p-5 border border-gray-400 rounded-lg"
            >
              <p className="w-[70%] ">Timeline</p>
              <div className="w-[30%] flex justify-end">
                <FaChevronRight className="text-gray-500" />
              </div>
          </div>
          <div
              onClick={handlePortfoliocardwidgit}
              className="hover:text-white w-[100%] flex hover:bg-sky-500 ease-in duration-150 cursor-pointer text-[15px] h-[15%] items-center p-5 border border-gray-400 rounded-lg"
            >
              <p className="w-[70%]">Portfolio Card</p>
              <div className="w-[30%] flex justify-end">
                <FaChevronRight  className="text-gray-500" />
              </div>
          </div>
          <div
              onClick={handlechatwidgit}
              className="hover:text-white w-[100%] flex hover:bg-sky-500 ease-in duration-150 cursor-pointer text-[15px] h-[15%] items-center p-5 border border-gray-400 rounded-lg"
            >
              <p className="w-[70%]">Chat</p>
              <div className="w-[30%] flex justify-end">
                <FaChevronRight className="text-gray-500" />
              </div>
            </div>
          <div
            onClick={handlecalendarwidgit}
            className="hover:text-white w-[100%] flex hover:bg-sky-500 ease-in duration-150 cursor-pointer text-[15px] h-[15%] items-center p-5 border border-gray-400 rounded-lg"
          >
            <p className="w-[70%]">Calendars</p>
            <div className="w-[30%] flex justify-end">
              <FaChevronRight className="text-gray-500" />
            </div>
          </div>
          <div
            onClick={handleNewsWidgit}
            className="hover:text-white w-[100%] flex hover:bg-sky-500 ease-in duration-150 cursor-pointer text-[15px] h-[15%] items-center p-5 border border-gray-400 rounded-lg"
          >
            <p className="w-[70%]">News</p>
            
            <div className="w-[30%] flex justify-end">
            
              <FaChevronRight  className="text-gray-500"/>
            </div>
          </div>
          <div
            onClick={handleAssignedDealswidgit}
            className="hover:text-white w-[100%] flex hover:bg-sky-500 ease-in duration-150 cursor-pointer text-[15px] h-[15%] items-center p-5 border border-gray-400 rounded-lg"
          >
            <p className="w-[70%]">Assigned deals</p>
            <div className="w-[30%] flex justify-end">
              <FaChevronRight className="text-gray-500" />
            </div>
          </div>
          <div
            onClick={handleClickedPie}
            className="hover:text-white w-[100%] flex hover:bg-sky-500 ease-in duration-150 cursor-pointer text-[15px] h-[15%] items-center p-5 border border-gray-400 rounded-lg"
          >
            <p style={{ marginBottom: "10px" }} className="w-[70%] pt-2">
              Pie Chart
            </p>
            <div className="w-[30%] flex justify-end">
              <FaChevronRight className="text-gray-500" />
            </div>
          </div>
          <div
            onClick={handleClickedBar}
            className="hover:text-white w-[100%] flex hover:bg-sky-500 ease-in duration-150 cursor-pointer text-[15px] h-[15%] items-center p-5 border border-gray-400 rounded-lg"
          >
            <p style={{ marginBottom: "10px" }} className="w-[70%] pt-2">
              Bar Chart
            </p>
            <div className="w-[30%] flex justify-end">
              <FaChevronRight className="text-gray-500" />
            </div>
          </div>
          <div
            onClick={handleClickedArea}
            className="hover:text-white w-[100%] flex hover:bg-sky-500 ease-in duration-150 cursor-pointer text-[15px] h-[15%] items-center p-5 border border-gray-400 rounded-lg"
          >
            <p className="w-[70%]">Line Chart</p>
            <div className="w-[30%] flex justify-end">
              <FaChevronRight className="text-gray-500" />
            </div>
          </div>
        </ul>
      </div>
    </div>
   
  );
};

export default ChartPopup;
