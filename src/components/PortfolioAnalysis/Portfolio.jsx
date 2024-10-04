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
import { CiShare2 } from 'react-icons/ci'
import PortfolioShared from './PortfolioShared'
import PortfolioRemoveSharedUsers from './PortfolioRemoveSharedUsers'
import { MdGroupRemove } from 'react-icons/md'

const Portfolio = ({realtimeportfoliostate,hidenavbar,sheetedited}) => {
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

    const [portfoliocardsdata,setportfoliocardsdata]=useState([])
    const [sharedwithusers,setsharedwithusers]=useState([])

//Tabs variables
    const [selectedTab,setselectedTab]=useState(localStorage.getItem('email'))
    
    const [allportfoliotabs,setallportfoliotabs]=useState([])

    const [portfoliosecurity,setportfoliosecurity]=useState('private')
    const [clickedportfolioshared,setclickedPortfolioShared]=useState(false)
  const [clickedportfolioremoveshared,setclickedportfolioremoveshared]=useState(false)


    
    // Function to toggle filter menu visibility
    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };


    const handleFilterSelection = (filter) => {
        setSelectedFilter(filter);
     
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
        setloading(true)
    },[selectedTab])

    useEffect(()=>{
        const setStateValues=async()=>{
           const organization=localStorage.getItem('organization')
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:selectedTab,organization:organization})
            if(response.data.status==-200)
            {
                setTimeout(()=>{
                    setloading(false)
                },1000)
                return
            }
            const data=response.data.data
            setportfoliosecurity(response.data.security)
            console.log("status",stateValues)
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
                
                
                })
            }
            setTimeout(()=>{
                setloading(false)
            },1000)
        }
        setStateValues()
    },[])


    useEffect(()=>{
        const setStateValues=async()=>{
           const organization=localStorage.getItem('organization')
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:selectedTab,organization:organization})
            console.log("so the response is ",response.data.data)
            if(response.data.status==-200 || response.data.data==undefined)
            {
                setsheetmethod('')
                setallSheets([])
                setselectedSheetId('')
                setsheetJson([])
                setsheetKeys([])
                setselectedImageField('')
                setshowHistory(false)
                setshowimagePopup(false)
                setsheetname('')
                setselectfield('')
                setTimeout(()=>{
                    setloading(false)
                },1000)
                return
            }
            
            const data=response.data.data
            setportfoliosecurity(response.data.security)
           // const stateValues=JSON.parse(localStorage.getItem('portfolioState'))||[]
           const stateValues=JSON.parse(data)||[]
           console.log("status",stateValues)
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
                
                })
            }
            setTimeout(()=>{
                setloading(false)
            },1000)
        }
        setStateValues()
    },[realtimeportfoliostate,selectedTab])

    

    const handleselect=async()=>{
        
        const constructPortfolioState=[{sheetmethod:'',allSheets:allSheets,selectedSheetId:selectedSheetId,sheetJson:sheetJson,sheetKeys:sheetKeys,selectedImageFiled:selectedImageFiled,showHistory:true,showimagepopup:!showimagepopup,sheetname:sheetname,selectfield:selectfield}]
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
            email:localStorage.getItem('email'),
            security:portfoliosecurity,
            organization:localStorage.getItem('organization'),
            portfolioState:JSON.stringify(constructPortfolioState)
        })
        if(response.data.status==200)
        {
            setshowHistory(true)
            setsheetmethod('')
            setshowimagePopup(!showimagepopup)
        }
        
        
    }
    const [clickedDots,setclickedDots]=useState(false)

    useEffect(()=>{
        const setavailableDatabaseSheets=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/alluploadedFiles`,{organization:localStorage.getItem('organization')})
            const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-document-visibility`,{
                email:localStorage.getItem('email'),
                organization:localStorage.getItem('organization')
            })
            const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
            
            const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
            const tosetdata=[...response2.data.data,...filteredSet1]

            
            setallSheets(tosetdata)
          

        }

        const setavailableGoogleDatabaseSheets=async()=>{
            const response3=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-drivesheets`,{
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
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/alluploadedFiles`,{organization:localStorage.getItem('organization')})
            const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-document-visibility`,{
                email:localStorage.getItem('email'),
                organization:localStorage.getItem('organization')
            })
            const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
            
            const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
            const tosetdata=[...response2.data.data,...filteredSet1]

            
            setallSheets(tosetdata)
        }

        const setavailableGoogleDatabaseSheets=async()=>{
            const response3=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-drivesheets`,{
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
          
            
        }
    

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
     
        const setJSon=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:selectedSheetId,organization:localStorage.getItem('organization')})
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
         
            setsheetKeys(fileteredKey)
        }
        const googleSheetJson=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-google-sheet-json`,{sheetId:selectedSheetId,email:localStorage.getItem('email'),organization:localStorage.getItem('organization')})
        

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

    const handleGooglesheet=async()=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/check-login-google`,{
            email:localStorage.getItem('email'),
            organization:localStorage.getItem('organization')
          })  
          if(response.data.status==400)
          {
              alert('Google Session Ended')
              return
          }
          else if(response.data.status==200 && response.data.msg=="no refresh token found")
          {
            alert('Google account not connected')
            return
          }
          else if(response.data.status==-200)
          {
            alert('Google account not connectd')
            return
          }
    }

    const handleselectedportfoliotab=(email)=>{
        setselectedTab(email)
      }
    

    

    const settingupTabs=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-public-portfoliostate`,{organization:localStorage.getItem('organization')})
            const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-shared-portfoliostate`,{
                organization:localStorage.getItem('organization'),
                email:localStorage.getItem('email')
            })
            let publicdata=[]
            let privatedata=[]
            if(response.data.status==200)
            {
                if(response.data.data.length>0)
                {
                    publicdata=response.data.data
                    
                }
            }
            if(response2.data.status==200)
            {
                if(response2.data.data.length>0)
                {
                    privatedata=response2.data.data
                }
            }
            const mydata=[{email:localStorage.getItem('email')}]
            const combined=[...mydata,...publicdata,...privatedata]
            const uniqueCombined = combined.filter(
                (value, index, self) =>
                  index === self.findIndex((obj) => obj.email === value.email)
              );
            setallportfoliotabs(uniqueCombined)
        }

    useEffect(()=>{
        settingupTabs()

    },[])
    useEffect(()=>{
        
        settingupTabs()

    },[realtimeportfoliostate])

    const handlesavestate=async()=>{
            const organization=`${localStorage.getItem('organization')}_Topcards`
            const organization1=localStorage.getItem('organization')
            const organization2=`${localStorage.getItem('organization')}_ShownGraph`
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
                email:localStorage.getItem('email'),
                organization:organization,
                portfolioState:JSON.stringify(portfoliocardsdata),
                security:portfoliosecurity,
                sharedwith:JSON.stringify(sharedwithusers),
                organization1:organization1,
                organization2:organization2
            })
            if(response.data.status==200){
                alert("State Saved")
            }
        
    }

  return (
    <div className={`${hidenavbar?'pl-[4%] w-[100%]':'pl-[21%] w-[100%]'} p-4 font-noto  flex flex-col space-y-4 bg-gray-100`}>
        <div className=' h-[60px] p-2 w-[100%] flex flex-row rounded-md'>
            <div className='w-[90%] space-x-2 flex items-center justify-start'>
                <p className='text-[30px] tracking-wider font-inter font-semibold '>
                    Portfolio
                </p>
                {/*div for portfolio tabs */}
                <div className=' w-[80%] scrollbar-hide space-x-2 items-end p-2 pb-2 overflow-x-auto h-[50px] bg-gray-400 rounded-md flex flex-row '>
                    
                    {
                        allportfoliotabs?.length>0?
                        allportfoliotabs.map(val=>
                            
                            <div onClick={()=>handleselectedportfoliotab(val.email)} key={val.id} className={`${selectedTab==val.email?'bg-white':'bg-gray-100'} w-[140px] cursor-pointer p-2 rounded-md h-[30px]  flex flex-row items-center justify-center`}>
                                <p className='text-[11px]'>{val.email}</p>
                            </div>
                            
                        )
                        :
                        <></>
                    }
                    
                </div>


            </div>
            <div className='w-[20%] flex items-center justify-end space-x-2'>
                {
                    selectedTab==localStorage.getItem('email')?
                    <div className='flex flex-row space-x-2 items-center justify-center'>
                    {
                        portfoliosecurity=='private'?
                            <div className='flex flex-row space-x-2'>
                                <div onClick={()=>setclickedPortfolioShared(true)} className='w-[20px] h-[20px] '>
                                <CiShare2 size={20}/>
                            </div>
                            <div onClick={()=>setclickedportfolioremoveshared(true)} className='w-[20px] h-[20px] '>
                                <MdGroupRemove size={20}/>
                            </div>
                        </div>
                    :
                    <></>
                    }
                    <select className='h-[30px] text-[14px] rounded-md' value={portfoliosecurity} onChange={(e)=>{setportfoliosecurity(e.target.value)}}>
                        <option value='public'>public</option>
                        <option value='private'>private</option>
                    </select>
                    <div onClick={handlesavestate} className='cursor-pointer w-[120px] h-[30px] bg-blue-500 rounded-md text-white items-center justify-center'>
                        <p className='w-[100%] h-[100%] flex items-center justify-center'>Save state</p>
                    </div>
                </div>
                :
                <></>
                }
                
            </div>
        </div>
        <div className='w-[100%]  flex flex-col'>{/*Portfolio content */}
            <PortfolioTop selectedTab={selectedTab} setportfoliocardsdata={setportfoliocardsdata} portfoliosecurity={portfoliosecurity} realtimeportfoliostate={realtimeportfoliostate} selectedSheetId={selectedSheetId} hidenavbar={hidenavbar} sheetedited={sheetedited}/>
        </div>

        <div className='tracking-wider    select-none mt-[20px] w-[100%] bg-white rounded-xl p-4 flex flex-col space-y-2 font-noto'>
            <div className='flex flex-col  space-y-3'>
                <div className='h-[50px] w-[100%] flex flex-row'>
                    <p className='flex w-[50%] text-[16px] font-inter font-semibold tracking-wider'>Investment History</p>
                    <div className=' w-[75%]  flex flex-row justify-end '>
                        {
                            clickedDots && showHistory?
                            <div className='border-[1px] mr-52 mt-8 w-[180px] p-3  h-[120px] z-[40]  bg-white border-gray-300 rounded-md'>
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
                            showHistory && selectedTab==localStorage.getItem("email")?
                            <div className='h-[30px] flex items-center absolute right-56 mt-2' onClick={()=>{setclickedDots(!clickedDots)}}>
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
                                    

                                    {/* Filter options pop-up */}
                                    {/* {showFilterMenu && (
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
                                    )} */}

                                    {/* Sorting options pop-up */}
                                    {/* {showSortMenu && (
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
                                    )} */}
                                </div>  
                    </div>
                </div>
                <div className={`w-[100%] flex justify-center items-center ${showHistory?'':'h-[150px]'} `}>
                    {
                        !showHistory && !loading && localStorage.getItem('email')==selectedTab?
                        <div className='w-[100%] h-[100%] space-y-2 items-center justify-center flex flex-col'>
                            <div onClick={()=>{setsheetmethod('Database'); setselectfield(false)}} className='cursor-pointer flex flex-col w-[130px] h-[50px] bg-blue-500 text-[14px] rounded-md text-white items-center p-2 justify-center'>
                                <p>Select sheet from Database</p>
                            </div>
                            <div onClick={()=>{setsheetmethod('Google Sheet'); setselectfield(false)}} className='cursor-pointer flex flex-col w-[130px] h-[50px] bg-blue-500 text-[14px] rounded-md text-white items-center p-2 justify-center'>
                                <p>Select sheet from Google</p>
                            </div>
                        </div>
                      :
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
            <div className='overflow-y-auto h-[100%]' >
                <PortfolioHistory realtimeportfoliostate={realtimeportfoliostate} selectedImageFiled={selectedImageFiled} setportfolioHistory={setshowHistory} sheetKeys={sheetKeys}  
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

        {
            clickedportfolioshared?
            <div className='fixed left-0 w-[100%] top-[-20px] h-[100%] bg-white bg-opacity-80'>
                <PortfolioShared realtimeportfoliostate={realtimeportfoliostate} setsharedwithusers={setsharedwithusers} hidenavbar={hidenavbar} setclickedPortfolioShared={setclickedPortfolioShared}/>
            </div>
            :
            <></>
        }
        {
            clickedportfolioremoveshared?
            <div className='fixed left-0 w-[100%] top-[-20px] h-[100%] bg-white bg-opacity-80'>
                <PortfolioRemoveSharedUsers realtimeportfoliostate={realtimeportfoliostate} setsharedwithusers={setsharedwithusers} hidenavbar={hidenavbar} setclickedPortfolioShared={setclickedportfolioremoveshared} />
            </div>
            :
            <></>
        }
        
    </div>
  )
}

export default Portfolio