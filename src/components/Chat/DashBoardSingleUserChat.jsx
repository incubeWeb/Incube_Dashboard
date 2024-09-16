import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TbSend2 } from "react-icons/tb";

const DashBoardSingleUserChat = ({receiver,clickUserField,openChatbar}) => {
  const [Messages,setMessages]=useState([])


  useEffect(()=>{
    const ReadMsg=async()=>
      {
        const response1=await axios.post('http://ec2-13-233-247-65.ap-south-1.compute.amazonaws.com:8999/readChat',{
          sender:localStorage.getItem('email'),
          receiver:receiver,
          organization:localStorage.getItem('organization')
        })
        const response2=await axios.post('http://ec2-13-233-247-65.ap-south-1.compute.amazonaws.com:8999/readChat',{
          sender:receiver,
          receiver:localStorage.getItem('email'),
          organization:localStorage.getItem('organization')
        })
        let object1=response1.data.data
        let object2=response2.data.data
        let merged=[...object1,...object2]
        merged=merged.sort((a,b)=>a.time-b.time)
        setMessages(merged)
      }
      ReadMsg()
  },[receiver])

  const convertTime = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Adjust the format as needed
  };

  useEffect(()=>{
      const setMsg=async()=>{
        const response1=await axios.post('http://ec2-13-233-247-65.ap-south-1.compute.amazonaws.com:8999/readChat',{
          sender:localStorage.getItem('email'),
          receiver:receiver,
          organization:localStorage.getItem('organization')
        })
        const response2=await axios.post('http://ec2-13-233-247-65.ap-south-1.compute.amazonaws.com:8999/readChat',{
          sender:receiver,
          receiver:localStorage.getItem('email'),
          organization:localStorage.getItem('organization')
        })
        let object1=response1.data.data
        let object2=response2.data.data
        let merged=[...object1,...object2]
        merged=merged.sort((a,b)=>a.time-b.time)
        setMessages(merged)
      }
      const interval = setInterval(() => {
        if(openChatbar)
        {
          setMsg()
        }
      }, 10); // Fetch every 1 second
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
      
  },[])//MESSAGES
  

  const handleSendChat=async()=>
    { 
      setMessages(prevmsg=>[...prevmsg,{message:message}])
      const message=document.getElementById('message').value
      const msg=document.getElementById('message').value
        document.getElementById('message').value=""
        if(msg!="")
        {
          const response=await axios.post('http://ec2-13-233-247-65.ap-south-1.compute.amazonaws.com:8999/sendChat',{
            sender:localStorage.getItem('email'),
            receiver:receiver,
            message:msg,
            time:Date.now(),
            organization:localStorage.getItem('organization')
          })
          if(response.data.status==200)
            {
              setMessages(prevmsg=>[...prevmsg,{message:message}])
            }
        }
        
    }
  return (
    <div className='w-[100%] h-[100%] flex flex-col p-[24px] overflow-y-auto'>
        <div  className=' w-[100%] overflow-y-auto h-[80%] flex items-end flex-col space-y-2 justify-end'>
              {
                Messages.length==0?
                <div className='w-[100%] h-[100%] flex items-center justify-center'>
                    <p className='text-[14px] text-gray-400'>No messages</p>
                </div>
                :
                <div className={ ` ${Messages.length>7?'':'justify-end'} w-[100%] h-[100%] flex flex-col space-y-2 `}>
                  {
                    Messages.map(msg=>
                      msg.sender==localStorage.getItem('email')
                        ?
                        <div key={msg.time} className='flex w-[100%] justify-end rounded-sm'><div className='flex bg-gray-300 pl-5 pb-2 pt-3 pr-1 rounded-sm flex-col'><p className='text-[14px] text-gray-800'>{msg.message}</p><div className='flex w-[60px] items-end justify-end text-[9px]'><p>{convertTime(msg.time)}</p></div></div></div>
                        :
                        <div key={msg.time} className='flex w-[100%] items-start'><div className='flex flex-col'><p className='text-[14px] bg-gray-300 pl-6 pr-6 pb-2 pt-2 rounded-sm text-gray-800'>{msg.message}</p><div className='flex w-[60px] items-end justify-end text-[9px]'><p>{convertTime(msg.time)}</p></div></div></div>
                      
                    )
                  }
                </div>
              }    
        </div>
        
        <div className='w-[100%] h-[20%]'>
            <div className='w-[100%] h-[100%] space-x-2 flex flex-row items-center z-40'>
                    <div  className='h-[40%] rounded-md w-[100%]  shadow-md shadow-gray-300 border-[1px] '><input className=' text-gray-600 outline-[1px] border-gray-300 border-[1px] outline-gray-400 rounded-md h-[100%] w-[100%] text-[13px] pl-2 ' placeholder='Enter your message here....' id='message'/></div>
                    <div ><TbSend2 size={26} className='cursor-pointer' onClick={handleSendChat}/></div>
            </div>
        </div>
    </div>
  )
}

export default DashBoardSingleUserChat