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
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { jwtDecode } from 'jwt-decode'

const Portfoliocard = ({id,setcurrencyvalue,currencyValue,setsheetpopup,handlePlusClick,portfoliocardwidgitcount,boxes,setBoxes,setportfoliocardwidgitcount,capturingPortfoliowidgitvalues,setcapturingPortfoliowidgitvalues,setshowvalue,showValue,clickedSheetIdApp}) => {
    const [editLabel,seteditLabel]=useState(false)
    const inputRef=useRef(null)
    const [labelname,setlablename]=useState('Enter Label')

    
    
    const [sheets,setallsheets]=useState([])
    const [sheetname,setsheetname]=useState('')
    const [clickedSheetId,setclickedSheetId]=useState('')
    const [sheetClicked,setsheetClicked]=useState(false)
    const [sheetfieldselected,setsheetfieldselected]=useState('')
    const [sheetKeys,setsheetKeys]=useState([])
    const [sheetJson,setsheetJson]=useState([])
    const[loading1,setLoading]=useState(false);
    const[Loading2,setLoading2]=useState(true);
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const popupRef = useRef(null);
   
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [icon, setIcon] = useState(<RiBarChartFill size={28} className="text-white" />); 
    const [showPopup, setShowPopup] = useState(false);
    const [iconname,seticonname]=useState('')
    const [isPopupOpen, setIsPopupOpen] = useState(false);
   
   
    
    



      
 
    const uniqueIconKey = `selectedIcon-${id}`;
    const togglePopup = () => {
      setIsPopupOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          setIsPopupOpen(false);
          setsheetpopup(false)
          setsheetClicked(false)
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);


    const [selectedFilter, setSelectedFilter] = useState(''); // Selected 

        const handleIconClick = (iconName) => {
         // localStorage.setItem(uniqueIconKey, iconName); 
          seticonname(iconName)
          setIcon(getIconComponent(iconName)); 
          setShowPopup(false); 
          
        };

        const handleFilterSelection = (filter) => {
          setSelectedFilter(filter);
       
          setshowFilterMenu(false); // Close filter menu
          // Open sorting menu
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
      
        // useEffect(() => {
        //  // const savedIcon = localStorage.getItem(uniqueIconKey);
        //   if (savedIcon) {
        //     setIcon(getIconComponent(savedIcon)); // Set the icon based on the stored icon name
        //   } else {
        //     // Set default icon if no icon is saved in localStorage
        //     setIcon(<RiBarChartFill size={28} className="text-white" />);
        //   }

        
        // }, [uniqueIconKey]);





    useEffect(()=>{
        if(capturingPortfoliowidgitvalues!=[])
        {
            (capturingPortfoliowidgitvalues||[]).map(val=>{
                    if(val.portfoliowidgit.id==id+1)
                    {
                        
                        setlablename(val.portfoliowidgit.labelname)
                        
                        seticonname(val.portfoliowidgit.portfolioicon)
                        setIcon(getIconComponent(val.portfoliowidgit.portfolioicon))
                        setcurrencyvalue(val.portfoliowidgit.currencyValue)
                        
                    }
                }
            )
        }

    },[])

    

    
    
    useEffect(()=>
      {
          const settingvalue=()=>{
              let myid=id+1
              
              const isFine=JSON.stringify({id:myid,labelname:labelname,portfolioicon:iconname,currencyValue:currencyValue})===JSON.stringify({id:myid,labelname:'Enter Label',portfolioicon:'',currencyValue:'$'})
             if(!isFine)
             {
              
              setportfoliocardwidgitcount({id:myid,labelname:labelname,portfolioicon:iconname,currencyValue:currencyValue})
             }
          }
          if(!editLabel)
          {
              settingvalue()
          }
          
      },[editLabel,iconname,currencyValue])

    

    const deleteWidgit=async()=>{
        const email=Logemail
        const organization=Logorganization
        const position=JSON.stringify(boxes.filter((box,index)=>index!=id))
        
        if(boxes.length===0)
        {
          await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`,{email:email,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
          setBoxes([])
        }
        else{const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updatedashboard`,{email:email,position:position,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
        if(response.data.status==200)
        {
          setBoxes(boxes.filter((box,index)=>index!=id))
          setcapturingPortfoliowidgitvalues(prev=>
            prev.filter(val=>val.portfoliowidgit.id!=id+1)
          )
         
        }

      }
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
        setValues()
    },[clickedSheetId])

    const[showFilterMenu,setshowFilterMenu]=useState(false)

    useEffect(()=>{
      const mergedData={
        
        portfoliocard:boxes}
      sessionStorage.setItem("Bot_Data",(JSON.stringify(mergedData)))
      console.log("MergedData",boxes)
          },[boxes])


    
  const threedotref=useRef(null)
  useEffect(()=>{
    const outsideclicked=(event)=>{
      if(threedotref.current && !threedotref.current.contains(event.target))
      {
        setshowFilterMenu(false)
      }

    }
    document.addEventListener('mousedown',outsideclicked)
    return ()=>{
      document.removeEventListener('mousedown',outsideclicked)
    }
  })

  return (
    <div ref={popupRef} className='flex h-[100%] flex-col  bg-white cursor-default space-y-2'>
      
    <div className='-mt-4 cursor-pointer z-[60] w-[20px] h-[20px]'  ><HiOutlineDotsVertical onClick={()=>{setshowFilterMenu(true)}} size={20}/></div>
    {showFilterMenu ?
  <div className="">
    <div ref={threedotref} className='absolute left-8 top-7 w-[150px] p-3 bg-white border-gray-300 border-[1px] rounded-md z-50'>
      <RxCross2 onClick={() => { setshowFilterMenu(false) }} className='absolute right-2 top-1 cursor-pointer' />
      <div
        className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer'
        onClick={() => { setShowPopup(!showPopup); setshowFilterMenu(false) }}>
        <p className='p-1'>Change Icon</p>
      </div>
      <div
        className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-inter font-semibold cursor-pointer'
        onClick={() => { handleEdit(); setshowFilterMenu(false) }}>
        <p className='p-1'>Edit Label</p>
      </div>
      <div
        className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-inter h-[40px] font-semibold cursor-pointer'
        onClick={() => { handlePlusClick(id); setshowFilterMenu(false) }}>
        <p className='p-1'>Add Sheet</p>
      </div>
    </div>
  </div>
:
<div></div>}

    <div className='z-[10] cursor-pointer flex items-center justify-center w-[20px]  rounded-full bg-gray-100 h-[20px] fixed right-0 mt-4 mr-3 top-[1px]' onClick={deleteWidgit}>
    <IoMdClose size={20} className='text-black' />
    </div> 
    
    
   
{/*     
    <div className="flex items-center justify-end pr-2">
        <IoMdClose 
            size={18} 
            className="text-black cursor-pointer hover:text-gray-600 transition-colors duration-200" 
            onClick={() => {
                setsheetpopup(false);
            }} 
        />
    </div> */}
   
    {       

                 
                <div className='w-[100%] h-[100%]'>
                {/* <div className='ml-12 -mb-2'><BsPencil /></div> */}

               
                 
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





                    <div className='w-[100%] h-[30%] flex flex-row items-center justify-start space-x-2 mt-2'>
                    <div className="bg-blue-500 w-[20%] glow h-[50px]  shadow-[0_0_15px_rgba(59,130,246,1)] rounded-full flex items-center justify-center cursor-pointer mr-4 "onDoubleClick={(e) => {setShowPopup(!showPopup); e.stopPropagation()}}>
                  {icon }
                </div>
                                {
                                    !editLabel?
                                    <p className='text-[18px] font-inter font-bold text-gray-700 w-[50%] flex items-center h-[30px]  tracking-wider cursor-pointer' onDoubleClick={handleEdit}>{labelname}</p>
                                    :
                                    <input ref={inputRef} value={labelname}  onChange={(e)=>{setlablename(e.target.value) }} onKeyPress={(e)=>e.key=='Enter'?seteditLabel(false):seteditLabel(true)} className='w-[90px] h-[30px] text-[13px] pl-1 outline-none border-[1px] border-gray-300 rounded-md'/>
                                }
                                
                                {/* <div onClick={()=>handleEdit()}>
                                    <BsPencil className='text-blue-600 ml-2' size={20}/>
                                    
                                </div> */}
                               
                    </div>
                    <div className='w-[100%] h-[40%]  flex flex-row'>
                        <div className='w-[20%] '>
                            <div className='flex h-[100%] items-center justify-start'>
                                  
                                {
                                  currencyValue=='%'?
                                  <p onDoubleClick={()=>handlePlusClick(id)} className='text-[22px] cursor-pointer font-inter mt-9 font-bold text-gray-700 ml-2'><span className='' >{showValue || '0' }</span><span className='mr-1 ' >{currencyValue || '$'}</span></p>
                                  :
                                  <p onDoubleClick={()=>handlePlusClick(id)} className='text-[22px] cursor-pointer font-inter mt-9 font-bold text-gray-700 ml-2'><span className='mr-1 ' >{currencyValue || '$'}</span><span className='' >{showValue || '0' }</span></p>
                                }
                                
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            }
    
    
          
    
</div>

)
}

export default Portfoliocard