import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaChartLine, FaChartPie, FaRegFileExcel } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoBarChart } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'
import { VscGraphLine } from 'react-icons/vsc'
import PortfolioBarChart from './PortfolioBarChart'
import PortfolioPieChart from './PortfolioPieChart'
import PortfolioLineChart from './PortfolioLineChart'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import PortfolioMeter from './PortfolioMeter'
import { Bars } from 'react-loader-spinner'

const PortfolioTopGraph = ({hidenavbar,sheetedited}) => {
    const [chartselectpopup,setchartselectpopup]=useState(false)
    const [clickedBar,setclickedBar]=useState(false)
    const [clickedPie,setclickedPie]=useState(false)
    const [clickedLine,setclickedLine]=useState(false)

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


    useEffect(()=>
    {
        const updateRealtimevalue=async()=>{
            const organization=`${localStorage.getItem('organization')}_ShownGraph`
<<<<<<< HEAD
            const response=await axios.post('http://localhost:8999/getportfoliostate',{organization:organization})
            const data=response.data.data
            const stateValues=JSON.parse(data)||{}
            const sheetid=stateValues.sheetclicked
            const response1=await axios.post('http://localhost:8999/sheetfromdb',{id:sheetid,organization:localStorage.getItem('organization')})
=======
            const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getportfoliostate',{organization:organization})
            const data=response.data.data
            const stateValues=JSON.parse(data)||{}
            const sheetid=stateValues.sheetclicked
            const response1=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/sheetfromdb',{id:sheetid,organization:localStorage.getItem('organization')})
>>>>>>> 8b9f5e84a4b7bb290d5d33ec9efe6aed592172bd
            const sheetdata=JSON.parse(response1.data.data)
            const stateJson={showBarchart:stateValues.showBarchart,showPiechart:stateValues.showPiechart,showLinechart:stateValues.showLinechart,chartDatatypeX:stateValues.chartDatatypeX,chartDatatypeY:stateValues.chartDatatypeY,sheetJson:sheetdata,sheetfieldselectedX:stateValues.sheetfieldselectedX,sheetfieldselectedY:stateValues.sheetfieldselectedY,sheetclicked:stateValues.sheetclicked}
            if((stateValues.showBarchart || stateValues.showPiechart || stateValues.showLinechart)&&sheetdata!=[])
            {
<<<<<<< HEAD
                await axios.post('http://localhost:8999/setportfoliostate',{
=======
                await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/setportfoliostate',{
>>>>>>> 8b9f5e84a4b7bb290d5d33ec9efe6aed592172bd
                    organization:organization,
                    portfolioState:JSON.stringify(stateJson)
                })
            }
            setshowBarchart(stateValues.showBarchart)
            setshowPiechart(stateValues.showPiechart)
            setshowLinechart(stateValues.showLinechart)
            setchartDatatypeX(stateValues.chartDatatypeX)
            setchartDatatypeY(stateValues.chartDatatypeY)
            setsheetJson(sheetdata)
            setsheetfieldselectedX(stateValues.sheetfieldselectedX)
            setsheetfieldselectedY(stateValues.sheetfieldselectedY)
            setsheetClicked(stateValues.sheetclicked)


        }
        updateRealtimevalue()
    },[sheetedited])

    useEffect(()=>{
        const storevalues=async()=>{

                const organization=`${localStorage.getItem('organization')}_ShownGraph`
                const stateJson={showBarchart:showBarchart,showPiechart:showPiechart,showLinechart:showLinechart,chartDatatypeX:chartDatatypeX,chartDatatypeY:chartDatatypeY,sheetJson:sheetJson,sheetfieldselectedX,sheetfieldselectedY,sheetclicked:sheetclicked}
<<<<<<< HEAD
                await axios.post('http://localhost:8999/setportfoliostate',{
=======
                await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/setportfoliostate',{
>>>>>>> 8b9f5e84a4b7bb290d5d33ec9efe6aed592172bd
                    organization:organization,
                    portfolioState:JSON.stringify(stateJson)
                })
                console.log("fsfsss",stateJson)
            }
            if((showBarchart || showPiechart || showLinechart)&&sheetJson!=[])
            {
                storevalues()
            }
           
    },[showBarchart,showPiechart,showLinechart])

    useEffect(()=>{
        const setGraphValues=async()=>{
            const organization=`${localStorage.getItem('organization')}_ShownGraph`
<<<<<<< HEAD
            const response=await axios.post('http://localhost:8999/getportfoliostate',{organization:organization})
=======
            const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getportfoliostate',{organization:organization})
>>>>>>> 8b9f5e84a4b7bb290d5d33ec9efe6aed592172bd
            console.log(response,"bhavesh singh")
            const data=response.data.data || response.data.status
            
            const stateValues=JSON.parse(data)||{}
            
            if(data!=-200)
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
        setGraphValues()
    },[])


    const handleChartSelectPopup=()=>{
        setchartselectpopup(true)
    }
    const setavailableDatabaseSheets=async()=>{
<<<<<<< HEAD
        const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
=======
        const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
>>>>>>> 8b9f5e84a4b7bb290d5d33ec9efe6aed592172bd
        setallSheets(response.data.data) 
    }
    const handlesheetclicked=async (id)=>{
            setsheetClicked(id)
<<<<<<< HEAD
            const response=await axios.post('http://localhost:8999/sheetfromdb',{id:id,organization:localStorage.getItem('organization')})
=======
            const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/sheetfromdb',{id:id,organization:localStorage.getItem('organization')})
>>>>>>> 8b9f5e84a4b7bb290d5d33ec9efe6aed592172bd
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

    }
    const handlesheetclickedPie=async (id)=>{
<<<<<<< HEAD
        const response=await axios.post('http://localhost:8999/sheetfromdb',{id:id,organization:localStorage.getItem('organization')})
=======
        const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/sheetfromdb',{id:id,organization:localStorage.getItem('organization')})
>>>>>>> 8b9f5e84a4b7bb290d5d33ec9efe6aed592172bd
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

    }
    const handlesheetclickedLine=async (id)=>{
<<<<<<< HEAD
        const response=await axios.post('http://localhost:8999/sheetfromdb',{id:id,organization:localStorage.getItem('organization')})
=======
        const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/sheetfromdb',{id:id,organization:localStorage.getItem('organization')})
>>>>>>> 8b9f5e84a4b7bb290d5d33ec9efe6aed592172bd
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

    }
    const handleSheetCreateBarchart=async()=>{
        //create bar chart Logic
        setsheetrowsselect(false)
        
        setshowBarchart(true)
        setshowLinechart(false)
        setshowPiechart(false)
    }
    const handleSheetCreatePiechart=async()=>{
        //create bar chart Logic
        setsheetrowsselectPie(false)
        
        setshowPiechart(true)
        setshowLinechart(false)
        setshowBarchart(false)
    }
    const handleSheetCreateLinechart=async()=>{
        //create bar chart Logic
        setsheetrowsselectLine(false)
        
        setshowLinechart(true)
        setshowPiechart(false)
        setshowBarchart(false)
    }

    useEffect(()=>
    {   if(clickedBar || clickedPie || clickedLine)
        {
            setavailableDatabaseSheets()
        }
    },[clickedBar,clickedPie,clickedLine])
    
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
                                    <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                                            <IoBarChart className=''/>
                                    </div>
                                </div>
                                <div onClick={()=>{setclickedPie(true);setclickedBar(false);setclickedLine(false);setchartselectpopup(false)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                    <p className='w-[50%]'>Pie chart</p>
                                    <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                                            <FaChartPie />
                                    </div>
                                </div>
                                <div onClick={()=>{setclickedLine(true);setclickedBar(false);setclickedPie(false);setchartselectpopup(false)}}  className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                    <p className='w-[50%]'>Line chart</p>
                                    <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                                            <FaChartLine />
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
                            <div className='h-[50px]'>
                                        <div className='w-[20px] cursor-pointer ' onClick={()=>{setclickedBar(false);setchartselectpopup(true)}}>
                                            <IoMdArrowRoundBack className='w-[20px]'/>
                                        </div>
                            </div>
                            <div className='flex flex-col'>
                                
                                {
                                    (allsheet||[]).map(val=>
                                        <div key={val._id} onClick={()=>{setsheetrowsselect(true);setclickedBar(false); handlesheetclicked(val._id)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
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
                            <div className='flex flex-col'>
                                
                                {
                                    (allsheet||[]).map(val=>
                                        <div key={val._id} onClick={()=>{setsheetrowsselectLine(true);setclickedLine(false); handlesheetclickedLine(val._id)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
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
                            <div className='flex flex-col'>
                                
                                {
                                    (allsheet||[]).map(val=>
                                        <div key={val._id} onClick={()=>{setsheetrowsselectPie(true);setclickedPie(false); handlesheetclickedPie(val._id)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
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
                                        {
                                          
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                    </div>
                                    <div className=" w-[100%] h-[40px] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">Y-axis</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onChange={(e)=>setsheetfieldselectedY(e.target.value)}>
                                        {
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                    </div>
                                    <div onClick={()=>handleSheetCreateBarchart()} className="cursor-pointer select-none w-[100%] h-[40px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">
                                        <p className="text-[14px] text-white">Create the Bar chart</p>
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
                                        {
                                          
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                    </div>
                                    <div className=" w-[100%] h-[40px] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">Value</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onChange={(e)=>setsheetfieldselectedY(e.target.value)}>
                                        {
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                    </div>
                                    <div onClick={()=>handleSheetCreatePiechart()} className="cursor-pointer select-none w-[100%] h-[40px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">
                                        <p className="text-[14px] text-white">Create the Pie chart</p>
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
                                        {
                                          
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeX(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                    </div>
                                    <div className=" w-[100%] h-[40px] items-center justify-center flex flex-row space-x-2">
                                      <div><p className="text-[14px]">Y-axis</p></div>
                                      <select className="text-[14px] w-[60%] h-[100%] border-[1px] border-gray-600 outline-none" onChange={(e)=>setsheetfieldselectedY(e.target.value)}>
                                        {
                                          (sheetKeys||[]).map(val=>
                                            <option key={val.id}>{val}</option>
                                          )
                                        }
                                      </select>
                                      <select onChange={(e)=>setchartDatatypeY(e.target.value)} className="border-gray-600 text-[14px] border-[1px] h-[100%] p-2">
                                        <option>string</option>
                                        <option >integer</option>
                                      </select>
                                    </div>
                                    <div onClick={()=>handleSheetCreateLinechart()} className="cursor-pointer select-none w-[100%] h-[40px] flex items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700">
                                        <p className="text-[14px] text-white">Create the Line chart</p>
                                    </div>
                            </div>
                    </div>
                </div>
                :<></>
            }
            <div className='flex w-[30%] h-[100%] bg-white rounded-xl'>
                <PortfolioMeter/>
            </div>
            <div className='w-[70%] bg-white rounded-xl flex flex-col items-center justify-center'>
                    <div className=' w-[100%] relative h-[20px] flex flex-row items-end justify-end pt-2 pr-2'>
                        {
                                changeChart&&(showPiechart || showBarchart || showLinechart)?
                                <div className='w-[250px] overflow-y-auto z-[40] relative top-[133px] flex flex-col  bg-white rounded-md ' style={{boxShadow:'0px 1.2px 5px #6B7280'}}>
                                    
                                
                                        <div onClick={()=>{setclickedBar(true);setclickedLine(false);setclickedPie(false);setchartselectpopup(false);setchangeChart(false)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%]'>Bar chart</p>
                                            <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                                                    <IoBarChart/>
                                            </div>
                                        </div>
                                        <div onClick={()=>{setclickedPie(true);setclickedBar(false);setclickedBar(false);setchartselectpopup(false);setchangeChart(false)}} className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%]'>Pie chart</p>
                                            <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                                                    <FaChartPie />
                                            </div>
                                        </div>
                                        <div onClick={()=>{setclickedLine(true);setclickedBar(false);setclickedPie(false);setchartselectpopup(false);setchangeChart(false)}}  className='hover:bg-sky-500 tracking-wider cursor-pointer rounded-md hover:text-white w-[100%] h-[40px] flex items-center justify-start p-2'>
                                            <p className='w-[50%]'>Line chart</p>
                                            <div className='w-[50%] flex text-blue-800 items-center justify-end'>
                                                    <FaChartLine />
                                            </div>
                                        </div>
                                    
                                </div>
                                :
                                <></>
                        }
                        {
                            (showBarchart ||showPiechart || showLinechart)
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
                    <div onClick={handleChartSelectPopup} className='w-[150px] h-[40px] bg-gradient-to-r from-blue-500 to-blue-800 rounded-xl text-white'>
                        <div className='flex items-center select-none cursor-pointer justify-center h-[100%] '>
                                <VscGraphLine size={20}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default PortfolioTopGraph