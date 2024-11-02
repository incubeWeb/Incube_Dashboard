import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegFileExcel } from 'react-icons/fa'
import { FaCirclePlus } from 'react-icons/fa6'
import { IoMdArrowBack } from 'react-icons/io'
import { IoAddSharp } from 'react-icons/io5'
import { LuPencil } from 'react-icons/lu'
import { RiFundsLine } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import { Bars } from 'react-loader-spinner'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AiOutlineFileAdd } from "react-icons/ai";
import { RiBarChartFill, RiPieChart2Line } from 'react-icons/ri'; 
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai';


import { PiMoney } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuTriangle } from "react-icons/lu";
import { jwtDecode } from 'jwt-decode'


const PortfolioCards = ({selectedTab,id,portfoliosecurity,sheetedited,selectedSheetId,style,hidenavbar,valueid,setvalueid,changevalue,setchangevalue,component}) => {
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const popupRef = useRef(null);
    const [editLabel,seteditLabel]=useState(false)
    const [labelname,setlablename]=useState('')
    const [hover,sethover]=useState(false)
    const [clickedSheetId,setclickedSheetId]=useState('')
    const [sheetKeys,setsheetKeys]=useState([])
    const [showValue,setshowvalue]=useState('0')
    const inputRef=useRef(null)
    const [loading,setloading]=useState(true)
    const [loading1,setLoading1]=useState(false)
    const [loading2,setLoading2]=useState(true)
    const [googlesheetfiles,setgoogledriveSheets]=useState([])
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [icon, setIcon] = useState(<RiBarChartFill size={28} className="text-white" />); 
    const [showPopup, setShowPopup] = useState(false);
    const [iconname,seticonname]=useState('')
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const[currencyValue,setcurrencyvalue]=useState('$');
    const FilterRef = useRef(null);
    

const togglePopup = () => {
    setIsPopupOpen(prev => !prev);
};

    // State for filter pop-up
    const [selectedFilter, setSelectedFilter] = useState('');
    const handleCurrencySelect = (currency) => {
      console.log(currency);
      setcurrencyvalue(currency) // Handle currency selection here
      setIsPopupOpen(false); // Close popup after selection
  }; // Selected filter

  useEffect(() => {
    const handleClickOutside = (event) => {
        // Check if the click is outside the popup and filter menu
        if (
            
            FilterRef.current && !FilterRef.current.contains(event.target)
        ) {
            setIsPopupOpen(false);
            setShowPopup(false);
            setShowPopup(false);
            setsheetpopup(false);
            setsheetClicked(false);
            setIsPopupOpen(false)
            
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);




    const handleEdit=()=>{
        seteditLabel(true)
        setTimeout(()=>{
            if(inputRef.current)
            {
                inputRef.current.focus()
            }
        },100)
    }

    const handleIconClick = (iName) => {
     // localStorage.setItem(uniqueIconKey, iconName); 
      seticonname(iName)
      setIcon(getIconComponent(iName)); 
      setShowPopup(false); 
    };
   
    
    useEffect(()=>
        {
           const fun=()=>{
            if(!editLabel && labelname!='' )
                {
                    setvalueid(prev => {
                        const exists = prev.some(val => val.id === id); // Check if the id exists
                        if (exists) {
                          return prev.map(val =>
                            val.id === id
                              ? { ...val, showValue: showValue, labelname: labelname,portfolioicon:iconname,sheetId:clickedSheetId,sheetfieldselected:sheetfieldselected,currencyValue:currencyValue } // Update the existing object
                              : val
                          );
                        } else {
                          // Insert new object if id is not found
                          return [...prev, { id: id, showValue: showValue, labelname: labelname,portfolioicon:iconname,sheetId:clickedSheetId,sheetfieldselected:sheetfieldselected,currencyValue:currencyValue }];
                        }
                      });
                }
           }
           fun()
            
            
        },[editLabel,showValue,iconname,currencyValue])
   
    const getIconComponent = (iconName) => {
        switch (iconName) {
          case "RiFundsLine":
            return <RiFundsLine size={28} className="text-white" />;
          case "RiBarChartFill":
            return <RiBarChartFill size={28} className="text-white" />;
          case "PiMoney":
            return <PiMoney size={28} className="text-white" />;
          case "FaPeopleGroup":
            return <FaPeopleGroup size={28} className="text-white" />;
          case "LuTriangle":
            return <LuTriangle size={28} className="text-white" />;
          default:
            return <RiBarChartFill size={28} className="text-white" />; // Default icon
        }
      };




    const [sheets,setallsheets]=useState([])
    const [sheetpopup,setsheetpopup]=useState(false)
    const [sheetJson,setsheetJson]=useState([])
    const [sheetClicked,setsheetClicked]=useState(false)
    const [sheetname,setsheetname]=useState('')
    const [sheetfieldselected,setsheetfieldselected]=useState('')
    const[showFilterMenu,setshowFilterMenu]=useState(false)
   
    
    
    
    useEffect(()=>{
        setloading(true)
    },[selectedTab])

   

    useEffect(()=>{
        const getTopCardsValues=async()=>{
         
            valueid.map(val=>{
                
                if(val.id==id)
                {
                    setlablename(val.labelname)
                    setshowvalue(val.showValue)
                    seticonname(val.portfolioicon)
                    setIcon(getIconComponent(val.portfolioicon))
                    setcurrencyvalue(val.currencyValue)
                    setTimeout(()=>{
                        setloading(false)
                    },1000)
                }
            })
        }
        getTopCardsValues()
        
    },[valueid,selectedTab])


    const handlePlusClick=async()=>{
        setLoading1(true)
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
        setLoading1(false)
    }

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
            setLoading2(false)

        }
        else{
            setsheetfieldselected('wrong sheet format')
            setsheetKeys(['none'])
            setLoading2(false)
        }
    }

useEffect(()=>{
console.log("zp",showValue)
},[showValue])

useEffect(() => {
  // Handle clicks outside the chat box
  const handleClickOutside = (event) => {
    if (FilterRef.current && !FilterRef.current.contains(event.target)) {
      // If the clicked target is outside the chat box, close the chat
      setshowFilterMenu(false)
    }
  };

  // Add the event listener for clicks outside
  document.addEventListener('mousedown', handleClickOutside);

  // Cleanup the event listener when component unmounts
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [FilterRef]);

  return (
   <div>
   
    <div className='flex flex-col  bg-white p-3 w-[100%] h-[160px] rounded-xl relative'>
   
        {showFilterMenu && (
    <div  ref={FilterRef} className='absolute top-0 right-0 w-[150px] bg-white p-3 border-gray-300 border-[1px] rounded-md z-50'>
    <RxCross2 onClick={()=>{setshowFilterMenu(false)}} className=' cursor-ponter' />
        <div
            className='p-1 hover:bg-blue-400  flex items-center rounded-md  text-[12px] font-semibold font-inter cursor-pointer'
            onClick={() => {setShowPopup(!showPopup);setshowFilterMenu(false) }}>
            <p className='p-1 '>Change Icon</p>
        </div>
        <div
            className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-inter font-semibold cursor-pointer'
            onClick={() =>{handleEdit();setshowFilterMenu(false)}}>
            <p className='p-1'>Edit Label</p>
        </div>
        <div
            className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-inter h-[40px] font-semibold cursor-pointer'
            onClick={() =>{  handlePlusClick() ;setshowFilterMenu(false)} }>
            <p className='p-1'>Add Sheet</p>
        </div>
    </div>
)}
                 {
        loading?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Bars color="#8884d8" height={80} width={80} />
        </div>
        :
      
    
                <div>
                    {selectedTab==Logemail?
                    <div  className=' cursor-pointer flex justify-end h-[10px] relative '  >
                        
                        
                        <HiOutlineDotsVertical onClick={()=>{setshowFilterMenu(true)}} size={20}/>
                        
                        </div>
                        :
                        <div className='  flex justify-end h-[10px] relative '  >
                            </div>
                        }
                <div onDoubleClick={()=>{setShowPopup(true)}} className={style}>
                
                {icon}
                </div>
            
    
                {
                    sheetClicked?
                    <div className={`${hidenavbar ? 'w-full' : 'left-20 w-[80%]'} fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50`}>
                                    <div  ref={FilterRef} className='p-2 flex flex-col  w-[400px] h-[400px] space-y-2 bg-white  z-[40]  rounded-md'>
                                        
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
                    <div className={`${hidenavbar ? 'w-full' : 'left-20 w-[80%]'} fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50`}>
                        <div  ref={FilterRef} className='p-2 flex flex-col  w-[400px] h-[400px] space-y-2 bg-white   z-[40]  rounded-md' >
                            
                        <div className='flex items-center font-inter bg-blue-500 rounded-md px-2 justify-between h-[50px]'>
                <div className='flex items-center cursor-pointer' >
                    
                    <p className='text-[14px] font-semibold flex justify-center text-white  ml-8 items-center'>Select Sheet for Portfolio card</p>
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
        <div className={`p-1 flex h-[100%] items-center rounded-md text-[14px] flex-col font-roboto overflow-y-auto scrollbar-hide`}>
            {(sheets || []).map(doc => (
                doc.fileType === 'xlsx' ? (
                    <div key={doc._id} className='w-[100%] flex flex-col space-y-2'>
                        <div 
                            onMouseEnter={() => sethover(true)} 
                            onMouseLeave={() => sethover(false)} 
                            onClick={() => handlesheetclick(doc._id, doc.name)} 
                            className='w-[100%] h-[45px] hover:bg-gray-100 hover:text-gray-800 p-2 rounded-md select-none cursor-pointer flex flex-row items-center justify-start'
                        >
                            <FaRegFileExcel className='text-green-500' size={19} />
                            <span className='ml-2'>{doc.name.replace(/^\d+_/, "")}</span>
                        </div>
                    </div>
                ) : null
            ))}
            {googlesheetfiles.length > 0 && (
                <div className='w-[100%] font-inter   border-b pb-2 text-[14px] font-semibold mt-4 mb-2 h-[40px] flex items-center pl-2'>
                    <p  className=''>Google sheets:</p>
                </div>
            )}
            {(googlesheetfiles || []).map(doc => (
                <div key={doc._id} className='w-[100%] flex flex-col space-y-2'>
                    <div 
                        onMouseEnter={() => sethover(true)} 
                        onMouseLeave={() => sethover(false)} 
                        onClick={() => handleGooglesheetclicked(doc.id, doc.name)} 
                        className='w-[100%] h-[45px] hover:bg-gray-100 hover:text-gray-800 p-2 rounded-md select-none cursor-pointer flex flex-row items-center justify-start'
                    >
                        <FaRegFileExcel className='text-green-500' size={19} />
                        <span className='ml-2'>{doc.name}</span>
                    </div>
                </div>
            ))}
        </div>
    </>
)}
                            
                        </div>
                    </div>
                    :
                    <></>
                }
                {showPopup && (
        <div ref={FilterRef} className=" absolute top-0 right-0 w-[200px] bg-white shadow-md p-4 z-50 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-[14px] font-semibold">Select an Icon</h3>
            <AiOutlineClose
              size={20}
              className="cursor-pointer"
              onClick={() => setShowPopup(false)} // Close popup on close icon click
            />
          </div>

          {/* Icon selection grid */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div onClick={() => handleIconClick("RiFundsLine")} className="cursor-pointer">
              <RiFundsLine size={28} className="text-gray-700 hover:text-blue-500" />
            </div>
            <div onClick={() => handleIconClick("RiBarChartFill")} className="cursor-pointer">
              <RiBarChartFill size={28} className="text-gray-700 hover:text-blue-500" />
            </div>
            <div onClick={() => handleIconClick("PiMoney")} className="cursor-pointer">
              <PiMoney size={28} className="text-gray-700 hover:text-blue-500" />
            </div>
            <div onClick={() => handleIconClick("FaPeopleGroup")} className="cursor-pointer">
              <FaPeopleGroup size={28} className="text-gray-700 hover:text-blue-500" />
            </div>
            <div onClick={() => handleIconClick("LuTriangle")} className="cursor-pointer">
              <LuTriangle size={28} className="text-gray-700 hover:text-blue-500" />
            </div>
          </div>
        </div>
      )}

                <div className='w-[100%] flex flex-row items-center justify-start mt-2 space-x-2'>
                    {
                        !editLabel?
                        <p onDoubleClick={()=>{handleEdit()}} className='text-[15px] text-gray-700 flex items-center h-[30px] tracking-wider font-inter font-semibold cursor-pointer'>{labelname}</p>
                        :
                        <input ref={inputRef} value={labelname} onChange={(e)=>{setlablename(e.target.value) }} onKeyPress={(e)=>e.key=='Enter'?seteditLabel(false):seteditLabel(true)} className='w-[90px] h-[30px] text-[13px] pl-1 outline-none border-[1px] border-gray-300 rounded-md'/>
                    }
                  
                </div>
                <div className='w-[100%] flex flex-row'>
                    <div className='w-[70%] '>
                        <div className='flex h-[100%] items-center justify-start'>
                            <p className='text-[20px] font-inter font-semibold text-gray-700'><span className='mr-1 cursor-pointer' onClick={togglePopup}>{currencyValue}</span><span onDoubleClick={()=>{handlePlusClick()}} className='cursor-pointer'>{showValue}</span></p>
                        </div>
                        {isPopupOpen && (
                    <div  ref={FilterRef} className='absolute top-0 left-0 bg-white border h-[160px] scrollbar-hide border-gray-300 rounded overflow-y-auto shadow-md '>
                        <ul>
                        <li className='cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleCurrencySelect('$')}>$</li>
                            <li className='cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleCurrencySelect('€')}>€</li>
                            <li className='cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleCurrencySelect('₹')}>₹</li>
                            <li className='cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleCurrencySelect('£')}>£</li>
                            <li className='cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleCurrencySelect('%')}>%</li> 
                        
                        </ul>
                    </div>
                )}
                    </div>
                    <div className='w-[30%] flex items-center justify-end'>
    
                    {loading1 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : Logrole=='super admin' || Logrole=='admin'?(
                        <div className='h-[20px] cursor-pointer'  onClick={handlePlusClick}>
                            {/* <AiOutlineFileAdd  size={24} className='' /> */}
                        </div>
               ):<></>}
                    </div>
                </div>
                </div>
            }
       
            </div>
           


            </div>
  )
}

export default PortfolioCards