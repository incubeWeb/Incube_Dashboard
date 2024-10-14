import React, { useEffect, useState,useRef } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { FaRegFileExcel } from 'react-icons/fa'
import { IoMdArrowBack } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSheet } from '../SheetContext/SheetContext';
const MeterComponent = ({selectedTab}) => {
  const max = 100;  
  const min = 0;    
 
  const [showPopupMenu,setshowPopupMenu]=useState(false);
  const [sheets,setallsheets]=useState([])
  const [sheetpopup,setsheetpopup]=useState(false)
  const [googlesheetfiles,setgoogledriveSheets]=useState([])
  const token=localStorage.getItem('token')
  const userdata=jwtDecode(token)
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
  const [percentage,setpercentage] = useState('')
  const totalArcLength=820;
  
    const { setpercentage1 } = useSheet();
    setpercentage1(showValue+"%")
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
 
} 

useEffect(()=>{
  const insertValue=async()=>{
            const organization2=`${Logorganization}_ShownGraph`
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:selectedTab,organization:organization2},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })

            if(response.data.status==200)
            {
              setpercentage(response.data.metervalue)
            }
  }
  insertValue()
},[])

useEffect(()=>{
const setmeterValue=async()=>{
            const organization2=`${Logorganization}_ShownGraph`
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
                email:Logemail,
                metervalue:percentage,
                organization2:organization2
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            
        }
        setmeterValue()
},[percentage])

const handleselectsheetfield=()=>{
  setsheetClicked(false)
  setsheetpopup(false)
  let value=sheetJson[0][sheetfieldselected]
  // let value=''
  // try{
  //     value=parseInt(sheetJson[0][sheetfieldselected]) 
      
  //     if(isNaN(sheetJson[0][sheetfieldselected]))
  //     {
  //         value='$0'
  //     }
  // }
  // catch(e)
  // {
  //     value='$0'
  // }

  
  
  setshowvalue(value)
  const ans=Math.max(min, Math.min(showValue/2, max)); 
  setpercentage(ans)
}




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
      setLoading2(false)
  }
  try{
  setValues()
  }catch(e)
  {
      setValues()
  }
},[clickedSheetId])


  return (
    <div className='relative'>
      <HiOutlineDotsVertical size={20} className='absolute -mt-16 right-2' onClick={()=>{setshowPopupMenu(true)}}/>
      {showPopupMenu && (
    <div className='absolute -mt-16 mr-2 right-0 w-[150px] bg-white p-3 border-gray-300 border-[1px] rounded-md z-50'>
    <RxCross2 onClick={()=>{setshowPopupMenu(false)}} className='absolute top-0 left-0 cursor-ponter' />
        <div
            className='p-1 hover:bg-blue-400  flex items-center rounded-md  text-[12px] font-semibold font-inter cursor-pointer'
            onClick={() => {handlePlusClick();setshowPopupMenu(false)}}>
            <p className='p-1 font-inter font-bold text-[12px] '>Upload Sheet</p>
        </div>
       
    </div>
)}


{
                    sheetClicked?
                    <div className='left-[20%] w-[80%] h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]'>
                                    <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                                        
                                        <div className='w-[100%] h-[20%] flex space-x-2 items-start justify-start'>
                                            <div className='flex items-center justify-center h-[40px]' onClick={(()=>{setsheetClicked(false); setsheetpopup(true)})}>
                                            <IoMdArrowBack  className=' cursor-pointer' size={17}/>
                                            </div>
                                            <div className='text-gray-500 h-[40px] text-[15px] flex items-center justify-center'>
                                                {sheetname}
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
                    sheetpopup?
                    <div className='left-[20%] w-[80%]  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]'>
                        <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                            
                            <div className='h-[50px]'>
                                <div className='w-[20px] cursor-pointer ' onClick={()=>{setsheetpopup(false);}}>
                                    <RxCross2 className='w-[20px]'/>
                                </div>
                            </div>
                            
                            <div  className={`p-1 flex h-[100%]  items-center rounded-md text-[14px] flex-col font-roboto overflow-y-auto`}>
                            {(sheets||[]).map(doc=>
                                    doc.fileType=='xlsx'?
                                    <div key={doc._id}  className='w-[100%] flex flex-col space-y-2'>
                                            <div onMouseEnter={()=>sethover(true)} onMouseLeave={()=>sethover(false)} onClick={()=>handlesheetclick(doc._id,doc.name)} className='w-[100%] h-[45px] hover:bg-blue-500 p-2 rounded-md select-none cursor-pointer hover:text-white flex flex-row items-center justify-start'>
                                                <div>
                                                    <FaRegFileExcel className={` text-green-500`} size={19}/>
                                                </div>
                                                <p className={` text-[14px] px-5 tracking-wider`}>{doc.name}</p>
                                            </div>
                                    </div>
                                    :
                                    <></>
                                )}  
                                {
                                    googlesheetfiles.length>0?
                                    <div className='w-[100%] font-inter text-[14px] font-semibold mt-4 mb-2 h-[40px] flex items-center pl-2'><p>Google sheets:</p></div>
                                    :
                                    <></>
                                }
                                {(googlesheetfiles||[]).map(doc=>
                                    <div key={doc._id}  className='w-[100%] flex flex-col space-y-2'>
                                            <div onMouseEnter={()=>sethover(true)} onMouseLeave={()=>sethover(false)} onClick={()=>handleGooglesheetclicked(doc.id,doc.name)} className='w-[100%] h-[45px] hover:bg-blue-500 p-2 rounded-md select-none cursor-pointer hover:text-white flex flex-row items-center justify-start'>
                                                <div>
                                                    <FaRegFileExcel className={` text-green-500`} size={19}/>
                                                </div>
                                                <p className={` text-[14px] px-5 tracking-wider`}>{doc.name}</p>
                                            </div>
                                    </div>
                                )}
                            </div>
                            
                            
                        </div>
                    </div>
                    :
                    <></>
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
          {`${percentage*2}%`}
        </text>
      </svg>

      {/* Additional details below the arc */}
      <div className="text-center mt-2">
        <p className='font-inter font-semibold text-xl'>Current Value: {percentage*2}%</p>
        <p className='text-sm text-gray-500'>Range: {min}% - {max}%</p>
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
