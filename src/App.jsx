import { useEffect, useState } from "react";
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
import AddInvestment from "./components/Add_Investments/AddInvestment";
import Portfolio from "./components/PortfolioAnalysis/Portfolio";
import Viewsheet from "./components/ViewSheet/Viewsheet";



function App() {
  const [activeField, setActiveField] = useState('/dashboard');
  const [login, setLoginIn] = useState(false);
  const [realtimeChat,setrealtimeChat]=useState([])
  const changes=useSelector((state)=>state.timelinestate)
  const dispatch=useDispatch()
  
  
  
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

  
  const socket=io(`${import.meta.env.VITE_HOST_URL}8999`)
  const socket2=io(`${import.meta.env.VITE_HOST_URL}1222`)
  
  


  useEffect(()=>{
      const fun=async()=>{
        if(localStorage.getItem('email')!='')
        {
          setLoginIn(true)
        }
       
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/gettimeline`,{organization:localStorage.getItem('organization')})
        
        if(response.data.data.length>0)
        {
          response.data.data.map(item=>
            
            dispatch(addTimeline(item))
          )
        }

        socket2.on('Googleconnected',(change)=>{
          
          setgoogleaccountconnected(change)
        })

        
        socket.on('databaseChange',(change)=>{
            const key=changes.length-1
            const newCol={key:key,updateInColl: change.ns.coll,updateIs: JSON.stringify(change)}
          dispatch(addTimeline(newCol))
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
          if(change.ns.coll=='PortfolioState')
          {
            
            setrealtimeportfoliostate(change)
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
      fun()
      
      return ()=>{
          socket.disconnect()
      }
  },[])



  useEffect(() => {
    const func = () => {
      const val = localStorage.getItem('activeField');
      if (val !== null) {
        setActiveField(val);
      } else {
        setActiveField('dashboard');
      }
    };
    func();
  }, []);

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



  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  

  return (
    <BrowserRouter>
      {login ? (
        <>
          {pathname !== '/' && <Navigation googleaccountconnected={googleaccountconnected} activeField={activeField} hidenavbar={hidenavbar} sethidenavbar={sethidenavbar} setActiveField={setActiveField} />}
          <Routes>
            <Route path="/" element={<Login setLoginIn={setLoginIn}/>} />
            <Route path="/dashboard" element={<Dashboard setActiveField={setActiveField} realtimetabchats={realtimetabchats} realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} realtimeChat={realtimeChat} investmentchange={investmentchange} hidenavbar={hidenavbar}/>} />
            <Route path="/dealpipeline" element={<FirstCol realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo} realtimedealpipelinecompany={realtimedealpipelinecompany} realtimetabchats={realtimetabchats} setActiveField={setActiveField} hidenavbar={hidenavbar}/>} />
            <Route path="/dealsourcing" element={<Dealsourcing hidenavbar={hidenavbar}/>} />
            <Route path="/adduser" element={<Addusers setActiveField={setActiveField} hidenavbar={hidenavbar}/>}/>
            <Route path="/allDocs" element={<Alldocs realtimedocumentvisibility={realtimedocumentvisibility} filesadded={filesadded} setActiveField={setActiveField} activeField={activeField} hidenavbar={hidenavbar}/>} />
            <Route path="/investment" element={<AddInvestment hidenavbar={hidenavbar}/>}/>
            <Route path='/portfolio' element={<Portfolio realtimeportfoliostate={realtimeportfoliostate} sheetedited={sheetedited} hidenavbar={hidenavbar} />}/>
            
          </Routes>
        </>
      ) : (
        <Login setLoginIn={setLoginIn}  />
      )}
    </BrowserRouter>
  );
}

export default App;
