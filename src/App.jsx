import { useEffect, useRef, useState } from "react";
import Navigation from "./components/SideNavBar/Navigation";
import FirstCol from "./components/Dealpipeline/FirstCol";
import { BrowserRouter, Route, Routes,} from "react-router-dom";
import Login from "./components/Authentication/Login";
import Dashboard from "./components/DashBoard/Dashboard";
import Dealsourcing from "./components/DealSourcing/Dealsourcing";
import Addusers from "./components/AddUsers/Addusers";
import Alldocs from "./components/Documents/Alldocs";
import { io } from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTimeline } from "./states/timelinestate";
import Portfolio from "./components/PortfolioAnalysis/Portfolio";
import Viewsheet from "./components/ViewSheet/Viewsheet";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Apikeys from "./components/ApiKeys/Apikeys";
import { jwtDecode } from "jwt-decode";
import ChatBot from "./components/GenaiBox/ChatBot";
import Ai from "./components/AI-Component/Ai";
import { FaRegFileExcel } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import Succesalert from "./components/Alerts/Succesalert";



function App() {
  const [activeField, setActiveField] = useState('/dashboard');
  const [login, setLoginIn] = useState(false);
  const [realtimeChat,setrealtimeChat]=useState([])
  const changes=useSelector((state)=>state.timelinestate)
  const dispatch=useDispatch()

  const [boxes, setBoxes] = useState([]);
  
  
  const [investmentchange,setinvestmentchange]=useState([])
  const [hidenavbar,sethidenavbar]=useState(false)
  const [filesadded,setfilesadded]=useState([])
  const [sheetedited,setsheetedited]=useState([])
  const [realtimetabchats,setrealtimetabchats]=useState([])
  const [realtimedealpipelinecompany,setrealtimedealpipelinecompany]=useState([])
  const [realtimedealpipelinecompanyInfo,setrealtimedealpipelinecompanyInfo]=useState([])
  const [googleaccountconnected,setgoogleaccountconnected]=useState([])
  const [realtimedocumentvisibility,setrealtimedocumentvisibility]=useState([])
  const [realtimeportfoliostate,setrealtimeportfoliostate]=useState([])
  const [showsmallnav,setshowsmallnav]=useState(false)
  
  const [realtimeuser,setrealtimeuser]=useState([])
  

  const [realtimeDealpipelinetabs,setrealtimedealpipelinetabs]=useState([])
  
  const [realtimecheckAPikeys,setrealtimecheckapikeys]=useState([])

  const [realtimetimeline,setrealtimetimeline]=useState([])
  const [error,seterror]=useState(false)
  const navbarref=useRef(null)

  const [prevValue,setprevValue]=useState('0')

  const [mygoogleaccountisconnected,setmygoogleaccountisconnected]=useState(false)
  
  const [internetdisconnected,setinternetdisconnected]=useState(false)
  const [internetisback,setinternetisback]=useState(false)
  const [slowinternetconenction,setslowinternetconnection]=useState(false)

  useEffect(()=>{
    const checkInternet=()=>{
      if(!navigator.onLine){
        setinternetdisconnected(true)
        setinternetisback(false)
      }else{
        setinternetdisconnected(false)
        setinternetisback(true)
      }
    }
    window.addEventListener('offline',checkInternet)
    window.addEventListener('online',checkInternet)

    
  },[navigator.onLine])

  useEffect(()=>{
    
    const fun=()=>{
      const socket2=io(`${import.meta.env.VITE_HOST_URL}1222`, {
        reconnection: true,           // Enable reconnection
        reconnectionAttempts: Infinity, // Try reconnecting indefinitely
        reconnectionDelay: 100,       // Initial delay before reconnection (2 seconds)
        reconnectionDelayMax: 300,    // Maximum delay (5 seconds)
      })
      socket2.on('Googleconnected',(change)=>{
        setgoogleaccountconnected(change)
      })

      socket2.on('disconnect',(reason)=>{
        setslowinternetconnection(true)
      })
      socket2.on('connect_error', (err) => {
        setslowinternetconnection(true)
      });
      
      
    }
    if(navigator.onLine)
    fun()
    

  },[])

  useEffect(()=>{
    
   
    
      const fun=async()=>{
        const socket=io(`${import.meta.env.VITE_HOST_URL}8999`, {
          reconnection: true,           // Enable reconnection
          reconnectionAttempts: Infinity, // Try reconnecting indefinitely
          reconnectionDelay: 100,       // Initial delay before reconnection (2 seconds)
          reconnectionDelayMax: 300,    // Maximum delay (5 seconds)
        })
        const token=localStorage.getItem('token') || ''
        const userdata=jwtDecode(token) || ''
        const Logemail=userdata.userdetails.email || ''
        const Logorganization=userdata.userdetails.organization || ''
        const Logrole=userdata.userdetails.role || ''
     
        if(Logemail=='')
        {
          return
        }
        if(Logemail!='')
        {
          setLoginIn(true)
        }
       
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/gettimeline`,{organization:Logorganization},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        
        if(response.data.data.length>0)
        {
          response.data.data.map(item=>
            
            setrealtimetimeline(item)
          )
        }

        
        socket.on('disconnect',(reason)=>{
          setslowinternetconnection(true)
        })
        
        socket.on('connect_error', (err) => {
          setslowinternetconnection(true)
      });
        
        socket.on('databaseChange',(change)=>{
            const key=changes.length-1
            const newCol={key:key,updateInColl: change.ns.coll,updateIs: JSON.stringify(change)}
            setrealtimetimeline(newCol)
          if(change.ns.coll=='UploadedFiles')
          {
            setfilesadded(change)
          }
          if(change.ns.coll=='TabChats')
          {
            setrealtimetabchats(change)
          }
          if(change.ns.coll=='DealPipelineCompany')
          {
            setrealtimedealpipelinecompany(change)
          }
          if(change.ns.coll=='AddNewDetailDealPipeline')
          {
            
            setrealtimedealpipelinecompanyInfo(change)
            
          }
          if(change.ns.coll=='DocsVisibility')
          {
            setrealtimedocumentvisibility(change)
          }
          if(change.ns.coll=='Users')
            {
              setrealtimeuser(change)
            }
          if(change.ns.coll=='PortfolioState')
          {
            
            setrealtimeportfoliostate(change)
          }
          if(change.ns.coll=='DealpipelineTabs')
          {
            setrealtimedealpipelinetabs(change)
          }
          if(change.ns.coll=='Apikeys')
          {
            setrealtimecheckapikeys(change)
          }

        })
        socket.on('chats',(chat)=>{
          
          setrealtimeChat(chat)
        })

        socket.on('investments',(data)=>{
          setinvestmentchange(data)
        })

        socket.on('sheetedited',(data)=>{

          setsheetedited(data)
        })
      
      }
      
      if(navigator.onLine)
      fun()
      
      
  },[])



  useEffect(() => {
    localStorage.setItem('activeField', activeField);
  }, [activeField]);

  useEffect(() => {
    const setValues = () => {
      const log=localStorage.getItem('login')
      setLoginIn(log);
    };
    setValues();
  }, []);

  const [dealpipelinefromdashboardcompany,setdealpipelinefromdashboardcompany]=useState([]);
  
  
  const token=localStorage.getItem('token')

  
  let Logemail=""
  let Logorganization=""
  let Logrole=""
  try{
    const userdata=jwtDecode(token)
     Logemail=userdata.userdetails.email
    Logorganization=userdata.userdetails.organization
    Logrole=userdata.userdetails.role
  }catch(e){
    localStorage.clear()
  }

  const [sheetpopup,setsheetpopup]=useState(false)
  const [sheetClicked,setsheetClicked]=useState(false)
  const [sheetJson,setsheetJson]=useState([])
  const [sheetfieldselected,setsheetfieldselected]=useState('')
  const [sheetKeys,setsheetKeys]=useState([])
  const [loading2,setLoading2]=useState(true)
  const [sheets,setallsheets]=useState([])
  const [googlesheetfiles,setgoogledriveSheets]=useState([])
  const [clickedSheetId,setclickedSheetId]=useState('')
  const FilterRef = useRef(null);


  const [hover,sethover]=useState(false)
  const [sheetname,setsheetname]=useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [loading1,setLoading1]=useState(false)

  const [showValue,setshowvalue]=useState('0')
  


  const handlesheetclick=async(id,name)=>{
    
    setsheetname(name)
    setclickedSheetId(id)       
    setsheetClicked(true)
    setsheetpopup(false)
    
}



useEffect(()=>{
  const setValues=async()=>{
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:clickedSheetId,organization:Logorganization},{
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
      
      setsheetfieldselected(fileteredKey[0])
      setsheetKeys(fileteredKey)
      setLoading2(false)
  }
  if(clickedSheetId.length>0)
  {
  setValues()
  }
},[clickedSheetId])

  const handleGooglesheetclicked=async (id,name)=>{
            
    setsheetClicked(true)
    setsheetpopup(false)
    
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-google-sheet-json`,{sheetId:id,email:Logemail,organization:Logorganization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
    if(response.data.status==200)
    {
    const allJson=response.data.data
  
    await Promise.all(allJson)

    const keys=allJson[0].data
    const showdata=allJson[1].data[0]
    const finalJson=[]
    allJson.map(val=>{
        if(val.rowIndex!=1)
        {
            const result=keys.reduce((obj,key,value)=>{obj[key]=val.data[value]; return obj},{})
            finalJson.push(result)
        }
    })
    setsheetJson(finalJson)
    const key_=Object.keys(finalJson[0])
            
    const fileteredKey=[]
            finalJson.map(d=>{
                key_.map(k=>{
                    if(d[k]!=""&&!fileteredKey.includes(k)){
                    fileteredKey.push(k)
                    }
                }
                )
            })

        setsheetfieldselected(fileteredKey[0])
        setsheetKeys(fileteredKey)
        setLoading2(false)

    }
    else{
        setsheetfieldselected('wrong sheet format')
        setsheetKeys(['none'])
        setLoading2(false)
    }
}
const popupref2=useRef(null)




useEffect(() => {
  const handleClickOutside2 = (event) => {
      // Check if the click is outside the popup and filter menu
      
      if (FilterRef.current && !FilterRef.current.contains(event.target)){
          setsheetClicked(false)
      }

      
  };

  document.addEventListener('mousedown', handleClickOutside2);
  return () => {
      document.removeEventListener('mousedown', handleClickOutside2);
  };
}, []);

const [widgitid,setwidgitid]=useState(1)




const handlePlusClick=async(widgitid)=>{
  
  let myid=widgitid+1
  setwidgitid(myid)

  setLoading1(true)
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
      setgoogledriveSheets(files)
  }
  
  setallsheets(tosetdata)
  setsheetpopup(true)
  setLoading1(false)
}

const handleselectsheetfield=()=>{
  setsheetClicked(false)
  setsheetpopup(false)
  

  let value=''
  try{
    value=parseInt(sheetJson[0][sheetfieldselected]) 
    
    
    if(isNaN(sheetJson[0][sheetfieldselected]))
     {
        // value1='0'
        value=sheetJson[0][sheetfieldselected].match(/\d+/)?sheetJson[0][sheetfieldselected].match(/\d+/)[0]:'0'
         
     }
  }
  catch(e)
  {
      value='0'
  }

  
  setprevValue(showValue)
  setshowvalue(value);
  setBoxes(boxes.map(box =>
    box.id === widgitid ? { ...box, showValue:value,prevValue:box.showValue??'0',Sheetid:clickedSheetId,sheetfieldselected:sheetfieldselected } : box
  ));
  
}

useEffect(() => {
  const setBoxValues=async ()=>{
      const email=Logemail
      const organization=Logorganization
      
      let position=JSON.stringify(boxes)


      if(boxes.length>0)
      {
        await axios.post(`${import.meta.env.VITE_HOST_URL}8999/addDashboardData`,{email:email,positions:position,organization:organization},{
          headers:{
           "Authorization":`Bearer ${token}`
          }
        })
      }
     
      
  }
 
  setBoxValues()
  
 
  
}, [boxes]);

useEffect(()=>{
  const fun=async()=>{
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:sheetedited.fullDocument.editedSheet,organization:Logorganization},{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
  const data=JSON.parse(response.data.data)
  
  let key='';
  let sheetid=sheetedited.fullDocument.editedSheet
 
  boxes.map(box=>{

    if(box.Sheetid === sheetid) {
      
    key=box.sheetfieldselected
    }
  })
 
  let value=data[0][key]

  setBoxes(boxes.map(box =>  
    box.Sheetid === sheetid ? { ...box, showValue:value} : box
  
  ));



    
    
    
  }

  fun()
},[sheetedited])

const[currencyValue,setcurrencyvalue]=useState('$');

const handleCurrencySelect = (currency) => {

  setcurrencyvalue(currency) // Handle currency selection here
  setIsPopupOpen(false);
  
};



  return (
    <BrowserRouter>
          {login? <div onClick={()=>setsheetClicked(false)}> <Navigation setmygoogleaccountisconnected={setmygoogleaccountisconnected} navbarref={navbarref} setdealpipelinefromdashboardcompany={setdealpipelinefromdashboardcompany} showsmallnav={showsmallnav} setshowsmallnav={setshowsmallnav} login={login} setlogin={setLoginIn} googleaccountconnected={googleaccountconnected} activeField={activeField} hidenavbar={hidenavbar} sethidenavbar={sethidenavbar} setActiveField={setActiveField} /></div>:<></>}
         
          {login && location.pathname !== '/AI' ? (
        <div className="fixed flex flex-col items-center justify-center h-screen z-50 scrollbar-hide">
          <ChatBot />
        </div>
      ) : <></>}

        

          {
                    sheetpopup?
                    <div className={`${hidenavbar ? 'w-full' : 'left-20 w-[80%]'} fixed z-[60] top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center `}>
                        <div  className='p-2 flex flex-col  w-[400px] h-[400px] space-y-2 bg-white z-[40]  rounded-md' >
                            
                        <div className='flex items-center font-inter bg-blue-500 rounded-md px-2 justify-between h-[50px]'>
                <div className='flex items-center cursor-pointer' >
                    
                    <p className='text-[14px] font-semibold flex justify-center text-white  ml-8 items-center'>Select Sheet for Portfolio card</p>
                </div>
                <div className='flex items-center space-x-2 ' onMouseDown={()=>{setsheetpopup(false);}}>
                    <div className='cursor-pointer'>
                        <RxCross2 size={20} className='text-white' />
                    </div>
                </div>
            </div>
            {sheets.length === 0 && googlesheetfiles.length === 0 ? (
                  <p className='text-gray-500 text-center font-semibold'>No sheets found</p>
                ) : (
                  <>
              <div className='font-inter text-[16px] font-semibold mb-2'>
                  <p className='border-b pb-2'>Database Sheets:</p>
              </div>
              <div ref={popupref2} className={`p-1 flex h-[100%] items-center rounded-md text-[14px] flex-col font-roboto overflow-y-auto scrollbar-hide bg-white z-[60]`}>
                  {(sheets || []).map(doc => (
                      doc.fileType === 'xlsx' || doc.fileType === 'csv'  ? (
                          <div key={doc._id} className='w-[100%] flex flex-col space-y-2'>
                              <div 
                                onClick={(e) => e.stopPropagation()}
                                  onMouseEnter={() => sethover(true)} 
                                  onMouseLeave={() => sethover(false)} 
                                  onMouseDown={(e) => {handlesheetclick(doc._id, doc.name);e.stopPropagation()}} 
                                  className='w-[100%] h-[45px] hover:bg-gray-100 hover:text-gray-800 p-2 rounded-md select-none cursor-pointer flex flex-row items-center justify-start'
                              >
                                  <FaRegFileExcel className='text-green-500' size={19} />
                                  <span className='ml-2'>{doc.name.replace(/^\d+_/, "")}</span>
                              </div>
                          </div>
                      ) : null
                  ))}
                  {googlesheetfiles.length > 0 && (
                      <div className='w-[100%] font-inter   border-b pb-2 text-[14px] font-semibold mt-4 mb-2 h-[40px] flex items-center pl-2'>
                          <p  className=''>Google sheets:</p>
                      </div>
                  )}
                  {(googlesheetfiles || []).map(doc => (
                      <div key={doc._id} className='w-[100%] flex flex-col space-y-2'>
                          <div 
                              onMouseEnter={() => sethover(true)} 
                              onMouseLeave={() => sethover(false)} 
                              onMouseDown={() => handleGooglesheetclicked(doc.id, doc.name)} 
                              className='w-[100%] h-[45px] hover:bg-gray-100 hover:text-gray-800 p-2 rounded-md select-none cursor-pointer flex flex-row items-center justify-start'
                          >
                              <FaRegFileExcel className='text-green-500' size={19} />
                              <span className='ml-2'>{doc.name}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </>
      )}
                            
                        </div>
                    </div>
                    :
                    <></>
                }

                {
                    sheetClicked?
                    <div  className={`${hidenavbar ? 'w-full' : 'left-20 w-[80%]'} fixed top-0 left-0 w-full h-full  bg-black bg-opacity-40 flex items-center justify-center z-[65]`}>
                                    <div ref={FilterRef} className='p-2 flex flex-col  w-[400px] h-[400px] space-y-2 bg-white rounded-md'>
                                        
                                        <div  className='w-[100%] h-[20%] flex space-x-2 items-start justify-start'>
                                            <div className='flex items-center justify-center h-[40px]' onMouseDown={(()=>{setsheetClicked(false); setsheetpopup(true)})}>
                                            <IoMdArrowBack  className=' cursor-pointer' size={17}/>
                                            </div>
                                            <div className='text-gray-500 h-[40px] text-[15px] flex items-center justify-center'>
                                                {sheetname}
                                            </div>
                                            
                                        </div>
                                        <div  className=' w-[100%] h-[40%] flex flex-col items-center justify-center space-y-8 space-x-2'>
                                        <div className='flex flex-row space-x-2'>

                                              <select onClick={(e) => e.stopPropagation()}  onMouseDown={(e) => e.stopPropagation()}  className='border-[1px] border-gray-300 rounded-md' onChange={(e)=>handleCurrencySelect(e.target.value)}>
                                                              <option className='cursor-pointer p-2 hover:bg-gray-100' value='$'>$</option>
                                                                  <option className='cursor-pointer p-2 hover:bg-gray-100' value='€'>€</option>
                                                                  <option className='cursor-pointer p-2 hover:bg-gray-100' value='₹'>₹</option>
                                                                  <option className='cursor-pointer p-2 hover:bg-gray-100' value='£'>£</option>
                                                                  <option className='cursor-pointer p-2 hover:bg-gray-100' value='%'>%</option> 
                                                              
                                                              </select>
                                            <select onClick={(e) => e.stopPropagation()}  onMouseDown={(e) => e.stopPropagation()} value={sheetfieldselected}  onChange={(e)=>setsheetfieldselected(e.target.value)} className='w-[220px] h-[30px] text-[14px] text-gray-700 rounded-md border-gray-300 border-[1px]'>
                                                  {loading2 ? (
                                                        <option value="">
                                                          <div className="flex items-center">
                                                            <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
                                                            Loading...
                                                          </div>
                                                        </option>
                                                      ) : (
                                                                                                               
                                                sheetKeys.map(k=>
                                                    <option key={k._id}>{k}</option>
                                                    )
                                              )  }

                                            </select>
                                            </div>
                                        </div>
                                        <div className='w-[100%] mt-[14px] flex flex-row items-center justify-center'>
                                            <div onMouseDown={handleselectsheetfield} className='select-none cursor-pointer flex flex-row w-[120px] rounded-md h-[40px] items-center justify-center bg-gradient-to-r from-green-500 to-green-800 spae-x-2'>
                                            {loading2 ? (
                                     <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
                                ) : (<p className='text-[14px] text-white'>Set sheet field</p>)
                                            }
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                :
                                <></>
                }

          {
            login && internetdisconnected?
            <Succesalert alerttype='danger' headmessage="Not connected to internet" message="" offswitch={setinternetdisconnected}/>
            :
            <></>

          }

          {
            login && slowinternetconenction && !internetdisconnected?
            <Succesalert alerttype='danger' headmessage="Slow internet speed" message="" offswitch={setslowinternetconnection}/>
            :
            <></>
          }

{
            login && internetisback?
            <Succesalert alerttype='success' headmessage="You are back online" message="" offswitch={setinternetisback}/>
            :
            <></>

          }

          <Routes>
            <Route path="/" element={!login?<Login login={login} setActiveField={setActiveField} setLoginIn={setLoginIn}/>:<></>} />
            <Route path="/dashboard" element={
              <ProtectedRoute login={login}><Dashboard setcurrencyvalue={setcurrencyvalue} sheetfieldselected={sheetfieldselected} clickedSheetId={clickedSheetId}  currencyValue={currencyValue} boxes={boxes} setBoxes={setBoxes} setshowvalue={setshowvalue} setprevValue={setprevValue} prevValue={prevValue} showvalue={showValue} handlePlusClick={handlePlusClick} setsheetpopup={setsheetpopup} mygoogleaccountisconnected={mygoogleaccountisconnected} setdealpipelinefromdashboardcompany={setdealpipelinefromdashboardcompany} navbarref={navbarref} showsmallnav={showsmallnav} sethidenavbar={sethidenavbar} realtimetimeline={realtimetimeline} setActiveField={setActiveField} realtimetabchats={realtimetabchats} realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} realtimeChat={realtimeChat} investmentchange={investmentchange} hidenavbar={hidenavbar}/></ProtectedRoute>} />
            <Route path="/dealpipeline" element={
              <ProtectedRoute login={login}>
              <FirstCol setdealpipelinefromdashboardcompany={setdealpipelinefromdashboardcompany} dealpipelinefromdashboardcompany={dealpipelinefromdashboardcompany} filesadded={filesadded} realtimeDealpipelinetabs={realtimeDealpipelinetabs} realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} realtimedealpipelinecompany={realtimedealpipelinecompany} realtimetabchats={realtimetabchats} setActiveField={setActiveField} hidenavbar={hidenavbar}/>
              </ProtectedRoute>} />
            <Route path="/dealsourcing" element={
              <ProtectedRoute login={login}><Dealsourcing hidenavbar={hidenavbar}/></ProtectedRoute>} />
            <Route path="/adduser" element={<ProtectedRoute login={login}><Addusers realtimeuser={realtimeuser} setActiveField={setActiveField} hidenavbar={hidenavbar}/></ProtectedRoute>}/>
            <Route path="/allDocs" element={<ProtectedRoute login={login}><Alldocs realtimedocumentvisibility={realtimedocumentvisibility} filesadded={filesadded} setActiveField={setActiveField} activeField={activeField} hidenavbar={hidenavbar}/></ProtectedRoute>} />
            <Route path='/portfolio' element={<ProtectedRoute login={login}><Portfolio realtimeportfoliostate={realtimeportfoliostate} sheetedited={sheetedited} hidenavbar={hidenavbar} /></ProtectedRoute>}/>
            <Route path='/keys' element={<ProtectedRoute login={login}><Apikeys realtimecheckAPikeys={realtimecheckAPikeys} hidenavbar={hidenavbar}/></ProtectedRoute>}/>
            <Route path='/AI' element={<ProtectedRoute login={login}><Ai realtimecheckAPikeys={realtimecheckAPikeys} hidenavbar={hidenavbar}/></ProtectedRoute>}/>
          
          </Routes>
      
      
    </BrowserRouter>
  );
}

export default App;
