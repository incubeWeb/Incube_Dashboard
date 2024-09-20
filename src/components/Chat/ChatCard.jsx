import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiPlusSquare } from "react-icons/fi";
import { MdSend } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";
import user from '../Icons/user.png'
import user2 from '../Icons/user2.png'

const ChatCard = ({currentTab,CompanyName,itsfrom,realtimetabchats}) => {
    const [chat,setChat]=useState([])
    const [countChat,setCountChat]=useState(0)
    const [mychat,setmychat]=useState('')

    useEffect(()=>{
        const fun=async()=>{
            let organization=localStorage.getItem('organization')
            const doc=await axios.post('http://localhost:8999/getTabChats',{CompanyName:CompanyName,tab:`Tab${currentTab}`,organization:organization})
            
            doc.data.data.map(d=>
                {let chat=JSON.parse(d.chats)
                console.log(chat)
                setChat(chat)
                }
            )
            
        }
        fun()
    },[currentTab,realtimetabchats])

    useEffect(()=>{
        const fun=async()=>{
            if(chat.length!=0)
            {
                let organization=localStorage.getItem('organization')
                await axios.post('http://localhost:8999/setTabChats',{
                    CompanyName:CompanyName,
                    tab:`Tab${currentTab}`,
                    chats:JSON.stringify(chat),
                    organization:organization
                })
            }
        }
        fun()
    },[chat])

    useEffect(()=>{
        setChat([])
    },[currentTab])


    const handleChat=()=>{

        let sender=localStorage.getItem('email')
        
        setCountChat(countChat+1)
        setChat(prevChat=>[...prevChat,{id:countChat,chat:mychat,sender:sender,time:Date.now()}])
        setmychat('')
        document.getElementById('inputchat').value=""
    }

    const ReadableTime=(time)=>{
        const time1=new Date(time)
        return time1.toLocaleTimeString()
    }
  return (
    <div className={` w-[100%] h-[100%] `}>
        <div className='w-[100%] h-[100%] rounded-md shadow-md border-[1px] border-gray-300 md:flex md:flex-col space-y-4'>
            <div className=' w-[100%] pt-2 h-[80%] flex items-start justify-end pl-5 overflow-y-auto flex-col space-y-2 '>
                
                <div className='overflow-y-auto w-[100%]'>

                    {
                        (chat||[]).map(c=>
                            <div key={c.id} className='w-full'>
  <div className={`${c.sender === localStorage.getItem('email') ? 'items-end' : 'items-start'} mb-2 flex-col rounded-md pr-7 flex`}>
 


    <p className='text-[12px] flex items-center font-inter font-semibold mb-2'>
    
      

      <img 
                  src={c.sender === localStorage.getItem('email') ? user : user2} 
                  className='mr-2 h-[20px] w-[20px]' 
                  alt='user-avatar' 
                />

{c.sender}
    </p>
    


 
    <p className={`text-[12px] p-3 shadow-md max-w-[75%] ${c.sender === localStorage.getItem('email') 
    ? 'bg-blue-500 text-white rounded-lg relative before:content-[""] before:absolute before:top-[-8px] before:right-[10px] before:w-0 before:h-0 before:border-b-[12px] before:border-l-[10px] before:border-r-[0] before:border-b-blue-500 before:border-l-transparent'
    : 'bg-gray-200 text-black rounded-lg relative before:content-[""] before:absolute before:top-[-8px] before:right-[10px] before:w-0 before:h-0 before:border-b-[12px] before:border-l-[10px] before:border-r-[0] before:border-b-gray-200 before:border-l-transparent'} border-[1px] border-gray-300`}>
    {c.chat}
</p>


  </div>
  
  <div className={`${c.sender === localStorage.getItem('email') ? 'items-end ' : 'items-start'} w-full flex flex-col justify-start pr-2`}>

    <p className='pl-3 text-[9px] font-inter mr-5 mb-3'>{ReadableTime(c.time)}</p>
  </div>
</div>

                        )
                    }
                   
                    
                </div>
                
                


            </div>
            {
                itsfrom!='completed'?
        
            <div className='w-[100%] pl-2 h-[20%] md:flex md:flex-row space-x-2 md:items-center justify-center'>
                <div className='w-[6%] h-[100%] flex justify-start  items-center'>
                    <FiPlusSquare size={25}/>
                </div>
                <div className='w-[90%] md:space-x-3 h-[100%] md:flex md:flex-row pb-2 pt-1 pr-3'>
                    <div className=' w-[95%] h-[100%]   border-[1px]   border-gray-300 rounded-md flex flex-row'>
                        <input value={mychat} onChange={(e)=>setmychat(e.target.value)} onKeyPress={(e)=>e.key=='Enter'?handleChat():<></>}  className='w-[100%] h-[100%]  rounded-md outline-none text-[14px] pl-2'/>
                         
                    </div>
                    <div className='w-[5%] justify-end h-[100%] flex items-center'>
                            <MdSend size={23} className='cursor-pointer' onClick={handleChat}/>
                    </div>
                    
                </div>
            </div>
            :
            <></>
        }
        </div>
    </div>
  )
}

export default ChatCard