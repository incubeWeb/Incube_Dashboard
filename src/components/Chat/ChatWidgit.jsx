import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { BiSolidError } from 'react-icons/bi'
import { FaCircleUser } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'
import { IoChatboxEllipsesOutline, IoSend } from 'react-icons/io5'
import { IoArrowBack } from "react-icons/io5";
import { useDispatch,useSelector } from 'react-redux'
import { addUser,deleteUser, updateMsg,} from '../../states/chatclickedUser'
import { addMessage } from '../../states/usermessages'
import { RxCross2 } from 'react-icons/rx'
import user from '../Icons/user.png'
import user2 from '../Icons/user2.png'
import { jwtDecode } from 'jwt-decode'


const ChatWidgit = ({id,Useremail,handleSeeUsers,setclickeduseremail,realtimeChat,setBoxes,boxes}) => {
  
  const [openChat,setopenChat]=useState(false)
  const clickedUser=useSelector((state)=>state.chatclickedUser)

  const [users,setUsers]=useState([])
  const [searchUser,setSearchUser]=useState('')
  const dispatch=useDispatch()

  const [openuser,setopenuser]=useState('')
  const [sendedMsg,setsendedMsg]=useState([])
  const [receivedMsg,setreceivedMsg]=useState([])
  const [msg,setmsg]=useState('')

  const token=localStorage.getItem('token')
  const userdata=jwtDecode(token)
  const Logemail=userdata.userdetails.email
  const Logorganization=userdata.userdetails.organization
  const Logrole=userdata.userdetails.role
  const chatEndRef = useRef(null);
  const handleSearchUser=(e)=>{
    setSearchUser(e.target.value)
  }

  useEffect(()=>{
    const fun=async()=>{
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/findUsers`,{
        user:searchUser,
        organization:Logorganization
      },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      const users=response.data.data
     
     
      setUsers(users)
    }
    
    if(searchUser!='')
    {
      console.log(response.data)
    fun()
    
    }
    
  },[searchUser])

  const deleteWidgit=async()=>{
    const email=Logemail
    const organization=Logorganization
    const position=JSON.stringify(boxes.filter((box,index)=>index!=id))

    if(boxes.length===0)
    {
      await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`,{email:email,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      setBoxes([])
    }
    else{const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updatedashboard`,{email:email,position:position,organization:organization},{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    if(response.data.status==200)
    {
      setBoxes(boxes.filter((box,index)=>index!=id))
     
      
    }
  }
  }
  

  useEffect(()=>{
    const fetchall=async()=>{
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/fetchallusers`,{organization:Logorganization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      const users=response.data.data
    
      setUsers(users)
      const UserChatpositionRes=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/chatwidgituserpositionvalues`,{
        email:Logemail+`${id}`,
        organization:Logorganization
      },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      if(UserChatpositionRes.data.status==200)
      {
       
        const ans=UserChatpositionRes.data.data
        setUsers(ans)
      }
      if(localStorage.getItem(`Chatwidgituserorder${id}`))
      {
        setUsers(JSON.parse(localStorage.getItem(`Chatwidgituserorder${id}`)))
      }
    }
    if(searchUser=='')
    {
      fetchall()
    }
  },[])

  useEffect(()=>{
   
    const setChats=async()=>{

        let response1=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/readChat`,{
          sender:Logemail,
          receiver:openuser,
          organization:Logorganization
         
        },{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        let response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/readChat`,{
          receiver:Logemail,
          sender:openuser,
          organization:Logorganization
        },{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        let dataS=[]
        let dataR=[]
        response1.data.data.map(response=>
          dataS.push({sender:response.sender,message:response.message,time:response.time})
          
        )
        
        setsendedMsg(dataS)
        response2.data.data.map(response=>
          dataR.push({sender:response.sender,message:response.message,time:response.time})
        )
       
        setreceivedMsg(dataR)    
    }
    try{
      setChats()
    }
    catch(e)
    {
      console.log('error')
    }

  },[openuser])

  const lastProcessedMsgId = useRef(null);

  useEffect(()=>{
    const chatingData=()=>{
      if (lastProcessedMsgId.current === realtimeChat.fullDocument._id) {
        return; // Skip processing if the message has already been handled
      }

      // Update last processed message ID
      lastProcessedMsgId.current = realtimeChat.fullDocument._id;
      
      if(realtimeChat.fullDocument.sender==Logemail && realtimeChat.fullDocument.receiver==openuser)
        {
          setsendedMsg(prev=>[...prev,{sender:realtimeChat.fullDocument.sender,message:realtimeChat.fullDocument.message,time:realtimeChat.fullDocument.time}])
        }
        if(realtimeChat.fullDocument.receiver==Logemail && realtimeChat.fullDocument.sender==openuser)
        {
          setreceivedMsg(prev=>[...prev,{sender:realtimeChat.fullDocument.sender,message:realtimeChat.fullDocument.message,time:realtimeChat.fullDocument.time}])
        }
    }
    try{
      chatingData()
    }catch(e)
    {
      console.log(e)
    }

  },[realtimeChat])

  
 


  const handleOpenchatbar=(username)=>{
    
    setopenuser(username)
    setopenChat(true)
    dispatch(addUser({id:id,name:username,msg:''}))
  }



  const convertTime = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Adjust the format as needed
  };

  const handleSendChat=async(e)=>
    { 
      
      e.stopPropagation()
      if(msg.trim().length==0){
        return;
      }
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sendChat`,{
        sender:Logemail,
        receiver:openuser,
        message:msg,
        organization:Logorganization
      },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      if(response.data.status==200)
      {
        
        setmsg('')
        document.getElementById(`text${id}`).value=''
      }
    }

    const handleTypedMsg=(e)=>{
      e.stopPropagation()
      setmsg(e.target.value)
      
    }

    const handleBackButton=()=>{
        setopenChat(false)
    }
    useEffect(() => {
      // This effect runs when sendedMsg changes
      const handleNewMessage = () => {
          if (sendedMsg.length > 0) {
              // Handle any side effects here, like scrolling to the bottom
              console.log('New message sent:', sendedMsg[sendedMsg.length - 1]);
          }
      };
    
      handleNewMessage(); // Call the function to handle new messages
    }, [sendedMsg]); // Depend on sendedMsg to trigger the effect
    
   
    useEffect(()=>{
const mergedData={
  sendmessage:{sendedMsg},
  receivedMessage:{receivedMsg}
  
    }
  sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
},[sendedMsg,receivedMsg])
    
useEffect(() => {
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  scrollToBottom();
}, [sendedMsg, receivedMsg]); // Run whenever messages change

useEffect(() => {
  if (openChat) {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }
}, [openChat]);

useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [sendedMsg, receivedMsg]);



  return (
    <div className=' bg-white space-y-2 font-inter shadow-gray-400 w-full  h-[100%] flex flex-col'>
        {
                      clickedUser&&openChat!=''?
                      <div className='flex flex-col space-y-4 font-noto p-[20px] fixed  w-[100%] h-[120%] top-0 left-0 rounded-md  bg-white scrollbar-hide  shadow-lg  mb-4 ' onClick={(e)=>e.stopPropagation()}>
                        <div className='flex flex-row items-center h-[40px]'>
                          <div className='flex w-[30%] text-gray-400'>
                            <IoArrowBack size={18} className='cursor-pointer' onClick={()=>handleBackButton()} />
                          </div>
                          
                        </div>
                        <div className='w-[100%] h-[75%]'>
                              {/*Chat Messages show */}
                              <div className='w-[100%] overflow-y-auto scrollbar-hide h-[100%] flex items-end flex-col space-y-2 justify-end'>
  {
    [...sendedMsg, ...receivedMsg].length === 0
      ? (
        <div className='w-[100%] h-[100%] flex items-center justify-center'>
          <p className='text-[14px] text-gray-400'>No messages</p>
        </div>
      )
      : (
        <div className={`${[...sendedMsg, ...receivedMsg].length > 7 ? '' : 'justify-end'} w-[100%] h-[100%] flex flex-col space-y-2`}>
          {
            [...sendedMsg, ...receivedMsg].sort((a, b) => new Date(parseInt(a.time)) - new Date(parseInt(b.time))).map(msg =>
              (msg.sender === Logemail)
                ? <div key={msg._id} className='w-full'>
                  <div className='text-[12px] flex justify-end mb-4 mr-3 font-inter font-semibold'>
                    <div className='flex justify-end items-end h-[20px] w-[20px] mr-2'>
                      <img src={user} alt='sender-avatar'/>
                    </div>
                    {msg.sender}
                  </div>
                  <div className='flex justify-end items-end rounded-sm'>
                     <div className='flex bg-blue-400 pl-2 pt-2 pb-2 mr-2 ml-4 max-w-xs text-white rounded-lg relative'>
              <p className='text-[14px] text-white'>{msg.message}</p>
            </div>
                  </div>
                  <div className='flex w-full justify-end items-end'>
                    <p className='text-[9px] text-gray-500 mr-5'>{convertTime(msg.time)}</p>
                  </div>
                </div>
                : <div key={msg._id} className='flex w-[100%] items-start'>
                  <div className='flex flex-col'>
                    <div className='text-[12px] flex justify-start mb-4 mr-3 font-inter font-semibold'>
                      <div className='flex justify-end items-end h-[20px] w-[20px] mr-2'>
                        <img src={user2} alt='receiver-avatar'/>
                      </div>
                      {msg.sender}
                    </div>
                    <p className='text-[14px] pl-2 pr-2 pt-2 pb-2 mr-6 mb-3 bg-gray-200 text-black rounded-lg relative border-[1px] border-gray-300'>
              {msg.message}
            </p>
                    <div className='flex w-[60px] items-end justify-start text-[9px]'>
                      <p>{convertTime(msg.time)}</p>
                    </div>
                  </div>
                </div>
            )
          }
          <div ref={chatEndRef} />
        </div>
      )
  }
</div>


                              {/*chat Messages end */}
                        </div>
                       
          
                        <div className='w-full h-50 flex items-center justify-between'>
  <div className='flex-grow ml-2 mb-4'>
    <textarea
      id={`text${id}`}
      className='w-full text-14 pl-2 h-auto px-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none scrollbar-hide'
      placeholder='Enter your message here....'
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevent new line
          handleSendChat(e);
        } else {
          handleTypedMsg(e);
        }
      }}
      onChange={(e) => {
        handleTypedMsg(e);
        e.target.style.height = 'auto'; // Reset height
        const maxHeight = 70; // Set your max height here
        e.target.style.height = `${Math.min(e.target.scrollHeight, maxHeight)}px`;
      }}
      rows={1} // Minimum number of rows
      style={{ maxHeight: '70%', overflowY: 'auto', resize: 'none' }}
    />
  </div>
  <div className='flex items-center justify-center ml-2'>
    <IoSend size={24} className='cursor-pointer' onClick={(e) => handleSendChat(e)} />
  </div>
</div>


                      </div>
                      :
                      <></>
        }
        <div className='w-[100%] h-[45px] '>
          <input className='w-[100%] h-[45px] border-[1px] border-gray-500    rounded-md text-[14px] pl-2' placeholder='Search' onChange={handleSearchUser}/> 
        </div>
          <div className=' flex w-[100%] h-[70%] flex-row  '>
            {
              users.length==0?
              <div className='flex flex-row w-[100%] h-[100%] items-center justify-center text-gray-700 space-x-4'>
                <BiSolidError size={20}/>
                <p className='text-[14px]'>No Users</p>
              </div>
              :
              users.length>0?
              <div className=' flex flex-col w-[100%] items-center justify-start text-gray-700 space-y-1 overflow-y-auto scrollbar-hide'>
               
              {
                (users||[]).map(user=>
               
                user.email!=Logemail
                    ?
                   <div key={user._id} onClick={()=>setclickeduseremail(prev=>[...prev,{id:user.email}])} className=' w-[100%] flex flex-row' >
                      <div onClick={()=>handleOpenchatbar(user.email)}  className=' cursor-pointer h-[100%] w-[100%] border-[1px] rounded-md shadow-sm shadow-gray-300 border-gray-300 flex flex-row'>
                        <div className='h-[100%] w-[30%] flex items-center justify-center'>
                            <img src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" className='w-[70%] h-[60%] object-contain rounded-[20%]'/>
                        </div>
                        <div className='h-[100%] w-[50%] flex items-center justify-start'>
                              <p className='text-[13px] lowercase'>{user.email}</p>
                        </div>
                        <div className='w-[20%] flex items-center ml-4 justify-center'>
                          <IoChatboxEllipsesOutline  className='ml-4'/>
                        </div>
                    </div>
                   </div>
                  
                  :<></>

                
                )
                
              }
              

              </div>:<></>
            }
          </div>
          <div className='z-[10] cursor-pointer flex items-center justify-center w-[20px] rounded-xl h-[20px]  bg-gray-100 fixed right-[-2px] top-[-8px] ' onClick={deleteWidgit}>
              <RxCross2 size={14} className='text-black' />
        </div> 
      </div>
  )
}

export default ChatWidgit