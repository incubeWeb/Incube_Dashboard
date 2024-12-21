import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const Socketcontext=createContext();
const Socketstate=({children})=>{

    const [filesadded,setfilesadded]=useState([])
    const [sheetedited,setsheetedited]=useState([])
    const [realtimetabchats,setrealtimetabchats]=useState([])
    const [realtimedealpipelinecompany,setrealtimedealpipelinecompany]=useState([])
    const [realtimedealpipelinecompanyInfo,setrealtimedealpipelinecompanyInfo]=useState([])
    const [googleaccountconnected,setgoogleaccountconnected]=useState([])
    const [realtimedocumentvisibility,setrealtimedocumentvisibility]=useState([])
    const [realtimeportfoliostate,setrealtimeportfoliostate]=useState([])
    const [realtimeuser,setrealtimeuser]=useState([])
    const [realtimeDealpipelinetabs,setrealtimedealpipelinetabs]=useState([]) 
    const [realtimecheckAPikeys,setrealtimecheckapikeys]=useState([])
    const [realtimetimeline,setrealtimetimeline]=useState([])
    const [slowinternetconenction,setslowinternetconnection]=useState(false)
    const [realtimeChat,setrealtimeChat]=useState([])
    const changes=useSelector((state)=>state.timelinestate)
    

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
            const Logorganization=userdata.userdetails.organization || ''
           
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
    
            socket.on('sheetedited',(data)=>{
    
              setsheetedited(data)
            })
          
          }
          
          if(navigator.onLine)
          fun()
          
          
      },[])


    return(
    <Socketcontext.Provider value={{filesadded,sheetedited,realtimetabchats,realtimedealpipelinecompany,googleaccountconnected,realtimedocumentvisibility,realtimeportfoliostate,realtimeuser,realtimeDealpipelinetabs,realtimecheckAPikeys,realtimetimeline,slowinternetconenction,realtimeChat,realtimedealpipelinecompanyInfo,setslowinternetconnection}}>
        {children}
    </Socketcontext.Provider>)
}
export {Socketcontext};
export default Socketstate;