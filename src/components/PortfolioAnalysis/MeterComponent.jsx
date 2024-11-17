import React, { useEffect, useState,useRef } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { FaRegFileExcel } from 'react-icons/fa'
import { IoMdArrowBack } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSheet } from '../SheetContext/SheetContext';
const MeterComponent = ({setgettingmetervalue,selectedTab,PortfolioMetervalue,hidenavbar,realtimeportfoliostate,sheetedited}) => {
  const max = 100;  
  const min = 0;    
 
  const [showPopupMenu,setshowPopupMenu]=useState(false);
  const [sheets,setallsheets]=useState([])
  const [sheetpopup,setsheetpopup]=useState(false)
  const [googlesheetfiles,setgoogledriveSheets]=useState([])
  const token=localStorage.getItem('token')
  const userdata=jwtDecode(token)
  const [hover,sethover]=useState(false)
  const Logemail=userdata.userdetails.email
  const Logorganization=userdata.userdetails.organization
  const Logrole=userdata.userdetails.role
  const [sheetClicked,setsheetClicked]=useState(false)
  const [sheetname,setsheetname]=useState('')
  const [sheetfieldselected,setsheetfieldselected]=useState('')
  const [loading2,setloading2]=useState(false)
  const [sheetKeys,setsheetKeys]=useState([])
  const [clickedSheetId,setclickedSheetId]=useState('')
  const [sheetJson,setsheetJson]=useState([])
  const [showValue,setshowvalue]=useState('$0')
  const [percentage, setpercentage] = useState('0');
  const[checkvalue,setcheckvalue]=useState('')
  const [previousPercentage, setPreviousPercentage] = useState(0);
  const popupRef = useRef(null);
  
  useEffect(()=>{
    const settingMeterValue=async()=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate-meter-value`,{email:selectedTab},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })

       
        
        if(response.data.status==-200 || response.data.data==null){
          setpercentage('0')
          return
        }
        
          const databasedata=response.data.data
        
        const sheetdetails=JSON.parse(databasedata.portfolioState)
        const responseData=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:sheetdetails.sheetid,organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
        
        const data=JSON.parse(responseData.data.data)
        let value=data[0][sheetdetails.sheetcolumn].match(/\d+/)?data[0][sheetdetails.sheetcolumn].match(/\d+/)[0]:'0'
        setpercentage(value)
    }
    settingMeterValue()
},[selectedTab,realtimeportfoliostate])



  
  useEffect(()=>{
    const settingMeterValue=async()=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate-meter-value`,{email:selectedTab},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
         
          if(response.data.status==-200 || response.data.data==null){
            setpercentage('0')
            return
          }
        const databasedata=response.data.data
        
        const sheetdetails=JSON.parse(databasedata.portfolioState)
        const responseData=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:sheetdetails.sheetid,organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
       
        const data=JSON.parse(responseData.data.data)
        let value=data[0][sheetdetails.sheetcolumn].match(/\d+/)?data[0][sheetdetails.sheetcolumn].match(/\d+/)[0]:'0'
        setpercentage(value)
    }
    settingMeterValue()
},[])

useEffect(()=>{
  const settingMeterValue=async()=>{
    let sheetid=sheetedited.fullDocument.editedSheet
    
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate-meter-value`,{email:selectedTab},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
       
        if(response.data.status==-200 || response.data.data==null){
          setpercentage('0')
          return
        }
      const databasedata=response.data.data
      
      const sheetdetails=JSON.parse(databasedata.portfolioState)

      if(sheetid!=sheetdetails.sheetid){
        return
      }
      const responseData=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:sheetid,organization:Logorganization},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
     
      const data=JSON.parse(responseData.data.data)
      let value=data[0][sheetdetails.sheetcolumn].match(/\d+/)?data[0][sheetdetails.sheetcolumn].match(/\d+/)[0]:'0'
      
      setpercentage(value)
  }
  if(Object.keys(sheetedited).length>0){
  settingMeterValue()
  }
},[sheetedited])
  

useEffect(()=>{
  setgettingmetervalue(percentage)
},[percentage])
   


  const handlePlusClick=async()=>{
   
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/alluploadedFiles`,{organization:Logorganization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
    const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-document-visibility`,{
        email:Logemail,
        organization:Logorganization
    },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
    const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
    
    const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
    const tosetdata=[...response2.data.data,...filteredSet1]

    const response3=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-drivesheets`,{
        email:Logemail,
        organization:Logorganization
    },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
    if(response3.data.status==200 && response3.data.message!="no refresh token found")
    {
        const files=response3.data.data
        setgoogledriveSheets(files)
    }
    
    setallsheets(tosetdata)
    setsheetpopup(true)
    setsheetClicked(false)
 
} 








const handleselectsheetfield = async() => {
  setsheetClicked(false);
  setsheetpopup(false);
  
  // Check if sheetJson is not empty
  if (sheetJson.length > 0) {
    let value = sheetJson[0][sheetfieldselected].match(/\d+/)?sheetJson[0][sheetfieldselected].match(/\d+/)[0]:'0';
    
  
    
    // Extract numeric value if it starts with symbols
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    
    // Check if the extracted value is a valid number
    if (!isNaN(numericValue)) {
      let maxval; // Define maxval here
      
      if (numericValue < 100) {
        maxval = 100;
      }
       else if (numericValue <= 100) {
        maxval = 1000; // Default max for values <= 200
      } else if (numericValue <= 1000) {
        maxval = 1000; // For values between 201 and 1000
      } else if (numericValue <= 10000) {
        maxval = 10000; // For values between 1001 and 10000
      } else if (numericValue <= 100000) {
        maxval = 100000; // For values between 10001 and 100000
      } else {
        maxval = 1000000; // For values above 100000
      }

      // Calculate the percentage based on the numeric value
      const percentageValue = (numericValue / maxval) * 100;

      // Update the value and ensure it's within range
      value = Math.round(percentageValue); // Round to the nearest integer
    } else {
      // If it's not a valid number, set to default value
      value = 0; // or set it to some default string like '$0'
    }
    
    //setshowvalue(value);
   // const ans = Math.max(min, Math.min(value/2, max)); 
    
   
   
    
    const response2=  await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate-meter-value`,{
        email:Logemail,
        metervalue:value,
        sheetid:clickedSheetId,
        sheetcolumn: sheetfieldselected
        
    },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
    
    if(response2.data.status==200){
      setpercentage(value);
    }
    else{
      console.log("error",response2)
      alert("Server error")
    }
        
        
  
  } else {
    console.warn("sheetJson is empty");
  }
};




const handlesheetclick=async(id,name)=>{
  setsheetname(name)
  setclickedSheetId(id)       
  setsheetClicked(true)
  setsheetpopup(false)
}
useEffect(()=>{
  const setValues=async()=>{
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:clickedSheetId,organization:Logorganization},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        console.log("zp",response.data.data)
      const data=JSON.parse(response.data.data)
    
      setsheetJson(data)
      const key=Object.keys(data[0])
      
      const fileteredKey=[]
      data.map(d=>{
          key.map(k=>{
              if(d[k]!=""&&!fileteredKey.includes(k)){
              fileteredKey.push(k)
              }
          }
          )
      })
      
      setsheetfieldselected(fileteredKey[0])
      setsheetKeys(fileteredKey)
      
  }
  if(clickedSheetId.trim().length>0){
  setValues()
  }
  
},[clickedSheetId])






const handleGooglesheetclicked=async (id,name)=>{
      
  setsheetClicked(true)
  setsheetpopup(false)
  
  const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-google-sheet-json`,{sheetId:id,email:Logemail,organization:Logorganization},{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
  if(response.data.status==200)
  {
  const allJson=response.data.data

  await Promise.all(allJson)

  const keys=allJson[0].data
  const showdata=allJson[1].data[0]
  const finalJson=[]
  allJson.map(val=>{
      if(val.rowIndex!=1)
      {
          const result=keys.reduce((obj,key,value)=>{obj[key]=val.data[value]; return obj},{})
          finalJson.push(result)
      }
  })
  setsheetJson(finalJson)
  const key_=Object.keys(finalJson[0])
          
  const fileteredKey=[]
          finalJson.map(d=>{
              key_.map(k=>{
                  if(d[k]!=""&&!fileteredKey.includes(k)){
                  fileteredKey.push(k)
                  }
              }
              )
          })

      setsheetfieldselected(fileteredKey[0])
      setsheetKeys(fileteredKey)
     

  }
  else{
      setsheetfieldselected('wrong sheet format')
      setsheetKeys(['none'])
     
  }
}


let label, bgColor;
  if (percentage*2 >= 80) {
    label = "Excellent";
    bgColor = '#054F31'; // Green for excellent
  } else if (percentage*2 >= 60) {
    label = "Good";
    bgColor = '#FDB022'; // Yellow for good
  } else if (percentage*2 >= 40) {
    label = "Fine";
    bgColor = '#ff9800'; // Orange for fine
  } else {
    label = "Poor";
    bgColor = '#D92D20'; // Red for poor
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setshowPopupMenu(false)
          setsheetpopup(false);
          setsheetClicked(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);


  return (
    <div className='relative w-[100%]'>
       {selectedTab === Logemail && (
    <HiOutlineDotsVertical 
      size={20} 
      className='absolute -mt-16 right-4 cursor-pointer' 
      onClick={() => { setshowPopupMenu(!showPopupMenu); }}
    />
  )}
      {showPopupMenu && (
        <div ref={popupRef} className='absolute -mt-20 right-9 w-[200px] bg-white p-3 border-gray-300 border-[1px] rounded-md z-50'>
    <div className='bg-blue-500 rounded-md h-[30px] flex items-center justify-center mb-2'>
        <p className='text-center text-[12px] font-semibold font-inter text-white'>Select Sheet</p>
    </div>
    <div
        className='flex items-center justify-center h-[40px] cursor-pointer hover:bg-gray-100 hover:text-gray-800 rounded-md'
        onClick={() => { handlePlusClick(); setshowPopupMenu(false) }}>
        <p className='p-1 font-inter font-bold text-[12px] text-gray-700'>Upload Sheet</p>
    </div>
</div>
)}


{
                    sheetClicked?
                    <div className={`${hidenavbar ? 'w-full' : 'left-20 w-[80%]'} fixed top-0  left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50  `}>
                                    <div  ref={popupRef}  className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' >
                                        
                                        <div className='w-[100%] h-[20%] flex space-x-2 items-start justify-start'>
                                            <div className='flex items-center justify-center h-[40px]' onClick={(()=>{setsheetClicked(false); setsheetpopup(true)})}>
                                            <IoMdArrowBack  className=' cursor-pointer' size={17}/>
                                            </div>
                                            <div className='text-gray-500 h-[40px] text-[15px] flex items-center justify-center'>
                                                {sheetname.replace(/^\d+_/, "")}
                                            </div>
                                            
                                        </div>
                                        <div className=' w-[100%] h-[40%] flex flex-col items-center justify-center space-y-8 space-x-2'>
                                            
                                            <select value={sheetfieldselected}  onChange={(e)=>setsheetfieldselected(e.target.value)} className='w-[220px] h-[30px] text-[14px] text-gray-700 rounded-md border-gray-300 border-[1px]'>
                                            {loading2 ? (
    <option value="">
      <div className="flex items-center">
        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
        Loading...
      </div>
    </option>
  ) : (
                                                
                                                            
                                                sheetKeys.map(k=>
                                                    <option key={k._id}>{k}</option>
                                                    )
                                              )  }

                                            </select>
                                        </div>
                                        <div className='w-[100%] mt-[14px] flex flex-row items-center justify-center'>
                                            <div onClick={handleselectsheetfield} className='select-none cursor-pointer flex flex-row w-[120px] rounded-md h-[40px] items-center justify-center bg-gradient-to-r from-green-500 to-green-800 spae-x-2'>
                                            {loading2 ? (
                                     <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
                                ) : (<p className='text-[14px] text-white'>Set sheet field</p>)
                                            }
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                :
                                <></>
                }


                {
    sheetpopup ? (
        <div className={`${hidenavbar ? 'w-full' : 'left-20 w-[80%]'} fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50`}>
            <div ref={popupRef}  className='p-2 flex flex-col w-[400px] h-[400px] space-y-2 bg-white z-[40] rounded-md shadow-lg'>
            <div className='flex items-center font-inter bg-blue-500 rounded-md px-2 justify-between h-[50px]'>
                <div className='flex items-center cursor-pointer' >
                    
                    <p className='text-[14px] font-semibold flex justify-center text-white  ml-8 items-center'>Select Sheet for Meter</p>
                </div>
                <div className='flex items-center space-x-2 ' onClick={()=>{setsheetpopup(false);}}>
                    <div className='cursor-pointer'>
                        <RxCross2 size={20} className='text-white' />
                    </div>
                </div>
            </div>
                {sheets.length === 0 && googlesheetfiles.length === 0 ? (
    <p className='text-gray-500 text-center font-semibold'>No sheets found</p>
) : (
    <>
        <div className='font-inter text-[16px] font-semibold mb-2'>
            <p className='border-b pb-2'>Database Sheets:</p>
        </div>
        <div className='p-1 flex h-[100%] items-center rounded-md text-[14px] flex-col font-roboto overflow-y-auto scrollbar-hide'>
            {(sheets || []).map(doc => doc.fileType === 'xlsx' || doc.fileType === 'csv' ? (
                <div key={doc._id} className='w-full flex flex-col space-y-2'>
                    <div 
                        onMouseEnter={() => sethover(true)} 
                        onMouseLeave={() => sethover(false)} 
                        onClick={() => handlesheetclick(doc._id, doc.name)} 
                        className='w-full h-[45px] hover:bg-blue-500 p-2 rounded-md select-none cursor-pointer hover:text-white flex items-center'
                        role="button" 
                        aria-label={`Open sheet: ${doc.name}`}
                    >
                        <FaRegFileExcel className='text-green-500' size={19} />
                        <span>{doc.name.replace(/^\d+_/, "")}</span>
                    </div>
                </div>
            ) : null)}

            {googlesheetfiles.length > 0 && (
                <div className='w-full font-inter border-b pb-2 text-[14px] font-semibold mt-4 mb-2 h-[40px] flex items-center pl-2'>
                    <p className=''>Google sheets:</p>
                </div>
            )}

            {(googlesheetfiles || []).map(doc => (
                <div key={doc._id} className='w-full flex flex-col space-y-2'>
                    <div 
                        onMouseEnter={() => sethover(true)} 
                        onMouseLeave={() => sethover(false)} 
                        onClick={() => handleGooglesheetclicked(doc.id, doc.name)} 
                        className='w-full h-[45px] hover:bg-blue-500 p-2 rounded-md select-none cursor-pointer hover:text-white flex items-center'
                        role="button" 
                        aria-label={`Open Google sheet: ${doc.name}`}
                    >
                        <FaRegFileExcel className='text-green-500' size={19} />
                        <p className='text-[14px] px-5 tracking-wider'>{doc.name}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
)}

            </div>
        </div>
    ) : null
}

    <div className='font-inter tracking-wider text-[14px] flex flex-col items-center p-5'>
    
      <svg width="300" height="180" viewBox="0 0 300 150" className="meter-svg">
     
        <path
          d="M 20 150 A 130 130 0 0 1 280 150"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="15"
        />
      
      
        <path
          d="M 20 150 A 130 130 0 0 1 280 150"
          fill="none"
          stroke={`url(#gradient-${percentage})`}  
          strokeWidth="15"
          strokeDasharray="820"
          strokeDashoffset={820 - (percentage / 100) * 820}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      
      
        <defs>
          <linearGradient id={`gradient-${percentage}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="50%" stopColor="#ffc107" />
            <stop offset="100%" stopColor="#4caf50" />
          </linearGradient>
        </defs>
        
      
        <text x="150" y="120" textAnchor="middle" fontSize="32" fill="#333" fontWeight="bold">
          {`${percentage}%`}
        </text>
      </svg>

      <div className="text-center">
        <div
          className="rounded-xl font-semibold text-white w-[90px] p-1"
          style={{ backgroundColor: bgColor }}  // Dynamic background color
        >
          <p>{label}</p>
        </div>
      </div>

      {/* Styling to enhance the container */}
      <style jsx>{`
        .meter-svg {
          max-width: 400px;  // Increase max width to accommodate larger meter
        }
        
      `}</style>
    </div>
    </div>
  );
};

export default MeterComponent;