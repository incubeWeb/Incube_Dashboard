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
import GoogleSheetDatabaseSheets from './GoogleSheetDatabaseSheets'

const Portfolio = ({hidenavbar,sheetedited}) => {
    const [sheetmethod,setsheetmethod]=useState('')
    const [allSheets,setallSheets]=useState([])
    const [selectedSheetId,setselectedSheetId]=useState([])
    const [sheetJson,setsheetJson]=useState([])
    const [sheetKeys,setsheetKeys]=useState([])
    const [selectedImageFiled,setselectedImageField]=useState('')
    const [showHistory,setshowHistory]=useState(false)
    const [showimagepopup,setshowimagePopup]=useState(false)
    const [sheetname,setsheetname]=useState('')
    const [selectfield,setselectfield]=useState(false)
    const [loading,setloading]=useState(true)
    const [showFilterMenu, setShowFilterMenu] = useState(false); // State for filter pop-up
    const [selectedFilter, setSelectedFilter] = useState(''); // Selected filter
    const [showSortMenu, setShowSortMenu] = useState(false); // State for sorting pop-up
    const [selectedSort, setSelectedSort] = useState(''); // Ascending or Descending

    // Function to toggle filter menu visibility
    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };


    const handleFilterSelection = (filter) => {
        setSelectedFilter(filter);
        console.log("John"+selectedFilter)
        setShowFilterMenu(false); // Close filter menu
        setShowSortMenu(true); // Open sorting menu
    };

    // Function to handle filter selection and open sorting pop-up
   

    // Function to handle sorting selection
    const handleSortSelection = (sort) => {
        setSelectedSort(sort);
        setShowSortMenu(false); // Close sorting menu after selection
    };


    useEffect(()=>{
        const setStateValues=async()=>{
           const organization=localStorage.getItem('organization')
            const response=await axios.post('http://localhost:8999/getportfoliostate',{organization:organization})
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
            console.log("my sheet json bhaesh",sheetJson)
            const stateJson=[{sheetmethod:sheetmethod,allSheets:allSheets,selectedSheetId:selectedSheetId,sheetJson:sheetJson,sheetKeys:sheetKeys,selectedImageFiled:selectedImageFiled,showHistory:true,showimagepopup:showimagepopup,sheetname:sheetname,selectfield:selectfield}]
            
            console.log("new val is here",stateJson)
           // localStorage.setItem('portfolioState',JSON.stringify(stateJson))
            if(sheetJson.length>0 && selectedImageFiled!="")
            {
                await axios.post('http://localhost:8999/setportfoliostate',{
                    organization:localStorage.getItem('organization'),
                    portfolioState:JSON.stringify(stateJson)
    
                })
            }
            
        }
        saveCurrentState()
    },[sheetmethod,allSheets,selectedSheetId,sheetJson,sheetKeys,showHistory,showimagepopup,sheetname,selectfield])

    

    const handleselect=()=>{
        
        setshowHistory(true)
        setsheetmethod('')
        setshowimagePopup(!showimagepopup)
    }
    const [clickedDots,setclickedDots]=useState(false)

    useEffect(()=>{
        const setavailableDatabaseSheets=async()=>{
            const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
            const response2=await axios.post('http://localhost:8999/get-document-visibility',{
                email:localStorage.getItem('email'),
                organization:localStorage.getItem('organization')
            })
            const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
            
            const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
            const tosetdata=[...response2.data.data,...filteredSet1]

            
            setallSheets(tosetdata)
           // console.log("fff",response.data.data[0]._id)
            

        }

        const setavailableGoogleDatabaseSheets=async()=>{
            const response3=await axios.post('http://localhost:1222/get-drivesheets',{
                email:localStorage.getItem('email'),
                organization:localStorage.getItem("organization")
            })
            if(response3.data.status==200 && response3.data.message!="no refresh token found")
            {
                const files=response3.data.data
                setallSheets(files)
            }
            else{
                setallSheets([])
            }
            
           // console.log("fff",response.data.data[0]._id)
            

        }
        
        if(sheetmethod=='Database')
        {
            setavailableDatabaseSheets()
        }
        else if(sheetmethod=='Google Sheet')
        {
            setavailableGoogleDatabaseSheets()
        }
    },[])

    useEffect(()=>{
        const setavailableDatabaseSheets=async()=>{
            const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
            const response2=await axios.post('http://localhost:8999/get-document-visibility',{
                email:localStorage.getItem('email'),
                organization:localStorage.getItem('organization')
            })
            const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
            
            const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
            const tosetdata=[...response2.data.data,...filteredSet1]

            
            setallSheets(tosetdata)
        }

        const setavailableGoogleDatabaseSheets=async()=>{
            const response3=await axios.post('http://localhost:1222/get-drivesheets',{
                email:localStorage.getItem('email'),
                organization:localStorage.getItem("organization")
            })
            if(response3.data.status==200 && response3.data.message!="no refresh token found")
            {
                const files=response3.data.data
                setallSheets(files)
            }
            else{
                setallSheets([])
            }
            
           // console.log("fff",response.data.data[0]._id)
            
        }
        console.log("currently at",sheetmethod)

        if(sheetmethod=='Database')
        {
            setavailableDatabaseSheets()
        }
        else if(sheetmethod=='Google Sheet')
        {
            setavailableGoogleDatabaseSheets()
        }
    },[sheetmethod])

    useEffect(()=>{
        console.log("sheetId",sheetmethod)
        const setJSon=async()=>{
            const response=await axios.post('http://localhost:8999/sheetfromdb',{id:selectedSheetId,organization:localStorage.getItem('organization')})
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
            console.log("changesd")
            setsheetKeys(fileteredKey)
        }
        const googleSheetJson=async()=>{
            const response=await axios.post('http://localhost:1222/get-google-sheet-json',{sheetId:selectedSheetId,email:localStorage.getItem('email'),organization:localStorage.getItem('organization')})
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
        setsheetJson(data)
            console.log("sheetfsdfsdf",data)
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
            console.log("changesd")
            setsheetKeys(fileteredKey)
        }else{
            setsheetKeys(['none'])
        }
        
        }
        if(sheetmethod=='Database')
        {
            setJSon()
        }
        if(sheetmethod=='Google Sheet')
        {
            googleSheetJson()
        }
        
        
    },[selectedSheetId,sheetedited])

  return (
    <div className={`${hidenavbar?'pl-[4%] w-[100%]':'pl-[21%] w-[100%]'} p-4 font-noto  flex flex-col space-y-4 bg-gray-100`}>
        <div className='w-[100%]  flex flex-col'>{/*Portfolio content */}
            <PortfolioTop selectedSheetId={selectedSheetId} hidenavbar={hidenavbar} sheetedited={sheetedited}/>
        </div>

        <div className='tracking-wider select-none mt-[20px] w-[100%]  bg-white rounded-xl p-4 flex flex-col space-y-2 font-noto'>
            <div className='flex flex-col space-y-3'>
                <div className='h-[50px] w-[100%] flex flex-row'>
                    <p className='flex w-[50%] text-[16px] font-inter font-semibold tracking-wider'>Investment History</p>
                    <div className=' w-[75%]  flex flex-row justify-end '>
                        {
                            clickedDots && showHistory?
                            <div className='border-[1px] w-[160px] p-3  h-[120px] z-[40]  bg-white border-gray-300 rounded-md'>
                                <div onClick={()=>{setsheetmethod('Database'); setselectfield(false);setclickedDots(false);}} className={`${sheetmethod=='Database'?'bg-white':''} p-1 hover:bg-blue-400 flex items-center rounded-md text-[14px] font-roboto`}>
                                                <FaDatabase className='text-gray-700'/>
                                                <p className='p-2 cursor-pointer font-inter'>Database</p>
                                            </div>
                                            <div onClick={()=>{setsheetmethod('Google Sheet'); setselectfield(false);setclickedDots(false)}} className={`${sheetmethod=='Google Sheet'?'bg-white':''} p-1 hover:bg-blue-400 flex items-center rounded-md text-[14px] font-roboto`}>
                                                <FaDatabase className='text-gray-700'/>
                                                <p className='p-2 cursor-pointer font-inter'>Google Sheet</p>
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
                        
{/* 
                        <div className='w-[90px] text-[14px] rounded-md space-x-2 h-[30px] border-[1px] border-gray-300 items-center justify-center font-inter font-semibold flex flex-row'>
                            <RiFilter3Line size={15}/>
                            <p>Filters</p>
                        </div>
                         */}

                         <div className='relative'>
                                    <div className='w-[90px] text-[14px] rounded-md space-x-2 h-[30px] border-[1px] border-gray-300 items-center justify-center font-inter font-semibold flex flex-row cursor-pointer'
                                        onClick={toggleFilterMenu}>
                                        <RiFilter3Line size={15} />
                                        <p>Filters</p>
                                    </div>

                                    {/* Filter options pop-up */}
                                    {showFilterMenu && (
                                        <div className='absolute right-0 mt-2 w-[200px] p-3 bg-white border-gray-300 border-[1px] rounded-md z-50'>
                                            <div
                                                className='p-1 hover:bg-blue-500 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer'
                                                onClick={() => handleFilterSelection('Investor Name')}>
                                                <p className='p-2'>Investor Name</p>
                                            </div>
                                            <div
                                                className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-inter font-semibold cursor-pointer'
                                                onClick={() => handleFilterSelection('Amount Invested')}>
                                                <p className='p-2'>Amount Invested</p>
                                            </div>
                                            <div
                                                className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-inter font-semibold cursor-pointer'
                                                onClick={() => handleFilterSelection('Total Invested Amount')}>
                                                <p className='p-2'>Total Invested Amount</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Sorting options pop-up */}
                                    {showSortMenu && (
                                        <div className='absolute right-0 mt-2 w-[200px] p-3 bg-white border-gray-300 border-[1px] rounded-md z-50'>
                                            <div
                                                className='p-1 hover:bg-blue-500 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer'
                                                onClick={() => handleSortSelection('Ascending')}>
                                                <p className='p-2'>Ascending</p>
                                            </div>
                                            <div
                                                className='p-1 hover:bg-blue-500 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer'
                                                onClick={() => handleSortSelection('Descending')}>
                                                <p className='p-2'>Descending</p>
                                            </div>
                                        </div>
                                    )}
                                </div>  
                    </div>
                </div>
                <div className={`w-[100%] flex justify-center items-center ${showHistory?'':'h-[150px]'} `}>
                    {
                        !showHistory?
                        <div onClick={()=>setselectfield(true)} className='active:bg-blue-500 active:text-white duration-75  flex flex-row space-x-2 bg-gray-300 rounded-md select-none w-[120px] h-[35px] text-[14px] font-inter px-2 py-1 items-center text-gray-700'>
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
                        !selectfield && sheetmethod!="Google Sheet" && sheetmethod!="" ?
                        <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                            <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                                {
                                    clickedDots?
                                    <div onClick={()=>{setselectfield(!selectfield);setsheetmethod('Database')}} className='cursor-pointer h-[50px]'>
                                        <IoMdArrowBack />
                                    </div>
                                    :
                                    <div onClick={()=>{setselectfield(false);setsheetmethod("")}} className='cursor-pointer h-[50px]'>
                                        <RxCross2/>
                                    </div>
                                }
                                <div  className={`${sheetmethod=='Database'?'bg-white':''} p-1 flex items-center rounded-md text-[14px] flex-col font-roboto`}>
                                {(allSheets||[]).map(doc=>
                                        doc.fileType=='xlsx'?
                                        <DatabaseSheets setsheetname={setsheetname} showimagepopup={showimagepopup} setshowimagePopup={setshowimagePopup} setsheetmethod={setsheetmethod} key={doc._id} sheetKeys={sheetKeys} selectedImageFiled={selectedImageFiled} setselectedImageField={setselectedImageField} id={doc._id} setportfolioHistory={setshowHistory} setshowHistory={setshowHistory} sheetname={doc.name} setselectedSheetId={setselectedSheetId}/>
                                        :
                                        <></>
                                    )}  
                                </div>
                                
                                
                            </div>
                        </div>
                        :
                        <></>
                    }

                    {
                        !selectfield && sheetmethod!="Database" && sheetmethod!="" ?
                        <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                            <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                                {
                                    clickedDots?
                                    <div onClick={()=>{setselectfield(!selectfield);setsheetmethod('Google Sheet')}} className='cursor-pointer h-[50px]'>
                                        <IoMdArrowBack />
                                    </div>
                                    :
                                    <div onClick={()=>{setselectfield(false);setsheetmethod("")}} className='cursor-pointer h-[50px]'>
                                       <RxCross2/>
                                    </div>
                                }
                                <div  className={`${sheetmethod=='Google Sheet'?'bg-white':''} p-1 flex items-center rounded-md text-[14px] flex-col font-roboto`}>
                                {(allSheets||[]).map(doc=>
                                        <GoogleSheetDatabaseSheets setsheetname={setsheetname} showimagepopup={showimagepopup} setshowimagePopup={setshowimagePopup} setsheetmethod={setsheetmethod} key={doc.id} sheetKeys={sheetKeys} selectedImageFiled={selectedImageFiled} setselectedImageField={setselectedImageField} id={doc.id} setportfolioHistory={setshowHistory} setshowHistory={setshowHistory} sheetname={doc.name} setselectedSheetId={setselectedSheetId}/>
                                        
                                    )}  
                                </div>
                                
                                
                            </div>
                        </div>
                        :
                        <></>
                    }

                            {
                                showimagepopup && sheetmethod!="Google Sheet" && sheetmethod!=""   ?
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

{
                                showimagepopup && sheetmethod!="Database" && sheetmethod!=""   ?
                                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                                    <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                                        
                                        <div className='w-[100%] h-[20%] flex space-x-2 items-start justify-start'>
                                            <div className='flex items-center justify-center h-[40px]' onClick={(()=>{setshowimagePopup(false); setsheetmethod('Google Sheet')})}>
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
                <PortfolioHistory selectedImageFiled={selectedImageFiled} setportfolioHistory={setshowHistory} sheetKeys={sheetKeys}  
                    selectedFilter={selectedFilter}
                                    selectedSort={selectedSort}
                                    sheetJson={sheetJson}
                />
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