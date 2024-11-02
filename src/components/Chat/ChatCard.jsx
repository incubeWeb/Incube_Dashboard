import axios from 'axios';
import React, { useEffect, useState ,useRef} from 'react'
import { FiPlusSquare } from "react-icons/fi";
import { MdSend } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";
import user from '../Icons/user.png'
import user2 from '../Icons/user2.png'

import { RxCross2 } from "react-icons/rx";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { jwtDecode } from 'jwt-decode';

const ChatCard = ({id,currentTab,CompanyName,itsfrom,realtimetabchats}) => {
    const [chat,setChat]=useState([])
    const [countChat,setCountChat]=useState(0)
    const [mychat,setmychat]=useState('')
    const [showChatModal, setShowChatModal] = useState(false);
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const[chatting,setChatting]=useState([])
   const [company,Setcompany]=useState([])
   const chatEndRef = useRef(null);
   
    useEffect(()=>{
        const fun=async()=>{
           // console.log(currentTab)
            let organization=Logorganization
            const doc=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getTabChats`,{id:id,CompanyName:CompanyName,tab:`Tab${currentTab}`,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
          
          
            doc.data.data.map(d=>
                {
                let chat=JSON.parse(d.chats)
                
                setChat(chat)
               
                }
            )
            
            
        }
        fun()
      
    },[realtimetabchats])

    useEffect(()=>{
      const fun=async()=>{
        let organization=Logorganization
            const doc=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getTabChats`,{id:id,CompanyName:CompanyName,tab:`Tab${currentTab}`,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
     
        
            if(doc.data.data.length>0){
                doc.data.data.map(d=>
                  {
                  let chat=JSON.parse(d.chats)
                  
                  setChat(chat)
                 
                  }
              )
             
            }else{
              setChat([])
             
            }
      }
      fun()
    },[currentTab])


    const scrollToBottom = () => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [chat]);


    useEffect(()=>{
        const fun=async()=>{
            if(chat.length!=0)
            {
                let organization=Logorganization
                await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setTabChats`,{
                    id:id,
                    CompanyName:CompanyName,
                    tab:`Tab${currentTab}`,
                    chats:JSON.stringify(chat),
                    organization:organization
                    },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
            }
        }
        fun()
    },[chat])

    


    const handleChat = () => {
      if (mychat.trim().length === 0) {
        return; 
    }
      let sender = Logemail;
      setCountChat(countChat + 1);
      setChat((prevChat) => [...prevChat, { id: countChat, chat: mychat, sender: sender, time: Date.now() }]);
      setmychat('');
    };
    const ReadableTime=(time)=>{
        const time1=new Date(time)
        return time1.toLocaleTimeString()
    }



    const fetchCaht= async()=>{
      let organization=Logorganization
    
      try{
        const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getTabChats`,{id:id,CompanyName:CompanyName,tab:`Tab${currentTab}`,organization:organization},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        
        })
        return response
        // setChatting(JSON.stringify(
        //   response))
        // console.log("Chahat data:", response);
        
    }catch(error){
      console.log("server error")
    }
    };
    
    const fetchCompanyData = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDealpipelineCompany`,{organization:Logorganization},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
            // console.log("Response data:", response.data.data); // Check the response structure
        return response
        // Setcompany(
        //   JSON.stringify(
        //     response.data)
        //   )
      } catch (error) {
        console.log("server error")
      }
    };
    // const chatData=[]
    // chatting.map((val=>{
    //   chatData.push(val.chats)
    // }))
    
    useEffect(() => {
      const fetchData = async () => {
        const ChatData = await fetchCaht();
       const CompanyData = await fetchCompanyData();
      
       
       
       const mergedData = [
        CompanyData?.data?.data || [], 
        ChatData?.data?.data[0]?.chats || [] // Provide a default empty array
        // Provide a default empty array
    ];
       sessionStorage.setItem("Bot_Data", JSON.stringify(mergedData));
       console.log("Chatting_Value",mergedData)
    
      };
      fetchData();
    }, [realtimetabchats]);
const [textareaHeight, setTextareaHeight] = useState(0);

  return (
    <div className={` w-[100%] h-full `}>
        <div className='w-[100%] h-[100%] rounded-md shadow-md border-[1px] border-gray-300 md:flex md:flex-col space-y-4'>
        <MdFullscreen 
                  className="text-black cursor-pointer  mt-2 ml-2"
                  size={30}
                  onClick={() => setShowChatModal(true)} // Close the modal on clicking Add button again
                />

{showChatModal && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-end  ">
          {/* Chat modal */}
          <div className=" h-[100%] w-[80%]  bg-white rounded-md shadow-lg p-4 relative z-10">
            <div className="w-[100%] h-[100%] rounded-md shadow-md border-[1px] border-gray-300 md:flex md:flex-col  space-y-4">
              <div className="mt-2 mb-4 ml-2">
                <MdFullscreenExit  size={26}
                  className="text-black   cursor-pointer  ml-15 "
                 
                  onClick={() => setShowChatModal(false)} // Close the modal on clicking Add button again
                />
              </div>
              <div className="w-[100%] pt-2 h-[80%] flex items-start justify-end pl-5 overflow-y-auto flex-col space-y-2">
                <div
                  className="overflow-y-auto w-[100%] hide-scrollbar"
                  style={{
                    overflowY: 'auto',
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none', // For Internet Explorer and Edge
                  }}
                >
                  {(chat || []).map((c, index) => (
                    <div key={index} className="w-full">
                      <div
                        className={`${
                          c.sender === Logemail ? 'items-end' : 'items-start'
                        } mb-2  flex-col rounded-md pr-7 flex`}
                      >
                        <p className="text-[12px] flex items-center font-inter font-semibold mb-2">
                          <img
                            src={c.sender === Logemail ? user : user2}
                            className="mr-2 h-[20px] w-[20px]"
                            alt="user-avatar"
                          />
                          {c.sender}
                        </p>
                        <p
                          className={`text-[12px] p-3 shadow-md max-w-[65%]  ${
                            c.sender === Logemail
                              ? 'bg-blue-500 text-white rounded-lg relative before:content-[""] before:absolute before:top-[-8px] before:right-[10px] before:w-0 before:h-0 before:border-b-[12px] before:border-l-[10px] before:border-r-[0] before:border-b-blue-500 before:border-l-transparent'
                              : 'bg-gray-200 text-black rounded-lg relative before:content-[""] before:absolute before:top-[-8px] before:right-[10px] before:w-0 before:h-0 before:border-b-[12px] before:border-l-[10px] before:border-r-[0] before:border-b-gray-200 before:border-l-transparent'
                          } border-[1px] border-gray-300`}
                        >
                          {c.chat}
                        </p>
                      </div>
                      <div
                        className={`${
                          c.sender === Logemail ? 'items-end ' : 'items-start'
                        } w-full flex flex-col justify-start pr-2`}
                      >
                        <p className="pl-3 text-[9px] font-inter mr-5 mb-3">{ReadableTime(c.time)}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>
              {itsfrom !== 'completed' ? (
                <div className="w-full pl-2 h-[20%] md:flex md:flex-row space-x-2 md:items-center justify-center">
      <div className="w-[90%] h-full md:flex md:flex-row pb-2 pt-1 pr-3">
      <div className="flex-grow h-full flex items-center">
  <div className={`border border-gray-300 ${textareaHeight > 40 ? 'rounded-xl' : 'rounded-full'} flex-grow overflow-hidden flex items-center`}>
    <textarea
      value={mychat}
      onChange={(e) => {
        setmychat(e.target.value);
        e.target.style.height = 'auto'; // Reset height
        const maxHeight = 100; // Set your max height here
        const newHeight = Math.min(e.target.scrollHeight, maxHeight);
        setTextareaHeight(newHeight); // Update state with new height
        e.target.style.height = `${newHeight}px`;
      }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevent default Enter key behavior
          handleChat(); // Call your function to handle the chat submission
        }
      }}
      className="w-full h-full rounded-full outline-none text-[14px] scrollbar-hide pl-5 pr-5 py-2 transition-all resize-none"
      placeholder="Type your message..."
      rows={1} // Minimum number of rows
      style={{ maxHeight: '100px', overflowY: 'auto', resize: 'none' }}
    />
  </div>
</div>

        <div className="flex items-center justify-center w-[5%] h-full">
          <MdSend size={24} className="cursor-pointer" onClick={handleChat} />
        </div>
      </div>
    </div>




              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
            <div className=' w-[100%] pt-2 h-[80%] flex items-start justify-end pl-5 overflow-y-auto scrollbar-hide flex-col space-y-2 '>
                
                <div className='overflow-y-auto scrollbar-hide w-[100%]'>

                    {
                        (chat||[]).map((c,index)=>
                            <div key={index} className='w-full'>
                                <div className={`${c.sender === Logemail ? 'items-end' : 'items-start'} mb-2 flex-col rounded-md pr-7 flex`}>
 


    <p className='text-[12px] flex items-center font-inter font-semibold mb-2'>
    
      

      <img 
                  src={c.sender === Logemail ? user : user2} 
                  className='mr-2 h-[20px] w-[20px]' 
                  alt='user-avatar' 
                />

{c.sender}
    </p>
    


 
    <p className={`text-[12px] p-3 shadow-md max-w-[75%] ${c.sender === Logemail 
    ? 'bg-blue-500 text-white rounded-lg relative before:content-[""] before:absolute before:top-[-8px] before:right-[10px] before:w-0 before:h-0 before:border-b-[12px] before:border-l-[10px] before:border-r-[0] before:border-b-blue-500 before:border-l-transparent'
    : 'bg-gray-200 text-black rounded-lg relative before:content-[""] before:absolute before:top-[-8px] before:right-[10px] before:w-0 before:h-0 before:border-b-[12px] before:border-l-[10px] before:border-r-[0] before:border-b-gray-200 before:border-l-transparent'} border-[1px] border-gray-300`}>
    {c.chat}
    </p>


  </div>
  
  <div className={`${c.sender === Logemail ? 'items-end ' : 'items-start'} w-full flex flex-col justify-start pr-2`}>

    <p className='pl-3 text-[9px] font-inter mr-5 mb-3'>{ReadableTime(c.time)}</p>
  </div>
</div>

                        )
                    }
                    <div ref={chatEndRef} />
                    
                </div>
                
                


            </div>
            {
                itsfrom!='completed'?
                <div className='w-full pl-2 h-auto md:flex md:flex-row space-x-2 md:items-center justify-center'>
      <div className='w-[90%] md:space-x-3 h-auto md:flex md:flex-row pb-2 pt-1 pr-3'>
        <div className={`flex-grow border border-gray-300 ${textareaHeight > 20 ? 'rounded-xl' : 'rounded-xl'} flex flex-row items-start`}>
          <textarea 
            value={mychat} 
            onChange={(e) => {
              setmychat(e.target.value);
              e.target.style.height = 'auto'; // Reset height
              const maxHeight = 60; // Set your max height here
              const newHeight = Math.min(e.target.scrollHeight, maxHeight);
              setTextareaHeight(newHeight); // Update state with new height
              e.target.style.height = `${newHeight}px`;
            }} 
            onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevent default Enter key behavior
          handleChat(); // Call your function to handle the chat submission
        }
      }}  
            className='w-full h-auto rounded-xl outline-none text-[14px] pl-4 pt-1 pr-4 scrollbar-hide transition-all mb-2'
            rows={1} // Minimum number of rows
            style={{ maxHeight: '60px', overflowY: 'auto', resize: 'none' }} // Adjusted for max height
          />
        </div>
        <div className='w-[5%] justify-end h-auto flex items-center'>
          <MdSend size={23} className='cursor-pointer' onClick={handleChat} />
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