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

const PortfolioCards = ({id,sheetedited,selectedSheetId,style,hidenavbar,valueid,setvalueid,changevalue,setchangevalue}) => {
    const [editLabel,seteditLabel]=useState(false)
    const [labelname,setlablename]=useState('')
    const [hover,sethover]=useState(false)
    const [clickedSheetId,setclickedSheetId]=useState('')
    const [sheetKeys,setsheetKeys]=useState([])
    const [showValue,setshowvalue]=useState('$0')
    const inputRef=useRef(null)
    const [loading,setloading]=useState(true)

    const handleEdit=()=>{
        seteditLabel(true)
        setTimeout(()=>{
            if(inputRef.current)
            {
                inputRef.current.focus()
            }
        },100)
    }
    const [sheets,setallsheets]=useState([])
    const [sheetpopup,setsheetpopup]=useState(false)
    const [sheetJson,setsheetJson]=useState([])
    const [sheetClicked,setsheetClicked]=useState(false)
    const [sheetname,setsheetname]=useState('')
    const [sheetfieldselected,setsheetfieldselected]=useState('')
    

    useEffect(()=>
    {
        console.log(selectedSheetId,"ths")
        if(!editLabel && clickedSheetId!="")
        {
            setvalueid(prev => {
                const exists = prev.some(val => val.id === id); // Check if the id exists
                if (exists) {
                  return prev.map(val =>
                    val.id === id
                      ? { ...val, showValue: showValue, labelname: labelname,sheetId:clickedSheetId,sheetfieldselected:sheetfieldselected } // Update the existing object
                      : val
                  );
                } else {
                  // Insert new object if id is not found
                  return [...prev, { id: id, showValue: showValue, labelname: labelname,sheetId:clickedSheetId,sheetfieldselected:sheetfieldselected }];
                }
              });
        }
        
        
    },[editLabel,showValue])

    useEffect(()=>
    {
        const applyRealchanges=async()=>{
            console.log("hi Bhavesh")
            const organization=`${localStorage.getItem('organization')}_Topcards`
            
            const response1=await axios.post('http://localhost:8999/getportfoliostate',{organization:organization})
            const data1=JSON.parse(response1.data.data)
            let key=''
            let sheetid=''

            data1.map(val=>{
                if(val.id==id){
                    key=val.sheetfieldselected
                    sheetid=val.sheetId
                }
            })
            
            console.log(key,"thifsdfsdfsfss")
            const response=await axios.post('http://localhost:8999/sheetfromdb',{id:sheetid,organization:localStorage.getItem('organization')})
            const data=JSON.parse(response.data.data)
            

            let value=''
            try{
                value=parseInt(data[0][key]) 
                
                if(isNaN(data[0][key]))
                {
                    value='$0'
                }
            }
            catch(e)
            {
                value='$0'
            }
            console.log(value,key,"card")
            console.log("blye bhabesf")
            
            setvalueid(prev => {
                const exists = prev.some(val => val.id === id); // Check if the id exists
                if (exists) {
                  return prev.map(val =>
                    val.id === id
                      ? { ...val, showValue: value, labelname: key,sheetId:sheetid } // Update the existing object
                      : val
                  );
                } 
              });

    
        }
        applyRealchanges()

    },[sheetedited])

    useEffect(()=>{
        const getTopCardsValues=async()=>{
            console.log('my',valueid)
            valueid.map(val=>{
                
                if(val.id==id)
                {
                    setlablename(val.labelname)
                    setshowvalue(val.showValue)
                    setTimeout(()=>{
                        setloading(false)
                    },1000)
                }
            })
        }
        getTopCardsValues()
        
    },[valueid])


    const handlePlusClick=async()=>{
        const response=await axios.post('http://localhost:8999/alluploadedFiles',{organization:localStorage.getItem('organization')})
        setsheetpopup(true)
        setallsheets(response.data.data)
        
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

    const handlesheetclick=async(id,name)=>{
        setsheetname(name)
        setclickedSheetId(id)       
        setsheetClicked(true)
        setsheetpopup(false)
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
        }
        setValues()
    },[clickedSheetId])

  return (
   
    <div className='flex flex-col space-y-4 bg-white p-3 w-[100%] h-[160px] rounded-xl '>
                 {
        loading?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Bars color="#8884d8" height={80} width={80} />
        </div>
        :
        
    
                <div>
                <div className={style}>
                    <RiFundsLine size={28} className='text-white'/>
                </div>
                {
                    sheetClicked?
                    <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
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
                                            
                                            <select onChange={(e)=>setsheetfieldselected(e.target.value)} className='w-[220px] h-[30px] text-[14px] text-gray-700 rounded-md border-gray-300 border-[1px]'>
                                                            
                                                {sheetKeys.map(k=>
                                                    <option key={k._id}>{k}</option>
                                                    )
                                                }

                                            </select>
                                        </div>
                                        <div className='w-[100%] mt-[14px] flex flex-row items-center justify-center'>
                                            <div onClick={handleselectsheetfield} className='select-none cursor-pointer flex flex-row w-[120px] rounded-md h-[40px] items-center justify-center bg-gradient-to-r from-green-500 to-green-800 spae-x-2'>
                                                <p className='text-[14px] text-white'>Set sheet field</p>
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                :
                                <></>
                }
                {
                    sheetpopup?
                    <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-white bg-opacity-50  top-0  fixed flex items-center justify-center z-[80]`}>
                        <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' style={{boxShadow:'0px 2px 8px #D1D5DB'}}>
                            
                            <div className='h-[50px]'>
                                <div className='w-[20px] cursor-pointer ' onClick={()=>{setsheetpopup(false);}}>
                                    <RxCross2 className='w-[20px]'/>
                                </div>
                            </div>
                            
                            <div  className={`p-1 flex h-[100%]  items-center rounded-md text-[14px] flex-col font-roboto`}>
                            {(sheets||[]).map(doc=>
                                    <div key={doc._id}  className='w-[100%] flex flex-col space-y-2'>
                                            <div onMouseEnter={()=>sethover(true)} onMouseLeave={()=>sethover(false)} onClick={()=>handlesheetclick(doc._id,doc.name)} className='w-[100%] h-[45px] hover:bg-blue-500 p-2 rounded-md select-none cursor-pointer hover:text-white flex flex-row items-center justify-start'>
                                                <div>
                                                    <FaRegFileExcel className={` text-green-500`} size={19}/>
                                                </div>
                                                <p className={` text-[14px] px-5 tracking-wider`}>{doc.name.substring(doc.name.length-15,doc.name.length)}</p>
                                            </div>
                                    </div>
                                )}  
                            </div>
                            
                            
                        </div>
                    </div>
                    :
                    <></>
                }


                <div className='w-[100%] flex flex-row items-center justify-start space-x-2'>
                    {
                        !editLabel?
                        <p className='text-[15px] text-gray-700 flex items-center h-[30px] tracking-wider font-inter font-semibold'>{labelname}</p>
                        :
                        <input ref={inputRef} value={labelname} onChange={(e)=>{setlablename(e.target.value) }} onKeyPress={(e)=>e.key=='Enter'?seteditLabel(false):seteditLabel(true)} className='w-[90px] h-[30px] text-[13px] pl-1 outline-none border-[1px] border-gray-300 rounded-md'/>
                    }
                    
                    <div onClick={()=>handleEdit()}>
                        <LuPencil className='text-gray-500'/>
                    </div>
                </div>
                <div className='w-[100%] flex flex-row'>
                    <div className='w-[70%] '>
                        <div className='flex h-[100%] items-center justify-start'>
                            <p className='text-[20px] font-inter text-gray-500'>{showValue}</p>
                        </div>
                    </div>
                    <div className='w-[30%] flex items-center justify-end'>
                        <div className='h-[20px] cursor-pointer'  onClick={handlePlusClick}>
                            <FaCirclePlus className='text-gray-500 h-[20px] w-[20px]' />
                        </div>
                    </div>
                </div>
                </div>
            }
            </div>
  )
}

export default PortfolioCards