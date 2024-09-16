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
  
  
  const socket=io('http://localhost:8999')
  
  


  useEffect(()=>{
      const fun=async()=>{
        if(localStorage.getItem('email')!='')
        {
          setLoginIn(true)
        }
        console.log('connecting to socket')
        console.log('connecting to databaseChange')
        const response=await axios.post('http://localhost:8999/gettimeline',{organization:localStorage.getItem('organization')})
        console.log(response)
        if(response.data.data.length>0)
        {
          response.data.data.map(item=>
            
            dispatch(addTimeline(item))
          )
        }
        
        socket.on('databaseChange',(change)=>{
            console.log('datachanf',change.ns.coll)
            const key=changes.length-1
            const newCol={key:key,updateInColl: change.ns.coll,updateIs: JSON.stringify(change)}
          dispatch(addTimeline(newCol))
          if(change.ns.coll=='UploadedFiles')
          {
            setfilesadded(change)
          }
        })
        socket.on('chats',(chat)=>{
          console.log('this is chat',chat)
          setrealtimeChat(chat)
        })

        socket.on('investments',(data)=>{
          setinvestmentchange(data)
        })

        socket.on('sheetedited',(data)=>{
          console.log("this data sheet edt",data)
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
          {pathname !== '/' && <Navigation activeField={activeField} hidenavbar={hidenavbar} sethidenavbar={sethidenavbar} setActiveField={setActiveField} />}
          <Routes>
            <Route path="/" element={<Login setLoginIn={setLoginIn}/>} />
            <Route path="/dashboard" element={<Dashboard realtimeChat={realtimeChat} investmentchange={investmentchange} hidenavbar={hidenavbar}/>} />
            <Route path="/dealpipeline" element={<FirstCol setActiveField={setActiveField} hidenavbar={hidenavbar}/>} />
            <Route path="/dealsourcing" element={<Dealsourcing hidenavbar={hidenavbar}/>} />
            <Route path="/adduser" element={<Addusers setActiveField={setActiveField} hidenavbar={hidenavbar}/>}/>
            <Route path="/allDocs" element={<Alldocs filesadded={filesadded} setActiveField={setActiveField} activeField={activeField} hidenavbar={hidenavbar}/>} />
            <Route path="/investment" element={<AddInvestment hidenavbar={hidenavbar}/>}/>
            <Route path='/portfolio' element={<Portfolio sheetedited={sheetedited} hidenavbar={hidenavbar} />}/>
            
          </Routes>
        </>
      ) : (
        <Login setLoginIn={setLoginIn}  />
      )}
    </BrowserRouter>
  );
}

export default App;
