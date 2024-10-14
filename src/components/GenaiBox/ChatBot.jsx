import React, { useState, useEffect, useRef } from 'react';
import { MdSend } from "react-icons/md";
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { json } from 'react-router-dom';
import Addusers from '../AddUsers/Addusers';

const ChatBot = () => {
  const token=localStorage.getItem('token')
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [prompt, setPrompt] = useState(''); // To store the conversation for the API call
  const chatRef=useRef(null);
  const toggleChat = () => setShowChat((prev) => !prev);

  const handleSend = async () => {
    if (newMessage.trim()) {
      // Create a new user message object
      const userMessage = { text: newMessage, sender: 'You' };
  
      // Add user message to chat
      setMessages(prevMessages => [...prevMessages, userMessage]);
  
      // Clear input field
      setNewMessage('');
  
      // Prepare the prompt with only the new user message
      const currentPrompt = `You: ${newMessage}`;
  
      // Send the new prompt to the API and handle the response
      try {
        const Response_Data = sessionStorage.getItem("Bot_Data");
  
        const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/genai/create-response`, {
          "Jsondata": Response_Data,
          "prompt": currentPrompt // Send only the latest user message
        }, {
          headers: {
            "Authorization":`Bearer ${token}`
          }
        });
  
        // Get the response from the API
        const botResponse = response.data.response;
  
        // Create a new bot message object
        const botMessage = { text: botResponse, sender: 'Bot' };
  
        // Add bot response to chat
        setMessages(prevMessages => [...prevMessages, botMessage]);
  
        // Update prompt for future context by storing only the user message
        setPrompt(prevPrompt => `${prevPrompt}\nYou: ${newMessage}`); // Store only user messages for future context
  
      } catch (error) {
        console.error('Error downloading data:', error);
        alert('Failed to get response from bot.');
      }
    }
  };
  
  
  

  //   useEffect(()=>{
  // console.log(listSession)
  //   },[])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    if (showChat && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, showChat]);

  const formatMessage = (text) => {
    // Replace "**text**" with "<strong>text</strong>" for bold formatting
    // Replace "\n" with "<br />" for line breaks
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
  };
  const isTableResponse = (text) => {
    return text.startsWith('|') && text.includes('|');
  };
  
  const renderTable = (dataText) => {
    const lines = dataText.trim().split('\n');
  
    // Ensure there are enough lines to create a header and table data
    if (lines.length < 3) {
      console.error("Not enough lines for header and data.");
      return null;
    }
  
    // Extract the header from the first line
    const header = lines[0].slice(1, -1).split('|').map(item => item.trim());
  
    // Extract table data, skipping the first line (header)
    const tableData = lines.slice(2).map(line => line.slice(1, -1).split('|').map(item => item.trim()));
  
    return (
      <table style={{ borderCollapse: 'collapse', width: '100%', margin: '20px 0' }}>
        <thead>
          <tr>
            {header.map((head, index) => (
              <th 
                key={index} 
                style={{ 
                  border: '1px solid #ddd', 
                  padding: '12px', 
                  background: '#f0f0f0', 
                  textAlign: 'center',
                  fontWeight: 'bold',
                  verticalAlign: 'middle',
                  minWidth: index === 0 ? '150px' : '100px' // Adjust minWidth based on header index
                }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  style={{ 
                    border: '1px solid #ddd', 
                    padding: '12px', 
                    textAlign: 'left',
                    verticalAlign: 'middle'
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  const downloadCSV = () => {
    const lines = messages
      .filter(msg => msg.sender === 'Bot' && isTableResponse(msg.text)) 
      .map(msg => msg.text.trim().split('\n'))[0];

    if (!lines) return;

    const csvContent = lines.map(line => {
      return line.split('|').map(item => item.trim()).join(',');
    }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'table_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  


  return (
    <div className="fixed flex flex-col items-center justify-center  h-screen ">

<div className="fixed right-10 bottom-20 flex items-end" onClick={toggleChat}>
<div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 opacity-50 shadow-lg flex items-center justify-center">
  {/* Inner Shadow to create depth for the inner cube effect */}
  <div
    className="absolute inset-0 rounded-full"
    style={{
      boxShadow: 'inset 0px 0px 15px rgba(0, 0, 0, 0.7)', // Inner shadow for depth effect
      background: 'inherit',
      maskImage: 'radial-gradient(circle at center, transparent 70%, black 100%)',
      WebkitMaskImage: 'radial-gradient(circle at center, transparent 70%, black 100%)',
      zIndex: 10,
    }}
  ></div>
<div
          className="relative w-8 h-8 cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'rotateUp 30s infinite linear',
          }}
        >
          <div className="absolute w-8 h-8 bg-blue-600" style={{ transform: 'translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
          <div className="absolute w-8 h-8 bg-blue-800" style={{ transform: 'rotateY(180deg) translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
          <div className="absolute w-8 h-8 bg-blue-500" style={{ transform: 'rotateY(-90deg) translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
          <div className="absolute w-8 h-8 bg-blue-400" style={{ transform: 'rotateY(90deg) translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
          <div className="absolute w-8 h-8 bg-blue-300" style={{ transform: 'rotateX(90deg) translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
          <div className="absolute w-8 h-8 bg-blue-700" style={{ transform: 'rotateX(-90deg) translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
        </div>
 
</div>

  </div>

  
      {showChat && (
  <div className="fixed w-[60%] h-[60%] bg-white border border-gray-300 rounded-lg p-10 right-10 bottom-36">
    <RxCross2 size={20} className='text-black cursor-pointer mr-2 bg-gray-100 rounded-full' onClick={toggleChat} />

    {/* Container for messages and download button */}
    <div className="flex flex-col h-full">
      {/* Message area */}
      <div className="flex-1 overflow-y-auto mb-2" ref={chatRef}>
        {messages.map((msg, index) => {
          if (msg.sender === 'You') {
            return (
              <div key={index} className="p-2 rounded-lg mb-1 bg-blue-100 text-right">
                <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
              </div>
            );
          }

          // Handle bot messages
          if (msg.sender === 'Bot') {
            if (isTableResponse(msg.text)) {
              return renderTable(msg.text);
            } else {
              return (
                <div key={index} className="p-2 rounded-lg mb-1 bg-gray-100 text-left">
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                </div>
              );
            }
          }
        })}
      </div>

      
      {messages.length > 0 && messages[messages.length - 1].sender === 'Bot' && isTableResponse(messages[messages.length - 1].text) && (
        <button 
          className="bg-blue-500 font-inter font-bold text-[12px] mb-2 mt-1 w-[100px] text-white p-2 rounded-lg"
          onClick={downloadCSV}
        >
          Download
        </button>
      )}

      
      <div className="flex mt-2 ">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-lg p-1   text-sm"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-lg"
          onClick={handleSend}
        >
          <MdSend size={20} />
        </button>
      </div>
    </div>
  </div>
)}


<style jsx>{`
    @keyframes rotateUp {
      0% {
        transform: rotateX(0deg) rotateY(0deg);
      }
      100% {
        transform: rotateX(360deg) rotateY(360deg);
      }
    }
  `}</style>
</div>

  );
};

export default ChatBot;
