import axios from 'axios'
import React, { useEffect, useState ,useRef} from 'react'
import { FaChartLine, FaChartPie, FaRegFileExcel } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoBarChart, IoRefresh } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { VscGraphLine } from 'react-icons/vsc'
import PortfolioBarChart from './PortfolioBarChart'
import PortfolioPieChart from './PortfolioPieChart'
import PortfolioLineChart from './PortfolioLineChart'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import PortfolioMeter from './PortfolioMeter'
import { Bars } from 'react-loader-spinner'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsBarChartFill } from "react-icons/bs";
import { jwtDecode } from 'jwt-decode'
import { createSlice } from '@reduxjs/toolkit';
import { useSheet } from '../SheetContext/SheetContext.jsx';
import Bar_Chart from '../Icons/Bar_Chart.svg'
import Pie_Chart from '../Icons/Pie_Chart.svg'
import Line_Chart from '../Icons/Line_Chart.svg'


const PortfolioTopGraph = ({PortfolioGraphvalues,PortfolioMetervalue,selectedTab,portfoliosecurity,hidenavbar,sheetedited,realtimeportfoliostate}) => {
    const [chartselectpopup,setchartselectpopup]=useState(false)
    const [clickedBar,setclickedBar]=useState(false)
    const [clickedPie,setclickedPie]=useState(false)
    const [clickedLine,setclickedLine]=useState(false)
    const [loading2,setloading2]=useState(true)
    const popupRef = useRef(null);
    const [sheetclicked,setsheetClicked]=useState('')

    const [sheetJson,setsheetJson]=useState([])
    const [sheetrowsSelect,setsheetrowsselect]=useState(false)
    const [sheetrowsSelectPie,setsheetrowsselectPie]=useState(false)
    const [sheetrowsSelectLine,setsheetrowsselectLine]=useState(false)
    const [allsheet,setallSheets]=useState([])
    const [sheetKeys,setsheetKeys]=useState([])
    const [sheetfieldselectedX,setsheetfieldselectedX]=useState('')
    const [sheetfieldselectedY,setsheetfieldselectedY]=useState('')
    const [chartDatatypeX,setchartDatatypeX]=useState('string')
    const [chartDatatypeY,setchartDatatypeY]=useState('string')
    const [showBarchart,setshowBarchart]=useState(false)
    const [showPiechart,setshowPiechart]=useState(false)
    const [showLinechart,setshowLinechart]=useState(false)

    const [changeChart,setchangeChart]=useState(false)
    const [loading,setloading]=useState(true)
    const[Loading1,setLoading1]=useState(true)
    const [googlesheetfiles,setgooglesheetfiles]=useState([])
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const { setSheetJson } = useSheet();
    const[sheetname,setsheetname]=useState([]);
    const [selectedSheetName, setSelectedSheetName] = useState("");
    
    setSheetJson(sheetJson);

    useEffect(()=>{
        const fun=async()=>{
            let sheetid=sheetedited.fullDocument.editedSheet;
            if(sheetclicked==sheetid)
            {
                const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:sheetid,organization:Logorganization},{
                    headers:{
                      "Authorization":`Bearer ${token}`
                    }
                  })
                    const data=JSON.parse(response.data.data)
                    setsheetJson(data)

           
                    
            const organization=`${Logorganization}_ShownGraph`
            const stateJson={showBarchart:showBarchart,showPiechart:showPiechart,showLinechart:showLinechart,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,sheetJson:data,sheetfieldselectedX,sheetfieldselectedY,sheetclicked:sheetclicked,selectedSheetName:selectedSheetName}
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
                email:Logemail,
                security:portfoliosecurity,
                Graphorganization:organization,
                portfolioState:JSON.stringify(stateJson)
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })

            }

        }
        if(Object.keys(sheetedited).length>0)
        {
        fun()
        }
    },[sheetedited])
    


    const RefreshSheets=()=>{
        setavailableDatabaseSheets()
    }
   

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setchangeChart(false);
      }
    };

    if (changeChart) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [changeChart]);


    useEffect(()=>{
        setloading(true)
    },[selectedTab])

    useEffect(()=>{
        const setGraphValues=async()=>{
           console.log("graphs",PortfolioGraphvalues)
            
            if(PortfolioGraphvalues.length==0)
            {

                setshowBarchart(false)
                setshowPiechart(false)
                setshowLinechart(false)
                setchartDatatypeX('string')
                setchartDatatypeY('string')
                setsheetJson([])
                setsheetfieldselectedX('')
                setsheetfieldselectedY('')
                setsheetClicked(false)
                setTimeout(()=>{
                    setloading(false)
                },1000)
                
                return
            }

          
            
            
            const stateValues=JSON.parse(PortfolioGraphvalues)
            
            setshowBarchart(stateValues.showBarchart)
            setshowPiechart(stateValues.showPiechart)
            setshowLinechart(stateValues.showLinechart)
            setchartDatatypeX(stateValues.chartDatatypeX)
            setchartDatatypeY(stateValues.chartDatatypeY)
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:stateValues.sheetclicked,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
                const data=JSON.parse(response.data.data)
            setsheetJson(data)
            setsheetJson(stateValues.sheetJson)
            setsheetfieldselectedX(stateValues.sheetfieldselectedX)
            setsheetfieldselectedY(stateValues.sheetfieldselectedY)
            setsheetClicked(stateValues.sheetclicked)
            setSelectedSheetName(stateValues.selectedSheetName)
            
            setloading(false)
            
        }
        setGraphValues()
        
    },[PortfolioGraphvalues])



    const handleChartSelectPopup=()=>{
        setchartselectpopup(true)
    }
    const setavailableDatabaseSheets=async()=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/alluploadedFiles`,{organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
            
          })
         
        const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-document-visibility`,{
            email:Logemail,
            organization:Logorganization
        },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
        const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
        
        const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
        const tosetdata=[...response2.data.data,...filteredSet1]

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
            setgooglesheetfiles(files)
        }
        console.log("tx",response3.data.data)
        setsheetname(response3.data.data)
        setallSheets(tosetdata)
        setloading2(false)
        console.log("pk",tosetdata)

        
    }

    const handleGooglesheetclicked=async (id,name)=>{
       
        setsheetClicked(id)
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-google-sheet-json`,{sheetId:id,email:Logemail,organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
         
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
     
        setsheetJson(finalJson)
                const key=Object.keys(finalJson[0])
                
                const fileteredKey=[]
                finalJson.map(d=>{
                    key.map(k=>{
                        if(d[k]!=""&&!fileteredKey.includes(k)){
                        fileteredKey.push(k)
                        }
                    }
                    )
                })
                setsheetfieldselectedX(fileteredKey[0])
                setsheetfieldselectedY(fileteredKey[0])
                setsheetKeys(fileteredKey)  
                   
    }


    const handlesheetclicked=async (id)=>{
            setsheetClicked(id)
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:id,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
                const data=JSON.parse(response.data.data)
             console.log("zt",data)
                setsheetJson(data)
                const key=Object.keys(data[0])
              
                const fileteredKey=[]
                data.map(d=>{
                    key.map(k=>{
                        if(d[k]!=""&&!fileteredKey.includes(k)){
                        fileteredKey.push(k)
                        }
                    }
                    )
                })
                setsheetfieldselectedX(fileteredKey[0])
                setsheetfieldselectedY(fileteredKey[0])
                setsheetKeys(fileteredKey)
                setLoading1(false) 
    }
    const handlesheetclickedPie=async (id)=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:id,organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
            const data=JSON.parse(response.data.data)
           
            setsheetJson(data)
            const key=Object.keys(data[0])
            
            const fileteredKey=[]
            data.map(d=>{
                key.map(k=>{
                    if(d[k]!=""&&!fileteredKey.includes(k)){
                    fileteredKey.push(k)
                    }
                }
                )
            })
            setsheetfieldselectedX(fileteredKey[0])
            setsheetfieldselectedY(fileteredKey[0])
            setsheetKeys(fileteredKey)
            setLoading1(false) 
    }
    const handlesheetclickedLine=async (id)=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:id,organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
            const data=JSON.parse(response.data.data)
            setsheetJson(data)
            const key=Object.keys(data[0])
            
            const fileteredKey=[]
            data.map(d=>{
                key.map(k=>{
                    if(d[k]!=""&&!fileteredKey.includes(k)){
                    fileteredKey.push(k)
                    }
                }
                )
            })
            setsheetfieldselectedX(fileteredKey[0])
            setsheetfieldselectedY(fileteredKey[0])
            setsheetKeys(fileteredKey)
            setLoading1(false) 
            console.log("Line",data)
    }
    const handleSheetCreateBarchart=async()=>{
        //create bar chart Logic

        setsheetrowsselect(false)
        setshowBarchart(true)
        setshowLinechart(false)
        setshowPiechart(false)

        const organization=`${Logorganization}_ShownGraph`
            const stateJson={showBarchart:true,showPiechart:false,showLinechart:false,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,sheetJson:sheetJson,sheetfieldselectedX,sheetfieldselectedY,sheetclicked:sheetclicked,selectedSheetName:selectedSheetName}
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
                email:Logemail,
                security:portfoliosecurity,
                Graphorganization:organization,
                portfolioState:JSON.stringify(stateJson)
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
           
            setLoading1(false) 
        
    }
    const handleSheetCreatePiechart=async()=>{
        //create bar chart Logic
        setsheetrowsselectPie(false)
        
        setshowPiechart(true)
        setshowLinechart(false)
        setshowBarchart(false)

        const organization=`${Logorganization}_ShownGraph`
            const stateJson={showBarchart:false,showPiechart:true,showLinechart:false,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,sheetJson:sheetJson,sheetfieldselectedX,sheetfieldselectedY,sheetclicked:sheetclicked,selectedSheetName:selectedSheetName}
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
                email:Logemail,
            security:portfoliosecurity,
            Graphorganization:organization,
                portfolioState:JSON.stringify(stateJson)
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            
    }
    const handleSheetCreateLinechart=async()=>{
        //create bar chart Logic
        setsheetrowsselectLine(false)
        
        setshowLinechart(true)
        setshowPiechart(false)
        setshowBarchart(false)

        const organization=`${Logorganization}_ShownGraph`
            const stateJson={showBarchart:false,showPiechart:false,showLinechart:true,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,sheetJson:sheetJson,sheetfieldselectedX,sheetfieldselectedY,sheetclicked:sheetclicked,selectedSheetName:selectedSheetName}
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
                email:Logemail,
                security:portfoliosecurity,
                Graphorganization:organization,
                portfolioState:JSON.stringify(stateJson)
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            
    }

    useEffect(()=>
    {   if(clickedBar || clickedPie || clickedLine)
        {
            setavailableDatabaseSheets()
        }
    },[clickedBar,clickedPie,clickedLine])





            useEffect(() => {
                const handleClickOutside = (event) => {
                    if (popupRef.current && !popupRef.current.contains(event.target)) {
                        setclickedBar(false);
                        setchartselectpopup(false);
                        setclickedPie(false); 
                        setclickedLine(false);
                        
                    }
                };
        
                document.addEventListener('mousedown', handleClickOutside);
                return () => {
                    document.removeEventListener('mousedown', handleClickOutside);
                };
            }, []);


    
  return (
    <div className=' font-roboto h-[300px] w-[100%] flex flex-col'>
        
        <div className='flex flex-row h-[100%]  space-x-6'>
        {chartselectpopup ? (
            <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50 ${hidenavbar ? 'w-full' : 'left-20 w-[80%]'}`}
      >
                    <div ref={popupRef} className='p-4 flex flex-col w-[360px] h-auto space-y-4 bg-white shadow-xl rounded-lg transition-all duration-300'>
                        <div className='flex items-center justify-between bg-blue-500 rounded-md p-2 text-white'>
                            <h2 className='text-[14px] font-semibold'>Select Chart Type</h2>
                            <button onClick={() => setchartselectpopup(false)}>
                                <RxCross2 className='w-6 h-6 hover:opacity-75 transition-opacity' />
                            </button>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div 
                                onClick={() => { setclickedBar(true); setclickedLine(false); setclickedPie(false); setchartselectpopup(false); }} 
                                className='hover:bg-gray-100  hover:text-gray-800  transition duration-200 cursor-pointer rounded-md text-left p-2 flex items-center justify-between'
                            >
                                <span className='text-[14px] font-inter font-semibold text-gray-700'>Bar Chart</span>
                                <img src={Bar_Chart} className=' w-5 h-5' />
                            </div>
                            <div 
                                onClick={() => { setclickedPie(true); setclickedBar(false); setclickedLine(false); setchartselectpopup(false); }} 
                                className='hover:bg-gray-100  hover:text-gray-800  transition duration-200 cursor-pointer rounded-md text-left p-3 flex items-center justify-between'
                            >
                                <span className='text-[14px] font-inter font-semibold text-gray-700'>Pie Chart</span>
                                <img src={Pie_Chart} className=' w-5 h-5' />
                            </div>
                            <div 
                                onClick={() => { setclickedLine(true); setclickedBar(false); setclickedPie(false); setchartselectpopup(false); }} 
                                className='hover:bg-gray-100 hover:text-gray-800 transition duration-200 cursor-pointer rounded-md text-left p-3 flex items-center justify-between'
                            >
                                <span className='text-[14px] font-inter font-semibold text-gray-700'>Line Chart</span>
                                <img src={Line_Chart} className=' w-5 h-5' />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
 
            {clickedBar ? (
                <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50 ${hidenavbar ? 'w-full' : 'left-20 w-[80%]'}`}
  >
        <div ref={popupRef} className='p-4 flex flex-col w-[400px] h-[400px] space-y-4 bg-white shadow-lg rounded-lg transition-all duration-300'>
        <div className='flex items-center font-inter bg-blue-500 rounded-md px-2 justify-between h-[50px]'>
                <div className='flex items-center cursor-pointer' onClick={() => { setclickedBar(false); setchartselectpopup(true); }}>
                    <IoMdArrowRoundBack className='w-[20px] mr-2 text-white' />
                    <p className='text-[14px] font-semibold flex justify-center text-white  ml-8 items-center'>Select Sheet for Bar Chart</p>
                </div>
                <div className='flex items-center space-x-2'>
                    <div className='cursor-pointer' onClick={() => { RefreshSheets(); }}>
                        <IoRefresh size={20} className='text-white hover:text-black' />
                    </div>
                </div>
            </div>

            <div className='flex flex-col overflow-y-auto scrollbar-hide flex-grow'>
                {loading2 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Bars color="#8884d8" height={40} width={40} />
                    </div>
                ) : (
                    <>
                        {allsheet.length === 0 && googlesheetfiles.length === 0 ? (
                            <p className='text-gray-500 text-center font-semibold'>No sheets found</p>
                        ) : (
                            <>
                                <div className='font-inter text-[16px] font-semibold mb-2'>
                                    <p className='border-b pb-2'>Database Sheets:</p>
                                </div>
                                {(allsheet || []).map(val => 
                                    val.fileType === 'xlsx' ? (
                                        <div 
                                            key={val._id} 
                                            onClick={() => { setsheetrowsselect(true); setclickedBar(false); handlesheetclicked(val._id);  setSelectedSheetName(val.name.replace(/^\d+_/, ""));}} 
                                            className='hover:bg-gray-100 tracking-wider cursor-pointer rounded-md hover:text-gray-700 w-full h-[40px] flex items-center justify-between p-2'
                                        >
                                            <p className='text-[14px]'>{val.name.replace(/^\d+_/, "")}</p>
                                            <FaRegFileExcel className='text-green-700' />
                                        </div>
                                    ) : null
                                )}
                            </>
                        )}
                    </>
                )}
                {googlesheetfiles.length > 0 && (
                    <div className='font-inter text-[16px] font-semibold mt-4'>
                        <p className='border-b pb-2'>Google Sheets:</p>
                    </div>
                )}
                {(googlesheetfiles || []).map(val => 
                    <div key={val._id} onClick={() => { setsheetrowsselect(true); setclickedBar(false); handleGooglesheetclicked(val.id, val.name);  setSelectedSheetName(val.name);}} className='hover:bg-gray-100 tracking-wider cursor-pointer rounded-md hover:text-gray-700 w-full h-[40px] flex items-center justify-between p-2'>
                        <p className='text-[14px]'>{val.name}</p>
                        <FaRegFileExcel className='text-green-700' />
                    </div>
                )}
            </div>
        </div>
    </div>
) : null}

{clickedLine ? (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50 ${hidenavbar ? 'w-full' : 'left-20 w-[80%]'}`}
  >
<div ref={popupRef} className='p-4 flex flex-col w-[400px] h-[400px] space-y-4 bg-white shadow-lg rounded-lg transition-all duration-300'>
<div className='flex items-center font-inter bg-blue-500 rounded-md px-2 justify-between h-[50px]'>
  <div className='flex items-center cursor-pointer' onClick={() => { setclickedLine(false); setchartselectpopup(true); }}>
      <IoMdArrowRoundBack className='w-[20px] mr-2 text-white' />
      <p className='text-[14px] font-semibold flex justify-center text-white  ml-8 items-center'>Select Sheet for Line Chart</p>
  </div>
  <div className='flex items-center space-x-2'>
      <div className='cursor-pointer' onClick={() => { RefreshSheets(); }}>
          <IoRefresh size={20} className='text-white hover:text-black' />
      </div>
  </div>
</div>

<div className='flex flex-col overflow-y-auto scrollbar-hide flex-grow'>
  {loading2 ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Bars color="#8884d8" height={40} width={40} />
      </div>
  ) : (
      <>
          {allsheet.length === 0 && googlesheetfiles.length === 0 ? (
              <p className='text-gray-500 text-center font-semibold'>No sheets found</p>
          ) : (
              <>
                  <div className='font-inter text-[16px] font-semibold mb-2'>
                      <p className='border-b pb-2'>Database Sheets:</p>
                  </div>
                  {(allsheet || []).map(val => 
                      val.fileType === 'xlsx' ? (
                          <div 
                              key={val._id} 
                              onClick={() => { setsheetrowsselectLine(true); setclickedLine(false); handlesheetclickedLine(val._id);setSelectedSheetName(val.name.replace(/^\d+_/, "")); }} 
                              className='hover:bg-gray-100 tracking-wider cursor-pointer rounded-md hover:text-gray-700 w-full h-[40px] flex items-center justify-between p-2'
                          >
                              <p className='text-[14px]'>{val.name.replace(/^\d+_/, "")}</p>
                              <FaRegFileExcel className='text-green-700' />
                          </div>
                      ) : null
                  )}
              </>
          )}
      </>
  )}
  {googlesheetfiles.length > 0 && (
      <div className='font-inter text-[16px] font-semibold mt-4'>
          <p className='border-b pb-2'>Google Sheets:</p>
      </div>
  )}
  {(googlesheetfiles || []).map(val => 
      <div key={val._id} onClick={() => { setsheetrowsselectLine(true); setclickedLine(false); handleGooglesheetclicked(val.id, val.name); setSelectedSheetName(val.name);}} className='hover:bg-gray-100 tracking-wider cursor-pointer rounded-md hover:text-gray-700 w-full h-[40px] flex items-center justify-between p-2'>
          <p className='text-[14px]'>{val.name}</p>
          <FaRegFileExcel className='text-green-700' />
      </div>
  )}
</div>
</div>
</div>
) : null}
            {clickedPie? (
   <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50 ${hidenavbar ? 'w-full' : 'left-20 w-[80%]'}`}
  >
      <div  ref={popupRef} className='p-4 flex flex-col w-[400px] h-[400px] space-y-4 bg-white shadow-lg rounded-lg transition-all duration-300'>
      <div className='flex items-center font-inter bg-blue-500 rounded-md px-2 justify-between h-[50px]'>
              <div className='flex items-center cursor-pointer' onClick={() => {setclickedPie(false); setchartselectpopup(true); }}>
                  <IoMdArrowRoundBack className='w-[20px] mr-2 text-white' />
                  <p className='text-[14px] font-semibold flex justify-center text-white  ml-8 items-center'>Select Sheet for Pie Chart</p>
              </div>
              <div className='flex items-center space-x-2'>
                  <div className='cursor-pointer' onClick={() => { RefreshSheets(); }}>
                      <IoRefresh size={20} className='text-white hover:text-black' />
                  </div>
              </div>
          </div>

          <div className='flex flex-col overflow-y-auto scrollbar-hide flex-grow'>
              {loading2 ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Bars color="#8884d8" height={40} width={40} />
                  </div>
              ) : (
                  <>
                      {allsheet.length === 0 && googlesheetfiles.length === 0 ? (
                          <p className='text-gray-500 text-center font-semibold'>No sheets found</p>
                      ) : (
                          <>
                              <div className='font-inter text-[16px] font-semibold mb-2'>
                                  <p className='border-b pb-2'>Database Sheets:</p>
                              </div>
                              {(allsheet || []).map(val => 
                                  val.fileType === 'xlsx' ? (
                                      <div 
                                          key={val._id} 
                                          onClick={() => { setsheetrowsselectPie(true); setclickedPie(false); handlesheetclickedPie(val._id);setSelectedSheetName(val.name.replace(/^\d+_/, "")); }} 
                                          className='hover:bg-gray-100 tracking-wider cursor-pointer rounded-md hover:text-gray-700 w-full h-[40px] flex items-center justify-between p-2'
                                      >
                                          <p className='text-[14px]'>{val.name.replace(/^\d+_/, "")}</p>
                                          <FaRegFileExcel className='text-green-700' />
                                      </div>
                                  ) : null
                              )}
                          </>
                      )}
                  </>
              )}
              {googlesheetfiles.length > 0 && (
                  <div className='font-inter text-[16px] font-semibold mt-4'>
                      <p className='border-b pb-2'>Google Sheets:</p>
                  </div>
              )}
              {(googlesheetfiles || []).map(val => 
                  <div key={val._id} onClick={() => { setsheetrowsselectPie(true); setclickedPie(false); handleGooglesheetclicked(val.id, val.name);setSelectedSheetName(val.name); }} className='hover:bg-gray-100 tracking-wider cursor-pointer rounded-md hover:text-gray-700 w-full h-[40px] flex items-center justify-between p-2'>
                      <p className='text-[14px]'>{val.name}</p>
                      <FaRegFileExcel className='text-green-700' />
                  </div>
              )}
          </div>
      </div>
  </div>
) : null}
            {
                sheetrowsSelect?
                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                    <div className='p-2 flex flex-col  w-[360px] h-[300px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                        <div className='h-[50px]'>
                            <div className='w-[20px] cursor-pointer ' onClick={()=>{setclickedBar(true);setsheetrowsselect(false)}}>
                                <IoMdArrowRoundBack className='w-[20px]'/>
                            </div>  
                        </div>
                        <div className="flex flex-col w-[100%] h-[60%] items-center justify-center space-y-3">
                                    
                                    <div className=" w-[100%] h-[40px] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">X-axis</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onChange={(e)=>setsheetfieldselectedX(e.target.value)}>
                                      {Loading1 && sheetKeys.length==0 ? (
                     <option value="">
                 <div className="flex items-center">
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
                 Loading...
                </div>
                </option>
                 ) : (
                                          
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                       ) }
                                      </select>
                                      <select value={chartDatatypeX} onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >number</option>
                                      </select>
                                    </div>
                                    <div className=" w-[100%] h-[40px] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">Y-axis</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onChange={(e)=>setsheetfieldselectedY(e.target.value)}>
                                      {Loading1 && sheetKeys.length==0 ? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
        Loading...
      </div>
    </option>
  ) : (
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                       ) }
                                      </select>
                                      <select value={chartDatatypeY} onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >number</option>
                                      </select>
                                    </div>
                                    <div onClick={()=>handleSheetCreateBarchart()} className="cursor-pointer select-none w-[100%] h-[40px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">
                                    {Loading1 && sheetKeys.length==0 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : (
                                        <p className="text-[14px] text-white">Create the Bar chart</p>)}
                                    </div>
                            </div>
                    </div>
                </div>
                :<></>
            }
            {
                sheetrowsSelectPie?
                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                    <div className='p-2 flex flex-col  w-[360px] h-[300px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                        <div className='h-[50px]'>
                            <div className='w-[20px] cursor-pointer ' onClick={()=>{setclickedPie(true);setsheetrowsselectPie(false)}}>
                                <IoMdArrowRoundBack className='w-[20px]'/>
                            </div>  
                        </div>
                        <div className="flex flex-col w-[100%] h-[60%] items-center justify-center space-y-3">
                                    
                                    <div className=" w-[100%] h-[40px] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">Label</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onChange={(e)=>setsheetfieldselectedX(e.target.value)}>
                                      {Loading1 && sheetKeys.length==0 ? (
                     <option value="">
                 <div className="flex items-center">
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
                 Loading...
                </div>
                </option>
                 ) : (
                                          
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                       ) }
                                      </select>
                                      <select value={chartDatatypeX} onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >number</option>
                                      </select>
                                    </div>
                                    <div className=" w-[100%] h-[40px] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">Value</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onChange={(e)=>setsheetfieldselectedY(e.target.value)}>
                                      {Loading1 && sheetKeys.length==0 ? (
                     <option value="">
                 <div className="flex items-center">
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
                 Loading...
                </div>
                </option>
                 ) : (
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                       )}
                                      </select>
                                      <select value={chartDatatypeY} onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >number</option>
                                      </select>
                                    </div>
                                    <div onClick={()=>handleSheetCreatePiechart()} className="cursor-pointer select-none w-[100%] h-[40px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">
                                    {Loading1 && sheetKeys.length==0 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : (
                                        <p className="text-[14px] text-white">Create the Pie chart</p>)}
                                    </div>
                            </div>
                    </div>
                </div>
                :<></>
            }
            {
                sheetrowsSelectLine?
                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                    <div className='p-2 flex flex-col  w-[360px] h-[300px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                        <div className='h-[50px]'>
                            <div className='w-[20px] cursor-pointer ' onClick={()=>{setclickedLine(true);setsheetrowsselectLine(false)}}>
                                <IoMdArrowRoundBack className='w-[20px]'/>
                            </div>  
                        </div>
                        <div className="flex flex-col w-[100%] h-[60%] items-center justify-center space-y-3">
                                    
                                    <div className=" w-[100%] h-[40px] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">X-axis</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onChange={(e)=>setsheetfieldselectedX(e.target.value)}>
                                      {Loading1 && sheetKeys.length==0 ? (
                     <option value="">
                 <div className="flex items-center">
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
                 Loading...
                </div>
                </option>
  ) : (
                                          
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        )}
                                      </select>
                                      <select value={chartDatatypeX} onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >number</option>
                                      </select>
                                    </div>
                                    <div className=" w-[100%] h-[40px] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">Y-axis</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onChange={(e)=>setsheetfieldselectedY(e.target.value)}>
                                      {Loading1 && sheetKeys.length==0 ? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
        Loading...
      </div>
    </option>
  ) : (
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                       ) }
                                      </select>
                                      <select value={chartDatatypeY} onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >number</option>
                                      </select>
                                    </div>
                                    <div onClick={()=>handleSheetCreateLinechart()} className="cursor-pointer select-none w-[100%] h-[40px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">
                                    {Loading1 && sheetKeys.length==0 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : (
                                        <p className="text-[14px] text-white">Create the Line chart</p>)}
                                    </div>
                            </div>
                    </div>
                </div>
                :<></>
            }
            <div className='flex w-[30%] h-[420px] bg-white rounded-xl'>
                <PortfolioMeter PortfolioMetervalue={PortfolioMetervalue} realtimeportfoliostate={realtimeportfoliostate} selectedTab={selectedTab} hidenavbar={hidenavbar}/>
            </div>
            <div className='w-[70%] h-[420px] bg-white rounded-xl flex flex-col items-center justify-center'>
                    <div className=' w-[100%] relative h-[20px] flex flex-row items-end justify-end pt-2 pr-2'>
                    {
                        
  changeChart && (showPiechart || showBarchart || showLinechart) ? (
    <div
          ref={popupRef}
      
          
        >
      <div className='w-[250px] overflow-y-auto z-[40] relative top-[133px] flex flex-col bg-white rounded-md' style={{ boxShadow: '0px 1.2px 5px #6B7280' }}>
          <div className='p-2 font-bold text-center'> <p className=' bg-blue-500 rounded-md flex items-center justify-center text-white h-[30px]'>Select Chart Type</p></div>
          <div className='flex flex-col'>
              <div onClick={() => { setclickedBar(true); setclickedLine(false); setclickedPie(false); setchartselectpopup(false); setchangeChart(false); }} className={`hover:bg-gray-100 tracking-wider cursor-pointer rounded-md hover:text-gray-800 w-full h-[40px] flex items-center justify-start p-2 ${clickedBar ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                  <p className='w-[50%] font-inter text-[14px] text-gray-700'>Bar chart</p>
                  <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                      <img src={Bar_Chart} className='w-5 h-5' />
                  </div>
              </div>
              <div onClick={() => { setclickedPie(true); setclickedBar(false); setclickedLine(false); setchartselectpopup(false); setchangeChart(false); }} className={`hover:bg-gray-100 tracking-wider cursor-pointer rounded-md hover:text-gray-800 w-full h-[40px] flex items-center justify-start p-2 ${clickedPie ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                  <p className='w-[50%] font-inter  text-[14px] text-gray-700'>Pie chart</p>
                  <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                  <img src={Pie_Chart} className='w-5 h-5' />
                  </div>
              </div>
              <div onClick={() => { setclickedLine(true); setclickedBar(false); setclickedPie(false); setchartselectpopup(false); setchangeChart(false); }} className={`hover:bg-gray-100 tracking-wider cursor-pointer rounded-md hover:text-gray-800 w-full h-[40px] flex items-center justify-start p-2 ${clickedLine ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                  <p className='w-[50%] font-inter  text-[14px] text-gray-700'>Line chart</p>
                  <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                  <img src={Line_Chart} className='w-5 h-5' />
                  </div>
              </div>
          </div>
      </div>
      </div>
  ) : (
      <></>
  )
}
{
  (showBarchart || showPiechart || showLinechart) && (Logemail == selectedTab) ? (
      <div className='cursor-pointer' onClick={() => setchangeChart(!changeChart)}>
          <HiOutlineDotsVertical size={17} />
      </div>
  ) : (
      <></>
  )
}

                    </div>
                

                {
                     
                    (loading )?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Bars color="#8884d8" height={80} width={80} />
                    </div>
                    :  
                    showBarchart &&!loading?
                        <PortfolioBarChart sheetclicked={sheetclicked} chartDatatypeX={chartDatatypeX} chartDatatypeY={chartDatatypeY} sheetJson={sheetJson} sheetfieldselectedX={sheetfieldselectedX} sheetfieldselectedY={sheetfieldselectedY} selectedSheetName={selectedSheetName}/>   
                    :
                    showPiechart &&!loading?
                    <PortfolioPieChart sheetclicked={sheetclicked} chartDatatypeX={chartDatatypeX} chartDatatypeY={chartDatatypeY} sheetJson={sheetJson} sheetfieldselectedX={sheetfieldselectedX} sheetfieldselectedY={sheetfieldselectedY} selectedSheetName={selectedSheetName}/>
                    :
                    showLinechart &&!loading?
                    <PortfolioLineChart sheetclicked={sheetclicked} chartDatatypeX={chartDatatypeX} chartDatatypeY={chartDatatypeY} sheetJson={sheetJson} sheetfieldselectedX={sheetfieldselectedX} sheetfieldselectedY={sheetfieldselectedY} selectedSheetName={selectedSheetName}/>
                    :
                    selectedTab==Logemail?
                    <div onClick={handleChartSelectPopup} className='w-[150px] h-[40px] bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl text-white'>
                        <div className='flex items-center select-none cursor-pointer justify-center h-[100%] '>
                        <p className="font-inter font-bold text-[14px] pr-3">Create chart</p>

                        <BsBarChartFill size={22} />
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    </div>
    
  )
  
}

export default PortfolioTopGraph