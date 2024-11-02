import React, { useState, useEffect ,useRef} from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaRegFileExcel } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { FiPaperclip, FiSend } from 'react-icons/fi';
import { FaArrowUp } from "react-icons/fa6";

import { RxCross2 } from "react-icons/rx";
const Ai = ({hidenavbar}) => {

  const [allDocs, setAllDocs] = useState([]);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');
  const userdata = jwtDecode(token);
  const Logemail = userdata.userdetails.email;
  const Logorganization = userdata.userdetails.organization;
  const [jsonData, setjsonData] = useState([]);
  const [id, setid] = useState('');
  const [clickedView, setclickedview] = useState(false);
  const [viewedDoc, setviewedDoc] = useState('');
  const [MergedData, setMergedData] = useState([]);
  const[finalData,setfinalDAta]=useState([]);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [prompt, setPrompt] = useState(''); // To store the conversation for the API call
  const chatRef=useRef(null);
  const[gd,setgd]=useState([])
  const [isRadioDisabled, setIsRadioDisabled] = useState(false);
  const [gmailname1,setgmailname1]=useState('')
  const [selectedGoogleSheetId, setSelectedGoogleSheetId] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [loadingDots, setLoadingDots] = useState('');
  const[googleSheetJson,setgoogleSheetJson]=useState([])
  const[googleJid,setgoogleJid]=useState('');
  const[sheetkeys,setsheetKeys]=useState([]);
  useEffect(() => {
    const handle = async () => {
      if (search.length <= 0) {
        const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/alluploadedFiles`, { organization: Logorganization }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const response2 = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-document-visibility`, {
          email: Logemail,
          organization: Logorganization
        }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const set2DocsIds = response2.data.allfiles.map(doc => doc.Document_id);
        const filteredSet1 = response.data.data.filter(doc => !set2DocsIds.includes(doc._id));
        const tosetdata = [...response2.data.data, ...filteredSet1];
        setAllDocs(tosetdata);
      } else {
        const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/searchFile`, {
          search: search,
          organization: Logorganization
        }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const response2 = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-document-visibility`, {
          email: Logemail,
          organization: Logorganization
        }, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const set2DocsIds = response2.data.allfiles.map(doc => doc.Document_id);
        const filteredSet1 = response.data.data.filter(doc => !set2DocsIds.includes(doc._id));
        const tosetdata = [...response2.data.data, ...filteredSet1];
        setAllDocs(tosetdata);
      }
    };
    handle();
  }, []);

  const handleView = async (id, name) => {
    setid(id);
    const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`, { id: id, organization: Logorganization }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = JSON.parse(response.data.data);
    const sheetData = {
      [name]: data // Key is the name of the sheet, value is its data
    };
   
    const isSheetAlreadyAdded = MergedData.some(sheet => Object.keys(sheet)[0] === name);

    if (isSheetAlreadyAdded) {
      alert("This sheet has already been added.");
      return;
    } else {
      setSelectedDocId(id);
      setMergedData((prevMergedData) => [...prevMergedData, sheetData]);
      setIsRadioDisabled(true);
    }
   
  };

  useEffect(() => {
    console.log("Merged Data:", MergedData);
    sessionStorage.setItem("AI_Data",JSON.stringify(MergedData))
  }, [MergedData]);

  const handleDeleteSheet = (sheetName) => {
    setMergedData((prevMergedData) =>
      prevMergedData.filter((sheet) => Object.keys(sheet)[0] !== sheetName)
    );
  };


  const handleSend = async () => {

    if (newMessage.trim().length === 0) {
      // Prevent sending an empty message
      return; // Exit if the message is empty or just whitespace
  }


    if (newMessage.trim()) {
      // Create a new user message object
      const userMessage = { text: newMessage, sender: 'You' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setNewMessage('');
      // Add user message to chat
     
  
      setLoading(true);
     
      }
      // Prepare the prompt with only the new user message
      const currentPrompt = `You: ${newMessage + ", Also train yourself with previous data that we have given "}`;
  
      // Send the new prompt to the API and handle the response
      try {
        const Response_Data = sessionStorage.getItem("AI_Data");
  
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
     finally {
      // Set loading state back to false
      setLoading(false);
    }
    }
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };
  const handleAddGoogleSheet = async (name, id) => {
    const isSheetAlreadyAdded = MergedData.some(sheet => Object.keys(sheet)[0] === name);
    
    if (isSheetAlreadyAdded) {
        alert("This sheet has already been added.");
        return;
    }

    const fetchGoogleSheetJson = async (id) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-google-sheet-json`, {
                sheetId: id,
                email: Logemail,
                organization: Logorganization
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Error fetching Google Sheet JSON:', error);
            throw new Error('Primary API request failed');
        }
    };

    const fetchFallbackGoogleSheetJson = async (id) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-google-sheet-json-type2`, {
                sheetId: id,
                email: Logemail,
                organization: Logorganization
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Error in fallback API:', error);
            throw new Error('Fallback API request failed');
        }
    };

    try {
        let response = await fetchGoogleSheetJson(id);
        let finalJson = [];

        if (response.data.status === 200) {
            const allJson = response.data.data;
            const keys = allJson[0].data;
            finalJson = allJson.map(val => {
                if (val.rowIndex !== 1) {
                    return keys.reduce((obj, key, value) => {
                        obj[key] = val.data[value];
                        return obj;
                    }, {});
                }
                return null;
            }).filter(item => item !== null);
        } else {
            console.error('Failed to fetch Google Sheet JSON:', response.data.message);
            // Attempt fallback
            response = await fetchFallbackGoogleSheetJson(id);
            
            if (response.data.status === 200) {
                const allJson = response.data.data;
                const keys = allJson[0].data;
                finalJson = allJson.map(val => {
                    if (val.rowIndex !== 1) {
                        return keys.reduce((obj, key, value) => {
                            obj[key] = val.data[value];
                            return obj;
                        }, {});
                    }
                    return null;
                }).filter(item => item !== null);
            } else {
                console.error('Fallback API failed:', response.data.message);
            }
        }

        // Add the sheet name regardless of data retrieval outcome
        setMergedData(prevMergedData => [...prevMergedData, { [name]: finalJson.length ? finalJson : [] }]);

    } catch (error) {
        console.error('Error processing Google Sheet:', error);
        // Add the sheet name with an empty array if an error occurs
        setMergedData(prevMergedData => [...prevMergedData, { [name]: [] }]);
    }
};

  
  const GetDriveSheets1 = async () => {
    
    try {
        const response = await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-drivesheets`, {
            email: Logemail,
            organization: Logorganization
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.data.status === 200 && response.data.message !== "no refresh token found") {
            const files = response.data.data;
              
            // Filter only Excel sheets
            
            setgmailname1(response.data.gmail);
            setgd(files); // Set only Excel files
        }
    } catch (error) {
        console.error('Error fetching Google Drive sheets:', error);
        alert('Failed to fetch sheets from Google Drive.');
    } finally {
        // setloading(false);
    }
};








useEffect(() => {
  if (showChat && chatRef.current) {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }
}, [messages, showChat]);



// useEffect(()=>{
// GetDriveSheets1()
// console.log("zx",gd)
// },[])

  
  

  //   useEffect(()=>{
  // console.log(listSession)
  //   },[])
  useEffect(() => {
    let interval;

    if (loading) {
      setLoadingDots(''); // Reset dots
      interval = setInterval(() => {
        setLoadingDots(prev => {
          if (prev.length < 3) {
            return prev + '.';
          }
          return '';
        });
      }, 500); // Change dots every 500ms
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [loading]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    GetDriveSheets1();
  }, []);
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
  const [textareaHeight, setTextareaHeight] = useState(0);


  return (
    <div className=" flex h-full">


         
<div className={`${hidenavbar ? 'ml-[5%] w-[20%]' : 'ml-[20%] w-[20%]'} h-screen mr-20 bg-gradient-to-r from-white to-gray-50 p-[30px] flex flex-col rounded-lg`}>
  {/* Document List */}
  <div className="flex items-center justify-between w-full">
  <div className="border border-gray-300 flex-grow mr-2"></div>
  <div className="font-bold font-inter text-[14px] text-center text-gray-800">Database</div>
  <div className="border border-gray-300 flex-grow ml-2"></div>
</div>

<div className='w-full mt-4 h-[25%] overflow-y-auto scrollbar-hide'> {/* Set a fixed height and enable vertical scrolling */}
{(allDocs || []).map(doc => (
        <div key={doc._id} className='flex items-center mb-6 justify-between w-full hover:bg-gray-100 rounded-lg transition-all duration-200'>
          <span className='flex items-center text-[12px] text-gray-700 max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis'> 
            <FaRegFileExcel className='mr-2 text-green-500' size={20} />
            <span className='shrink overflow-hidden text-ellipsis max-w-[200px]'>
              {doc.name}
            </span>
          </span>
          <label className="ml-auto">
            <input
              type="radio"
              value={doc._id}
              checked={selectedDocId === doc._id}
              onChange={() => {
                if (selectedDocId !== doc._id) {
                  setSelectedDocId(doc._id);
                  handleView(doc._id, doc.name);
                  setSelectedGoogleSheetId(null);
                }
              }}
              name="document"
              className="form-radio"
            />
          </label>
        </div>
      ))}
</div>



<div className='flex-grow mt-5'>
    <div className="flex items-center justify-between w-full">
        <div className="border border-gray-300 flex-grow mr-2"></div>
        <div className="font-bold font-inter text-[14px] text-center text-gray-800">Google Sheet</div>
        <div className="border border-gray-300 flex-grow ml-2"></div>
    </div>
    <div className='w-full mt-4 max-h-[130px] overflow-y-auto scrollbar-hide'> {/* Using Tailwind CSS classes */}
    {(gd || []).map(doc => (
          <div key={doc.id} className='flex items-center mb-6 justify-between w-full hover:bg-gray-100 rounded-lg transition-all duration-200'>
            <span className='flex items-center text-[12px] text-gray-700 max-w-[180px] whitespace-nowrap text-ellipsis overflow-hidden'>
              <FaRegFileExcel className='mr-2 text-green-500' size={20} />
              <span className='shrink overflow-hidden text-ellipsis max-w-[180px]'>
                {doc.name}
              </span>
            </span>
            <label className="ml-auto">
              <input
                type="radio"
                value={doc.id}
                checked={selectedGoogleSheetId === doc.id}
                onChange={() => {
                  if (selectedGoogleSheetId !== doc.id) {
                    setSelectedGoogleSheetId(doc.id);
                    handleAddGoogleSheet(doc.name, doc.id);
                    setSelectedDocId(null);
                  }
                }}
                name="googleSheet"
                className="form-radio"
              />
            </label>
          </div>
        ))}
    </div>
</div>



        <div className='relative flex flex-col  h-[30%]'>
      {MergedData.length > 0 && (
        <div className="font-inter font-bold flex justify-start text-[14px] text-gray-800 ">
          <div className="flex items-center justify-between w-full">
            <div className="border border-gray-300 flex-grow mr-2"></div>
            <div className="font-bold font-inter text-[14px] text-center text-gray-800">Added Files</div>
            <div className="border border-gray-300 flex-grow ml-2"></div>
          </div>
        </div>
      )}
      <div className="flex-grow overflow-y-auto space-y-3 scrollbar-hide">
      {MergedData.length > 0 ? (
          MergedData.map(sheet => (
            <div key={sheet.id} className='flex justify-between text-gray-700 items-center p-2 hover:bg-gray-100 rounded-lg transition-all duration-200'>
              <span className='flex items-center max-w-[200px] text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis'>
                <FaRegFileExcel className='mr-2 text-green-500 flex-shrink-0' size={20} />
                <span className='text-[12px]'>
                  {Object.keys(sheet)[0]}
                </span>
              </span>
              <RxCross2
                size={16}
                className="text-gray-700 cursor-pointer ml-4 hover:text-red-500 transition-all duration-200"
                onClick={() => handleDeleteSheet(Object.keys(sheet)[0])}
              />
            </div>
          ))
        ) : (
          <div className="text-gray-800 font-inter font-bold text-[14px]">No sheets added yet.</div>
        )}
      </div>
    </div>
       
        
      </div>

      <div className={`relative flex ${hidenavbar ? 'w-[60%]' : 'w-[50%]'} flex-col h-screen overflow-hidden`}>
  <div className="flex-grow overflow-y-auto scrollbar-hide pr-4 pb-16 max-h-[90%] " ref={chatRef}>
    <div className="mt-2">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-full">
      <div className="font-inter font-bold text-[22px] mb-4 mt-64">What can I help with?</div>
      <div className={`flex items-center bg-gray-200 border border-gray-300 ${textareaHeight > 40 ? 'rounded-xl' : 'rounded-full'} py-2 p-2 px-4 w-full`}>
        <textarea
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            e.target.style.height = 'auto'; // Reset height
            const maxHeight = 100; // Set your max height here
            const newHeight = Math.min(e.target.scrollHeight, maxHeight);
            setTextareaHeight(newHeight); // Update state with new height
            e.target.style.height = `${newHeight}px`;
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-grow bg-gray-200 p-2 text-black outline-none scrollbar-hide"
          rows={1} // Minimum number of rows
          style={{ maxHeight: '100px', overflowY: 'auto', resize: 'none' }}
        />
        <div  onClick={() => {
     handleSend();
    }} className={`rounded-full  cursor-pointer p-1 ${newMessage ? 'bg-white text-gray-900' : 'bg-gray-300 text-gray-100'}`}>
    <FaArrowUp size={26} />
  </div>
      </div>
    </div>
      ) : (
        <>
          {/* Message list */}
          {messages.map((msg, index) => {
            const isUserMessage = msg.sender === 'You';

            if (msg.sender === 'Bot') {
              if (isTableResponse(msg.text)) {
                return (
                  <div key={index} className="my-4">
                    {renderTable(msg.text)}
                  </div>
                );
              }
            }

            return (
              <div key={index} className={`my-4 h-[60%] ${isUserMessage ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${isUserMessage ? 'bg-blue-400 text-white' : 'bg-gray-100 text-black'}`}>
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="text-start text-gray-600">
              <span style={{ fontSize: '18px' }}>Thinking</span>
              <span style={{ fontSize: '24px' }}>{loadingDots}</span>
            </div>
          )}

          {/* Download button for table responses */}
          {messages.length > 0 && messages[messages.length - 1].sender === 'Bot' && isTableResponse(messages[messages.length - 1].text) && (
            <button 
              className="bg-blue-500 font-inter font-bold text-[12px] mb-2 mt-1 w-[100px] text-white p-2 rounded-lg"
              onClick={downloadCSV}
            >
              Download
            </button>
          )}

          {/* Input field */}
          <div className={`absolute bottom-10 flex items-center bg-gray-200 border border-gray-300 ${textareaHeight > 40 ? 'rounded-xl' : 'rounded-full'} py-2 p-2 px-4 w-full`}>
  <textarea
    type="text"
    value={newMessage}
    onChange={(e) => {
      setNewMessage(e.target.value);
      e.target.style.height = 'auto'; // Reset height
      const maxHeight = 100; // Set your max height here
      const newHeight = Math.min(e.target.scrollHeight, maxHeight);
      setTextareaHeight(newHeight); // Update state with new height
      e.target.style.height = `${newHeight}px`;
    }}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevents the textarea from growing
        handleSend(); // Send the message or handle any action you want
      } else {
        handleKeyDown(e); // Handle other keys if necessary
      }
    }}
    placeholder="Type a message..."
    className="flex-grow bg-gray-200 p-2 text-black outline-none scrollbar-hide"
    rows={1} // Minimum number of rows
    style={{ maxHeight: '100px', overflowY: 'auto', resize: 'none' }}
  />
  <div onClick={() => handleSend()} className={`rounded-full cursor-pointer p-1 ${newMessage ? 'bg-white text-gray-900' : 'bg-gray-300 text-gray-100'}`}>
    <FaArrowUp size={26} />
  </div>
</div>


        </>
      )}
    </div>
  </div>
</div>


    </div>
  );
};

export default Ai;
