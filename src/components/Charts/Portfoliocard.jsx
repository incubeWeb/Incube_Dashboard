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
import Model from '../Model/Model'

const Portfoliocard = ({id,portfoliocardwidgitcount,boxes,setBoxes,setportfoliocardwidgitcount,capturingPortfoliowidgitvalues,setcapturingPortfoliowidgitvalues}) => {
    const [editLabel,seteditLabel]=useState(false)
    const inputRef=useRef(null)
    const [labelname,setlablename]=useState('Enter Label')
    const [showValue,setshowvalue]=useState('0')
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
    const[currencyValue,setcurrencyvalue]=useState('$');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    
    const handleCurrencySelect = (currency) => {
      console.log(currency);
      setcurrencyvalue(currency) // Handle currency selection here
      setIsPopupOpen(false);
      
    
     
  };
      
 
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
          setshowvalue(currency)
        };

        const handleFilterSelection = (filter) => {
          setSelectedFilter(filter);
       
          setshowFilterMenu(false); // Close filter menu
          // Open sorting menu
      };
      const getValue=(selectedFilter)=>{
        switch(selectedFilter){
          case "Change Icon":
          return setShowPopup(!showPopup)
          case "Edit Label":
          return handleEdit()
          default:
          return handlePlusClick()
        
        }
       
      }

        
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
                      const portfolioIcon = val.portfoliowidgit.portfolioicon;
                      const currencySymbol = portfolioIcon.match(/[$€₹£%]/);
                      // Extract numeric value before any of the symbols
                      const numericValue = portfolioIcon.match(/^[^$€₹£%]+/);
                        setlablename(val.portfoliowidgit.labelname)
                        setshowvalue(val.portfoliowidgit.showValue)
                        seticonname(numericValue ? numericValue[0] : '');
                        setIcon(getIconComponent(numericValue ? numericValue[0] : ''))
                        setcurrencyvalue(currencySymbol ? currencySymbol[0] : '')
                        console.log("zp",capturingPortfoliowidgitvalues)
                    }
                }
            )
        }

    },[])

    const handlePlusClick=async()=>{
        setLoading(true)
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/alluploadedFiles`,{organization:Logorganization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
        setsheetpopup(true)
        setallsheets(response.data.data)
        setLoading(false)
        console.log("xy",response.data.data)
        
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
            const isFine=JSON.stringify({id:myid,labelname:labelname,showValue:showValue,portfolioicon:iconname+""+currencyValue})===JSON.stringify({id:myid,labelname:'Enter Label',showValue:'$0',portfolioicon:'',currencyValue:'$'})
           if(!isFine)
           {
            
            setportfoliocardwidgitcount({id:myid,labelname:labelname,showValue:showValue,portfolioicon:iconname+""+currencyValue})
           }
        }
        if(!editLabel)
        {
            settingvalue()
        }
        
    },[editLabel,showValue,iconname,currencyValue])

    

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

        
        
        setshowvalue(value);
        
    }
    useEffect(()=>{
     
      },[currencyValue])

      const handleEdit=()=>{

        setModalContent(
          <div>
            <label htmlFor="label-input" className="block mb-2">Edit Label:</label>
            <input
              id="label-input"
              type="text"
              value={labelname}
              onChange={(e) => setlablename(e.target.value)}
              className='border p-2 rounded w-full'
            />
            <button 
              onClick={() => {
                // Logic to save the updated label
                setIsModalOpen(false);
              }}
              className="mt-4 bg-blue-500 text-white p-2 rounded">
              Save
            </button>
          </div>
        );
        setIsModalOpen(true);
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

  useEffect(()=>{
    console.log("zp",sheets.length)
  },[])

  return (
    <div ref={popupRef} className='flex h-[100%] flex-col  bg-white cursor-default space-y-2'>
      
    <div className='-mt-4 cursor-pointer'  ><HiOutlineDotsVertical onClick={()=>{setshowFilterMenu(true)}} size={20}/></div>
    {showFilterMenu && (
  <div className="">
    <div className='absolute left-1 top-0 w-[150px] p-3 bg-white border-gray-300 border-[1px] rounded-md z-50'>
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
        onClick={() => { handlePlusClick(); setshowFilterMenu(false) }}>
        <p className='p-1'>Add Sheet</p>
      </div>
    </div>
  </div>
)}

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
                sheetpopup?
                
                <div ref={popupRef} className="flex flex-col space-y-2 overflow-y-auto scrollbar-hide bg-white">
    {/* Close Button */}
    <div className="flex items-center justify-end pr-2">
        <IoMdClose 
            size={20} 
            className="text-gray-700 cursor-pointer hover:text-gray-500 transition duration-200 ease-in-out transform hover:scale-105" 
            onClick={() => {
                setsheetpopup(false);
            }} 
        />
    </div>

    {/* Main Content */}
    <div className="h-[100px] flex items-center justify-center text-gray-500 font-medium italic">
        {sheets.length === 0 ? (
            <p className="text-gray-500">No sheets found</p>
        ) : (
            <div className="w-full mt-6 space-y-4 overflow-y-auto scrollbar-hide">
                <div className="mt-6" /> {/* Added margin-top to provide space */}
                {sheets
                    .filter((doc) => doc.fileType === 'xlsx')
                    .map((doc) => (
                        <div 
                            key={doc._id} 
                            onClick={() => handlesheetclick(doc._id, doc.name)}
                            className="w-full h-[60px] p-6 bg-gray-100 rounded-lg shadow-md cursor-pointer flex items-center space-x-4 transition-transform duration-200 transform hover:scale-105 hover:bg-white hover:gray-600"
                        >
                            <FaRegFileExcel className="text-green-600" size={22} />
                            <p className="text-[15px] tracking-wider font-semibold truncate">
                                {doc.name.replace(/^\d+_/, "")}
                            </p>
                        </div>
                    ))
                }
            </div>
        )}
    </div>
</div>


               
                :
                sheetClicked?
                
                <div ref={popupRef} className='p-4 flex flex-col w-full h-full bg-white rounded-lg shadow-lg fixed top-0 left-0 z-[40] overflow-y-auto'>
    
    <div className='w-full flex space-x-2 items-center justify-start'>
        <div className='flex items-center justify-center h-[40px] transition-transform transform hover:scale-110 cursor-pointer' onClick={(() => {setsheetClicked(false); setsheetpopup(true)})}>
            <IoMdArrowBack className='text-gray-700' size={20} />
        </div>
        <div className='text-gray-800 font-semibold text-[16px] flex items-center justify-center'>
            {sheetname.replace(/^\d+_/, "")}
        </div>
    </div>

    <div className='w-full flex mt-6 flex-col items-center justify-center space-y-6'>
        <select onChange={(e) => setsheetfieldselected(e.target.value)} className='w-[220px] h-[35px] text-[14px] text-gray-700 rounded-md border-gray-300 border-2 transition duration-200 ease-in-out outline-none '>
            {Loading2 ? (
                <option value="" disabled>
                    <div className="flex items-center">
                        <AiOutlineLoading3Quarters className="animate-spin mr-2" /> 
                        Loading...
                    </div>
                </option>
            ) : (
                (sheetKeys || []).map(k =>
                    <option key={k._id} className="text-gray-700">{k}</option>
                )
            )}
        </select>
    </div>

    <div className='w-full flex flex-row items-center justify-center'>
        <div onClick={handleselectsheetfield} className='select-none mt-2 cursor-pointer flex flex-row w-[120px] rounded-md h-[40px] items-center justify-center bg-gradient-to-r from-green-500 to-green-800 space-x-2 transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg'>
            {Loading2 ? (
                <AiOutlineLoading3Quarters className="animate-spin text-[14px] text-white" />
            ) : (
                <p className='text-[14px] text-white font-semibold'>Set sheet field</p>
            )}
        </div>
    </div>
    
</div>

                
                :
                 
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
                    <div className="bg-blue-500 w-[20%] glow h-[50px]  shadow-[0_0_15px_rgba(59,130,246,1)] rounded-full flex items-center justify-center cursor-pointer mr-4 "onDoubleClick={() => setShowPopup(!showPopup)}>
                  {icon }
                </div>
                                {
                                    !editLabel?
                                    <p className='text-[18px] font-inter font-bold text-gray-700 w-[50%] flex items-center h-[30px]  tracking-wider cursor-pointer' onDoubleClick={handleEdit}>{labelname}</p>
                                    :
                                    <input ref={inputRef}  onChange={(e)=>{setlablename(e.target.value) }} onKeyPress={(e)=>e.key=='Enter'?seteditLabel(false):seteditLabel(true)} className='w-[90px] h-[30px] text-[13px] pl-1 outline-none border-[1px] border-gray-300 rounded-md'/>
                                }
                                
                                {/* <div onClick={()=>handleEdit()}>
                                    <BsPencil className='text-blue-600 ml-2' size={20}/>
                                    
                                </div> */}
                               
                    </div>
                    <div className='w-[100%] h-[40%]  flex flex-row'>
                        <div className='w-[70%] '>
                            <div className='flex h-[100%] items-center justify-start'>
                            
                                <p  className='text-[22px] font-inter mt-9 font-bold text-gray-700 ml-2'><span onClick={togglePopup} className='mr-1 cursor-pointer' >{currencyValue}</span><span className='cursor-pointer' onDoubleClick={handlePlusClick}>{showValue }</span></p>
                            </div>
                            {isPopupOpen && (
                    <div ref={popupRef} className='absolute top-4 left-0 bg-white border h-[160px] scrollbar-hide border-gray-300 rounded overflow-y-auto shadow-md mt-2'>
                        <ul>
                        <li className='cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleCurrencySelect('$')}>$</li>
                            <li className='cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleCurrencySelect('€')}>€</li>
                            <li className='cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleCurrencySelect('₹')}>₹</li>
                            <li className='cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleCurrencySelect('£')}>£</li>
                            <li className='cursor-pointer p-2 hover:bg-gray-100' onClick={() => handleCurrencySelect('%')}>%</li> {/* Percentage selection */}
</ul>
                            
                        
                     
                    </div>
                )}
                        </div>
                        <div className='w-[100%] h-[100%] flex items-center justify-end mt-6'>
                        {loading1 ? (
            <AiOutlineLoading3Quarters className="animate-spin  text-[14px]" />
          ) : (
                        <div className='h-[20px] cursor-pointer'  onClick={handlePlusClick}>
                            {/* <AiOutlineFileAdd  size={24} className='' /> */}
                        </div>
               )}
</div>
                    </div>
                </div>
            }
    
    
          
    
</div>

)
}

export default Portfoliocard