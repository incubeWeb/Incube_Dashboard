import axios from 'axios'
import React, { useEffect, useState } from 'react'
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


const PortfolioTopGraph = ({selectedTab,portfoliosecurity,hidenavbar,sheetedited,realtimeportfoliostate}) => {
    const [chartselectpopup,setchartselectpopup]=useState(false)
    const [clickedBar,setclickedBar]=useState(false)
    const [clickedPie,setclickedPie]=useState(false)
    const [clickedLine,setclickedLine]=useState(false)
    const [loading2,setloading2]=useState(true)

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

    
    setSheetJson(sheetJson);


    const RefreshSheets=()=>{
        setavailableDatabaseSheets()
    }
    

    // useEffect(()=>
    // {
    //     const updateRealtimevalue=async()=>{
    //         const organization=`${Logorganization}_ShownGraph`
    //         const response=await axios.post('http://localhost:8999/getportfoliostate',{organization:organization})
    //         const data=response.data.data
    //         const stateValues=JSON.parse(data)||{}
    //         const sheetid=stateValues.sheetclicked
    //         const response1=await axios.post('http://localhost:8999/sheetfromdb',{id:sheetid,organization:Logorganization})
    //         const sheetdata=JSON.parse(response1.data.data)
    //         const stateJson={showBarchart:stateValues.showBarchart,showPiechart:stateValues.showPiechart,showLinechart:stateValues.showLinechart,chartDatatypeX:stateValues.chartDatatypeX,chartDatatypeY:stateValues.chartDatatypeY,sheetJson:sheetdata,sheetfieldselectedX:stateValues.sheetfieldselectedX,sheetfieldselectedY:stateValues.sheetfieldselectedY,sheetclicked:stateValues.sheetclicked}
    //         if((stateValues.showBarchart || stateValues.showPiechart || stateValues.showLinechart)&&sheetdata!=[])
    //         {
    //             await axios.post('http://localhost:8999/setportfoliostate',{
    //                 organization:organization,
    //                 portfolioState:JSON.stringify(stateJson)
    //             })
    //         }
    //         setshowBarchart(stateValues.showBarchart)
    //         setshowPiechart(stateValues.showPiechart)
    //         setshowLinechart(stateValues.showLinechart)
    //         setchartDatatypeX(stateValues.chartDatatypeX)
    //         setchartDatatypeY(stateValues.chartDatatypeY)
    //         setsheetJson(sheetdata)
    //         setsheetfieldselectedX(stateValues.sheetfieldselectedX)
    //         setsheetfieldselectedY(stateValues.sheetfieldselectedY)
    //         setsheetClicked(stateValues.sheetclicked)


    //     }
    //     updateRealtimevalue()
    // },[sheetedited])

    useEffect(()=>{
        setloading(true)
    },[selectedTab])

    useEffect(()=>{
        const setGraphValues=async()=>{
            const organization=`${Logorganization}_ShownGraph`
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:selectedTab,organization:organization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            console.log("chjasdf",response.data.data)
            if(response.data.status==-200 || response.data.data==undefined)
            {

                setshowBarchart(false)
                setshowPiechart(false)
                setshowLinechart(false)
                setchartDatatypeX('')
                setchartDatatypeY('')
                setsheetJson([])
                setsheetfieldselectedX('')
                setsheetfieldselectedY('')
                setsheetClicked(false)
                setTimeout(()=>{
                    setloading(false)
                },1000)
                
            
            }

           console.log("here",response.data.data)
            const data=response.data.data 
            const status=response.data.status
            const stateValues=JSON.parse(data)||{}
            
            if(status==200)
            {
            setshowBarchart(stateValues.showBarchart)
            setshowPiechart(stateValues.showPiechart)
            setshowLinechart(stateValues.showLinechart)
            setchartDatatypeX(stateValues.chartDatatypeX)
            setchartDatatypeY(stateValues.chartDatatypeY)
            setsheetJson(stateValues.sheetJson)
            setsheetfieldselectedX(stateValues.sheetfieldselectedX)
            setsheetfieldselectedY(stateValues.sheetfieldselectedY)
            setsheetClicked(stateValues.sheetclicked)
            setTimeout(()=>{
                setloading(false)
            },1000)
            }
            else{
                setTimeout(()=>{
                    setloading(false)
                },1000)
            }
        }
        try{
        setGraphValues()
        }catch(e)
        {
            setGraphValues()
        }
    },[realtimeportfoliostate,selectedTab])


    useEffect(()=>{
        const setGraphValues=async()=>{
            const organization=`${Logorganization}_ShownGraph`
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:selectedTab,organization:organization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            if(response.data.status==-200)
                {
                    setTimeout(()=>{
                        setloading(false)
                    },1000)
                }
            const data=response.data.data 
            const status=response.data.status
            const stateValues=JSON.parse(data)||{}
            
            if(status==200)
            {
            setshowBarchart(stateValues.showBarchart)
            setshowPiechart(stateValues.showPiechart)
            setshowLinechart(stateValues.showLinechart)
            setchartDatatypeX(stateValues.chartDatatypeX)
            setchartDatatypeY(stateValues.chartDatatypeY)
            setsheetJson(stateValues.sheetJson)
            setsheetfieldselectedX(stateValues.sheetfieldselectedX)
            setsheetfieldselectedY(stateValues.sheetfieldselectedY)
            setsheetClicked(stateValues.sheetclicked)
            setTimeout(()=>{
                setloading(false)
            },1000)
            }
            else{
                setTimeout(()=>{
                    setloading(false)
                },1000)
            }
        }
        try{
        setGraphValues()
        }catch(e){
            setGraphValues()
        }
    },[])


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
        
        setallSheets(tosetdata)
        setloading2(false)

        
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
    }
    const handleSheetCreateBarchart=async()=>{
        //create bar chart Logic

        setsheetrowsselect(false)
        setshowBarchart(true)
        setshowLinechart(false)
        setshowPiechart(false)

        const organization=`${Logorganization}_ShownGraph`
            const stateJson={showBarchart:true,showPiechart:false,showLinechart:false,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,sheetJson:sheetJson,sheetfieldselectedX,sheetfieldselectedY,sheetclicked:sheetclicked}
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
                email:Logemail,
                security:portfoliosecurity,
                organization:organization,
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
            const stateJson={showBarchart:false,showPiechart:true,showLinechart:false,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,sheetJson:sheetJson,sheetfieldselectedX,sheetfieldselectedY,sheetclicked:sheetclicked}
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
                email:Logemail,
            security:portfoliosecurity,
                organization:organization,
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
            const stateJson={showBarchart:false,showPiechart:false,showLinechart:true,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,sheetJson:sheetJson,sheetfieldselectedX,sheetfieldselectedY,sheetclicked:sheetclicked}
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
                email:Logemail,
                security:portfoliosecurity,
                organization:organization,
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


  

    
    

    


    useEffect(()=>{
        const mergedData=[...sheetJson,
        
           
        ]
        sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
        console.log(mergedData)
        
            },[sheetJson])





    
  return (
    <div className=' font-roboto h-[300px]  flex flex-col'>
        
        <div className='flex flex-row h-[100%] space-x-6'>
            {
                chartselectpopup?
                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                        <div className='p-2 flex flex-col  w-[360px] h-[300px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                            <div className='h-[50px]'>
                                    <div className='w-[20px] cursor-pointer ' onClick={()=>{setchartselectpopup(false);}}>
                                        <RxCross2 className='w-[20px]'/>
                                    </div>
                            </div>
                            <div className='flex flex-col'>
                                
                                <div onClick={()=>{setclickedBar(true);setclickedLine(false);setclickedPie(false);setchartselectpopup(false)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                    <p className='w-[50%]'>Bar chart</p>
                                    <div className='w-[50%] flex text-blue-700 items-center justify-end'>
                                            <IoBarChart size={18}/>
                                    </div>
                                </div>
                                <div onClick={()=>{setclickedPie(true);setclickedBar(false);setclickedLine(false);setchartselectpopup(false)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                    <p className='w-[50%]'>Pie chart</p>
                                    <div className='w-[50%] flex text-blue-700 items-center justify-end'>
                                            <FaChartPie size={18}/>
                                    </div>
                                </div>
                                <div onClick={()=>{setclickedLine(true);setclickedBar(false);setclickedPie(false);setchartselectpopup(false)}}  className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                    <p className='w-[50%]'>Line chart</p>
                                    <div className='w-[50%] flex text-blue-700 items-center justify-end'>
                                            <FaChartLine size={18}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                :
                <></>
            }
            {//showing sheets name here
                clickedBar?
                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                        <div className='p-2 flex flex-col  w-[360px] h-[300px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                            <div className='h-[50px] flex'>
                                        <div className='w-[20px] cursor-pointer ' onClick={()=>{setclickedBar(false);setchartselectpopup(true)}}>
                                            <IoMdArrowRoundBack className='w-[20px]'/>
                                        </div>
                                        <div className='w-[100%] flex justify-end'>
                                            <div className='w-[16px] h-[16px] cursor-pointer' onClick={()=>{RefreshSheets()}}>
                                                <IoRefresh size={16} />
                                            </div>
                                        </div>
                            </div>
                            <div className='flex flex-col overflow-y-auto'>
                                
                            { loading2 ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',marginTop:'40px' }}>
                        <Bars color="#8884d8" height={40} width={40} />
                    </div>
                    :  
                                    (allsheet||[]).map(val=>
                                        val.fileType=='xlsx'?
                                        <div key={val._id} onClick={()=>{setsheetrowsselect(true);setclickedBar(false); handlesheetclicked(val._id)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%] text-[14px]'>{val.name.substring(val.name.length-15,val.name.length)}</p>
                                            <div className='w-[50%] flex text-green-800 items-center justify-end'>
                                                <FaRegFileExcel />
                                            </div>
                                        </div>
                                        :
                                        <></>
                                    )

                                    
                                }
                                {
                                    googlesheetfiles.length>0?
                                    <div className='w-[100%] font-inter text-[14px] font-semibold mt-4 mb-2 h-[40px] flex items-center pl-2'><p>Google sheets:</p></div>
                                    :
                                    <></>
                                }
                                {
                                    (googlesheetfiles||[]).map(val=>
                                        <div key={val._id} onClick={()=>{setsheetrowsselect(true);setclickedBar(false); handleGooglesheetclicked(val.id,val.name)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%] text-[14px]'>{val.name.substring(val.name.length-15,val.name.length)}</p>
                                            <div className='w-[50%] flex text-green-800 items-center justify-end'>
                                                <FaRegFileExcel />
                                            </div>
                                        </div>
                                    )

                                    
                                }
                                
                            </div>
                        </div>
                </div>
                :
                <></>
            }
            {//showing sheets name here
                clickedLine?
                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                        <div className='p-2 flex flex-col  w-[360px] h-[300px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                            <div className='h-[50px]'>
                                        <div className='w-[20px] cursor-pointer ' onClick={()=>{setclickedLine(false);setchartselectpopup(true)}}>
                                            <IoMdArrowRoundBack className='w-[20px]'/>
                                        </div>
                            </div>
                            <div className='flex flex-col overflow-y-auto'>
                                
                            { loading2 ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',marginTop:'40px' }}>
                        <Bars color="#8884d8" height={40} width={40} />
                    </div>
                    :  
                                    (allsheet||[]).map(val=>
                                        val.fileType=='xlsx'?
                                        <div key={val._id} onClick={()=>{setsheetrowsselectLine(true);setclickedLine(false); handlesheetclickedLine(val._id)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%] text-[14px]'>{val.name.substring(val.name.length-15,val.name.length)}</p>
                                            <div className='w-[50%] flex text-green-800 items-center justify-end'>
                                                <FaRegFileExcel />
                                            </div>
                                        </div>
                                        :
                                        <></>
                                    )
                                }
                                {
                                    googlesheetfiles.length>0?
                                    <div className='w-[100%] font-inter text-[14px] font-semibold mt-4 mb-2 flex items-center pl-2'><p>Google sheets:</p></div>
                                    :
                                    <></>
                                }
                                {
                                    (googlesheetfiles||[]).map(val=>
                                        <div key={val._id} onClick={()=>{setsheetrowsselectLine(true);setclickedLine(false); handleGooglesheetclicked(val.id,val.name)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%] text-[14px]'>{val.name.substring(val.name.length-15,val.name.length)}</p>
                                            <div className='w-[50%] flex text-green-800 items-center justify-end'>
                                                <FaRegFileExcel />
                                            </div>
                                        </div>
                                    )

                                    
                                }
                                
                            </div>
                        </div>
                </div>
                :
                <></>
            }
            {//showing sheets name here
                clickedPie?
                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                        <div className='p-2 flex flex-col  w-[360px] h-[300px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                            <div className='h-[50px]'>
                                        <div className='w-[20px] cursor-pointer ' onClick={()=>{setclickedPie(false);setchartselectpopup(true)}}>
                                            <IoMdArrowRoundBack className='w-[20px]'/>
                                        </div>
                            </div>
                            <div className='flex flex-col overflow-y-auto'>
                                
                           { loading2 ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',marginTop:'40px' }}>
                        <Bars color="#8884d8" height={40} width={40} />
                    </div>
                    :  
                                    (allsheet||[]).map(val=>
                                        val.fileType=='xlsx'?
                                        <div key={val._id} onClick={()=>{setsheetrowsselectPie(true);setclickedPie(false); handlesheetclickedPie(val._id)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%] text-[14px]'>{val.name.substring(val.name.length-15,val.name.length)}</p>
                                            <div className='w-[50%] flex text-green-800 items-center justify-end'>
                                                <FaRegFileExcel />
                                            </div>
                                        </div>
                                        :
                                        <>
                                            
                                        </>
                                    )
                                }
            

                                {
                                    googlesheetfiles.length>0?
                                    <div className='w-[100%] font-inter text-[14px] font-semibold mt-4 mb-2 flex items-center pl-2'><p>Google sheets:</p></div>
                                    :
                                    <></>
                                }

                                {
                                    (googlesheetfiles||[]).map(val=>
                                        <div key={val._id} onClick={()=>{setsheetrowsselect(true);setclickedPie(false); handleGooglesheetclicked(val.id,val.name)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%] text-[14px]'>{val.name.substring(val.name.length-15,val.name.length)}</p>
                                            <div className='w-[50%] flex text-green-800 items-center justify-end'>
                                                <FaRegFileExcel />
                                            </div>
                                        </div>
                                    )

                                    
                                }
                                
                            </div>
                        </div>
                </div>
                :
                <></>
            }
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
                                        <option >integer</option>
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
                                        <option >integer</option>
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
                                        <option >integer</option>
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
                                        <option >integer</option>
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
                                        <option >integer</option>
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
                                        <option >integer</option>
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
                <PortfolioMeter selectedTab={selectedTab}/>
            </div>
            <div className='w-[70%] h-[420px] bg-white rounded-xl flex flex-col items-center justify-center'>
                    <div className=' w-[100%] relative h-[20px] flex flex-row items-end justify-end pt-2 pr-2'>
                        {
                                changeChart&&(showPiechart || showBarchart || showLinechart)?
                                <div className='w-[250px] overflow-y-auto z-[40] relative top-[133px] flex flex-col  bg-white rounded-md ' style={{boxShadow:'0px 1.2px 5px #6B7280'}}>
                                    
                                
                                        <div onClick={()=>{setclickedBar(true);setclickedLine(false);setclickedPie(false);setchartselectpopup(false);setchangeChart(false)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%] font-inter'>Bar chart</p>
                                            <div className='w-[50%]  flex text-blue-800 items-center justify-end'>
                                                    <IoBarChart/>
                                            </div>
                                        </div>
                                        <div onClick={()=>{setclickedPie(true);setclickedBar(false);setclickedBar(false);setchartselectpopup(false);setchangeChart(false)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%] font-inter'>Pie chart</p>
                                            <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                                                    <FaChartPie />
                                            </div>
                                        </div>
                                        <div onClick={()=>{setclickedLine(true);setclickedBar(false);setclickedPie(false);setchartselectpopup(false);setchangeChart(false)}}  className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%] font-inter'>Line chart</p>
                                            <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                                                    <FaChartLine />
                                            </div>
                                        </div>
                                    
                                </div>
                                :
                                <></>
                        }
                        {
                            (showBarchart ||showPiechart || showLinechart) && (Logemail==selectedTab)
                            ?
                                <div className='cursor-pointer' onClick={()=>setchangeChart(!changeChart)}>
                                    <HiOutlineDotsVertical size={17}/>
                                </div>
                                :
                        <></>
                        }
                    </div>
                

                {
                     
                    (loading )?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Bars color="#8884d8" height={80} width={80} />
                    </div>
                    :  
                    showBarchart &&!loading?
                        <PortfolioBarChart chartDatatypeX={chartDatatypeX} chartDatatypeY={chartDatatypeY} sheetJson={sheetJson} sheetfieldselectedX={sheetfieldselectedX} sheetfieldselectedY={sheetfieldselectedY}/>   
                    :
                    showPiechart &&!loading?
                    <PortfolioPieChart chartDatatypeX={chartDatatypeX} chartDatatypeY={chartDatatypeY} sheetJson={sheetJson} sheetfieldselectedX={sheetfieldselectedX} sheetfieldselectedY={sheetfieldselectedY}/>
                    :
                    showLinechart &&!loading?
                    <PortfolioLineChart chartDatatypeX={chartDatatypeX} chartDatatypeY={chartDatatypeY} sheetJson={sheetJson} sheetfieldselectedX={sheetfieldselectedX} sheetfieldselectedY={sheetfieldselectedY}/>
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
