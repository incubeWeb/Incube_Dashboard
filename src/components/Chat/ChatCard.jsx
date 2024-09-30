import axios from 'axios';
<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react'
import { FiPlusSquare } from "react-icons/fi";
import { MdSend } from "react-icons/md";
const ChatCard = ({currentTab,CompanyName}) => {
    const [chat,setChat]=useState([])
    const [countChat,setCountChat]=useState(0)

    useEffect(()=>{
        const fun=async()=>{
            let organization=localStorage.getItem('organization')
            const doc=await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/getTabChats',{CompanyName:CompanyName,tab:`Tab${currentTab}`,organization:organization,mainorganization:localStorage.getItem('organization')})
            console.log("heere",doc.data.data)
            doc.data.data.map(d=>
                {let chat=JSON.parse(d.chats)
                console.log(chat)
                setChat(chat)
                }
            )
            
        }
        fun()
    },[currentTab])

    useEffect(()=>{
        console.log(currentTab)
        const fun=async()=>{
            if(chat.length!=0)
            {
                let organization=localStorage.getItem('organization')
                await axios.post('http://ec2-13-232-103-3.ap-south-1.compute.amazonaws.com:8999/setTabChats',{
                    CompanyName:CompanyName,
                    tab:`Tab${currentTab}`,
                    chats:JSON.stringify(chat),
                    organization:organization,
                    mainorganization:localStorage.getItem('organization')
                })
            }
        }
        fun()
    },[chat])

    useEffect(()=>{
        setChat([])
    },[currentTab])
=======
import React, { useEffect, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { VscAdd } from 'react-icons/vsc';
import user from '../Icons/user.png';
import user2 from '../Icons/user2.png';

const ChatCard = ({ currentTab, CompanyName, itsfrom, realtimetabchats }) => {
  const [chat, setChat] = useState([]);
  const [countChat, setCountChat] = useState(0);
  const [mychat, setmychat] = useState('');
  const [showChatModal, setShowChatModal] = useState(false); // State to toggle chat modal

  useEffect(() => {
    const fun = async () => {
      let organization = localStorage.getItem('organization');
      const doc = await axios.post(
        `${import.meta.env.VITE_HOST_URL}8999/getTabChats`,
        { CompanyName: CompanyName, tab: `Tab${currentTab}`, organization: organization }
      );

      doc.data.data.map((d) => {
        let chat = JSON.parse(d.chats);
        setChat(chat);
      });
    };
    fun();
  }, [currentTab, realtimetabchats]);

  useEffect(() => {
    const fun = async () => {
      if (chat.length != 0) {
        let organization = localStorage.getItem('organization');
        await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setTabChats`, {
          CompanyName: CompanyName,
          tab: `Tab${currentTab}`,
          chats: JSON.stringify(chat),
          organization: organization,
        });
      }
    };
    fun();
  }, [chat]);
>>>>>>> Stashed changes

  const handleChat = () => {
    let sender = localStorage.getItem('email');
    setCountChat(countChat + 1);
    setChat((prevChat) => [...prevChat, { id: countChat, chat: mychat, sender: sender, time: Date.now() }]);
    setmychat('');
    document.getElementById('inputchat').value = '';
  };

  const ReadableTime = (time) => {
    const time1 = new Date(time);
    return time1.toLocaleTimeString();
  };

<<<<<<< Updated upstream
        let capturedChat=document.getElementById('chat').value
        document.getElementById('chat').value=""
        setCountChat(countChat+1)
        setChat(prevChat=>[...prevChat,{id:countChat,chat:capturedChat}])
    }

  return (
    <div className={` w-[100%] h-[100%] `}>
        <div className='w-[100%] h-[100%] rounded-md shadow-md border-[1px] border-gray-300 md:flex md:flex-col space-y-4'>
            <div className=' w-[100%] pt-2 h-[80%] flex items-start justify-end pl-5 overflow-y-auto flex-col space-y-2 '>
                
                <div className='overflow-y-auto w-[100%]'>

                    {
                        chat.map(c=>
                            <div key={c.id} className=' mb-2  rounded-md md:flex md:items-center md:justify-end pr-7 '>
                                 <p className='text-[12px] text-white border-[1px] border-gray-300 bg-blue-500   p-2 rounded-md shadow-md'>{c.chat}</p>
                            </div>
                        )
                    }
                   
                    
                </div>
                
                


            </div>
            <div className='w-[100%] pl-2 h-[20%] md:flex md:flex-row space-x-2 md:items-center justify-center'>
                <div className='w-[6%] h-[100%] flex justify-start  items-center'>
                    <FiPlusSquare size={25}/>
                </div>
                <div className='w-[90%] md:space-x-3 h-[100%] md:flex md:flex-row pb-2 pt-1 pr-3'>
                    <div className=' w-[95%] h-[100%]   border-[1px]   border-gray-300 rounded-md flex flex-row'>
                        <input id='chat' className='w-[100%] h-[100%]  rounded-md outline-none text-[14px] pl-2'/>
                         
=======
  return (
    <div>
     
      {showChatModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          {/* Chat modal */}
          <div className="w-[90%] h-[80%] md:w-[60%] md:h-[70%] bg-white rounded-md shadow-lg p-4 relative z-10">
            <div className="w-[100%] h-[100%] rounded-md shadow-md border-[1px] border-gray-300 md:flex md:flex-col space-y-4">
              <div className="mt-2 ml-2">
                <VscAdd
                  className="text-black cursor-pointer"
                  size={22}
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
                          c.sender === localStorage.getItem('email') ? 'items-end' : 'items-start'
                        } mb-2 flex-col rounded-md pr-7 flex`}
                      >
                        <p className="text-[12px] flex items-center font-inter font-semibold mb-2">
                          <img
                            src={c.sender === localStorage.getItem('email') ? user : user2}
                            className="mr-2 h-[20px] w-[20px]"
                            alt="user-avatar"
                          />
                          {c.sender}
                        </p>
                        <p
                          className={`text-[12px] p-3 shadow-md max-w-[75%] ${
                            c.sender === localStorage.getItem('email')
                              ? 'bg-blue-500 text-white rounded-lg relative before:content-[""] before:absolute before:top-[-8px] before:right-[10px] before:w-0 before:h-0 before:border-b-[12px] before:border-l-[10px] before:border-r-[0] before:border-b-blue-500 before:border-l-transparent'
                              : 'bg-gray-200 text-black rounded-lg relative before:content-[""] before:absolute before:top-[-8px] before:right-[10px] before:w-0 before:h-0 before:border-b-[12px] before:border-l-[10px] before:border-r-[0] before:border-b-gray-200 before:border-l-transparent'
                          } border-[1px] border-gray-300`}
                        >
                          {c.chat}
                        </p>
                      </div>
                      <div
                        className={`${
                          c.sender === localStorage.getItem('email') ? 'items-end ' : 'items-start'
                        } w-full flex flex-col justify-start pr-2`}
                      >
                        <p className="pl-3 text-[9px] font-inter mr-5 mb-3">{ReadableTime(c.time)}</p>
                      </div>
>>>>>>> Stashed changes
                    </div>
                  ))}
                </div>
              </div>
              {itsfrom !== 'completed' ? (
                <div className="w-[100%] pl-2 h-[20%] md:flex md:flex-row space-x-2 md:items-center justify-center">
                  <div className="w-[90%] md:space-x-3 h-[100%] md:flex md:flex-row pb-2 pt-1 pr-3">
                    <div className="w-[95%] h-[100%] border border-gray-300 rounded-full flex items-center shadow-sm focus-within:shadow-md transition-shadow">
                      <input
                        value={mychat}
                        onChange={(e) => setmychat(e.target.value)}
                        onKeyPress={(e) => (e.key == 'Enter' ? handleChat() : <></>)}
                        className="w-full h-full rounded-full outline-none text-[14px] pl-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="w-[5%] justify-end h-[100%] flex items-center">
                      <MdSend size={24} className="cursor-pointer" onClick={handleChat} />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
<<<<<<< Updated upstream
=======
          </div>
>>>>>>> Stashed changes
        </div>
      )}

      {/* Trigger button to show chat modal */}
      <div className="mt-2 ml-2">
        <VscAdd className="text-black cursor-pointer" size={22} onClick={() => setShowChatModal(true)} />
      </div>
    </div>
  );
};

export default ChatCard;
