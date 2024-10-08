import React, { useState } from 'react';
import { MdSend } from "react-icons/md";
import { RxCross2 } from 'react-icons/rx'

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const toggleChat = () => setShowChat((prev) => !prev);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'You' }]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };


  

  return (
    <div className="fixed flex flex-col items-center justify-center  h-screen ">
     
      <div className="fixed right-10 bottom-20 flex items-end" onClick={toggleChat}>
        <div
          className="relative w-8 h-8 cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'rotateUp 30s infinite linear',
          }}
        >
          <div className="absolute w-8 h-8 bg-blue-500" style={{ transform: 'translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
          <div className="absolute w-8 h-8 bg-blue-700" style={{ transform: 'rotateY(180deg) translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
          <div className="absolute w-8 h-8 bg-blue-400" style={{ transform: 'rotateY(-90deg) translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
          <div className="absolute w-8 h-8 bg-blue-300" style={{ transform: 'rotateY(90deg) translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
          <div className="absolute w-8 h-8 bg-blue-200" style={{ transform: 'rotateX(90deg) translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
          <div className="absolute w-8 h-8 bg-blue-600" style={{ transform: 'rotateX(-90deg) translateZ(1rem)', boxShadow: '0 0 10px 2px rgba(0, 153, 255, 0.5)' }}></div>
        </div>
      </div>

      
      {showChat && (
        <div className=" fixed w-64 bg-white border border-gray-300 rounded-lg p-4  right-10 bottom-36">
        <RxCross2 size={20} className='text-black cursor-pointer mr-2 bg-gray-100 rounded-full' onClick={toggleChat}/>
          <div className="h-40 overflow-y-auto mb-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg mb-1 ${msg.sender === 'You' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            ))}
          </div>

        
          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg p-1 text-sm"
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
