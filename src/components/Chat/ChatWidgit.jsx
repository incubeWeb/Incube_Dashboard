import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiSolidError } from 'react-icons/bi'
import { FaCircleUser } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'
import { IoChatboxEllipsesOutline, IoSend } from 'react-icons/io5'
import { IoArrowBack } from "react-icons/io5";
import { useDispatch,useSelector } from 'react-redux'
import { addUser,deleteUser, updateMsg,} from '../../states/chatclickedUser'
import { addMessage } from '../../states/usermessages'



const ChatWidgit = ({id,Useremail,handleSeeUsers,setclickeduseremail,realtimeChat}) => {
  
  const [openChat,setopenChat]=useState(false)
  const clickedUser=useSelector((state)=>state.chatclickedUser)

  const [users,setUsers]=useState([])
  const [searchUser,setSearchUser]=useState('')
  const dispatch=useDispatch()

  const [openuser,setopenuser]=useState('')
  const [sendedMsg,setsendedMsg]=useState([])
  const [receivedMsg,setreceivedMsg]=useState([])
  const [msg,setmsg]=useState('')


  const handleSearchUser=(e)=>{
    setSearchUser(e.target.value)
  }

  useEffect(()=>{
    const fun=async()=>{
      const response=await axios.post('http://localhost:8999/findUsers',{
        user:searchUser
      })
      const users=response.data.data
      //console.log(users)
      setUsers(users)
    }
    
    if(searchUser!='')
    {
    fun()
    }
    
  },[searchUser])

  

  useEffect(()=>{
    const fetchall=async()=>{
      const response=await axios.get('http://localhost:8999/fetchallusers')
      const users=response.data.data
      console.log("total users",users)
      setUsers(users)
      const UserChatpositionRes=await axios.post('http://localhost:8999/chatwidgituserpositionvalues',{
        email:localStorage.getItem('email')+`${id}`
      })
      if(UserChatpositionRes.data.status==200)
      {
        console.log('i',UserChatpositionRes.data.data)
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
    console.log('openuse',openuser)
    const setChats=async()=>{

        let response1=await axios.post('http://localhost:8999/readChat',{
          sender:localStorage.getItem('email'),
          receiver:openuser
        })
        let response2=await axios.post('http://localhost:8999/readChat',{
          receiver:localStorage.getItem('email'),
          sender:openuser
        })
        let dataS=[]
        let dataR=[]
        response1.data.data.map(response=>
          dataS.push({sender:response.sender,message:response.message,time:response.time})
        )
        console.log("Sendedchats",dataS)
        setsendedMsg(dataS)
        response2.data.data.map(response=>
          dataR.push({sender:response.sender,message:response.message,time:response.time})
        )
        console.log("receivedChats",dataR)
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

  useEffect(()=>{
    const chatingData=()=>{
      console.log(realtimeChat.fullDocument)
      if(realtimeChat.fullDocument.sender==localStorage.getItem('email') && realtimeChat.fullDocument.receiver==openuser)
        {
          setsendedMsg(prev=>[...prev,{sender:realtimeChat.fullDocument.sender,message:realtimeChat.fullDocument.message,time:realtimeChat.fullDocument.time}])
        }
        if(realtimeChat.fullDocument.receiver==localStorage.getItem('email') && realtimeChat.fullDocument.sender==openuser)
        {
          setreceivedMsg(prev=>[...prev,{sender:realtimeChat.fullDocument.sender,message:realtimeChat.fullDocument.message,time:realtimeChat.fullDocument.time}])
        }
    }
    try{
      chatingData()
    }catch(e)
    {
      console.log('no new msg',e)
    }

  },[realtimeChat])

  useEffect(()=>{
    
    console.log("here",[...sendedMsg,...receivedMsg].sort((a,b)=>{
      console.log('time',typeof(a.time))
      parseInt(a.time)-parseInt(b.time)
    }))
  },[sendedMsg,receivedMsg])
 


  const handleOpenchatbar=(username)=>{
    console.log("------------------------")
    console.log('username',username)
    setopenuser(username)
    setopenChat(true)
    dispatch(addUser({id:id,name:username,msg:''}))
    console.log("------------------------")
  }



  const convertTime = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Adjust the format as needed
  };

  const handleSendChat=async(e)=>
    { 
      console.log("tset",msg)
      e.stopPropagation()
      const response=await axios.post('http://localhost:8999/sendChat',{
        sender:localStorage.getItem('email'),
        receiver:openuser,
        message:msg
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
    

    
    
  return (
    <div className=' bg-white space-y-2 font-noto shadow-gray-400 w-[100%]  h-[100%] flex flex-col'>
        {
                      clickedUser&&openChat!=''?
                      <div className='flex flex-col space-y-4 font-noto p-[20px] fixed bg-white w-[100%] h-[100%] top-0 left-0 rounded-md ' onClick={(e)=>e.stopPropagation()}>
                        <div className='flex flex-row items-center h-[40px]'>
                          <div className='flex w-[30%] text-gray-400'>
                            <IoArrowBack size={18} className='cursor-pointer' onClick={()=>handleBackButton()} />
                          </div>
                          
                        </div>
                        <div className='w-[100%] h-[75%]'>
                              {/*Chat Messages show */}
                              <div  className=' w-[100%] overflow-y-auto h-[100%] flex items-end flex-col space-y-2 justify-end'>
                                      {
                                        [...sendedMsg,...receivedMsg].length==0?
                                        <div className='w-[100%] h-[100%] flex items-center justify-center'>
                                            <p className='text-[14px] text-gray-400'>No messages</p>
                                        </div>
                                        :
                                        <div className={ ` ${[...sendedMsg,...receivedMsg].length>7?'':'justify-end'} w-[100%] h-[100%] flex flex-col space-y-2 `}>
                                          {
                                            
                                            [...sendedMsg,...receivedMsg].sort((a,b)=>a.time-b.time).map(msg=>
                                              (msg.sender==localStorage.getItem('email'))
                                                ?
                                                <div key={msg._id} className=' flex w-[100%] justify-end rounded-sm'>
                                                  <div className='flex bg-gray-300 pl-5 pb-2 pt-3 pr-1 rounded-sm flex-col'>
                                                    <p className='text-[14px] text-gray-800'>{msg.message}</p>
                                                  <div className='flex w-[60px] items-end justify-end text-[9px]'>
                                                    <p>{convertTime(msg.time)}</p>
                                                  </div>
                                                  </div>
                                                </div>
                                                :
                                                <div key={msg._id} className='flex w-[100%] items-start'><div className='flex flex-col'><p className='text-[14px] bg-gray-300 pl-6 pr-6 pb-2 pt-2 rounded-sm text-gray-800'>{msg.message}</p><div className='flex w-[60px] items-end justify-end text-[9px]'><p>{convertTime(msg.time)}</p></div></div></div>
                                              
                                            )
                                          }
                                        </div>
                                      }    
                                </div>

                              {/*chat Messages end */}
                        </div>
                        <div className='w-[100%] h-[30px] space-x-2 items-center justify-center flex flex-row'>
                            <div className='w-[95%] h-[100%] ml-2'>
                              <input id={`text${id}`} className='w-[100%] text-[14px] pl-2 h-[100%] border-[1px] border-gray-400' placeholder='Enter your message here....' onChange={(e)=>handleTypedMsg(e)}/>
                            </div>
                            <div className='w-[5%] h-[100%] flex items-center justify-center'>
                              <IoSend size={18} className='cursor-pointer' onClick={(e)=>handleSendChat(e)}/>
                            </div>
                        </div>
                      </div>
                      :
                      <></>
        }
        <div className='w-[100%] h-[45px] '>
          <input className='w-[100%] h-[45px] border-[1px] border-gray-500 rounded-md text-[14px] pl-2' placeholder='Search' onChange={handleSearchUser}/> 
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
                users.map(user=>
               
                user.email!=localStorage.getItem('email')
                    ?
                   <div key={user._id} onClick={()=>setclickeduseremail(prev=>[...prev,{id:user.email}])} className=' w-[100%] flex flex-row' >
                      <div onClick={()=>handleOpenchatbar(user.email)}  className=' cursor-pointer h-[100%] w-[100%] border-[1px] rounded-md shadow-sm shadow-gray-300 border-gray-300 flex flex-row'>
                        <div className='h-[100%] w-[30%] flex items-center justify-center'>
                            <img src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" className='w-[70%] h-[60%] object-contain rounded-[20%]'/>
                        </div>
                        <div className='h-[100%] w-[50%] flex items-center justify-start'>
                              <p className='text-[13px] lowercase'>{user.email}</p>
                        </div>
                        <div className='w-[20%] flex items-center justify-center'>
                          <IoChatboxEllipsesOutline />
                        </div>
                    </div>
                   </div>
                  
                  :<></>

                
                )
                
              }
              

              </div>:<></>
            }
          </div>
      </div>
  )
}

export default ChatWidgit