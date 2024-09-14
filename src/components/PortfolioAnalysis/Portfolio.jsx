import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { RiFilter3Line } from 'react-icons/ri'
import DatabaseSheets from './DatabaseSheets'
import PortfolioHistory from './PortfolioHistory'
import { RxCross2 } from 'react-icons/rx'
import { FaCaretRight, FaDatabase, FaPlus } from 'react-icons/fa'
import { IoMdArrowBack } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import PortfolioTop from './PortfolioTop'
import { Bars } from 'react-loader-spinner'

const Portfolio = ({hidenavbar,sheetedited}) => {
    const [sheetmethod,setsheetmethod]=useState('')
    const [allSheets,setallSheets]=useState([])
    const [selectedSheetId,setselectedSheetId]=useState([])
    const [sheetJson,setsheetJson]=useState([])
    const [sheetKeys,setsheetKeys]=useState([])
    const [selectedImageFiled,setselectedImageField]=useState('')
    const [showHistory,setshowHistory]=useState(false)
    const [showimagepopup,setshowimagePopup]=useState('')
    const [sheetname,setsheetname]=useState('')
    const [selectfield,setselectfield]=useState(false)
    const [loading,setloading]=useState(true)


    useEffect(()=>{
        const setStateValues=async()=>{
           const organization=localStorage.getItem('organization')
            const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getportfoliostate',{organization:organization})
            const data=response.data.data

           // const stateValues=JSON.parse(localStorage.getItem('portfolioState'))||[]
           const stateValues=JSON.parse(data)||[]
            if(stateValues.length>0)
            {
                stateValues.map(val=>{
                setsheetmethod(val.sheetmethod)
                setallSheets(val.allSheets)
                setselectedSheetId(val.selectedSheetId)
                setsheetJson(val.sheetJson)
                setsheetKeys(val.sheetKeys)
                setselectedImageField(val.selectedImageFiled)
                setshowHistory(val.showHistory)
                setshowimagePopup(val.showimagepopup)
                setsheetname(val.sheetname)
                setselectfield(val.selectfield)
                setTimeout(()=>{
                    setloading(false)
                },1000)
                })
            }
        }
        setStateValues()
    },[])

    useEffect(()=>{
        const saveCurrentState=async()=>{
            
            const stateJson=[{sheetmethod:sheetmethod,allSheets:allSheets,selectedSheetId:selectedSheetId,sheetJson:sheetJson,sheetKeys:sheetKeys,selectedImageFiled:selectedImageFiled,showHistory:true,showimagepopup:showimagepopup,sheetname:sheetname,selectfield:selectfield}]
            
           // localStorage.setItem('portfolioState',JSON.stringify(stateJson))
            if(sheetJson.length>0 && selectedImageFiled!="")
            {
                await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/setportfoliostate',{
                    organization:localStorage.getItem('organization'),
                    portfolioState:JSON.stringify(stateJson)
    
                })
            }
            
        }
        saveCurrentState()
    },[sheetmethod,allSheets,selectedSheetId,sheetJson,sheetKeys,showHistory,showimagepopup,sheetname,selectfield])

    

    const handleselect=()=>{
        
        setshowHistory(true)
        
        setshowimagePopup(!showimagepopup)
    }
    const [clickedDots,setclickedDots]=useState(false)

    useEffect(()=>{
        const setavailableDatabaseSheets=async()=>{
            const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
            setallSheets(response.data.data)
           // console.log("fff",response.data.data[0]._id)
            

        }
        if(sheetmethod=='Database')
        {
            setavailableDatabaseSheets()
        }
        else{
            setallSheets([])
        }
    },[])

    useEffect(()=>{
        const setavailableDatabaseSheets=async()=>{
            const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
            setallSheets(response.data.data)  
            
        }
        if(sheetmethod=='Database')
        {
            setavailableDatabaseSheets()
        }
        else{
            setallSheets([])
        }
    },[sheetmethod])

    useEffect(()=>{
        const setJSon=async()=>{
            const response=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/sheetfromdb',{id:selectedSheetId,organization:localStorage.getItem('organization')})
            const data=JSON.parse(response.data.data)
            console.log(selectedSheetId,"sheetis")
            setsheetJson(data)
            console.log("sheet",data)
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
            console.log("this",fileteredKey)
            
            setsheetKeys(fileteredKey)
        }
        setJSon()
    },[selectedSheetId,sheetedited])

  return (
    <div className={`${hidenavbar?'pl-[4%] w-[100%]':'pl-[21%] w-[100%]'} p-4 font-noto  flex flex-col space-y-4 bg-gray-100`}>
        <div className='w-[100%]  flex flex-col'>{/*Portfolio content */}
            <PortfolioTop selectedSheetId={selectedSheetId} hidenavbar={hidenavbar} sheetedited={sheetedited}/>
        </div>

        <div className='tracking-wider select-none mt-[20px] w-[100%]  bg-white rounded-xl p-4 flex flex-col space-y-2 font-noto'>
            <div className='flex flex-col space-y-3'>
                <div className='h-[50px] w-[100%] flex flex-row'>
                    <p className='flex w-[50%] text-[16px] font-roboto tracking-wider'>Investment history</p>
                    <div className=' w-[75%]  flex flex-row justify-end '>
                        {
                            clickedDots && showHistory?
                            <div className='border-[1px] w-[160px] p-3  h-[120px] z-[40]  bg-white border-gray-300 rounded-md'>
                                <div onClick={()=>{setsheetmethod('Database'); setselectfield(false);setclickedDots(false);}} className={`${sheetmethod=='Database'?'bg-white':''} p-1 hover:bg-blue-400 flex items-center rounded-md text-[14px] font-roboto`}>
                                                <FaDatabase className='text-gray-700'/>
                                                <p className='p-2 cursor-pointer'>Database</p>
                                            </div>
                                            <div onClick={()=>{setsheetmethod('Google Sheet'); setselectfield(false);setclickedDots(false)}} className={`${sheetmethod=='Google Sheet'?'bg-white':''} p-1 hover:bg-blue-400 flex items-center rounded-md text-[14px] font-roboto`}>
                                                <FaDatabase className='text-gray-700'/>
                                                <p className='p-2 cursor-pointer'>Google Sheet</p>
                                            </div>
                            </div>
                            :<></>
                        }
                        {
                            showHistory?
                            <div className='h-[30px] flex items-center' onClick={()=>{setclickedDots(!clickedDots)}}>
                                <BsThreeDotsVertical className='cursor-pointer'/>
                            </div>
                            :
                            <></>
                        }
                        

                        <div className='w-[90px] text-[14px] rounded-md space-x-2 h-[30px] border-[1px] border-gray-300 items-center justify-center flex flex-row'>
                            <RiFilter3Line size={15}/>
                            <p>Filters</p>
                        </div>
                        
                        
                        
                    </div>
                </div>
                <div className={`w-[100%] flex justify-center items-center ${showHistory?'':'h-[150px]'} `}>
                    {
                        !showHistory?
                        <div onClick={()=>setselectfield(true)} className='active:bg-blue-500 active:text-white duration-75  flex flex-row space-x-2 bg-gray-300 rounded-md select-none w-[120px] h-[35px] text-[14px] font-roboto px-2 py-1 items-center text-gray-700'>
                            <FaPlus />
                        <p>Select field</p>
                    </div>:
                    <></>
                    }
                    {
                        selectfield?
                        <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                            <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                                <div onClick={()=>{setselectfield(false);setsheetmethod('')}} className='cursor-pointer h-[50px]'>
                                    <RxCross2/>
                                </div>
                                <div onClick={()=>{setsheetmethod('Database'); setselectfield(false)}} className={`${sheetmethod=='Database'?'bg-white':''} p-1 hover:bg-blue-400 flex items-center rounded-md text-[14px] font-roboto`}>
                                    <FaDatabase className='text-gray-700'/>
                                    <p className='p-2 cursor-pointer'>Database</p>
                                </div>
                                <div onClick={()=>{setsheetmethod('Google Sheet'); setselectfield(false)}} className={`${sheetmethod=='Google Sheet'?'bg-white':''} p-1 hover:bg-blue-400 flex items-center rounded-md text-[14px] font-roboto`}>
                                    <FaDatabase className='text-gray-700'/>
                                    <p className='p-2 cursor-pointer'>Google Sheet</p>
                                </div>
                                
                            </div>
                        </div>
                        :
                    <></>
                    }
                    {
                        !selectfield && sheetmethod=='Database'?
                        <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                            <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                                {
                                    clickedDots?
                                    <div onClick={()=>{setselectfield(!selectfield);setsheetmethod('')}} className='cursor-pointer h-[50px]'>
                                        <IoMdArrowBack />
                                    </div>
                                    :
                                    <div onClick={()=>{setselectfield(false);setsheetmethod('')}} className='cursor-pointer h-[50px]'>
                                        <RxCross2/>
                                    </div>
                                }
                                <div  className={`${sheetmethod=='Database'?'bg-white':''} p-1 flex items-center rounded-md text-[14px] flex-col font-roboto`}>
                                {(allSheets||[]).map(doc=>
                                        <DatabaseSheets setsheetname={setsheetname} showimagepopup={showimagepopup} setshowimagePopup={setshowimagePopup} setsheetmethod={setsheetmethod} key={doc._id} sheetKeys={sheetKeys} selectedImageFiled={selectedImageFiled} setselectedImageField={setselectedImageField} id={doc._id} setportfolioHistory={setshowHistory} setshowHistory={setshowHistory} sheetname={doc.name} setselectedSheetId={setselectedSheetId}/>
                                    )}  
                                </div>
                                
                                
                            </div>
                        </div>
                        :
                        <></>
                    }
                    {
                                showimagepopup ?
                                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                                    <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                                        
                                        <div className='w-[100%] h-[20%] flex space-x-2 items-start justify-start'>
                                            <div className='flex items-center justify-center h-[40px]' onClick={(()=>{setshowimagePopup(false); setsheetmethod('Database')})}>
                                            <IoMdArrowBack  className=' cursor-pointer' size={17}/>
                                            </div>
                                            <div className='text-gray-500 h-[40px] text-[15px] flex items-center justify-center'>
                                                {sheetname}
                                            </div>
                                            
                                        </div>
                                        <div className=' w-[100%] h-[40%] flex flex-col items-center justify-center space-y-8 space-x-2'>
                                            <p className='text-[15px] text-white'>select image field</p>
                                            <select onChange={(e)=>setselectedImageField(e.target.value)} className='w-[220px] h-[30px] text-[14px] text-gray-700 rounded-md border-gray-300 border-[1px]'>
                                                            
                                                {sheetKeys.map(k=>
                                                    <option key={k._id}>{k}</option>
                                                    )
                                                }

                                            </select>
                                        </div>
                                        <div className='w-[100%] mt-[14px] flex flex-row items-center justify-center'>
                                            <div onClick={handleselect} className='select-none cursor-pointer flex flex-row w-[120px] rounded-md h-[40px] items-center justify-center bg-gradient-to-r from-green-500 to-green-800 spae-x-2'>
                                                <p className='text-[14px] text-white'>Set image key</p>
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                    :
                                    <></>
                        }
                </div>
            </div>  
            {
             loading?
             
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Bars color="#8884d8" height={80} width={80} />
            </div>
                : 
            ((showHistory &&!selectfield)||(!clickedDots&&sheetmethod.length>0)) && !loading?
            <div>
                <PortfolioHistory selectedImageFiled={selectedImageFiled} setportfolioHistory={setshowHistory} sheetKeys={sheetKeys} sheetJson={sheetJson}/>
            </div>
            :
        <></>
        }

        <div className='h-[120px]'>

        </div>
        
 
        </div>
        
    </div>
  )
}

export default Portfolio