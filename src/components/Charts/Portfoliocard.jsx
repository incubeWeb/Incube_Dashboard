import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegFileExcel } from 'react-icons/fa'
import { FaCirclePlus } from 'react-icons/fa6'
import { IoMdArrowBack } from 'react-icons/io'
import { LuPencil } from 'react-icons/lu'
import { RiFundsLine } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import { IoMdClose } from "react-icons/io";
import { BsPencil } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiBarChartFill, RiPieChart2Line } from 'react-icons/ri'; 
import { AiOutlineClose } from 'react-icons/ai';  // Close icon
import { PiMoney } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuTriangle } from "react-icons/lu";

const Portfoliocard = ({id,portfoliocardwidgitcount,boxes,setBoxes,setportfoliocardwidgitcount,capturingPortfoliowidgitvalues,setcapturingPortfoliowidgitvalues}) => {
    const [editLabel,seteditLabel]=useState(false)
    const inputRef=useRef(null)
    const [labelname,setlablename]=useState('Enter Label')
    const [showValue,setshowvalue]=useState('$0')
    const [sheetpopup,setsheetpopup]=useState(false)
    const [sheets,setallsheets]=useState([])
    const [sheetname,setsheetname]=useState('')
    const [clickedSheetId,setclickedSheetId]=useState('')
    const [sheetClicked,setsheetClicked]=useState(false)
    const [sheetfieldselected,setsheetfieldselected]=useState('')
    const [sheetKeys,setsheetKeys]=useState([])
    const [sheetJson,setsheetJson]=useState([])
    const[loading1,setLoading]=useState(false);
    const[Loading2,setLoading2]=useState(true);
    

        const [selectedIcon, setSelectedIcon] = useState(null);
        const [icon, setIcon] = useState(null); 
        const [showPopup, setShowPopup] = useState(false);
         
      
       

        const handleIconClick = (iconName) => {
          localStorage.setItem("selectedIcon", iconName); 
          setIcon(getIconComponent(iconName)); 
          setShowPopup(false); 
        };

        
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
      
        useEffect(() => {
          const savedIcon = localStorage.getItem("selectedIcon");
          if (savedIcon) {
            setIcon(getIconComponent(savedIcon)); // Set the icon based on the stored icon name
          } else {
            // Set default icon if no icon is saved in localStorage
            setIcon(<RiBarChartFill size={28} className="text-white" />);
          }

        
        }, []);





    useEffect(()=>{
        console.log(capturingPortfoliowidgitvalues+"abc"+id);
        if(capturingPortfoliowidgitvalues!=[])
        {
            (capturingPortfoliowidgitvalues||[]).map(val=>{
                    if(val.portfoliowidgit.id==id+1)
                    {
                        
                        setlablename(val.portfoliowidgit.labelname)
                        setshowvalue(val.portfoliowidgit.showValue)
                    }
                }
            )
        }

    },[])

    const handlePlusClick=async()=>{
        setLoading(true)
        const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
        setsheetpopup(true)
        setallsheets(response.data.data)
        setLoading(false)
    }
    const handlesheetclick=async(id,name)=>{
        setsheetname(name)
        setclickedSheetId(id)       
        setsheetClicked(true)
        setsheetpopup(false)
    }
    useEffect(()=>
    {
        const settingvalue=()=>{
            let myid=id+1
            const isFine=JSON.stringify({id:myid,labelname:labelname,showValue:showValue})===JSON.stringify({id:myid,labelname:'Enter Label',showValue:'$0'})
           if(!isFine)
           {
            setportfoliocardwidgitcount({id:myid,labelname:labelname,showValue:showValue})
           }
        }
        if(!editLabel)
        {
            settingvalue()
        }
        
    },[editLabel,showValue])

    

    const deleteWidgit=async()=>{
        const email=localStorage.getItem('email')
        const organization=localStorage.getItem('organization')
        const position=JSON.stringify(boxes.filter((box,index)=>index!=id))
        
        if(boxes.length===0)
        {
          await axios.post('http://localhost:8999/deletedashboard',{email:email,organization:organization})
          setBoxes([])
        }
        else{const response=await axios.post('http://localhost:8999/updatedashboard',{email:email,position:position,organization:organization})
        if(response.data.status==200)
        {
          setBoxes(boxes.filter((box,index)=>index!=id))
          setcapturingPortfoliowidgitvalues(prev=>
            prev.filter(val=>val.portfoliowidgit.id!=id+1)
          )
        }

      }
      }

      const handleselectsheetfield=()=>{
        setsheetClicked(false)
        setsheetpopup(false)
        
        let value=''
        try{
            value=parseInt(sheetJson[0][sheetfieldselected]) 
            
            if(isNaN(sheetJson[0][sheetfieldselected]))
            {
                value='$0'
            }
        }
        catch(e)
        {
            value='$0'
        }

        
        
        setshowvalue(value)
        
    }

      const handleEdit=()=>{
        seteditLabel(true)
        setTimeout(()=>{
            if(inputRef.current)
            {
                inputRef.current.focus()
            }
        },100)
    }
    
    useEffect(()=>{
        const setValues=async()=>{
            const response=await axios.post('http://localhost:8999/sheetfromdb',{id:clickedSheetId,organization:localStorage.getItem('organization')})
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
            console.log("this",fileteredKey)
            setsheetfieldselected(fileteredKey[0])
            setsheetKeys(fileteredKey)
            setLoading2(false)
        }
        setValues()
    },[clickedSheetId])

  return (
  
    <div className='flex h-[100%] flex-col  bg-white cursor-default space-y-2'>
        <div className='z-[10] cursor-pointer flex items-center justify-center w-[20px]  rounded-full bg-gray-100 h-[20px] fixed right-[-10px] mt-4 mr-3 top-[-15px]' onClick={deleteWidgit}>
        <IoMdClose size={15} className='text-black' />
        </div> 
        
        {
                    sheetpopup?
                    
                        <div className=' flex flex-col space-y-2 '>
                            
                            <div className='h-[50px]'>
                                <div className='w-[20px] cursor-pointer ' onClick={()=>{setsheetpopup(false);}}>
                                    <RxCross2 className='w-[20px]'/>
                                </div>
                            </div>
                            
                            <div  className={`p-1 flex h-[100%]  items-center rounded-md text-[14px] flex-col font-roboto`}>
                            {(sheets||[]).map(doc=>
                                    <div key={doc._id}  className='w-[100%] flex flex-col space-y-2 mt-2 '>
                                            <div  onClick={()=>handlesheetclick(doc._id,doc.name)} className='w-[100%] h-[45px] hover:bg-blue-500 p-2 rounded-md select-none cursor-pointer hover:text-white flex flex-row items-center justify-start'>
                                                <div >
                                                    <FaRegFileExcel className={` text-green-500`} size={19}/>
                                                </div>
                                                <p className={` text-[14px] px-5 tracking-wider`}>{doc.name.substring(doc.name.length-15,doc.name.length)}</p>
                                            </div>
                                    </div>
                                )}  
                            </div>
                            
                            
                        </div>
                   
                    :
                    sheetClicked?
                    
                        <div className='p-2 flex flex-col space-y-2  z-[40] '>
                            
                            <div className='w-[100%] h-[20%] flex space-x-2 items-start justify-start'>
                                <div className='flex items-center justify-center h-[40px]' onClick={(()=>{setsheetClicked(false); setsheetpopup(true)})}>
                                <IoMdArrowBack  className=' cursor-pointer' size={17}/>
                                </div>
                                <div className='text-gray-500 h-[40px] text-[15px] flex items-center justify-center'>
                                    {sheetname}
                                </div>
                                
                            </div>
                            <div className=' w-[100%] h-[40%] flex flex-col items-center justify-center space-y-8 space-x-2'>
                                
                                <select onChange={(e)=>setsheetfieldselected(e.target.value)} className='w-[220px] h-[30px] text-[14px] text-gray-700 rounded-md border-gray-300 border-[1px]'>
                                {Loading2 ? (
                <option value="">
             <div className="flex items-center">
              <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
             Loading...
             </div>
            </option>
  ) : (                
                                    (sheetKeys||[]
                                        
                                    ).map(k=>
                                        <option key={k._id}>{k}</option>
                                        )
                                   ) }

                                </select>
                            </div>
                            <div className='w-[100%] mt-[14px] flex flex-row items-center justify-center'>
                                <div onClick={handleselectsheetfield} className='select-none cursor-pointer flex flex-row w-[120px] rounded-md h-[40px] items-center justify-center bg-gradient-to-r from-green-500 to-green-800 spae-x-2'>
                                {Loading2 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
          ) : (
                                    <p className='text-[14px] text-white'>Set sheet field</p>)}
                                    
                                </div>
                            </div>
                            
                        </div>
                    
                    :
                     
                    <div className='w-[100%] h-[100%]'>
                    {/* <div className='ml-12 -mb-2'><BsPencil /></div> */}

                    <div className="ml-12 -mb-2" >
                      <BsPencil className="cursor-pointer" onClick={() => setShowPopup(!showPopup)}/>
                     </div>
                          <div className="bg-blue-500 w-[15%] h-[40px] flex items-center justify-center -mt-5 rounded-md">
                      {icon}
                    </div>
                    {showPopup && (
        <div className="fixed top-0 left-0 w-[200px] bg-white shadow-md p-4 z-50 rounded-lg">
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



    

                        <div className='w-[100%] h-[30%] flex flex-row items-center justify-start space-x-2 mt-4 '>
                                    {
                                        !editLabel?
                                        <p className='text-[16px] font-sans font-semibold text-gray-700 flex items-center h-[30px]  tracking-wider'>{labelname}</p>
                                        :
                                        <input ref={inputRef}  onChange={(e)=>{setlablename(e.target.value) }} onKeyPress={(e)=>e.key=='Enter'?seteditLabel(false):seteditLabel(true)} className='w-[90px] h-[30px] text-[13px] pl-1 outline-none border-[1px] border-gray-300 rounded-md'/>
                                    }
                                    
                                    <div onClick={()=>handleEdit()}>
                                        <LuPencil className='text-gray-500'/>
                                        
                                    </div>
                        </div>
                        <div className='w-[100%] h-[40%]  flex flex-row'>
                            <div className='w-[70%] '>
                                <div className='flex h-[100%] items-center justify-start'>
                                    <p className='text-[20px] text-gray-500 mt-3'>{showValue}</p>
                                </div>
                            </div>
                            <div className='w-[100%] h-[100%] flex items-center justify-end'>
                                <div className='h-[80%] flex items-center cursor-pointer mt-14'  onClick={handlePlusClick}>
                                {loading1 ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[14px]" />
            ) : (
                                <FaCirclePlus className='text-gray-500' size={24} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                }
        
        
        
        
        
    </div>
  
  )
}

export default Portfoliocard